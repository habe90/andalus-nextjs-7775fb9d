import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { queryOne, execute } from "../../../lib/db";
import { getCatalog, getSettings } from "../../../lib/content";
import { json, field, email, rate, fail, RequestError } from "../../../lib/api";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    const data = await json(req);
    const products = await getCatalog();
    await rate(req, "orders", 30);
    const key = field(data.idempotencyKey, "oznaka narudžbe", 16, 100);
    const customer = {
      name: field(data.name, "ime i prezime", 3, 120),
      email: email(data.email),
      phone: field(data.phone, "telefon", 6, 30),
      address: field(data.address, "ulica i broj", 4, 200),
      city: field(data.city, "grad", 2, 100),
      postalCode: field(data.postalCode, "poštanski broj", 5, 5),
      note:
        typeof data.note === "string" ? data.note.trim().slice(0, 1000) : "",
    };
    if (
      !/^[+\d ()/-]{6,30}$/.test(customer.phone) ||
      customer.phone.replace(/\D/g, "").length < 6
    )
      throw new RequestError("Provjerite broj telefona.");
    if (!/^\d{5}$/.test(customer.postalCode))
      throw new RequestError("Poštanski broj mora imati 5 cifara.");
    if (data.consent !== "on" && data.consent !== true)
      throw new RequestError("Potrebno je prihvatiti uslove kupovine.");
    if (
      !Array.isArray(data.items) ||
      data.items.length < 1 ||
      data.items.length > 30
    )
      throw new RequestError("Korpa je prazna ili neispravna.");
    const ids = new Set<string>();
    const items = data.items.map((line: { id: string; quantity: number }) => {
      const p = products.find((p) => p.id === line?.id);
      if (
        !p ||
        p.price <= 0 ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 99 ||
        ids.has(p.id)
      )
        throw new RequestError("Provjerite proizvode i količine u korpi.");
      ids.add(p.id);
      return {
        id: p.id,
        name: p.name,
        quantity: line.quantity,
        price: Math.round(p.price * 100),
      };
    });
    const total = items.reduce(
      (s: number, x: { price: number; quantity: number }) =>
        s + x.price * x.quantity,
      0,
    );
    const settings = await getSettings();
    const shippingValue = (
      settings.shippingBam ||
      process.env.SHIPPING_BAM ||
      ""
    )
      .trim()
      .replace(",", ".");
    const freeShippingValue = (settings.freeShippingFrom || "")
      .trim()
      .replace(",", ".");
    const freeShippingFrom = freeShippingValue
      ? Math.round(Number(freeShippingValue) * 100)
      : 0;
    let shipping = shippingValue
      ? Math.round(Number(shippingValue) * 100)
      : null;
    if (shipping !== null && (!Number.isFinite(shipping) || shipping < 0))
      throw new RequestError("Dostava trenutno nije konfigurirana.", 503);
    if (
      shipping !== null &&
      Number.isFinite(freeShippingFrom) &&
      freeShippingFrom > 0 &&
      total >= freeShippingFrom
    )
      shipping = 0;
    const id = `AND-${new Date().getFullYear()}-${randomBytes(5).toString("hex").toUpperCase()}`;
    await execute(
      "INSERT INTO orders(id,idempotency_key,email,customer,items,total,shipping,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (idempotency_key) DO NOTHING",
      [
        id,
        key,
        customer.email,
        JSON.stringify(customer),
        JSON.stringify(items),
        total,
        shipping,
        new Date().toISOString(),
      ],
    );
    const order = await queryOne<{
      id: string;
      email: string;
      total: number;
      shipping: number | null;
    }>("SELECT id,email,total,shipping FROM orders WHERE idempotency_key=$1", [
      key,
    ]);
    if (!order || order.email !== customer.email)
      throw new RequestError("Oznaka narudžbe je već iskorištena.", 409);
    return NextResponse.json(
      {
        id: order.id,
        total: order.total / 100,
        shipping: order.shipping === null ? null : order.shipping / 100,
      },
      { status: 201 },
    );
  } catch (e) {
    return fail(e);
  }
}
