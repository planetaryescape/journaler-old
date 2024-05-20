"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  Interaction,
  NewInteraction,
  interactions,
  prompts,
  users,
} from "../../db/schema";
import { knock } from "../knock";
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

    const newPrompt = await db.query.prompts.findMany({
      where: eq(prompts.id, newInteraction.promptId),
      columns: {
        id: true,
        title: true,
      },
    });

    const recipients = await db.query.users.findMany({
      where: eq(users.id, newInteraction.userId),
      columns: {
        id: true,
        username: true,
        email: true,
        clerkUserId: true,
      },
    });

    const actor = await db.query.users.findMany({
      where: eq(users.id, newInteraction.userId),
      columns: {
        id: true,
        username: true,
        email: true,
        clerkUserId: true,
      },
    });

    await knock.workflows.trigger("new-vote", {
      actor: {
        id: actor?.[0]?.clerkUserId ?? "",
        email: actor?.[0]?.email,
        name: actor?.[0]?.username,
        collection: "users",
      },
      recipients: recipients.map((r) => ({
        id: r.clerkUserId ?? "",
        email: r.email,
        name: r.username,
        collection: "users",
      })),
      data: {
        promptTitle: newPrompt[0].title,
      },
    });

    return formatEntity(result[0], "interaction");
  } catch (error) {
    logger.error({ ...context, error }, "Error voting");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
