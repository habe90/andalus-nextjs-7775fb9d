import { NextRequest, NextResponse } from "next/server";
import { execute } from "../../../lib/db";
import { json, email, rate, fail } from "../../../lib/api";
export async function POST(req: NextRequest) {
  try {
    const data = await json(req);
    await rate(req, "newsletter", 10);
    await execute(
      "INSERT INTO subscribers(email,created_at) VALUES($1,$2) ON CONFLICT (email) DO NOTHING",
      [email(data.email), new Date().toISOString()],
    );
    return NextResponse.json({
      message: "Hvala! Prijavljeni ste na Andalus novosti.",
    });
  } catch (e) {
    return fail(e);
  }
}
