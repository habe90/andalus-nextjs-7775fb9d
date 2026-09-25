import { Pool, types, type QueryResultRow } from "pg";

// All application IDs and epoch millisecond values stay below MAX_SAFE_INTEGER.
types.setTypeParser(20, (value) => {
  const number = Number(value);
  if (!Number.isSafeInteger(number))
    throw new Error("Database integer outside safe range");
  return number;
});

let pool: Pool | undefined;
function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", (error) =>
      console.error("PostgreSQL connection:", error.message),
    );
  }
  return pool;
}
export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  return (await getPool().query<T>(sql, params)).rows;
}
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<T | undefined> {
  return (await query<T>(sql, params))[0];
}
export async function execute(
  sql: string,
  params: unknown[] = [],
): Promise<number> {
  return (await getPool().query(sql, params)).rowCount ?? 0;
}
