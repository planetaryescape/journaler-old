"use client";

import CategoriesSelect from "@/components/categories-select";
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
import { LinkButton } from "@/components/ui/link-button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createNewPrompt } from "@/lib/actions/createNewPrompt";
import { insertPromptSchema } from "@/lib/zod-schemas/prompts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function NewPromptPage() {
  const { user } = useCurrentUser();

  const form = useForm<
    z.infer<typeof insertPromptSchema> & { categoryId: number }
  >({
    resolver: zodResolver(
      insertPromptSchema.extend({ categoryId: z.number() }),
    ),
    defaultValues: {
      title: "",
      content: "",
      userId: user?.id ?? 0,
      categoryId: 0,
    },
  });

  const router = useRouter();

  async function onSubmit(
    values: z.infer<typeof insertPromptSchema> & { categoryId: number },
  ) {
    const result = await createNewPrompt({
      ...values,
      userId: user?.id ?? 0,
    });

    if ("error" in result) {
      toast.error("Failed to create a new prompt.", {
        position: "top-center",
        description: `Something went wrong, please try again: ${result.error}`,
      });
    } else {
      toast.success("Prompt created!", {
        position: "top-center",
        duration: 10000,
        description: `Thank you for your contribution to the Journaler community! Your prompt has been created.`,
      });
      router.push(`/account/prompts/${result.data.id}`);
      form.reset();
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
                  <CategoriesSelect
                    {...field}
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Select a category for your prompt
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 w-full">
            <LinkButton href="/account/profile" variant="secondary">
              Cancel
            </LinkButton>
            <Button form="new-prompt" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
