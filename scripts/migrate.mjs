import pg from "pg";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

export async function migrate(connectionString = process.env.DATABASE_URL) {
  if (!connectionString)
    throw new Error("DATABASE_URL is required for migrations");
  const client = new pg.Client({ connectionString });
  await client.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(7140317)");
    await client.query(
      "CREATE TABLE IF NOT EXISTS schema_migrations(version TEXT PRIMARY KEY, checksum TEXT NOT NULL, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );
    for (const name of [
      "migrations.sql",
      "migrations/002_indexes.sql",
      "migrations/003_product_images.sql",
      "migrations/004_banners.sql",
      "migrations/005_articles.sql",
    ]) {
      const sql = await readFile(
        new URL("../" + name, import.meta.url),
        "utf8",
      );
      const checksum = createHash("sha256").update(sql).digest("hex");
      const previous = (
        await client.query(
          "SELECT checksum FROM schema_migrations WHERE version=$1",
          [name],
        )
      ).rows[0];
      if (previous && previous.checksum !== checksum)
        throw new Error("Applied migration changed: " + name);
      if (previous) continue;
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations(version,checksum) VALUES($1,$2)",
        [name, checksum],
      );
      console.log("Migration applied:", name);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/migrate.mjs"))
  await migrate();
