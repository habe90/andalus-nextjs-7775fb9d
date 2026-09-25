// One-time migration utility only. Never imported by the application.
import { DatabaseSync } from "node:sqlite";
import { writeFileSync } from "node:fs";
const source = process.argv[2],
  output = process.argv[3];
if (!source || !output)
  throw new Error("Usage: export-sqlite.mjs SOURCE OUTPUT");
const db = new DatabaseSync(source, { readOnly: true });
db.exec("BEGIN");
const tables = [
  "admins",
  "catalog_products",
  "settings",
  "orders",
  "messages",
  "subscribers",
  "admin_sessions",
  "rate_limits",
];
const data = Object.fromEntries(
  tables.map((table) => [table, db.prepare(`SELECT * FROM ${table}`).all()]),
);
db.exec("COMMIT");
db.close();
writeFileSync(output, JSON.stringify(data), { mode: 0o600, flag: "wx" });
console.log(
  Object.fromEntries(tables.map((table) => [table, data[table].length])),
);
