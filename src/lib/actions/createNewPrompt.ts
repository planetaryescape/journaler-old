"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { NewPrompt, promptCategories, prompts } from "../../db/schema";
import { insertPromptSchema } from "../zod-schemas/prompts";

export const createNewPrompt = async (
  data: NewPrompt & { categoryId: number },
) => {
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

    return { result };
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new prompt");
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
