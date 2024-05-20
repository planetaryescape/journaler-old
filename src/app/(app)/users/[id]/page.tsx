import { FollowButton } from "@/components/follow-button";
import { UserPrompts } from "@/components/user-prompts";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) {
    return null;
  }

  const userWhoseProfileItIs = await db.query.users.findFirst({
    where: eq(users.id, parseInt(id)),
    with: {
      followers: true,
      following: true,
    },
  });

  const { userId: authedUserId } = auth();

  const userViewingTheProfile = await db.query.users.findFirst({
    where: eq(users.clerkUserId, authedUserId ?? ""),
  });

  const alreadyFollowing =
    userWhoseProfileItIs?.followers.some(
      (follower) => follower.followerId === userViewingTheProfile?.id,
    ) ?? false;

  return (
    <div className="mb-16 pt-4 relative max-w-4xl mx-auto px-4 md:px-8">
      <div className="mb-4">
        <div className="flex gap-2">
          <div>
            {userWhoseProfileItIs?.firstname ||
            userWhoseProfileItIs?.lastname ? (
              <h3 className="font-bold text-xl">
                {`${userWhoseProfileItIs?.firstname ?? ""} ${userWhoseProfileItIs?.lastname ?? 0}`}
              </h3>
            ) : (
              <h3 className="font-bold text-xl">{`${userWhoseProfileItIs?.email ?? "User"}`}</h3>
            )}
            <span>@user-{userWhoseProfileItIs?.id}</span>
          </div>
          <FollowButton
            followedId={userWhoseProfileItIs?.id ?? 0}
            followerId={userViewingTheProfile?.id ?? 0}
            alreadyFollowing={alreadyFollowing}
          />
        </div>
        <div className="mb-4 flex gap-2">
          <span>
            <span className="font-bold">
              {userWhoseProfileItIs?.followers.length ?? 0}
            </span>{" "}
            followers
          </span>
          <span>
            <span className="font-bold">
              {userWhoseProfileItIs?.following.length ?? 0}
            </span>{" "}
            following
          </span>
        </div>
      </div>
      <UserPrompts userId={userWhoseProfileItIs?.id ?? 0} />
    </div>
  );
}
