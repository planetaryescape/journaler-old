"use server";

import { db } from "@/db";
import { User, users } from "@/db/schema/users";
import { logger } from "@/lib/logger";
import { insertUserSchema } from "@/lib/zod-schemas/users";
import { NewUser } from "../../db/schema";
import {
  Entity,
  ErrorEntity,
  formatEntity,
  formatErrorEntity,
} from "../utils/formatEntity";

export const createUser = async (
  data: NewUser,
): Promise<Entity<User> | ErrorEntity> => {
  const newUser = insertUserSchema.parse(data);
  const context = {
    tracePath: "createUser",
    data: { newUser },
  };
  try {
    logger.info({ ...context, data: { newUser } }, "Creating new user");
    const result = await db.insert(users).values(newUser).returning();
    logger.debug({ ...context, data: result[0] }, "Created new user");
    return formatEntity(result[0], "user");
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new user");
    return formatErrorEntity(error instanceof Error ? error.message : error);
  }
};
