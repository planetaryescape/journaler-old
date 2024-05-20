import { followers } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertFollowerSchema = createInsertSchema(followers);
