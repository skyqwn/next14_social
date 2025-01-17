import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import { getProfileUserInfo } from "@/lib/actions";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const Profile = async ({ params }: { params: { username: string } }) => {
  const username = params.username;
  const user = await getProfileUserInfo(username);
  if (!user) return notFound();

  const { userId: currentUserId } = auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    if (res) {
      isBlocked = true;
    } else {
      isBlocked = false;
    }
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      <section className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </section>
      <section className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={`${user.cover}/public` || "/noCover.png"}
                alt=""
                fill
                className="object-cover rounded-md"
              />
              <Image
                src={user.avatar ?? "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="size-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">{user.username}</h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Post</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Followings</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </section>
      <section className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </section>
    </div>
  );
};

export default Profile;
