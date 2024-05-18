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
      <HoverEffect
        items={categories.map((category) => ({
          name: category.name,
          description: category.description ?? "",
          link: `/account/categories/${category.id}`,
        }))}
      />
    </div>
  );
}
