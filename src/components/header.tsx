"use client";

import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Brand } from "./brand";
import { NavigationMenuComponent } from "./navigation-menu-component";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  const [state, setState] = useState(false);
  const { user } = useUser();

  return (
    <header className="">
      <div className={cn(`md:hidden`, state ? "mx-2 pb-5" : "hidden")}>
        <Brand state={state} setState={setState} />
      </div>
      <nav
        className={cn(
          `pb-5 md:text-sm`,
          state
            ? "absolute z-20 top-0 inset-x-0 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative bg-card md:bg-transparent"
            : "",
        )}
      >
        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
          <Brand state={state} setState={setState} />
          <div
            className={cn(
              `flex-1 items-center mt-8 md:mt-0 md:flex`,
              state ? "block" : "hidden",
            )}
          >
            <ul className="flex-1 justify-end md:items-center flex md:flex-row flex-col gap-4">
              <NavigationMenuComponent />
              {user ? (
                <>
                  <li>
                    <UserButton />
                  </li>
                  <li>
                    <ThemeToggle />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <LinkButton size="sm" variant="ghost" href="/sign-in">
                      Sign In
                    </LinkButton>
                  </li>
                  <li>
                    <LinkButton size="sm" href="/sign-up">
                      Sign Up
                    </LinkButton>
                  </li>
                  <li>
                    <ThemeToggle />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
