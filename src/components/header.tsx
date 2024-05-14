"use client";

import { LinkButton } from "@/components/ui/link-button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Brand } from "./brand";
import { NavigationMenuComponent } from "./navigation-menu-component";

export const Header = () => {
  const [state, setState] = useState(false);
  const { user } = useUser();

  return (
    <header className="bg-gray-900">
      <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
        <Brand state={state} setState={setState} />
      </div>
      <nav
        className={`pb-5 md:text-sm ${
          state
            ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"
            : ""
        }`}
      >
        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
          <Brand state={state} setState={setState} />
          <div
            className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
              state ? "block" : "hidden"
            } `}
          >
            <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <NavigationMenuComponent />
              {user ? (
                <UserButton />
              ) : (
                <>
                  <li>
                    <LinkButton size="sm" variant="secondary" href="/sign-in">
                      Sign In
                    </LinkButton>
                  </li>
                  <li>
                    <LinkButton size="sm" href="/sign-up">
                      Sign Up
                    </LinkButton>
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
