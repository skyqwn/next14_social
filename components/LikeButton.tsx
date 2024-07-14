"use client";

import { dislikePost, likePost } from "@/lib/actions";
import { useOptimistic } from "react";
import { FaRegThumbsUp } from "react-icons/fa";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

const LikeButton = ({ isLiked, likeCount, postId }: LikeButtonProps) => {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );
  const onClick = async () => {
    reducerFn("");
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
      <button
        onClick={onClick}
        className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl"
      >
        <div className="flex gap-2">
          <FaRegThumbsUp size={20} className="cursor-pointer" />
          <span className="text-slate-300">|</span>
          <div className="text-slate-500">
            {state.likeCount}
            <span className="hidden md:inline"> Likes</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LikeButton;
