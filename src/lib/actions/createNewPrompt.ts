"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { NewPrompt, prompts } from "../../db/schema";
import { insertPromptSchema } from "../zod-schemas/prompt";

export const createNewPrompt = async (data: NewPrompt) => {
  const newPrompt = insertPromptSchema.parse(data);

  const context = {
    tracePath: "createNewPrompt",
    data: { newPrompt },
  };

  try {
    logger.info({ ...context, data: { newPrompt } }, "Creating new prompt");
    const result = await db.insert(prompts).values(data).returning();

    logger.debug({ ...context, data: { result } }, "Created new prompt");

    return { result };
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new prompt");
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
