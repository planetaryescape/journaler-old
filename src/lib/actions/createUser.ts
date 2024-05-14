"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { logger } from "@/lib/logger";
import { createInsertSchema } from "drizzle-zod";
import { NewUser } from "../db/schema";

const newUserSchema = createInsertSchema(users);

export const createUser = async (data: NewUser) => {
  const newUser = newUserSchema.parse(data);
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
