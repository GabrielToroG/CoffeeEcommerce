import { Pool, type PoolClient, type QueryResult, type QueryResultRow } from "pg";
import { environment } from "../config/environment";

export const postgresPool = new Pool({
  connectionString: environment.databaseUrl,
  ssl: environment.databaseSsl ? { rejectUnauthorized: false } : false,
});

export async function queryDatabase<ResultRow extends QueryResultRow>(
  queryText: string,
  values?: unknown[],
) {
  return postgresPool.query<ResultRow>(queryText, values);
}

export async function withDatabaseTransaction<T>(
  callback: (client: PoolClient) => Promise<T>,
) {
  const client = await postgresPool.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export type DatabaseQueryResult<ResultRow extends QueryResultRow> = QueryResult<ResultRow>;
