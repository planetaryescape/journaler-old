"use client";
import { vote } from "@/lib/actions/vote";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
            <AvatarImage src="/logo-small-dark.png" />
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
}: {
  userId: number;
  promptId: number;
  votes: number;
  className?: string;
}) => {
  const { userId: authUserId } = useAuth();

  return (
    <div className={cn("flex ml-auto items-center gap-2", className)}>
      {!authUserId ? (
        <UnauthenticatedButton variant="secondary" href="/sign-up" size="icon">
          <ChevronUpIcon className="h-5 w-5" />
        </UnauthenticatedButton>
      ) : (
        <Button
          disabled={!authUserId}
          onClick={async () => {
            await vote({ promptId, userId, type: "upvote" });
          }}
          variant="secondary"
          size="icon"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </Button>
      )}
      <p className="text-xl whitespace-nowrap">{votes} votes</p>
      {!authUserId ? (
        <UnauthenticatedButton variant="secondary" href="/sign-up" size="icon">
          <ChevronDownIcon className="h-5 w-5" />
        </UnauthenticatedButton>
      ) : (
        <Button
          disabled={!authUserId}
          onClick={async () => {
            await vote({ promptId, userId, type: "downvote" });
          }}
          variant="secondary"
          size="icon"
        >
          <ChevronDownIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};
