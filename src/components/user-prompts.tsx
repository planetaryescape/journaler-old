import { db } from "@/db";
import { interactions } from "@/db/schema/interactions";
import { prompts } from "@/db/schema/prompts";
import { desc, eq, gt } from "drizzle-orm";
import { PromptCard } from "./prompt-card";

const getUserPrompts = async (
  userId: number,
  earliest?: Date,
  limit?: number,
  sortBy?: { value: "votes" | "createdAt"; order: "desc" | "asc" },
) => {
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

  const rawPrompts = result.filter((prompt) => prompt.user.id === userId);

  let filteredPrompts =
    rawPrompts.map((item) => ({
      ...item,
      votes: item.interactions.filter(
        (interaction) => interaction.type === "upvote",
      ).length,
    })) ?? [];

  if (sortBy?.value) {
    filteredPrompts = filteredPrompts.sort(
      (a, b) =>
        (sortBy?.order === "desc" ? 1 : -1) *
        (Number(b[sortBy.value]) - Number(a[sortBy.value])),
    );
  }

  if (limit) {
    filteredPrompts = filteredPrompts.slice(0, limit);
  }

  return filteredPrompts;
};

export const UserPrompts = async ({
  userId,
  title,
  limit,
  earliest,
  sortBy = { value: "votes", order: "desc" },
}: {
  userId: number;
  title?: string;
  earliest?: Date;
  limit?: number;
  sortBy?: { value: "votes" | "createdAt"; order: "desc" | "asc" };
}) => {
  const userPrompts = await getUserPrompts(userId, earliest, limit, sortBy);

  return (
    <div className="mb-16 relative max-w-4xl mx-auto md:px-8">
      {title && (
        <h3 className="text-xl font-semibold mx-auto mb-4 w-full text-center">
          {title}
        </h3>
      )}
      <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
        {userPrompts.length === 0 && (
          <p className="text-sm py-8">You have not created any prompts</p>
        )}
        {userPrompts
          .sort((a, b) => b.votes - a.votes)
          .map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
      </div>
    </div>
  );
};
