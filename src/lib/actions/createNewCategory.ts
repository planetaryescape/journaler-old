"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { Category, NewCategory, categories } from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";
import { insertCategoriesSchema } from "../zod-schemas/categories";

export const createNewCategory = async (
  data: NewCategory,
): Promise<Entity<Category> | ErrorEntity> => {
  const newCategory = insertCategoriesSchema.parse(data);

  const context = {
    tracePath: "createNewCategory",
    data: { newCategory },
  };

  try {
    logger.info({ ...context, data: { newCategory } }, "Creating new category");
    const result = await db.insert(categories).values(newCategory).returning();

    logger.debug({ ...context, data: result[0] }, "Created new category");

    return formatEntity(result[0], "category");
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new category");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
