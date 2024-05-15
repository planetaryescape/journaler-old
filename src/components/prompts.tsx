import { db } from "@/db";
import { prompts } from "@/db/schema/prompts";
import { desc } from "drizzle-orm";
import { PromptCard } from "./prompt-card";

const getPrompts = async (limit?: number) => {
  const result = await db.query.prompts.findMany({
    with: {
      user: true,
      interactions: true,
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

export const Prompts = async ({
  title,
  limit,
}: {
  title: string;
  limit?: number;
}) => {
  const prompts = await getPrompts(limit);

  return (
    <div className="mb-16 relative max-w-4xl mx-auto md:px-8">
      <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
        {title}
      </h3>
      <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
        {prompts
          .map((item) => ({
            ...item,
            votes:
              item.interactions.filter(
                (interaction) => interaction.type === "upvote"
              ).length -
              item.interactions.filter(
                (interaction) => interaction.type === "downvote"
              ).length,
          }))
          .sort((a, b) => b.votes - a.votes)
          .map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
      </div>
    </div>
  );
};
