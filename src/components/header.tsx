"use client";

import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useRef, useState } from "react";
import { BackgroundGradient } from "./background-gradient";
import { Brand } from "./brand";
import { NavigationMenuComponent } from "./navigation-menu-component";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  const [state, setState] = useState(false);
  const { user } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <header className="row-span-1 sticky top-0 bg-background z-50">
      <div className={cn(`md:hidden`, state ? "mx-2 pb-5" : "hidden")}>
        <Brand />
      </div>
      <nav
        className={cn(
          `md:text-sm`,
          state
            ? "absolute z-20 top-0 inset-x-0 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative bg-card md:bg-transparent"
            : "",
        )}
      >
        <div className="items-center max-w-screen-xl mx-auto px-2 md:flex md:px-4">
          <Brand />
          <div
            className={cn(
              `flex-1 items-center mt-8 md:mt-0 md:flex`,
              state ? "block" : "hidden",
            )}
          >
            <ul className="flex-1 justify-end md:items-center flex flex-col md:flex-row gap-4">
              <NavigationMenuComponent />

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
              <div className="flex gap-4 justify-start items-center">
                {!user && (
                  <>
                    <li>
                      <LinkButton size="sm" variant="ghost" href="/sign-in">
                        Sign In
                      </LinkButton>
                    </li>
                    {/* {pathname !== "/" && (
                      <li>
                        <LinkButton size="sm" href="/sign-up">
                          Sign Up
                        </LinkButton>
                      </li>
                    )} */}
                  </>
                )}
                <ThemeToggle />
                <UserButton />
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <BackgroundGradient degrees={Math.random() * 360} />
    </header>
  );
};
