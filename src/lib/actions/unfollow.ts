"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Follower, NewFollower, followers } from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";
import { insertFollowerSchema } from "../zod-schemas/followers";

export const unfollow = async (
  data: NewFollower,
): Promise<Entity<Follower> | ErrorEntity> => {
  const unFollowData = insertFollowerSchema.parse(data);
  const context = {
    tracePath: "unfollow",
    data: { unFollowData },
  };
  try {
    logger.info({ ...context, data: { unFollowData } }, "Unfollowing");
    const result = await db
      .delete(followers)
      .where(
        and(
          eq(followers.followerId, unFollowData.followerId),
          eq(followers.followedId, unFollowData.followedId),
        ),
      )
      .returning();
    logger.debug({ ...context, data: result[0] }, "Successfully unfollowed");

    revalidatePath(`/users/${unFollowData.followedId}`);
    return formatEntity(result[0], "follower");
  } catch (error) {
    logger.error({ ...context, error }, "Error voting");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
