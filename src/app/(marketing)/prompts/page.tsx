import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Prompts } from "@/components/prompts";
import { auth } from "@clerk/nextjs/server";

const PromptsPage = () => {
  const { userId } = auth();
  return (
    <div>
      <Prompts title="All Prompts" />
      {!userId && (
        <>
          <CtaWithFeatures />
          <ContactSection />
        </>
      )}
    </div>
  );
};

export default PromptsPage;
