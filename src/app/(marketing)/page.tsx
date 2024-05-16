import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Hero } from "@/components/hero";
import { Prompts } from "@/components/prompts";
import { currentUser } from "@clerk/nextjs/server";
import * as Sentry from "@sentry/nextjs";

const HomePage = async () => {
  const user = await currentUser();
  Sentry.setUser({
    fullName: user?.fullName ?? "Anonymous",
    email: user?.emailAddresses[0].emailAddress,
  });

  return (
    <div>
      {!user?.id && <Hero />}
      <Prompts title="All Time Top Prompts" limit={10} />
      {!user?.id && <CtaWithFeatures />}
      <ContactSection />
    </div>
  );
};

export default HomePage;
