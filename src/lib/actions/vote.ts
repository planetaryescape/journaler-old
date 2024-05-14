"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { NewInteraction, interactions } from "../../db/schema";
import { insertInteractionSchema } from "../zod-schemas/interactions";

export const vote = async (data: NewInteraction) => {
  const newInteraction = insertInteractionSchema.parse(data);
  const context = {
    tracePath: "vote",
    data: { newInteraction },
  };
  try {
    logger.info({ ...context, data: { newInteraction } }, "Voting");
    const result = await db.insert(interactions).values(data).returning();
    logger.debug({ ...context, data: { result } }, "Successfully voted");

    revalidatePath(`/prompts/${newInteraction.promptId}`);
    return { result };
  } catch (error) {
    logger.error({ ...context, error }, "Error voting");
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
