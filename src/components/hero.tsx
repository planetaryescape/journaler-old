"use client";

import { LinkButton } from "./ui/link-button";

export const Hero = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-28 md:px-8 hero bg-cover bg-center text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlock Your Creativity and Insight with Journaler
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Discover top journal prompts, share your own, and engage with a
          community of reflective writers. Start your mindful journaling journey
          today!
        </p>
        <div className="space-x-4">
          <LinkButton href="/sign-up">Get Started</LinkButton>
          <LinkButton href="/prompts" variant="secondary">
            Explore Top Prompts
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
