"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { Interaction, NewInteraction, interactions } from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";
import { insertInteractionSchema } from "../zod-schemas/interactions";

export const vote = async (
  data: NewInteraction,
): Promise<Entity<Interaction> | ErrorEntity> => {
  const newInteraction = insertInteractionSchema.parse(data);
  const context = {
    tracePath: "vote",
    data: { newInteraction },
  };
  try {
    logger.info({ ...context, data: { newInteraction } }, "Voting");
    const result = await db
      .insert(interactions)
      .values(newInteraction)
      .returning();
    logger.debug({ ...context, data: result[0] }, "Successfully voted");

    revalidatePath(`/prompts/${newInteraction.promptId}`);
    return formatEntity(result[0], "interaction");
  } catch (error) {
    logger.error({ ...context, error }, "Error voting");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
