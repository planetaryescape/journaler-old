import { db } from "@/db";
import { Category, Interaction, User, users } from "@/db/schema";
import { Prompt } from "@/db/schema/prompts";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import { eq } from "drizzle-orm";
import { Link } from "next-view-transitions";
import { Badge } from "./ui/badge";
import { VotingComponent } from "./voting-component";

const getUser = async (authUserId: string | null) => {
  if (!authUserId) return null;
  const result = await db.query.users.findFirst({
    where: eq(users.clerkUserId, authUserId),
  });
  return result;
};

export const PromptCard = async ({
  prompt: item,
}: {
  prompt: Prompt & {
    promptCategory: { category: Category }[];
    user: User;
    interactions: Interaction[];
    votes: number;
  };
}) => {
  const { userId: authUserId } = auth();
  const user = await getUser(authUserId);
  const isVoted = Boolean(
    item.interactions.some((interaction) => interaction.userId === user?.id),
  );

  return (
    <div
      className={cn(
        "flex flex-col justify-between items-start gap-2 md:rounded-lg border-b md:border p-4 md:px-8 text-left text-sm transition-all hover:bg-card/20 dark:hover:bg-card/50 border-card duration-200",
      )}
    >
      <Link href={`/prompts/${item.id}`}>
        <div className="flex w-full flex-col gap-1 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="dark:text-warm-sand text-muted-foreground font-bold">
                {item.title}
              </h3>
              {!item.id && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
          <h6 className="text-xs flex gap-2 font-medium text-muted-foreground dark:text-warm-sand/80">
            <span>@{item.user.username}</span>
            <span>·</span>
            <div className={cn("")}>
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </div>
          </h6>
        </div>
        <p className="text-lg my-2">{item.content}</p>
        {item.promptCategory.length ? (
          <div className="flex items-center gap-2 mt-4">
            {item.promptCategory.map(({ category: { name } }) => (
              <Badge key={name} variant="outline">
                {name}
              </Badge>
            ))}
          </div>
        ) : null}
      </Link>

      <VotingComponent
        userId={item.userId}
        promptId={item.id}
        votes={item.votes}
        isVoted={isVoted}
      />
    </div>
  );
};
