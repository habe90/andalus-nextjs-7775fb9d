import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { execute } from "../../../../lib/db";
import { admin, fail, RequestError, sameOrigin } from "../../../../lib/api";

export const runtime = "nodejs";
const ALLOWED = new Set(["image/webp", "image/jpeg", "image/png"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    sameOrigin(req);
    await admin(req);
    const contentType = req.headers.get("content-type") || "";
    if (!ALLOWED.has(contentType))
      throw new RequestError("Podržani formati slike: WEBP, JPEG, PNG.");
    const buf = Buffer.from(await req.arrayBuffer());
    if (!buf.length) throw new RequestError("Prazna slika.");
    if (buf.length > MAX_BYTES)
      throw new RequestError("Slika je prevelika (maksimalno 4 MB).");
    const id = "up_" + randomBytes(10).toString("hex");
    await execute(
      "INSERT INTO product_images(id,content_type,data,created_at) VALUES($1,$2,$3,$4)",
      [id, contentType, buf, new Date().toISOString()],
    );
    return NextResponse.json({ id });
  } catch (e) {
    return fail(e);
  }
}
