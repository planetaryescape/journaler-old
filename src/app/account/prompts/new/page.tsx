"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category, User } from "@/db/schema";
import { createNewPrompt } from "@/lib/actions/createNewPrompt";
import { insertPromptSchema } from "@/lib/zod-schemas/prompts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function NewPromptPage() {
  const { data: user } = useQuery<{ result: User }>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/users/current");
      const data = await res.json();
      return data;
    },
  });

  const { data: categories } = useQuery<{ result: Category[] }>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      return data;
    },
  });

  const form = useForm<
    z.infer<typeof insertPromptSchema> & { categoryId: number }
  >({
    resolver: zodResolver(
      insertPromptSchema.extend({ categoryId: z.number() }),
    ),
    defaultValues: {
      title: "",
      content: "",
      userId: user?.result?.id ?? 0,
      categoryId: categories?.result[0]?.id ?? 0,
    },
  });

  const router = useRouter();

  async function onSubmit(
    values: z.infer<typeof insertPromptSchema> & { categoryId: number },
  ) {
    const result = await createNewPrompt({
      ...values,
      userId: user?.result?.id ?? 0,
    });

    if (result.error) {
      toast.error("Failed to create a new prompt.", {
        position: "bottom-center",
        description: `Something went wrong, please try again: ${result.error}`,
      });
    } else {
      toast.success("Prompt created!", {
        position: "bottom-center",
        duration: 10000,
        description: `Thank you for your contribution to the Journaler community! Your prompt has been created.`,
      });
      form.reset();
      router.push(`/account/prompts/${result.result?.id}`);
    }
  }

  return (
    <div className="mb-16 relative max-w-4xl mx-auto px-4 md:px-8">
      <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
        Create a prompt
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-5xl mx-auto w-full dark:text-warm-sand text-muted-foreground"
          id="new-prompt"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My new prompt"
                    {...field}
                    value={field.value as string | undefined}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Give your prompt a short descriptive title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="What's on your mind?" {...field} />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Tell us your prompt
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder="Category"
                        className="dark:text-warm-sand text-muted-foreground"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.result?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Select a category for your prompt
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button form="new-prompt" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
