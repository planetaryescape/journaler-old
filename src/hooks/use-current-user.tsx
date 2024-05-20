"use client";

import { PromptWithRelations, WithVotes } from "@/app/api/prompts/route";
import { User } from "@/db/schema";
import { Entity, ErrorEntity } from "@/lib/utils/formatEntity";
import { generateRequestId } from "@/lib/utils/generateRequestId";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export type PromptWithVotes = WithVotes<PromptWithRelations>;

export const useCurrentUser = (): Omit<
  UseQueryResult<Entity<User>, ErrorEntity>,
  "data"
> & {
  user?: Entity<User>;
} => {
  const { data: user, ...rest } = useQuery<unknown, ErrorEntity, Entity<User>>({
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

  return {
    user,
    ...rest,
  };
};
