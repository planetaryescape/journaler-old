import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Hero } from "@/components/hero";
import { Prompts } from "@/components/prompts";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Prompts title="All Time Top Prompts" limit={10} />
      <CtaWithFeatures />
      <ContactSection />
    </div>
  );
};

export default HomePage;
