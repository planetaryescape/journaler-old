import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Prompts } from "@/components/prompts";
import { auth } from "@clerk/nextjs/server";
import { startOfWeek } from "date-fns";

const PromptsPage = () => {
  const { userId } = auth();
  return (
    <div className="pt-4">
      <Prompts
        title="Trending this week"
        limit={10}
        earliest={startOfWeek(new Date())}
      />
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
