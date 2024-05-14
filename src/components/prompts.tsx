import { db } from "@/db";
import { prompts } from "@/db/schema/prompts";
import { desc } from "drizzle-orm";
import { PromptCard } from "./prompt-card";

const getPrompts = async () => {
  const result = await db.query.prompts.findMany({
    with: {
      user: true,
      promptCategory: {
        with: {
          category: true,
        },
      },
    },
    orderBy: [desc(prompts.createdAt)],
  });
  return result;
};

export const Prompts = async () => {
  const prompts = await getPrompts();

  return (
    <section className="py-28 bg-gray-900">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 className="text-white text-3xl font-semibold mx-auto mb-4 w-full text-center">
          All Time Top Prompts
        </h3>
        <div className="flex flex-col gap-2 p-4 pt-0">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-80 blur-[118px] sm:h-72"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
      ></div>
    </section>
  );
};
