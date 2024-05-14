import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Hero } from "@/components/hero";
import { Prompts } from "@/components/prompts";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Prompts />
      <CtaWithFeatures />
      <ContactSection />
    </div>
  );
};

export default HomePage;
