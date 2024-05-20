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
import { LinkButton } from "@/components/ui/link-button";
import { Textarea } from "@/components/ui/textarea";
import { createNewCategory } from "@/lib/actions/createNewCategory";
import { insertCategoriesSchema } from "@/lib/zod-schemas/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function NewCategoryPage() {
  const form = useForm<z.infer<typeof insertCategoriesSchema>>({
    resolver: zodResolver(insertCategoriesSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof insertCategoriesSchema>) {
    const result = await createNewCategory(values);

    if ("error" in result) {
      toast.error("Failed to create a new category.", {
        position: "top-center",
        description: `Something went wrong, please try again: ${result.error}`,
      });
    } else {
      toast.success("Category created!", {
        position: "top-center",
        duration: 10000,
        description: `Thank you for your contribution to the Journaler community!`,
      });
      form.reset();
      router.push(`/account/categories/${result.data?.id}`);
    }
  }

  return (
    <div className="mb-16 relative max-w-4xl mx-auto px-4 md:px-8">
      <h3 className="text-xl font-semibold mx-auto mb-4 w-full text-center">
        Create a new category
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 max-w-5xl mx-auto w-full dark:text-warm-sand text-muted-foreground"
          id="new-category"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My new category"
                    {...field}
                    value={field.value as string | undefined}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Give your category a short descriptive name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    {...field}
                    value={field.value as string | undefined}
                  />
                </FormControl>
                <FormDescription className="dark:text-warm-sand text-muted-foreground">
                  Tell us more about your new category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 w-full">
            <LinkButton href="/account/profile" variant="secondary">
              Cancel
            </LinkButton>
            <Button form="new-category" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
