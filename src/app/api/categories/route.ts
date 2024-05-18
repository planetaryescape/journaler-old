import { db } from "@/db";
import { prompts } from "@/db/schema/prompts";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { and, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const earliest = searchParams.get("earliest") ?? null;

  const context = {
    ...createDefaultApiRouteContext(request),
    tracePath: "/api/categories",
    earliest,
  };

  try {
    logger.info({ ...context }, "Getting categories");
    let result = await db.query.categories.findMany({
      where: and(
        earliest ? gt(prompts.createdAt, new Date(earliest)) : undefined,
      ),
    });

    return NextResponse.json({ result });
  } catch (error) {
    logger.error({ ...context, error }, "Error getting categories");
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
