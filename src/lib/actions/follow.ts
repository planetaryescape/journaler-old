"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { Follower, NewFollower, followers } from "../../db/schema";
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

    revalidatePath(`/users/${newFollower.followedId}`);
    return formatEntity(result[0], "follower");
  } catch (error) {
    logger.error({ ...context, error }, "Error voting");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
