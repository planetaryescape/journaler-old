import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { PromptsTabs } from "@/components/prompts-tabs";
import { auth } from "@clerk/nextjs/server";

const PromptsPage = () => {
  const { userId } = auth();
  return (
    <div className="pt-4">
      <PromptsTabs />
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
