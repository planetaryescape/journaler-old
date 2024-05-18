import { LinkButton } from "@/components/ui/link-button";
import { UserPrompts } from "@/components/user-prompts";
import { Link } from "next-view-transitions";

const PromptsPage = () => {
  return (
    <div className="mb-16 pt-4 relative max-w-4xl mx-auto px-4 md:px-8">
      <div className="mb-4">
        <div>
          <h3 className="text-3xl font-semibold mx-auto mb-4 w-full">
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
        <Link className="text-accent" href="/community-rules">
          Read the Community Guidelines
        </Link>{" "}
        to understand what prompts can be created.
      </p>
    </div>
  );
};

export default PromptsPage;