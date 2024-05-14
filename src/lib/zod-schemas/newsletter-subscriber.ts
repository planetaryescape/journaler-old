import { newsletterSubscribers } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertNewsletterSubscriberSchema = createInsertSchema(
  newsletterSubscribers,
  {
    email: (schema) =>
      schema.email.email().describe("The email address of the subscriber"),
  }
);
