import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "../../../lib/db";
import {
  getCatalog,
  getSettings,
  getBanners,
  getArticles,
  saveArticle,
} from "../../../lib/content";
import {
  admin,
  email,
  field,
  fail,
  json,
  login,
  logout,
  newTotpSecret,
  rate,
  RequestError,
  rotatePassword,
  sameOrigin,
  validTotp,
} from "../../../lib/api";

export const runtime = "nodejs";
const cookie = (res: NextResponse, req: NextRequest, token: string) =>
  res.cookies.set("andalus-admin", token, {
    httpOnly: true,
    secure: req.nextUrl.protocol === "https:",
    sameSite: "strict",
    path: "/",
    maxAge: 8 * 60 * 60,
  });

export async function POST(req: NextRequest) {
  try {
    const data = await json(req);
    await rate(req, "admin-login", 8);
    const result = await login(
      email(data.email || process.env.ADMIN_EMAIL || "admin@andalus.local"),
      field(data.password, "lozinka", 1, 300),
      typeof data.otp === "string" ? data.otp : undefined,
    );
    if ("twoFactor" in result) return NextResponse.json({ twoFactor: true });
    const res = NextResponse.json({
      ok: true,
      email: result.owner.email,
      twoFactorEnabled: Boolean(result.owner.totp_enabled),
    });
    cookie(res, req, result.token);
    return res;
  } catch (e) {
    return fail(e);
  }
}
export async function DELETE(req: NextRequest) {
  try {
    sameOrigin(req);
    await logout(req);
    const res = NextResponse.json({ ok: true });
    res.cookies.set("andalus-admin", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return res;
  } catch (e) {
    return fail(e);
  }
}
export async function GET(req: NextRequest) {
  try {
    const owner = await admin(req);
    const [catalog, settings, banners, articles, orders, messages, subscribers] =
      await Promise.all([
        getCatalog(true),
        getSettings(),
        getBanners(true),
        getArticles(true),
        query<{ customer: string; items: string; [key: string]: unknown }>(
          "SELECT * FROM orders ORDER BY created_at DESC LIMIT 500",
        ),
        query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 500"),
        query("SELECT * FROM subscribers ORDER BY created_at DESC LIMIT 500"),
      ]);
    const res = NextResponse.json({
      owner: {
        email: owner.email,
        twoFactorEnabled: Boolean(owner.totp_enabled),
      },
      catalog,
      settings,
      banners,
      articles,
      orders: orders.map((row) => ({
        ...row,
        customer: JSON.parse(row.customer),
        items: JSON.parse(row.items),
        idempotency_key: undefined,
      })),
      messages,
      subscribers,
    });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (e) {
    return fail(e);
  }
}
export async function PATCH(req: NextRequest) {
  try {
    sameOrigin(req);
    const owner = await admin(req),
      data = await json(req);
    if (data.action === "order") {
      const status = field(data.status, "status", 1, 30);
      if (
        ![
          "Primljena",
          "Potvrđena",
          "Poslana",
          "Isporučena",
          "Otkazana",
        ].includes(status)
      )
        throw new RequestError("Nepoznat status.");
      const changed = await execute("UPDATE orders SET status=$1 WHERE id=$2", [
        status,
        field(data.id, "narudžba", 5, 60),
      ]);
      if (!changed) throw new RequestError("Narudžba nije pronađena.", 404);
      return NextResponse.json({ ok: true });
    }
    if (data.action === "product") {
      const id = field(data.product?.id, "identifikator proizvoda", 3, 80)
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-");
      const price = Number(data.product?.price);
      if (!Number.isFinite(price) || price < 0 || price > 10000)
        throw new RequestError("Provjerite cijenu.");
      const product = {
        id,
        name: field(data.product?.name, "naziv", 2, 150),
        size: field(data.product?.size, "pakovanje", 1, 100),
        price,
        category: field(data.product?.category, "kategorija", 2, 80),
        badge:
          typeof data.product?.badge === "string"
            ? data.product.badge.slice(0, 40)
            : "",
        image: field(data.product?.image, "slika", 2, 100),
        description: field(data.product?.description, "opis", 5, 2000),
        usage:
          typeof data.product?.usage === "string"
            ? data.product.usage.trim().slice(0, 2000)
            : "",
        composition:
          typeof data.product?.composition === "string"
            ? data.product.composition.trim().slice(0, 2000)
            : "",
      };
      const sort = Number(data.product?.sort ?? 999);
      if (!Number.isInteger(sort) || sort < 0 || sort > 100_000)
        throw new RequestError("Provjerite redoslijed proizvoda.");
      await execute(
        "INSERT INTO catalog_products(id,data,enabled,sort_order,updated_at) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data,enabled=EXCLUDED.enabled,sort_order=EXCLUDED.sort_order,updated_at=EXCLUDED.updated_at",
        [
          id,
          JSON.stringify(product),
          data.product?.enabled !== false,
          sort,
          new Date().toISOString(),
        ],
      );
      return NextResponse.json({ ok: true, product });
    }
    if (data.action === "article") {
      const slug = field(data.article?.slug, "URL identifikator", 3, 150)
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-");
      const bodyHtml = field(data.article?.bodyHtml, "sadržaj članka", 10, 50_000);
      const tags = Array.isArray(data.article?.tags)
        ? data.article.tags
            .filter((t: unknown): t is string => typeof t === "string")
            .map((t: string) => t.trim())
            .filter(Boolean)
            .slice(0, 20)
        : String(data.article?.tags ?? "")
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
            .slice(0, 20);
      const sort = Number(data.article?.sort ?? 999);
      if (!Number.isInteger(sort) || sort < 0 || sort > 100_000)
        throw new RequestError("Provjerite redoslijed članka.");
      await saveArticle({
        slug,
        title: field(data.article?.title, "naslov", 3, 200),
        category: field(data.article?.category, "kategorija", 2, 80),
        tags,
        image: field(data.article?.image, "slika", 2, 100),
        excerpt: field(data.article?.excerpt, "kratak opis", 5, 400),
        bodyHtml,
        enabled: data.article?.enabled !== false,
        sort,
      });
      return NextResponse.json({ ok: true });
    }
    if (data.action === "banner") {
      const id = field(data.banner?.id, "identifikator banera", 2, 60)
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-");
      const sort = Number(data.banner?.sort ?? 999);
      if (!Number.isInteger(sort) || sort < 0 || sort > 100_000)
        throw new RequestError("Provjerite redoslijed banera.");
      const href = field(data.banner?.href, "link", 1, 300);
      if (!href.startsWith("/") && !/^https?:\/\//.test(href))
        throw new RequestError("Link mora početi sa / ili http(s)://.");
      await execute(
        "INSERT INTO banners(id,image,href,alt,sort_order,enabled,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(id) DO UPDATE SET image=EXCLUDED.image,href=EXCLUDED.href,alt=EXCLUDED.alt,sort_order=EXCLUDED.sort_order,enabled=EXCLUDED.enabled,updated_at=EXCLUDED.updated_at",
        [
          id,
          field(data.banner?.image, "slika", 2, 100),
          href,
          field(data.banner?.alt, "alternativni tekst", 3, 300),
          sort,
          data.banner?.enabled !== false,
          new Date().toISOString(),
        ],
      );
      return NextResponse.json({ ok: true });
    }
    if (data.action === "settings") {
      const shipping = String(data.settings?.shippingBam ?? "").trim();
      const freeShipping = String(data.settings?.freeShippingFrom ?? "").trim();
      const storeName = field(
        data.settings?.storeName ?? "Andalus",
        "naziv prodavnice",
        2,
        80,
      );
      if (
        shipping &&
        (!/^\d+(?:[.,]\d{1,2})?$/.test(shipping) ||
          Number(shipping.replace(",", ".")) > 500)
      )
        throw new RequestError("Provjerite cijenu dostave.");
      if (
        freeShipping &&
        (!/^\d+(?:[.,]\d{1,2})?$/.test(freeShipping) ||
          Number(freeShipping.replace(",", ".")) > 10000)
      )
        throw new RequestError("Provjerite prag za besplatnu dostavu.");
      for (const [key, value] of Object.entries({
        shippingBam: shipping,
        freeShippingFrom: freeShipping,
        storeName,
      }))
        await execute(
          "INSERT INTO settings(key,value,updated_at) VALUES($1,$2,$3) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,updated_at=EXCLUDED.updated_at",
          [key, value, new Date().toISOString()],
        );
      return NextResponse.json({ ok: true });
    }
    if (data.action === "totp-begin") {
      const secret = newTotpSecret();
      await execute(
        "UPDATE admins SET totp_secret=$1,totp_enabled=false WHERE id=$2",
        [secret, owner.id],
      );
      return NextResponse.json({
        secret,
        uri: `otpauth://totp/Andalus:${encodeURIComponent(owner.email)}?secret=${secret}&issuer=Andalus&algorithm=SHA1&digits=6&period=30`,
      });
    }
    if (data.action === "totp-confirm") {
      if (
        !owner.totp_secret ||
        !validTotp(owner.totp_secret, field(data.otp, "2FA kod", 6, 6))
      )
        throw new RequestError("Neispravan 2FA kod.");
      await execute("UPDATE admins SET totp_enabled=true WHERE id=$1", [
        owner.id,
      ]);
      return NextResponse.json({ ok: true });
    }
    if (data.action === "totp-disable") {
      const password = field(data.password, "lozinka", 1, 300);
      const result = await login(
        owner.email,
        password,
        owner.totp_enabled ? field(data.otp, "2FA kod", 6, 6) : undefined,
      );
      if ("twoFactor" in result)
        throw new RequestError("Unesite 2FA kod.", 401);
      await execute(
        "UPDATE admins SET totp_secret=NULL,totp_enabled=false WHERE id=$1",
        [owner.id],
      );
      return NextResponse.json({ ok: true });
    }
    if (data.action === "password") {
      await rate(req, "admin-password", 5);
      const nextPassword = field(data.nextPassword, "nova lozinka", 16, 300);
      if (nextPassword !== data.confirmPassword)
        throw new RequestError("Nova lozinka i potvrda nisu iste.");
      const token = await rotatePassword(
        owner,
        field(data.currentPassword, "trenutna lozinka", 1, 300),
        nextPassword,
        owner.totp_enabled ? field(data.otp, "2FA kod", 6, 6) : undefined,
      );
      const response = NextResponse.json({ ok: true });
      cookie(response, req, token);
      return response;
    }
    throw new RequestError("Nepoznata administrativna radnja.");
  } catch (e) {
    return fail(e);
  }
}
