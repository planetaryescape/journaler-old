import { ContactSection } from "@/components/contact-section";
import { CTA } from "@/components/cta";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <ContactSection />
      <CTA />
    </div>
  );
};

export default HomePage;
