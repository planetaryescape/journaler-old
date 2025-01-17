"use client";

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
import { insertNewsletterSubscriberSchema } from "@/lib/zod-schemas/newsletter-subscriber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const NewsletterSubscriptionForm = ({
  onSubmit,
}: {
  onSubmit: (
    values: z.infer<typeof insertNewsletterSubscriberSchema>,
  ) => Promise<void>;
}) => {
  const form = useForm<z.infer<typeof insertNewsletterSubscriberSchema>>({
    resolver: zodResolver(insertNewsletterSubscriberSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        id="newsletter-subscription"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="dark:text-warm-sand text-muted-foreground"
                  placeholder="Your name"
                  {...field}
                  value={field.value as string | undefined}
                />
              </FormControl>
              <FormDescription className="dark:text-warm-sand text-muted-foreground">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="dark:text-warm-sand text-muted-foreground"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormDescription className="dark:text-warm-sand text-muted-foreground">
                Your email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
