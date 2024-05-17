import { db } from "@/db";
import { interactions } from "@/db/schema/interactions";
import { prompts } from "@/db/schema/prompts";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, gt } from "drizzle-orm";
import { PromptCard } from "./prompt-card";

const getPrompts = async (earliest?: Date) => {
  const { userId: authUserId } = auth();
  if (!authUserId) return [];
  const result = await db.query.prompts.findMany({
    // extras: {
    //   votes: sql<number>`count(${interactions.id})`.as("votes"),
    // },
    where: earliest ? gt(prompts.createdAt, earliest) : undefined,
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
    orderBy: [desc(prompts.createdAt)],
  });

  return result.filter((prompt) => prompt.user.clerkUserId === authUserId);
};

export const UserPrompts = async ({
  title,
  limit,
  earliest,
  sortBy = { value: "votes", order: "desc" },
}: {
  title?: string;
  limit?: number;
  earliest?: Date;
  sortBy?: { value: "votes" | "createdAt"; order: "desc" | "asc" };
}) => {
  const rawPrompts = await getPrompts(earliest);

  let prompts =
    rawPrompts
      .map((item) => ({
        ...item,
        votes: item.interactions.filter(
          (interaction) => interaction.type === "upvote",
        ).length,
      }))
      .sort(
        (a, b) =>
          (sortBy.order === "desc" ? 1 : -1) *
          (Number(b[sortBy.value]) - Number(a[sortBy.value])),
      ) ?? [];

  if (limit) {
    prompts = prompts.slice(0, limit);
  }

  return (
    <div className="mb-16 relative max-w-4xl mx-auto md:px-8">
      {title && (
        <h3 className="text-xl font-semibold mx-auto mb-4 w-full text-center">
          {title}
        </h3>
      )}
      <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
        {prompts.length === 0 && (
          <p className="text-sm py-8">You have not created any prompts</p>
        )}
        {prompts
          .sort((a, b) => b.votes - a.votes)
          .map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
      </div>
    </div>
  );
};
