import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";

const getFollowRequests = async (userId: string) => {
  return await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
};

export type InitialFollowRequests = Prisma.PromiseReturnType<
  typeof getFollowRequests
>;

const FriendRequest = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const initialFollowRequests = await getFollowRequests(userId);

  // if (requests.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">친구요청</span>
        <Link href={"/"} className="text-blue-500 text-xs">
          모두 보기
        </Link>
      </div>
      {initialFollowRequests.length > 0 ? (
        <FriendRequestList initialFollowRequests={initialFollowRequests} />
      ) : (
        "아직 친구요청이 없습니다."
      )}
    </div>
  );
};

export default FriendRequest;
