"use client";

import { Category, Interaction, User } from "@/db/schema";
import { Prompt } from "@/db/schema/prompts";
import { generateRequestId } from "@/lib/utils/generateRequestId";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import BounceLoader from "./bounce-loader";
import { PromptCard } from "./prompt-card";

export const Prompts = ({
  title,
  limit,
  earliest,
  sortBy = { value: "votes", order: "desc" },
}: {
  title?: string;
  limit?: number;
  earliest?: Date;
  sortBy?: { value: "votes" | "createdAt"; order: "desc" | "asc" };
}) => {
  const { data: rawPrompts, isLoading } = useQuery<{
    result: (Prompt & {
      promptCategory: { category: Category }[];
      user: User;
      interactions: Interaction[];
    })[];
  }>({
    queryKey: ["prompts", earliest],
    queryFn: async () => {
      const res = await fetch(
        `/api/prompts${earliest ? `?earliest=${earliest.toISOString()}` : ""}`,
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

  const memoizedPrompts = useMemo(() => {
    let prompts =
      rawPrompts?.result
        .map((item) => ({
          ...item,
          votes: item.interactions.filter(
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

  return (
    <div className="mb-16 relative max-w-4xl mx-auto pt-4 md:px-8">
      {title && (
        <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
          {title}
        </h3>
      )}
      <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
        {!isLoading && memoizedPrompts.length === 0 && (
          <p className="text-center text-sm text-muted-foreground dark:text-warm-sand ">
            No prompts found
          </p>
        )}
        {isLoading && <BounceLoader className="size-full" />}
        {memoizedPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};
