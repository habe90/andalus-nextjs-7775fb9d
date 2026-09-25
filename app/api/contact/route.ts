import { NextRequest, NextResponse } from "next/server";
import { execute } from "../../../lib/db";
import { json, field, email, rate, fail, RequestError } from "../../../lib/api";
export async function POST(req: NextRequest) {
  try {
    const data = await json(req);
    await rate(req, "contact", 10);
    if (data.consent !== "on" && data.consent !== true)
      throw new RequestError("Potrebna je saglasnost za obradu poruke.");
    await execute(
      "INSERT INTO messages(name,email,message,created_at) VALUES($1,$2,$3,$4)",
      [
        field(data.name, "ime", 2, 120),
        email(data.email),
        field(data.message, "poruka", 10, 3000),
        new Date().toISOString(),
      ],
    );
    return NextResponse.json({ message: "Hvala! Vaša poruka je zaprimljena." });
  } catch (e) {
    return fail(e);
  }
}
