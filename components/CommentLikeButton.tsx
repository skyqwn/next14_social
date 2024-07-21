"use client";

import { switchCommentLike } from "@/app/posts/[id]/actions";
import { useAuth } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface CommentLikeButtonProps {
  commentCount: number;
  likes: string[];
  commentId: number;
  postId: number;
}

const CommentLikeButton = ({
  commentCount,
  commentId,
  likes,
  postId,
}: CommentLikeButtonProps) => {
  const { userId } = useAuth();
  const [likeState, setLikeState] = useState({
    commentCount,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLikeState, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        commentCount: state.isLiked
          ? state.commentCount - 1
          : state.commentCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchCommentLike(commentId, postId);
      setLikeState((state) => ({
        commentCount: state.isLiked
          ? state.commentCount - 1
          : state.commentCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {}
  };
  return (
    <div className="flex items-center gap-8 text-xs text-slate-500 mt-2">
      <div className="flex items-center gap-4">
        <form
          action={likeAction}
          className="cursor-pointer hover:bg-slate-200 rounded-full p-1"
          //   onClick={handleCommentLike}
        >
          <button>
            {optimisticLikeState.isLiked ? (
              <FaThumbsUp className="text-blue-500" />
            ) : (
              <FaThumbsUp />
            )}
          </button>
        </form>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500">
          {optimisticLikeState.commentCount} Likes
        </span>
      </div>
    </div>
  );
};

export default CommentLikeButton;
