import { CategoryPromptsTabs } from "@/components/category-prompts-tabs";
import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { db } from "@/db";
import { categories } from "@/db/schema/categories";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function SingleCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return null;
  }

  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
  });

  if (!category) return null;

  const { userId } = auth();
  return (
    <div className="pt-4">
      <CategoryPromptsTabs category={category} />
      {!userId && (
        <>
          <CtaWithFeatures />
          <ContactSection />
        </>
      )}
    </div>
  );
}
