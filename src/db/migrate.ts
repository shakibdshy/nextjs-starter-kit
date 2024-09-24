import { migrate } from "drizzle-orm/postgres-js/migrator";

import config from "@/../drizzle.config";
import { env } from "@/env/server";

import db, { client } from "./index";

if (!env.DB_MIGRATING) {
  throw new Error(
    "DB_MIGRATING is not set to true. Set it to true to run migrations."
  );
}

try {
  await migrate(db, { migrationsFolder: config.out! });
} catch (error) {
  console.error("Migration failed:", error);
  process.exit(1);
} finally {
  await client.end();
}
