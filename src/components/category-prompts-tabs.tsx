"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/db/schema";
import { cn } from "@/lib/utils";
import { startOfDay, startOfWeek } from "date-fns";
import { useState } from "react";
import { Prompts } from "./prompts";

export function CategoryPromptsTabs({
  className,
  limit,
  category,
}: {
  className?: string;
  limit?: number;
  category: Category;
}) {
  const [sortBy, setSortBy] = useState<{
    value: "votes" | "createdAt";
    order: "desc" | "asc";
  }>({ value: "votes", order: "desc" });

  return (
    <div className={cn("max-w-4xl mt-4 mx-auto px-2 md:px-0", className)}>
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h3 className="text-xl font-semibold">{category.name}:</h3>
          <h3 className="text-xl font-semibold">
            {limit ? `Top ${limit} Prompts` : "All Prompts"}
          </h3>
        </div>
        <div className="flex gap-2">
          <Select
            value={sortBy.value}
            onValueChange={(value: "votes" | "createdAt") =>
              setSortBy((currentSortBy) => ({ ...currentSortBy, value }))
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="votes">Votes</SelectItem>
                <SelectItem value="createdAt">Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <RadioGroup
            value={sortBy.order}
            onValueChange={(value: "desc" | "asc") =>
              setSortBy((currentSortBy) => ({ ...currentSortBy, order: value }))
            }
            className="flex gap-2"
            defaultValue="desc"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="desc" id="r1" />
              <Label htmlFor="r1">Desc</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asc" id="r2" />
              <Label htmlFor="r2">Asc</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <Tabs defaultValue="today" className={cn("")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="this-week">This week</TabsTrigger>
          <TabsTrigger value="all-time">All time</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <Prompts
            categoryId={category.id}
            sortBy={sortBy}
            earliest={startOfDay(new Date())}
            limit={limit}
          />
        </TabsContent>
        <TabsContent value="this-week">
          <Prompts
            categoryId={category.id}
            sortBy={sortBy}
            earliest={startOfWeek(new Date())}
            limit={limit}
          />
        </TabsContent>
        <TabsContent value="all-time">
          <Prompts categoryId={category.id} sortBy={sortBy} limit={limit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
