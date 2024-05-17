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
        title="10 Latest Prompts this Week"
        limit={10}
        earliest={startOfWeek(new Date())}
        sortBy={{ value: "createdAt", order: "desc" }}
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
