import { Category, User } from "@/db/schema";
import { Prompt } from "@/db/schema/prompts";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { VotingComponent } from "./voting-component";

export const PromptCard = ({
  prompt: item,
}: {
  prompt: Prompt & {
    promptCategory: { category: Category }[];
    user: User;
    votes: number;
  };
}) => {
  return (
    <div
      className={cn(
        "flex justify-between items-start gap-2 rounded-lg border p-4 px-8 text-left text-sm transition-all hover:bg-accent"
      )}
    >
      <Link href={`/prompts/${item.id}`}>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-muted-foreground font-semibold">
                {item.title}
              </h3>
              {!item.id && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
          <h6 className="text-xs flex gap-2 font-medium text-muted-foreground">
            <span>@{item.user.username}</span>
            <span>·</span>
            <div className={cn("")}>
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </div>
          </h6>
        </div>
        <p className="text-xl">{item.content}</p>
        {item.promptCategory.length ? (
          <div className="flex items-center gap-2">
            {item.promptCategory.map(({ category: { name } }) => (
              <Badge key={name} variant="secondary">
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
      />
    </div>
  );
};