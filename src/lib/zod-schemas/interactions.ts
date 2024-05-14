import { interactions } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertInteractionSchema = createInsertSchema(interactions);
