"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-accent group-[.toaster]:text-foreground dark:group-[.toaster]:text-background group-[.toaster]:border-card group-[.toaster]:shadow-lg",
          description:
            "group-[.toast]:text-muted-foreground dark:group-[.toast]:text-background",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground dark:group-[.toast]:text-warm-sand",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
