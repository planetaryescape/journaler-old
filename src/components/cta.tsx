import { LinkButton } from "./ui/link-button";

export const CTA = () => {
  return (
    <section className="relative overflow-hidden py-28 px-4 bg-gray-900 md:px-8">
      <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-12 -right-14 blur-2xl opacity-10"></div>
      <div className="max-w-xl mx-auto text-center relative">
        <div className="py-4">
          <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
            Get Unlimited Access To All Templates
          </h3>
          <p className="text-gray-300 leading-relaxed mt-3">
            Nam erat risus, sodales sit amet lobortis ut, finibus eget metus.
            Cras aliquam ante ut tortor posuere feugiat. Duis sodales nisi id
            porta lacinia.
          </p>
        </div>
        <div className="mt-5 items-center justify-center gap-3 sm:flex">
          <LinkButton href="javascript:void()" variant="secondary">
            Try It Out
          </LinkButton>
          <LinkButton variant="default" href="javascript:void()">
            Get Started
          </LinkButton>
        </div>
      </div>
    </section>
  );
};
