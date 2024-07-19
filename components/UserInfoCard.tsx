import Link from "next/link";

import { FaCity } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import prisma from "@/lib/client";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import CreateMessageButton from "./CreateMessageButton";
import UpdateUser from "./UpdateUser";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = async ({ user }: UserInfoCardProps) => {
  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReq = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    followReq ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">유저 정보</span>
        {currentUserId === user.id ? <UpdateUser user={user} /> : null}
      </div>
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">{user.username}</span>
          <span className="text-sm">{user.username}</span>
        </div>
        <p>{user.description ?? "자기 소개글을 입력해주세요."}</p>
        <div className="flex items-center gap-2">
          <FaCity />
          <span>
            Living in <b>{user.city ?? "정보 없음"}</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaSchool />
          <span>
            Went to <b>{user.school ?? "정보 없음"}</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaShoppingBag />
          <span>
            Works at <b>{user.work ?? "정보 없음"}</b>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <FaLink />
            <Link
              href={user.website ?? "#"}
              className="text-blut-500 font-medium"
            >
              {user.website ?? "정보 없음"}
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <FaRegCalendarAlt />
            <span>Joined November 2024</span>
          </div>
        </div>
        {user.id !== currentUserId && (
          <>
            <div className="flex flex-col gap-2">
              <CreateMessageButton
                userId={user.id}
                currentUserId={currentUserId!}
              />
            </div>
            <UserInfoCardInteraction
              isFollowing={isFollowing}
              isFollowingSent={isFollowingSent}
              isUserBlocked={isUserBlocked}
              userId={user.id}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
