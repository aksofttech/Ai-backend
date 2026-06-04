import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';

/**
 * Run SQL migrations manually: npm run migration:run
 * Requires PostgreSQL with pgvector installed.
 */
async function runMigration() {
  const client = new Client({
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    user: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE ?? 'yugsoft_tech',
  });

  await client.connect();
  const sqlPath = join(__dirname, 'migrations', '001-enable-pgvector.sql');
  const sql = readFileSync(sqlPath, 'utf8');
  await client.query(sql);
  await client.end();
  console.log('Migration 001-enable-pgvector applied successfully.');
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
