import { db } from "@/db";
import { interactions } from "@/db/schema/interactions";
import { prompts } from "@/db/schema/prompts";
import { users } from "@/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { PromptCard } from "./prompt-card";

const getPrompts = async (limit?: number) => {
  const { userId: authUserId } = auth();
  if (!authUserId) return [];
  const result = await db.query.prompts.findMany({
    extras: {
      votes: sql<number>`count(${interactions.id})`.as("votes"),
    },
    where: eq(users.clerkUserId, authUserId),
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
    limit,
  });

  return result;
};

export const UserPrompts = async ({
  title,
  limit,
}: {
  title?: string;
  limit?: number;
}) => {
  const prompts = await getPrompts(limit);
  console.log("userPrompts:", prompts);

  return (
    <div className="mb-16 relative max-w-4xl mx-auto md:px-8">
      {title && (
        <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
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
