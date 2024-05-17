"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { NewCategory, categories } from "../../db/schema";
import { insertCategoriesSchema } from "../zod-schemas/categories";

export const createNewCategory = async (data: NewCategory) => {
  const newCategory = insertCategoriesSchema.parse(data);

  const context = {
    tracePath: "createNewCategory",
    data: { newCategory },
  };

  try {
    logger.info({ ...context, data: { newCategory } }, "Creating new category");
    const result = await db.insert(categories).values(data).returning();

    logger.debug({ ...context, data: { result } }, "Created new category");

    return { result: result[0] };
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new category");
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
