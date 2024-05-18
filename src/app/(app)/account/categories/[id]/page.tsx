import { CategoryPromptsTabs } from "@/components/category-prompts-tabs";
import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
      <section className="pt-0 md:pt-16 max-w-7xl mx-auto px-4 md:px-8 flex flex-col">
        <Breadcrumb className="mb-4 text-muted-foreground dark:text-warm-sand/80">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="dark:text-warm-sand/80 text-muted-foreground"
                href="/categories"
              >
                All categories
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="dark:text-warm-sand/80 text-muted-foreground" />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate w-36 md:w-auto">
                {category.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
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
