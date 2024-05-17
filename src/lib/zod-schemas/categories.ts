import { categories } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertCategoriesSchema = createInsertSchema(categories);
