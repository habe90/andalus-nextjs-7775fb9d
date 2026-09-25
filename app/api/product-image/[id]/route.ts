import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const row = await queryOne<{ content_type: string; data: Buffer }>(
    "SELECT content_type, data FROM product_images WHERE id=$1",
    [id],
  );
  if (!row)
    return NextResponse.json({ error: "Slika nije pronađena." }, { status: 404 });
  return new NextResponse(new Uint8Array(row.data), {
    headers: {
      "Content-Type": row.content_type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
