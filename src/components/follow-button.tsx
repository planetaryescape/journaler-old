"use client";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { follow } from "@/lib/actions/follow";
import { unfollow } from "@/lib/actions/unfollow";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
              This action is only available to signed in users. Click the button
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

export const FollowButton = ({
  followerId,
  followedId,
  className,
  alreadyFollowing,
}: {
  followerId: number;
  followedId: number;
  alreadyFollowing: boolean;
  className?: string;
}) => {
  const { userId: authUserId } = useAuth();
  const queryClient = useQueryClient();

  return (
    <div className={cn("flex ml-auto items-center gap-2", className)}>
      {!authUserId ? (
        <UnauthenticatedButton
          variant={alreadyFollowing ? "default" : "secondary"}
          aria-disabled={alreadyFollowing}
          href="/sign-up"
          size="sm"
          className="font-medium lowercase"
        >
          Follow
        </UnauthenticatedButton>
      ) : (
        <>
          {alreadyFollowing ? (
            <Button
              aria-disabled={!authUserId}
              disabled={!authUserId}
              onClick={async () => {
                const result = await unfollow({
                  followedId,
                  followerId,
                });
                if ("error" in result) {
                  toast.error("Failed to unfollow", {
                    position: "top-center",
                    description: `Something went wrong, please try again: ${result.error}`,
                  });
                }

                queryClient.invalidateQueries({ queryKey: ["user"] });
              }}
              variant="destructive"
              className="font-medium lowercase"
              size="sm"
            >
              Unfollow
            </Button>
          ) : (
            <Button
              aria-disabled={!authUserId}
              disabled={!authUserId}
              onClick={async () => {
                const result = await follow({
                  followedId,
                  followerId,
                });
                if ("error" in result) {
                  toast.error("Failed to follow", {
                    position: "top-center",
                    description: `Something went wrong, please try again: ${result.error}`,
                  });
                }

                queryClient.invalidateQueries({ queryKey: ["user"] });
              }}
              variant={alreadyFollowing ? "default" : "secondary"}
              className="font-medium lowercase"
              size="sm"
            >
              Follow
            </Button>
          )}
        </>
      )}
    </div>
  );
};
