import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { logger } from "@/lib/logger";
import { insertUserSchema } from "@/lib/zod-schemas/users";

export async function POST(request: NextRequest) {
  const context = {
    ...createDefaultApiRouteContext(request),
  };
  try {
    const data = insertUserSchema.parse(request.body);
    logger.info({ ...context, data }, "Creating new user");
    const result = await db.insert(users).values(data).returning();
    return NextResponse.json({ result });
  } catch (error) {
    logger.error({ ...context, error }, "Error creating new user");
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
