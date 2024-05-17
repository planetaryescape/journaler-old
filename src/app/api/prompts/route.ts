import { db } from "@/db";
import { promptCategories } from "@/db/schema";
import { interactions } from "@/db/schema/interactions";
import { prompts } from "@/db/schema/prompts";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { getAuth } from "@clerk/nextjs/server";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  const { searchParams } = new URL(request.url);
  const earliest = searchParams.get("earliest") ?? null;
  const categoryId = searchParams.get("categoryId") ?? null;

  const context = {
    ...createDefaultApiRouteContext(request),
    tracePath: "/api/prompts",
    userId,
    earliest,
    categoryId,
  };

  if (!userId) {
    logger.error(context, "Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    logger.info({ ...context }, "Getting prompts");
    const result = await db.query.prompts.findMany({
      where: and(
        earliest ? gt(prompts.createdAt, new Date(earliest)) : undefined,
        categoryId
          ? eq(promptCategories.categoryId, Number(categoryId))
          : undefined,
      ),
      // extras: {
      //   votes: sql<number>`count(${interactions.id})`.as("votes"),
      // },
      with: {
        user: true,
        interactions: {
          where: eq(interactions.type, "upvote"),
        },
        promptCategory: {
          with: {
            category: true,
          },
        },
      },
    });
    return NextResponse.json({ result });
  } catch (error) {
    logger.error({ ...context, error }, "Error getting prompts");
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
