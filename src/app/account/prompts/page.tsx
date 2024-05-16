import { LinkButton } from "@/components/ui/link-button";
import { UserPrompts } from "@/components/user-prompts";
import Link from "next/link";

const PromptsPage = () => {
  return (
    <div className="py-28 pt-0 md:pt-16 max-w-7xl mx-auto px-4 md:px-8 flex flex-col">
      <div>
        <div>
          <h3 className="text-3xl font-semibold mx-auto mb-4 w-full text-center">
            My Prompts
          </h3>
          <p className="mb-4">
            You can create a new prompt or edit an existing one
          </p>
        </div>
        <LinkButton href="/account/prompts/new">New Prompt</LinkButton>
      </div>
      <UserPrompts />
      <p>
        <Link href="/community-rules">Read the Community Guidelines</Link> to
        understand what prompts can be created.
      </p>
    </div>
  );
};

export default PromptsPage;
