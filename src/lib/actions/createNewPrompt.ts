"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { NewPrompt, Prompt, promptCategories, prompts } from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";
import { insertPromptSchema } from "../zod-schemas/prompts";

export const createNewPrompt = async (
  data: NewPrompt & { categoryId: number },
): Promise<Entity<Prompt> | ErrorEntity> => {
  const newPrompt = insertPromptSchema
    .extend({ categoryId: z.number() })
    .parse(data);

  const context = {
    tracePath: "createNewPrompt",
    data: { newPrompt },
  };

  try {
    logger.info({ ...context, data: { newPrompt } }, "Creating new prompt");
    const { categoryId, ...rest } = newPrompt;
    const result = await db.insert(prompts).values(rest).returning();
    if (!result[0].id) {
      throw new Error("Could not create new prompt");
    }
    await db.insert(promptCategories).values({
      promptId: result[0].id,
      categoryId,
    });

    logger.debug({ ...context, data: { result } }, "Created new prompt");

    return formatEntity(result[0], "prompt");
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new prompt");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
