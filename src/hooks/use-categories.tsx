"use client";

import { Category } from "@/db/schema";
import { EntityList, ErrorEntity } from "@/lib/utils/formatEntity";
import { generateRequestId } from "@/lib/utils/generateRequestId";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export default function useCategories(): Omit<
  UseQueryResult<EntityList<Category>, ErrorEntity>,
  "data"
> & {
  categories?: EntityList<Category>;
} {
  const { data: categories, ...rest } = useQuery<
    unknown,
    ErrorEntity,
    EntityList<Category>
  >({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories", {
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
    categories,
    ...rest,
  };
}
