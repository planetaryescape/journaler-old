import { HoverEffect } from "@/components/ui/card-hover-effect";
import { db } from "@/db";
import { prompts } from "@/db/schema";
import { startOfWeek } from "date-fns";
import { gt } from "drizzle-orm";

async function getCategories() {
  let result = await db.query.prompts.findMany({
    where: gt(prompts.createdAt, new Date(startOfWeek(new Date()))),
    with: {
      promptCategory: {
        with: {
          category: true,
        },
      },
    },
  });

  return result
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
          Top Categories this week
        </h3>
        <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
          {categories.length === 0 ? (
            <p className="text-center mt-4 text-sm text-muted-foreground dark:text-warm-sand ">
              No prompts this week
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
