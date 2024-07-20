"use client";

import { switchPostLike } from "@/app/posts/[id]/actions";
// import { dislikePost, likePost } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

interface LikeButtonProps {
  likeCount: number;
  postId: number;
  likes: string[];
}

const LikeButton = ({ likeCount, postId, likes }: LikeButtonProps) => {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    isLiked: userId ? likes?.includes(userId!) : false,
    likeCount,
  });

  const [optimisticState, switchOptimisticPostLike] = useOptimistic(
    likeState,
    (prevState, payload) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );

  const onAction = async () => {
    switchOptimisticPostLike("");
    try {
      switchPostLike(postId);
      setLikeState((prev) => ({
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    } catch (error) {
      console.log(error);
    }
    // if (isLiked) {
    //   await dislikePost(postId);
    // } else {
    //   await likePost(postId);
    // }
  };
  return (
    <div className="flex items-center gap-4 p-2 rounded-xl border hover:bg-slate-200l">
      <form
        action={onAction}
        className="flex items-center gap-4  p-2 rounded-xl"
      >
        <button className="flex gap-2">
          {optimisticState.isLiked ? (
            <FaThumbsUp size={20} className="cursor-pointer text-blue-500 " />
          ) : (
            <FaRegThumbsUp size={20} className="cursor-pointer" />
          )}
          <span className="text-slate-300">|</span>
          <div className="text-slate-500">
            {optimisticState.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default LikeButton;
