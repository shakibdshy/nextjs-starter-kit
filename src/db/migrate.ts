import { migrate } from "drizzle-orm/neon-http/migrator";

import config from "@/../drizzle.config";
import { env } from "@/env/env.mjs";

import db from "./index";

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
}
