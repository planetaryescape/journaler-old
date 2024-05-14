import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/lib/db/schema/index.ts",
  dialect: "postgresql",
  out: "src/lib/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
