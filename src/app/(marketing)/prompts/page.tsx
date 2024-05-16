import { ContactSection } from "@/components/contact-section";
import { CtaWithFeatures } from "@/components/cta-with-features";
import { Prompts } from "@/components/prompts";
import { auth } from "@clerk/nextjs/server";

const PromptsPage = () => {
  const { userId } = auth();
  return (
    <div className="pt-4">
      <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
        All Prompts
      </h3>
      <Prompts />
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
