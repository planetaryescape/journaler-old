import { LinkButton } from "@/components/ui/link-button";
import { UserPrompts } from "@/components/user-prompts";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { logger } from "@/lib/logger";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Link } from "next-view-transitions";

export default async function ProfilePage() {
  const { userId } = auth();
  const context = {
    tracePath: "profilePage",
    userId,
  };

  if (!userId) {
    logger.error(context, "Unauthenticated");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkUserId, userId as string),
  });

  return (
    <div className="mb-16 pt-4 relative max-w-4xl mx-auto px-4 md:px-8">
      <div className="mb-4">
        <div>
          <h3 className="font-bold text-xl">
            {`${user?.firstname} ${user?.lastname}`}
          </h3>
          <span>@user-{user?.id}</span>
          <p className="mb-4">
            You can create a new prompt or edit an existing one
          </p>
        </div>
        <div className="flex gap-2 mb-4">
          <LinkButton href="/account/prompts/new">New Prompt</LinkButton>
          <LinkButton href="/account/categories/new">New Category</LinkButton>
        </div>
      </div>
      <UserPrompts userId={user?.id ?? 0} />
      <p>
        <Link className="text-accent" href="/community-rules">
          Read the Community Guidelines
        </Link>{" "}
        to understand what prompts can be created.
      </p>
    </div>
  );
}
