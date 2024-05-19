"use client";

import { Category, Interaction, User } from "@/db/schema";
import { Prompt } from "@/db/schema/prompts";
import { cn } from "@/lib/utils";
import { generateRequestId } from "@/lib/utils/generateRequestId";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Link } from "next-view-transitions";
import { Badge } from "./ui/badge";
import { VotingComponent } from "./voting-component";

export const PromptCard = ({
  prompt: item,
}: {
  prompt: Prompt & {
    promptCategory: { category: Category }[];
    user: User;
    interactions: Interaction[];
    votes: number;
  };
}) => {
  const { data: user } = useQuery<{ result: User }>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users/current", {
        headers: {
          "Content-Type": "application/json",
          "request-id": generateRequestId(),
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const isVoted = Boolean(
    item.interactions.some(
      (interaction) => interaction.userId === user?.result.id,
    ),
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
