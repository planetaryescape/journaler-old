import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Prompts } from "@/components/prompts";
import { auth } from "@clerk/nextjs/server";
import { startOfWeek } from "date-fns";

const PromptsPage = () => {
  const { userId } = auth();
  return (
    <div className="pt-4">
      <Prompts title="This week" earliest={startOfWeek(new Date())} />
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
