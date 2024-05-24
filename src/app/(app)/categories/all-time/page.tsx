import { HoverEffect } from "@/components/ui/card-hover-effect";
import { db } from "@/db";
import { interactions } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getCategories() {
  let result = await db.query.prompts.findMany({
    with: {
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

  const resultWithVotes = result
    .map((item) => ({
      ...item,
      votes: item.interactions.filter(
        (interaction) => interaction.type === "upvote",
      ).length,
    }))
    .sort((a, b) => 1 * (Number(b.createdAt) - Number(a.createdAt)))
    .slice(0, 10);

  return resultWithVotes
    .map((item) => item.promptCategory)
    .flat()
    .map((item) => item.category);
}

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="mb-16 relative max-w-4xl mx-auto mt-4 px-2 md:px-0">
        <h3 className="text-xl text-center font-semibold w-full">
          All time Top Categories
        </h3>
        <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
          {categories.length === 0 ? (
            <p className="text-center mt-4 text-sm text-muted-foreground dark:text-warm-sand ">
              No prompts found
            </p>
          ) : (
            <HoverEffect
              items={categories.map((category) => ({
                name: category.name,
                description: category.description ?? "",
                link: `/categories/${category.id}`,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
