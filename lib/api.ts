import { NextRequest, NextResponse } from "next/server";
import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHmac,
} from "node:crypto";
import { query, queryOne, execute } from "./db";

export class RequestError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export const fail = (e: unknown) => {
  if (!(e instanceof RequestError))
    console.error(
      "Andalus API error:",
      e instanceof Error ? e.message : "Unknown error",
    );
  return NextResponse.json(
    {
      error:
        e instanceof RequestError
          ? e.message
          : "Zahtjev trenutno nije moguće obraditi.",
    },
    { status: e instanceof RequestError ? e.status : 500 },
  );
};
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (origin && host && new URL(origin).host !== host)
    throw new RequestError("Zahtjev nije dozvoljen.", 403);
}
export async function json(req: NextRequest) {
  sameOrigin(req);
  if (!req.headers.get("content-type")?.includes("application/json"))
    throw new RequestError("Potreban je JSON zahtjev.", 415);
  const text = await req.text();
  if (text.length > 100_000)
    throw new RequestError("Zahtjev je prevelik.", 413);
  try {
    const data = JSON.parse(text);
    if (!data || Array.isArray(data) || typeof data !== "object") throw Error();
    return data;
  } catch {
    throw new RequestError("Neispravni podaci.");
  }
}
export function field(value: unknown, name: string, min = 1, max = 200) {
  if (
    typeof value !== "string" ||
    value.trim().length < min ||
    value.trim().length > max
  )
    throw new RequestError(`Provjerite polje: ${name}.`);
  return value.trim();
}
export function email(value: unknown) {
  const result = field(value, "email", 5, 180).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result))
    throw new RequestError("Unesite ispravnu email adresu.");
  return result;
}
export async function rate(req: NextRequest, bucket: string, max = 20) {
  const ip = req.headers.get("x-real-ip") || "local";
  const key = createHash("sha256")
      .update(bucket + ip)
      .digest("hex"),
    now = Date.now();
  await execute("DELETE FROM rate_limits WHERE expires < $1", [now]);
  await execute(
    "INSERT INTO rate_limits(key,count,expires) VALUES($1,1,$2) ON CONFLICT(key) DO UPDATE SET count=rate_limits.count+1",
    [key, now + 15 * 60_000],
  );
  const row = await queryOne<{ count: number }>(
    "SELECT count FROM rate_limits WHERE key=$1",
    [key],
  );
  if (row && row.count > max)
    throw new RequestError(
      "Previše pokušaja. Pokušajte ponovo za 15 minuta.",
      429,
    );
}

type AdminRow = {
  id: number;
  email: string;
  password_hash: string;
  totp_secret: string | null;
  totp_enabled: boolean;
};
const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const passwordHash = (password: string) => {
  const salt = randomBytes(16).toString("base64url");
  return `${salt}:${scryptSync(password, salt, 64).toString("base64url")}`;
};
const passwordMatches = (password: string, stored: string) => {
  const [salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64).toString("base64url");
  return (
    actual.length === expected.length &&
    timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
  );
};

async function seedAdmin() {
  const count = await queryOne<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM admins",
  );
  if (!count?.count) {
    const password = process.env.ADMIN_PASSWORD;
    const owner = process.env.ADMIN_EMAIL || "admin@andalus.local";
    if (!password || password.length < 16)
      throw new RequestError("Administracija nije konfigurirana.", 503);
    await execute(
      "INSERT INTO admins(email,password_hash,created_at) VALUES($1,$2,$3) ON CONFLICT(email) DO NOTHING",
      [owner, passwordHash(password), new Date().toISOString()],
    );
  }
}
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const decodeBase32 = (value: string) => {
  let bits = "",
    out: number[] = [];
  for (const c of value.replace(/=|\s/g, "").toUpperCase()) {
    const n = alphabet.indexOf(c);
    if (n < 0) throw new RequestError("Neispravan 2FA ključ.");
    bits += n.toString(2).padStart(5, "0");
  }
  for (let i = 0; i + 8 <= bits.length; i += 8)
    out.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(out);
};
const totpCode = (secret: string, at = Date.now()) => {
  const time = Math.floor(at / 30_000);
  const b = Buffer.alloc(8);
  b.writeBigUInt64BE(BigInt(time));
  const digest = createHmac("sha1", decodeBase32(secret)).update(b).digest();
  const offset = digest[digest.length - 1] & 15;
  return String(
    (digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000,
  ).padStart(6, "0");
};
export const validTotp = (secret: string, code: string) =>
  /^\d{6}$/.test(code) &&
  [-30_000, 0, 30_000].some((offset) => {
    const expected = totpCode(secret, Date.now() + offset);
    return timingSafeEqual(Buffer.from(code), Buffer.from(expected));
  });
export const newTotpSecret = () =>
  Array.from(randomBytes(20))
    .map((b) => alphabet[b & 31])
    .join("");

export async function login(
  emailAddress: string,
  password: string,
  otp?: string,
) {
  await seedAdmin();
  const owner = await queryOne<AdminRow>(
    "SELECT * FROM admins WHERE email=$1",
    [emailAddress],
  );
  if (!owner || !passwordMatches(password, owner.password_hash))
    throw new RequestError("Neispravni podaci za prijavu.", 401);
  if (
    owner.totp_enabled &&
    (!otp || !owner.totp_secret || !validTotp(owner.totp_secret, otp))
  ) {
    if (!otp) return { twoFactor: true as const };
    throw new RequestError("Neispravan jednokratni kod.", 401);
  }
  const token = randomBytes(32).toString("base64url");
  await execute("DELETE FROM admin_sessions WHERE expires_at < $1", [
    Date.now(),
  ]);
  await execute(
    "INSERT INTO admin_sessions(token_hash,admin_id,expires_at,created_at) VALUES($1,$2,$3,$4)",
    [
      hash(token),
      owner.id,
      Date.now() + 8 * 60 * 60_000,
      new Date().toISOString(),
    ],
  );
  return { token, owner };
}
export async function rotatePassword(
  owner: AdminRow,
  currentPassword: string,
  nextPassword: string,
  otp?: string,
) {
  if (nextPassword.length < 16)
    throw new RequestError("Nova lozinka mora imati najmanje 16 znakova.");
  const result = await login(owner.email, currentPassword, otp);
  if ("twoFactor" in result) throw new RequestError("Unesite 2FA kod.", 401);
  await execute("UPDATE admins SET password_hash=$1 WHERE id=$2", [
    passwordHash(nextPassword),
    owner.id,
  ]);
  await execute(
    "DELETE FROM admin_sessions WHERE admin_id=$1 AND token_hash<>$2",
    [owner.id, hash(result.token)],
  );
  return result.token;
}
export async function admin(req: NextRequest) {
  const token = req.cookies.get("andalus-admin")?.value;
  if (!token) throw new RequestError("Prijavite se u administraciju.", 401);
  const row = await queryOne<AdminRow>(
    "SELECT a.id,a.email,a.totp_secret,a.totp_enabled,a.password_hash FROM admin_sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=$1 AND s.expires_at>$2",
    [hash(token), Date.now()],
  );
  if (!row) throw new RequestError("Sesija nije važeća.", 401);
  return row;
}
export async function logout(req: NextRequest) {
  const token = req.cookies.get("andalus-admin")?.value;
  if (token)
    await execute("DELETE FROM admin_sessions WHERE token_hash=$1", [
      hash(token),
    ]);
}
