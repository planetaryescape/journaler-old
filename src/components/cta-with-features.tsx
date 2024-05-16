import { features } from "@/lib/config/features";
import { BackgroundGradient } from "./background-gradient";
import { LinkButton } from "./ui/link-button";

export const CtaWithFeatures = () => {
  return (
    <section className="relative md:py-28 mb-16 max-w-screen-xl mx-auto px-4 justify-between gap-24 lg:flex md:px-8">
      <div className="max-w-xl mx-auto text-center md:text-left">
        <h3 className="text-3xl font-semibold sm:text-4xl">
          Like Journaler so far? Sign up and unlock Your Full Journaling
          Potential
        </h3>
        <p className="mt-3">
          Join Journaler to create custom lists, save your favorite prompts, and
          engage with a community of reflective writers. Sign up now to start
          your mindful journaling journey!
        </p>

        <div className="mt-5 items-center md:justify-start justify-center gap-3 flex sm:flex">
          <LinkButton href="/sign-up">Sign Up Now</LinkButton>
          <LinkButton variant="outline" href="/member-benefits">
            Learn More
          </LinkButton>
        </div>
      </div>
      <div className="mt-12 lg:mt-0">
        <ul className="grid gap-8 sm:grid-cols-2">
          {features.map((item, idx) => (
            <li key={idx} className="flex gap-x-4">
              <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="mt-3">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <BackgroundGradient degrees={Math.random() * 360} />
    </section>
  );
};
