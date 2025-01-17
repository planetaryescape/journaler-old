import { HoverEffect } from "@/components/ui/card-hover-effect";
import { db } from "@/db";

async function getCategories() {
  const result = await db.query.categories.findMany({});
  return result;
}

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="mb-16 relative max-w-4xl mx-auto mt-4 px-2 md:px-0">
        <h3 className="text-xl text-center font-semibold w-full">
          All Categories
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
