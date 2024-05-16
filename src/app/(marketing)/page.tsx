import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Hero } from "@/components/hero";
import { Prompts } from "@/components/prompts";
import { auth } from "@clerk/nextjs/server";

const HomePage = () => {
  const { userId } = auth();
  return (
    <div>
      {!userId && <Hero />}
      <Prompts title="All Time Top Prompts" limit={10} />
      {!userId && <CtaWithFeatures />}
      <ContactSection />
    </div>
  );
};

export default HomePage;
