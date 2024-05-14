"use server";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { logger } from "@/lib/logger";
import { insertUserSchema } from "@/lib/zod-schemas/users";
import { NewUser } from "../db/schema";

export const createUser = async (data: NewUser) => {
  const newUser = insertUserSchema.parse(data);
  const context = {
    tracePath: "createUser",
    data: { newUser },
  };
  try {
    logger.info({ ...context, data: { newUser } }, "Creating new user");
    const result = await db.insert(users).values(data).returning();
    logger.debug({ ...context, data: { result } }, "Created new user");
    return { result };
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new user");
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
