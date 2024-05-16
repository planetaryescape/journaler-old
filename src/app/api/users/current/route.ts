import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { logger } from "@/lib/logger";
import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const context = {
    ...createDefaultApiRouteContext(request),
    userId,
  };

  if (!userId) {
    logger.error(context, "Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    logger.info({ ...context }, "Getting current user");
    const result = await db.query.users.findFirst({
      where: eq(users.clerkUserId, userId),
    });
    return NextResponse.json({ result });
  } catch (error) {
    logger.error({ ...context, error }, "Error getting current user");
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
