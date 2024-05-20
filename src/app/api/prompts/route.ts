import { db } from "@/db";
import { Category } from "@/db/schema/categories";
import { Interaction, interactions } from "@/db/schema/interactions";
import { Prompt, prompts } from "@/db/schema/prompts";
import { User } from "@/db/schema/users";
import { createDefaultApiRouteContext } from "@/lib/createDefaultApiRouteContext";
import { logger } from "@/lib/logger";
import { formatEntityList, formatErrorEntity } from "@/lib/utils/formatEntity";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type WithPromptCategory<T> = T & {
  promptCategory: { category: Category }[];
};
export type WithInteractions<T> = T & {
  interactions: Interaction[];
};
export type WithUser<T> = T & {
  user: User;
};

export type PromptWithRelations = WithInteractions<
  WithUser<WithPromptCategory<Prompt>>
>;

export type WithVotes<T> = T & { votes: number };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const earliest = searchParams.get("earliest") ?? null;
  const categoryId = searchParams.get("categoryId") ?? null;

  const context = {
    ...createDefaultApiRouteContext(request),
    tracePath: "/api/prompts",
    earliest,
    categoryId,
  };

  try {
    logger.info({ ...context }, "Getting prompts");
    let result = await db.query.prompts.findMany({
      where: and(
        earliest ? gt(prompts.createdAt, new Date(earliest)) : undefined,
      ),
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

    let finalResult = result;

    if (categoryId) {
      finalResult = result.filter((prompt) =>
        prompt.promptCategory.some(
          (pc) => pc.categoryId === Number(categoryId),
        ),
      );
    }

    return NextResponse.json(formatEntityList(finalResult, "prompt"));
  } catch (error) {
    logger.error({ ...context, error }, "Error getting prompts");
    return NextResponse.json(
      formatErrorEntity(error instanceof Error ? error.message : error),
      { status: 500 },
    );
  }
}
