import pg from "pg";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { migrate } from "./migrate.mjs";
await migrate();
const file = readFileSync(process.argv[2]);
const checksum = createHash("sha256").update(file).digest("hex");
const source = JSON.parse(file);
const keys = {
  admins: "id",
  catalog_products: "id",
  settings: "key",
  orders: "id",
  messages: "id",
  subscribers: "email",
  admin_sessions: "token_hash",
  rate_limits: "key",
};
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(7140317)");
  await client.query(
    "CREATE TABLE IF NOT EXISTS legacy_imports(checksum TEXT PRIMARY KEY, imported_at TIMESTAMPTZ NOT NULL DEFAULT now(), report JSONB NOT NULL)",
  );
  const done = (
    await client.query("SELECT report FROM legacy_imports WHERE checksum=$1", [
      checksum,
    ])
  ).rows[0];
  if (done) console.log("Already imported:", done.report);
  else {
    const report = {};
    for (const [table, key] of Object.entries(keys)) {
      let inserted = 0,
        retained = 0;
      for (const original of source[table] || []) {
        const row = { ...original };
        if (table === "catalog_products") row.enabled = Boolean(row.enabled);
        if (table === "admins") row.totp_enabled = Boolean(row.totp_enabled);
        const columns = Object.keys(row);
        // Columns must exist in target schema, and identifiers are never accepted from arbitrary input.
        const allowed = (
          await client.query(
            "SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1",
            [table],
          )
        ).rows.map((x) => x.column_name);
        if (columns.some((c) => !allowed.includes(c)))
          throw new Error("Unknown columns: " + table);
        const existing = (
          await client.query(`SELECT * FROM ${table} WHERE ${key}=$1`, [
            row[key],
          ])
        ).rows[0];
        if (existing) {
          retained++;
          continue;
        }
        await client.query(
          `INSERT INTO ${table} (${columns.join(",")}) VALUES (${columns.map((_, i) => "$" + (i + 1)).join(",")})`,
          Object.values(row),
        );
        inserted++;
      }
      // Verify every source key exists before committing.
      for (const row of source[table] || [])
        if (
          !(
            await client.query(`SELECT 1 FROM ${table} WHERE ${key}=$1`, [
              row[key],
            ])
          ).rowCount
        )
          throw new Error("Missing migrated row: " + table);
      report[table] = {
        source: (source[table] || []).length,
        inserted,
        retained,
      };
    }
    for (const table of ["admins", "messages"])
      await client.query(
        `SELECT setval(pg_get_serial_sequence('${table}','id'), GREATEST(COALESCE((SELECT MAX(id) FROM ${table}),0),1), EXISTS(SELECT 1 FROM ${table}))`,
      );
    await client.query(
      "INSERT INTO legacy_imports(checksum,report) VALUES($1,$2)",
      [checksum, JSON.stringify(report)],
    );
    console.log(report);
  }
  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
