"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { LinkButton } from "./ui/link-button";

export const Brand = () => {
  const { theme } = useTheme();
  const [hasTheme, setHasTheme] = useState(false);
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  useEffect(() => {
    if (theme) {
      setHasTheme(true);
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-between md:block">
      <Link href="/">
        <Image
          src={
            hasTheme
              ? theme === "dark"
                ? "/logo-dark.png"
                : "/logo-light.png"
              : "/logo-dark.png"
          }
          width={240}
          height={100}
          alt="Journaler logo"
        />
      </Link>
      <div className="md:hidden flex gap-4 items-center">
        {!user && (
          <>
            <LinkButton size="sm" variant="ghost" href="/sign-in">
              Sign In
            </LinkButton>
            <LinkButton size="sm" href="/sign-up">
              Sign Up
            </LinkButton>
          </>
        )}
        {user && (
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </div>
        )}
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};
