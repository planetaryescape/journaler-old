"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewsletterSubscriber } from "@/lib/actions/createNewsletterSubscriber";
import { insertNewsletterSubscriberSchema } from "@/lib/zod-schemas/newsletter-subscriber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";

export const FooterNewsletterForm = ({}: {}) => {
  const form = useForm<z.infer<typeof insertNewsletterSubscriberSchema>>({
    resolver: zodResolver(insertNewsletterSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof insertNewsletterSubscriberSchema>,
  ) {
    const result = await createNewsletterSubscriber(values);
    if (result.error) {
      toast.error("Failed to subscribe.", {
        position: "bottom-center",
        description: `Something went wrong, please try again: ${result.error}`,
      });
    } else {
      toast.success("Subscribed!", {
        position: "bottom-center",
        duration: 10000,
        description: `Successfully subscribed to Journaler. We have sent you a confirmation email, please check your inbox.`,
      });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        id="footer-newsletter-subscription"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="max-w-sm flex gap-2 m-0 items-start border rounded-md p-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="dark:text-warm-sand text-muted-foreground w-full p-2.5 outline-none"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button form="footer-newsletter-subscription" type="submit">
            Subscribe
          </Button>
        </div>
      </form>
    </Form>
  );
};
