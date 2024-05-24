"use server";

import { db } from "@/db";
import { logger } from "@/lib/logger";
import { eq } from "drizzle-orm";
import { User, users } from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";
import { insertUserSchema } from "../zod-schemas/users";

export const updateUserProfile = async (
  data: User,
): Promise<Entity<User> | ErrorEntity> => {
  const updatedUser = insertUserSchema.parse(data);

  const context = {
    tracePath: "updateUserProfile",
    data: { updatedUser },
  };

  try {
    logger.info({ ...context, data: { updatedUser } }, "Updating user profile");
    const result = await db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, updatedUser.id ?? 0))
      .returning();

    if (!result[0].id) {
      throw new Error("Could not update user profile");
    }

    logger.debug({ ...context, data: result[0] }, "Updated user profile");

    return formatEntity(result[0], "user");
  } catch (error) {
    logger.error({ ...context, error }, "Error updating user profile");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
