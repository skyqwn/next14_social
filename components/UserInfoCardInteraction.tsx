"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

interface UserInfoCardInteractionProps {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}

const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: UserInfoCardInteractionProps) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    follwingRequsetSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        follwingRequsetSent:
          !prev.following && !prev.follwingRequsetSent ? true : false,
      }));
    } catch (error) {}
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prevState) => ({
        ...prevState,
        blocked: !prevState.blocked,
      }));
    } catch (error) {}
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (prevState, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...prevState,
            following: prevState.following && false,
            follwingRequsetSent:
              !prevState.following && !prevState.follwingRequsetSent
                ? true
                : false,
          }
        : { ...prevState, blocked: !prevState.blocked }
  );
  return (
    <div className="flex flex-col gap-2">
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white p-2 rounded-xl cursor-pointer hover:bg-blue-300 transition-colors">
          {optimisticState.following
            ? "팔로잉"
            : optimisticState.follwingRequsetSent
            ? "팔로잉 요청중..."
            : "팔로우하기"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button>
          <span className="text-red-500  text-xs cursor-pointer hover:text-red-300 transition-colors">
            {optimisticState.blocked ? "유저 차단해제" : "유저 차단"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default UserInfoCardInteraction;
