import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getUser() {
  const { userId } = auth();

  if (!userId) return;

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      avatar: true,
      cover: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
}

const ProfileCard = async () => {
  const user = await getUser();
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user?.cover || "/noCover.png"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user?.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover size-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">{user?.username}</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            {user?._count.followers} Followers
          </span>
        </div>
        <Link
          href={`/profile/${user?.username}`}
          className="bg-blue-500 text-white text-xs p-2 rounded-lg"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
