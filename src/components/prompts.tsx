"use client";

import { usePrompts } from "@/hooks/use-prompts";
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
  const { prompts, isLoading } = usePrompts({
    limit,
    earliest,
    sortBy,
  });

  return (
    <div className="mb-16 relative max-w-4xl mx-auto pt-4 md:px-8">
      {title && (
        <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
          {title}
        </h3>
      )}
      <div className="flex flex-col md:gap-2 md:p-4 border-t md:border-none border-card pt-0">
        {!isLoading && prompts?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground dark:text-warm-sand ">
            No prompts found
          </p>
        )}
        {isLoading && <BounceLoader className="size-full" />}
        {prompts?.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};
