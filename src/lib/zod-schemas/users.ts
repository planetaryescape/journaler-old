import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) =>
    schema.email.email().describe("The email address of the user"),
});
