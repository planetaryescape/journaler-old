"use client";

import { LinkButton } from "./ui/link-button";

export const Hero = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-28 md:px-8 hero bg-cover bg-center text-white flex items-center justify-center">
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
        <div className="space-x-4">
          <LinkButton href="/sign-up" className="animate-buttonheartbeat">
            Start Contributing
          </LinkButton>
          <LinkButton href="/prompts" variant="secondary">
            Explore Top Prompts
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
