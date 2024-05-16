import { prompts } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertPromptSchema = createInsertSchema(prompts);
