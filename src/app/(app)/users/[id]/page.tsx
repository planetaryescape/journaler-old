import { UserPrompts } from "@/components/user-prompts";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, parseInt(id)),
    with: {
      followed: {
        with: {
          followedBy: true,
        },
      },
      following: {
        with: {
          follower: true,
        },
      },
    },
  });

  console.log("user:", user);

  // const followers =
  //   user?.followers.filter((f) => f.followedId === user?.id).length ?? 0;
  // const following =
  //   user?.followers.filter((f) => f.followerId === user?.id).length ?? 0;

  return (
    <div className="mb-16 pt-4 relative max-w-4xl mx-auto px-4 md:px-8">
      <div className="mb-4">
        <div>
          {user?.firstname || user?.lastname ? (
            <h3 className="font-bold text-xl">
              {`${user?.firstname ?? ""} ${user?.lastname ?? 0}`}
            </h3>
          ) : (
            <h3 className="font-bold text-xl">{`${user?.email ?? "User"}`}</h3>
          )}
          <span>@user-{user?.id}</span>
        </div>
        <div className="mb-4 flex gap-2">
          <span>
            <span className="font-bold">{user?.followed.length ?? 0}</span>{" "}
            followers
          </span>
          <span>
            <span className="font-bold">{user?.followed.length ?? 0}</span>{" "}
            following
          </span>
        </div>
      </div>
      <UserPrompts userId={user?.id ?? 0} />
    </div>
  );
}
