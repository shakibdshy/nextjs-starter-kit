import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env/env.mjs";

import * as schema from "./schema/index";

export const client = neon(env.DATABASE_URL!);
const db = drizzle(client, {
  schema,
});
export default db;
