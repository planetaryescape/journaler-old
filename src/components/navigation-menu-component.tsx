"use client";

import { Button } from "@/components/ui/button";
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
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { createNewsletterSubscriber } from "@/lib/actions/createNewsletterSubscriber";
import { cn } from "@/lib/utils";
import { insertNewsletterSubscriberSchema } from "@/lib/zod-schemas/newsletter-subscriber";
import { toast } from "sonner";
import { z } from "zod";
import { NewsletterSubscriptionForm } from "./newsletter-subscription-form";
import { LinkButton } from "./ui/link-button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All Prompts",
    href: "/prompts",
    description: "Explore all journal prompts available on Journaler.",
  },
  {
    title: "This Week's Top Prompts",
    href: "/prompts/this-week",
    description: "Check out the most popular prompts from this week.",
  },
  {
    title: "All Time Top Prompts",
    href: "/prompts/all-time",
    description: "Discover the highest-rated prompts of all time.",
  },
  {
    title: "Top Categories",
    href: "/categories",
    description: "Browse prompts by the most popular categories.",
  },
  {
    title: "This Week's Top Categories",
    href: "/categories/this-week",
    description: "Explore the top categories trending this week.",
  },
  {
    title: "All Time Top Categories",
    href: "/categories/all-time",
    description: "Find out which categories have the top prompts of all time.",
  },
  {
    title: "New Prompts",
    href: "/prompts/new",
    description: "Discover the latest prompts added by the community.",
  },
  {
    title: "Trending Prompts",
    href: "/prompts/trending",
    description: "See what's currently trending in the Journaler community.",
  },
  {
    title: "My Saved Prompts",
    href: "/account/prompts/saved",
    description: "Access the prompts you have saved to your custom lists.",
  },
  {
    title: "My Created Prompts",
    href: "/account/prompts",
    description: "Manage and review prompts you have created and shared.",
  },
];

export function NavigationMenuComponent() {
  const [open, setOpen] = React.useState(false);

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
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="whitespace-nowrap flex flex-col md:flex-row md:items-center items-start gap-4 md:gap-2">
          <NavigationMenuItem className="w-full">
            <NavigationMenuTrigger className="w-full">
              Browse Prompts
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full">
            <DialogTrigger asChild>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({
                  className: "cursor-pointer w-full",
                })}
              >
                Subscribe
              </NavigationMenuLink>
            </DialogTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full">
            <NavigationMenuLink>
              <LinkButton
                className="animate-buttonheartbeat w-full"
                href="/account/prompts"
                size="sm"
              >
                Submit your prompt
              </LinkButton>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to the Journaler Newsletter</DialogTitle>
          <DialogDescription className="dark:text-warm-sand text-muted-foreground">
            Get weekly email with best new journal prompts
          </DialogDescription>
        </DialogHeader>
        <NewsletterSubscriptionForm onSubmit={onSubmit} />
        <DialogFooter className="flex gap-2 justify-end">
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
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
