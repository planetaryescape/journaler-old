"use client";

import { LinkButton } from "./ui/link-button";

export const Hero = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:py-28 mb-16 md:px-8 bg-cover bg-center flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Join Our Community of Thoughtful Journalers
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Enjoy exploring our top journal prompts? Sign up to contribute your
          own, upvote/downvote, follow fellow journalers, and create
          personalized lists. Dive deeper into your journaling journey with
          Journaler!
        </p>
        <div className="flex md:justify-center flex-col md:flex-row gap-4">
          <LinkButton href="/sign-up" className="animate-buttonheartbeat">
            Start Contributing
          </LinkButton>
          <LinkButton href="/prompts" variant="outline">
            Explore Top Prompts
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
