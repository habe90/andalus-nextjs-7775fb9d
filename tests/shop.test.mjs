import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHmac, randomUUID, randomBytes } from "node:crypto";
import pg from "pg";
import { migrate } from '../scripts/migrate.mjs';

const port = 3018,
  base = `http://localhost:${port}`,
  password = randomBytes(24).toString("hex");
const baseUrl = new URL(
  process.env.DATABASE_URL ||
    "postgresql://andalus:andalus@localhost:5433/andalus",
);
const testDbName = `andalus_test_${Date.now()}`;
const adminUrl = new URL(baseUrl);
adminUrl.pathname = "/postgres";
const testUrl = new URL(baseUrl);
testUrl.pathname = `/${testDbName}`;
let server,
  logs = "",
  created,
  cookie,
  pgClient;
const sample = {
  name: "Test Kupac",
  email: "test@example.test",
  phone: "+38761111111",
  address: "Testna ulica 1",
  city: "Tuzla",
  postalCode: "75000",
  note: "AUTOMATSKI TEST — nije stvarna narudžba",
  consent: "on",
  items: [{ id: "curekot-250", quantity: 2, price: 0.01 }],
  idempotencyKey: randomUUID(),
  total: 0.01,
};
const post = (route, data, headers = {}) =>
  fetch(base + route, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
const totp = (secret) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const char of secret)
    bits += alphabet.indexOf(char).toString(2).padStart(5, "0");
  const bytes = Buffer.from(
    Array.from({ length: Math.floor(bits.length / 8) }, (_, i) =>
      parseInt(bits.slice(i * 8, i * 8 + 8), 2),
    ),
  );
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30_000)));
  const hash = createHmac("sha1", bytes).update(counter).digest();
  const offset = hash[hash.length - 1] & 15;
  return String((hash.readUInt32BE(offset) & 0x7fffffff) % 1_000_000).padStart(
    6,
    "0",
  );
};
before(async () => {
  const admin = new pg.Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  await admin.query(`CREATE DATABASE ${testDbName}`);
  await admin.end();
  pgClient = new pg.Client({ connectionString: testUrl.toString() });
  await pgClient.connect();
  await migrate(testUrl.toString());
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--port", String(port)],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        ADMIN_PASSWORD: password,
        DATABASE_URL: testUrl.toString(),
        SHIPPING_BAM: "",
      },
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    },
  );
  server.stdout.on("data", (x) => (logs += x));
  server.stderr.on("data", (x) => (logs += x));
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(base);
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  assert.ok(ready, logs);
});
after(async () => {
  server?.kill();
  await pgClient?.end();
  const admin = new pg.Client({ connectionString: adminUrl.toString() });
  await admin.connect();
  await admin.query(
    `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname=$1 AND pid<>pg_backend_pid()`,
    [testDbName],
  );
  await admin.query(`DROP DATABASE IF EXISTS ${testDbName}`);
  await admin.end();
});
test("all public routes and product assets respond successfully", async () => {
  const paths = [
    "/",
    "/proizvodi",
    "/proizvodi?kategorija=Ulje%20sidra",
    "/o-nama",
    "/blog",
    "/kontakt",
    "/korpa",
    "/naplata",
    "/moj-racun",
    "/privatnost",
    "/uslovi-kupovine",
    "/admin",
    "/blog/sta-je-curekot",
    "/blog/predaja-o-curekotu",
    "/blog/kategorija/curekot-i-ulja",
    "/blog/oznaka/curekot",
    "/sitemap.xml",
    "/robots.txt",
    ...[
      "legacy",
      "sidra",
      "curekot-100",
      "curekot-250",
      "curekot-500",
      "dvojna-terapija-set",
      "dvojna-terapija",
      "balzam",
    ].map((id) => `/proizvodi/${id}`),
    "/assets/logo.png",
    "/assets/hero-kim.webp",
  ];
  for (const route of paths) {
    const r = await fetch(base + route);
    assert.equal(r.status, 200, route);
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert.match(sitemap, /blog\/sta-je-curekot/);
  assert.match(sitemap, /blog\/kategorija\/curekot-i-ulja/);
  assert.equal((await fetch(base + "/nepostojeca-stranica")).status, 404);
});
test("server calculates order price, persists it and ignores client totals", async () => {
  const r = await post("/api/orders", sample);
  assert.equal(r.status, 201);
  created = await r.json();
  assert.equal(created.total, 44);
  assert.equal(created.shipping, null);
  assert.match(created.id, /^AND-/);
  const { rows } = await pgClient.query(
    "SELECT total,customer FROM orders WHERE id=$1",
    [created.id],
  );
  assert.equal(rows[0].total, 4400);
  assert.equal(JSON.parse(rows[0].customer).name, sample.name);
});
test("retries and simultaneous repeated requests create one order", async () => {
  const replies = await Promise.all([
    post("/api/orders", sample),
    post("/api/orders", sample),
  ]);
  for (const r of replies) {
    assert.equal(r.status, 201);
    assert.equal((await r.json()).id, created.id);
  }
  const { rows } = await pgClient.query(
    "SELECT COUNT(*)::int AS n FROM orders",
  );
  assert.equal(rows[0].n, 1);
});
test("invalid carts and missing consent are rejected", async () => {
  for (const patch of [
    { items: [] },
    { items: [{ id: "missing", quantity: 1 }] },
    { items: [{ id: "curekot-250", quantity: -1 }] },
    { items: [{ id: "curekot-250", quantity: 1.5 }] },
    {
      items: [
        { id: "curekot-250", quantity: 1 },
        { id: "curekot-250", quantity: 1 },
      ],
    },
    { items: [{ id: "sidra", quantity: 1 }] },
    { consent: false },
    { email: "invalid" },
    { postalCode: "ABCDE" },
  ]) {
    const r = await post("/api/orders", {
      ...sample,
      ...patch,
      idempotencyKey: randomUUID(),
    });
    assert.equal(r.status, 400, JSON.stringify(patch));
  }
});
test("cross-origin writes are blocked", async () => {
  assert.equal(
    (await post("/api/orders", sample, { Origin: "https://example.test" }))
      .status,
    403,
  );
});
test("order lookup requires matching email and omits address and phone", async () => {
  assert.equal(
    (
      await post("/api/orders/lookup", {
        id: created.id,
        email: "wrong@example.test",
      })
    ).status,
    404,
  );
  const r = await post("/api/orders/lookup", {
    id: created.id,
    email: sample.email,
  });
  assert.equal(r.status, 200);
  const data = await r.json();
  assert.equal(data.status, "Primljena");
  assert.equal(data.total, 44);
  assert.equal(data.customer, undefined);
  assert.equal(data.phone, undefined);
});
test("admin denies anonymous and incorrect password access", async () => {
  assert.equal((await fetch(base + "/api/admin")).status, 401);
  assert.equal((await post("/api/admin", { password: "wrong" })).status, 401);
});
test("admin login, listing and status update work", async () => {
  const login = await post("/api/admin", { password });
  assert.equal(login.status, 200);
  cookie = login.headers.get("set-cookie").split(";")[0];
  assert.match(login.headers.get("set-cookie"), /HttpOnly/i);
  const r = await fetch(base + "/api/admin", { headers: { Cookie: cookie } });
  assert.equal(r.status, 200);
  assert.equal((await r.json()).orders.length, 1);
  assert.equal(r.headers.get("cache-control"), "no-store");
  const update = await fetch(base + "/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({
      action: "order",
      id: created.id,
      status: "Potvrđena",
    }),
  });
  assert.equal(update.status, 200);
  const lookup = await post("/api/orders/lookup", {
    id: created.id,
    email: sample.email,
  });
  assert.equal((await lookup.json()).status, "Potvrđena");
});
test("CMS delivery settings are persisted and used by new orders", async () => {
  const update = await fetch(base + "/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({
      action: "settings",
      settings: {
        storeName: "Andalus",
        shippingBam: "8,50",
        freeShippingFrom: "50",
      },
    }),
  });
  assert.equal(update.status, 200);
  const cms = await fetch(base + "/api/admin", { headers: { Cookie: cookie } });
  assert.equal((await cms.json()).settings.shippingBam, "8,50");
  const order = await post("/api/orders", {
    ...sample,
    email: "dostava@example.test",
    idempotencyKey: randomUUID(),
  });
  assert.equal(order.status, 201);
  assert.equal((await order.json()).shipping, 8.5);
});
test("administrator can require authenticator 2FA", async () => {
  const begin = await fetch(base + "/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ action: "totp-begin" }),
  });
  assert.equal(begin.status, 200);
  const { secret } = await begin.json();
  const confirm = await fetch(base + "/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ action: "totp-confirm", otp: totp(secret) }),
  });
  assert.equal(confirm.status, 200);
  const challenge = await post("/api/admin", { password });
  assert.equal(challenge.status, 200);
  assert.equal((await challenge.json()).twoFactor, true);
  const login = await post("/api/admin", { password, otp: totp(secret) });
  assert.equal(login.status, 200);
});
test("contact message and newsletter signup are persisted, signup is deduplicated", async () => {
  assert.equal(
    (
      await post("/api/contact", {
        name: "Test Kupac",
        email: sample.email,
        message: "Automatska testna poruka.",
        consent: "on",
      })
    ).status,
    200,
  );
  for (let i = 0; i < 2; i++)
    assert.equal(
      (await post("/api/newsletter", { email: sample.email })).status,
      200,
    );
  const r = await fetch(base + "/api/admin", { headers: { Cookie: cookie } });
  const data = await r.json();
  assert.equal(data.messages.length, 1);
  assert.equal(data.subscribers.length, 1);
});
