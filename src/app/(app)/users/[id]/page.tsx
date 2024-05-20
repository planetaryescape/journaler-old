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
    // with: {
    //   followers: {
    //     with: {
    //       follower: true,
    //       followedBy: true,
    //     },
    //   },
    // },
  });

  // const followers =
  //   user?.followers.filter((f) => f.followedId === user?.id).length ?? 0;
  // const following =
  //   user?.followers.filter((f) => f.followerId === user?.id).length ?? 0;

  return (
    <div className="mb-16 pt-4 relative max-w-4xl mx-auto px-4 md:px-8">
      <div className="mb-4">
        <div>
          <h3 className="font-bold text-xl">
            {`${user?.firstname} ${user?.lastname}`}
          </h3>
          <span>@user-{user?.id}</span>
        </div>
        <div className="mb-4">
          {/* <span>{followers} follower</span>
          <span>{following} following</span> */}
        </div>
      </div>
      <UserPrompts userId={user?.id ?? 0} />
    </div>
  );
}
