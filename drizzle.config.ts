import type { Config } from "drizzle-kit";

export const connectionString = "postgres://postgres:password@database:5432/postgres";

export default {
  dbCredentials: { connectionString },
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
} satisfies Config;
