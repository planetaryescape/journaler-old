"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Follower, NewFollower, followers, users } from "../../db/schema";
import { knock } from "../knock";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";
import { insertFollowerSchema } from "../zod-schemas/followers";

export const follow = async (
  data: NewFollower,
): Promise<Entity<Follower> | ErrorEntity> => {
  const newFollower = insertFollowerSchema.parse(data);
  const context = {
    tracePath: "follow",
    data: { newFollower },
  };
  try {
    logger.info({ ...context, data: { newFollower } }, "Following");
    const result = await db.insert(followers).values(newFollower).returning();
    logger.debug({ ...context, data: result[0] }, "Successfully followed");

    const recipients = await db.query.users.findMany({
      where: eq(users.id, result[0]?.followedId),
      columns: {
        id: true,
        username: true,
        email: true,
        clerkUserId: true,
      },
    });

    const actor = await db.query.users.findMany({
      where: eq(users.id, result[0]?.followerId),
      columns: {
        id: true,
        username: true,
        email: true,
        clerkUserId: true,
      },
    });

    revalidatePath(`/users/${newFollower.followedId}`);

    await knock.workflows.trigger("new-follow", {
      data: {
        user_id: actor?.[0]?.id,
        variableKey: "Preview data value",
      },
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
    });

    return formatEntity(result[0], "follower");
  } catch (error) {
    logger.error({ ...context, error }, "Error voting");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
