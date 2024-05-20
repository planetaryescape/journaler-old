"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategories from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { SelectProps } from "@radix-ui/react-select";

export default function CategoriesSelect({
  classNames,
  ...props
}: SelectProps & { classNames?: string }) {
  const { categories } = useCategories();
  return (
    <Select {...props}>
      <SelectTrigger className={cn("w-[180px]", classNames)}>
        <SelectValue
          placeholder="Category"
          className="dark:text-warm-sand text-muted-foreground"
        />
      </SelectTrigger>
      <SelectContent>
        {categories?.data.map((category) => (
          <SelectItem
            key={category.data.id}
            value={category.data.id.toString()}
          >
            {category.data.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
