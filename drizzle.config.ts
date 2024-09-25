import { defineConfig } from "drizzle-kit";

import { env } from "@/env/env.mjs";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL! || "",
    // database: "postgres",
    // port: env.DB_PORT,
    // host: env.DB_HOST,
    // user: env.DB_USER,
    // password: env.DB_PASSWORD || "",
  },
  verbose: true,
  strict: true,
});
