import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <CtaWithFeatures />
      <ContactSection />
    </div>
  );
};

export default HomePage;
