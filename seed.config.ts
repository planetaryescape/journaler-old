import { env } from "@/env";
import { SeedPostgres } from "@snaplet/seed/adapter-postgres";
import { defineConfig } from "@snaplet/seed/config";
import postgres from "postgres";

export default defineConfig({
  adapter: () => {
    const client = postgres(env.DATABASE_URL ?? "");

    return new SeedPostgres(client);
  },
});
