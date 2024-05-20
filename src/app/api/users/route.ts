import { db } from "@/db";
import { users } from "@/db/schema/users";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { formatEntity, formatErrorEntity } from "@/lib/utils/formatEntity";
import { insertUserSchema } from "@/lib/zod-schemas/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const context = {
    ...createDefaultApiRouteContext(request),
  };
  try {
    const data = insertUserSchema.parse(request.body);
    logger.info({ ...context, data }, "Creating new user");
    const result = await db.insert(users).values(data).returning();
    return NextResponse.json(formatEntity(result, "user"));
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new user");
    return NextResponse.json(
      formatErrorEntity(error instanceof Error ? error.message : error),
      { status: 500 },
    );
  }
}
