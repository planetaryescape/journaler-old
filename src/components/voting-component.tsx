"use client";
import { vote } from "@/lib/actions/vote";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { ChevronUpIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useQueryClient } from "@tanstack/react-query";
import { LinkButton, LinkButtonProps } from "./ui/link-button";

export function UnauthenticatedButton({ children, ...props }: LinkButtonProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <LinkButton {...props}>{children}</LinkButton>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={"/logo-small-light.png"} />
            <AvatarFallback>J.</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Journaler</h4>
            <p className="text-sm">
              This action is only available to signed in user. Click the button
              below to sign up and join the community of thoughtful journalers.
            </p>
            <div className="flex items-center pt-2">
              <LinkButton href="/sign-up">Sign Up</LinkButton>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export const VotingComponent = ({
  userId,
  promptId,
  votes,
  className,
  isVoted,
}: {
  userId: number;
  promptId: number;
  votes: number;
  isVoted: boolean;
  className?: string;
}) => {
  const { userId: authUserId } = useAuth();
  const queryClient = useQueryClient();

  return (
    <div className={cn("flex ml-auto items-center gap-2", className)}>
      {!authUserId ? (
        <UnauthenticatedButton
          variant={isVoted ? "default" : "secondary"}
          aria-disabled={isVoted}
          href="/sign-up"
          size="sm"
          className="font-medium lowercase"
        >
          <ChevronUpIcon className="h-5 w-5" />
          <p className="text-xl whitespace-nowrap">{votes}</p>
        </UnauthenticatedButton>
      ) : (
        <Button
          aria-disabled={!authUserId || isVoted}
          disabled={!authUserId || isVoted}
          onClick={async () => {
            await vote({ promptId, userId, type: "upvote" });
            queryClient.invalidateQueries({ queryKey: ["prompts"] });
            queryClient.invalidateQueries({ queryKey: ["category-prompts"] });
          }}
          variant={isVoted ? "default" : "secondary"}
          className="font-medium lowercase"
          size="sm"
        >
          <ChevronUpIcon className="h-5 w-5" />
          <p className="text-xl whitespace-nowrap">{votes}</p>
        </Button>
      )}
    </div>
  );
};
