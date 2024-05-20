"use client";

import { PromptWithRelations, WithVotes } from "@/app/api/prompts/route";
import { EntityList, ErrorEntity } from "@/lib/utils/formatEntity";
import { generateRequestId } from "@/lib/utils/generateRequestId";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export const usePrompts = ({
  categoryId,
  limit,
  earliest,
  sortBy = { value: "votes", order: "desc" },
}: {
  categoryId?: number;
  title?: string;
  limit?: number;
  earliest?: Date;
  sortBy?: { value: "votes" | "createdAt"; order: "desc" | "asc" };
}): Omit<
  UseQueryResult<EntityList<PromptWithRelations>, ErrorEntity>,
  "data"
> & {
  prompts?: WithVotes<PromptWithRelations>[];
} => {
  const validCategoryId =
    typeof categoryId === "number" && categoryId > 0 ? categoryId : undefined;

  const { data: rawPrompts, ...rest } = useQuery<
    unknown,
    ErrorEntity,
    EntityList<PromptWithRelations>
  >({
    queryKey: ["category-prompts", earliest, categoryId],
    queryFn: async () => {
      const res = await fetch(
        `/api/prompts?${earliest ? `earliest=${earliest.toISOString()}` : ""}${validCategoryId ? `&categoryId=${validCategoryId}` : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            "request-id": generateRequestId(),
          },
        },
      );
      if (!res.ok) {
        toast.error("Failed to fetch prompts.", {
          position: "top-center",
          description: `Something went wrong, please try again: ${res.statusText}`,
        });
        return { result: [] };
      }
      const data = await res.json();
      return data;
    },
  });

  const memoizedPrompts: WithVotes<PromptWithRelations>[] = useMemo(() => {
    let prompts =
      rawPrompts?.data
        .map((item) => ({
          ...item.data,
          votes: item.data.interactions.filter(
            (interaction) => interaction.type === "upvote",
          ).length,
        }))
        .sort(
          (a, b) =>
            (sortBy.order === "desc" ? 1 : -1) *
            (Number(b[sortBy.value]) - Number(a[sortBy.value])),
        ) ?? [];

    if (limit) {
      prompts = prompts.slice(0, limit);
    }
    return prompts;
  }, [rawPrompts, limit, sortBy]);

  return {
    prompts: memoizedPrompts,
    ...rest,
  };
};
