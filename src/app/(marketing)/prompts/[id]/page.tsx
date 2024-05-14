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
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import { eq } from "drizzle-orm";
import Link from "next/link";

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

  const { userId } = auth();
  if (!prompt) {
    return <BounceLoader className="size-full" />;
  }

  const votes =
    prompt.interactions.filter((interaction) => interaction.type === "upvote")
      .length -
    prompt.interactions.filter((interaction) => interaction.type === "downvote")
      .length;

  return (
    <>
      <div className="p-8 px-28">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/prompts">All Prompts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{prompt.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="py-28 pt-16 bg-gray-900">
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex w-full flex-col gap-1 md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl">{prompt.title}</h3>
                  {!prompt.id && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <VotingComponent
                  votes={votes}
                  promptId={prompt.id}
                  userId={prompt.user.id}
                />
              </div>
              <h6 className="flex gap-2 font-medium text-muted-foreground">
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
            <p className="text-xl m-8">{prompt.content}</p>
            {prompt.promptCategory.length ? (
              <div className="flex items-center gap-2 m-8 my-4">
                {prompt.promptCategory.map(({ category: { name } }) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className="absolute inset-0 max-w-md mx-auto h-80 blur-[118px] sm:h-72"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            }}
          ></div>
        </section>
      </div>
      {!userId && (
        <>
          <CtaWithFeatures />
          <ContactSection />
        </>
      )}
    </>
  );
};

export default SinglePromptPage;
