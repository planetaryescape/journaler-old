import BounceLoader from "@/components/bounce-loader";
import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { VotingComponent } from "@/components/voting-component";
import { db } from "@/db";
import { prompts } from "@/db/schema/prompts";
import { users } from "@/db/schema/users";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import { eq } from "drizzle-orm";
import Link from "next/link";

const getUser = async (authUserId: string | null) => {
  if (!authUserId) return null;
  const result = await db.query.users.findFirst({
    where: eq(users.clerkUserId, authUserId),
  });
  return result;
};

const getPrompt = async (id: number) => {
  const result = await db.query.prompts.findFirst({
    where: eq(prompts.id, id),
    with: {
      user: true,
      interactions: true,
      promptCategory: {
        with: {
          category: true,
        },
      },
    },
  });
  return result;
};

const SinglePromptPage = async ({ params }: { params: { id: number } }) => {
  const prompt = await getPrompt(params.id);
  const { userId: authUserId } = auth();
  const user = await getUser(authUserId);

  if (!prompt) {
    return <BounceLoader className="size-full" />;
  }

  const votes = prompt.interactions.filter(
    (interaction) => interaction.type === "upvote"
  ).length;

  const upvotes = prompt.interactions.filter((i) => i.type === "upvote");

  console.log("upvotes:", upvotes);

  const isVoted = Boolean(
    upvotes.some((interaction) => interaction.userId === user?.id)
  );

  console.log("isVoted:", isVoted);

  return (
    <>
      <section className="py-28 pt-0 md:pt-16 max-w-7xl mx-auto px-4 md:px-8 flex flex-col">
        <Breadcrumb className="mb-4 text-muted-foreground dark:text-warm-sand/80">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="dark:text-warm-sand/80 text-muted-foreground"
                href="/prompts"
              >
                All Prompts
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="dark:text-warm-sand/80 text-muted-foreground" />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate w-36 md:w-auto">
                {prompt.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl">{prompt.title}</h3>
              {!prompt.id && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
              <h6 className="flex gap-2 font-medium text-muted-foreground dark:text-warm-sand/80">
                <Link href={`/users/${prompt.user.id}`}>
                  <span>@{prompt.user.username}</span>
                </Link>
                <span>·</span>
                <div className={cn("")}>
                  {formatDistanceToNow(new Date(prompt.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </h6>
            </div>
          </div>
        </div>
        <p className="text-xl my-8">{prompt.content}</p>
        {prompt.promptCategory.length ? (
          <div className="flex items-center gap-2 my-4">
            {prompt.promptCategory.map(({ category: { name } }) => (
              <Link key={name} href={`/categories/${name}`}>
                <Badge variant="secondary">{name}</Badge>
              </Link>
            ))}
          </div>
        ) : null}

        <VotingComponent
          votes={votes}
          promptId={prompt.id}
          userId={user?.id ?? 0}
          isVoted={isVoted}
        />
      </section>
      {!authUserId && (
        <>
          <CtaWithFeatures />
          <ContactSection />
        </>
      )}
    </>
  );
};

export default SinglePromptPage;
