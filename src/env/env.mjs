import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    AUTH_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    DB_MIGRATING: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true")
      .optional(),
  },
  // runtimeEnv: {
  //   NODE_ENV: process.env.NODE_ENV,
  //   DB_HOST: process.env.DB_HOST,
  //   DB_USER: process.env.DB_USER,
  //   DB_PASSWORD: process.env.DB_PASSWORD,
  //   DB_NAME: process.env.DB_NAME,
  //   DB_PORT: process.env.DB_PORT,
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   AUTH_URL: process.env.AUTH_URL,
  //   AUTH_SECRET: process.env.AUTH_SECRET,
  //   AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
  //   AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  //   DB_MIGRATING: process.env.DB_MIGRATING,
  // },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
