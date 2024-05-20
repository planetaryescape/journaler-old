"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createNewsletterSubscriber } from "@/lib/actions/createNewsletterSubscriber";
import { cn } from "@/lib/utils";
import { insertNewsletterSubscriberSchema } from "@/lib/zod-schemas/newsletter-subscriber";
import { useUser } from "@clerk/nextjs";
import {
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { NewsletterSubscriptionForm } from "./newsletter-subscription-form";
import { Button } from "./ui/button";

export const MobileHeader = ({ className }: { className?: string }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  async function onSubmit(
    values: z.infer<typeof insertNewsletterSubscriberSchema>,
  ) {
    const result = await createNewsletterSubscriber(values);
    if ("error" in result) {
      toast.error("Failed to subscribe.", {
        position: "top-center",
        description: `Something went wrong, please try again: ${result.error}`,
      });
    } else {
      toast.success("Subscribed!", {
        position: "top-center",
        duration: 10000,
        description: `Successfully subscribed to Journaler. We have sent you a confirmation email, please check your inbox.`,
      });
      setOpen(false);
    }
  }

  return (
    <header
      className={cn(
        "fixed bottom-0 border-card border-t left-0 right-0 md:hidden bg-background/70 z-10 w-screen",
        className,
      )}
    >
      <div className="grid grid-cols-3 w-full">
        <Link
          className="flex flex-col border-card border-r py-4 items-center gap-2 col-span-1"
          href="/"
        >
          <HomeIcon className="size-5" />
          Home
        </Link>
        <Link
          className="flex flex-col border-card py-4 items-center gap-2 col-span-1"
          href="/prompts"
        >
          <ChatBubbleIcon className="size-5" />
          Prompts
        </Link>
        {user ? (
          <Link
            className="flex flex-col border-card border-l py-4 items-center gap-2 col-span-1"
            href="/account/prompts"
          >
            <PersonIcon className="size-5" />
            Profile
          </Link>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="flex flex-col border-card border-l py-4 items-center gap-2 col-span-1">
                <EnvelopeClosedIcon className="size-5" />
                Subscribe
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Subscribe to the Journaler Newsletter</DialogTitle>
                <DialogDescription className="dark:text-warm-sand text-muted-foreground">
                  Get weekly email with best new journal prompts
                </DialogDescription>
              </DialogHeader>
              <NewsletterSubscriptionForm onSubmit={onSubmit} />
              <DialogFooter className="flex gap-4 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
                <Button form="newsletter-subscription" type="submit">
                  Subscribe
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
};
