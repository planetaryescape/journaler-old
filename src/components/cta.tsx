import { LinkButton } from "./ui/link-button";

export const CTA = () => {
  return (
    <section className="relative overflow-hidden py-28 px-4 bg-gray-900 md:px-8">
      <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-12 -right-14 blur-2xl opacity-10"></div>
      <div className="max-w-xl mx-auto text-center relative">
        <div className="py-4">
          <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
            Unlock Your Full Journaling Potential
          </h3>
          <p className="text-gray-300 leading-relaxed mt-3">
            Join Journaler to create custom lists, save your favorite prompts,
            and engage with a community of reflective writers. Sign up now to
            start your mindful journaling journey!
          </p>
        </div>
        <div className="mt-5 items-center justify-center gap-3 sm:flex">
          <LinkButton href="#" variant="secondary">
            Try It Out
          </LinkButton>
          <LinkButton variant="default" href="#">
            Get Started
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
