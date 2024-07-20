"use client";

import { FaRegSmileWink, FaRegThumbsUp } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useOptimistic, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { createComment } from "@/lib/actions";
import CommentLikeButton from "./CommentLikeButton";

interface Comment {
  user: {
    id: string;
    username: string;
    avatar: string | null;
    cover: string | null;
    description: string | null;
    city: string | null;
    school: string | null;
    work: string | null;
    website: string | null;
    createdAt: Date;
  };
  id: number;
  desc: string;
  createdAt: Date;
  _count: {
    likes: number;
  };
  likes: { userId: string }[];
}

interface CommentListProps {
  initialComments: Comment[];
  postId: number;
}

const CommentList = ({ initialComments, postId }: CommentListProps) => {
  const { user, isLoaded } = useUser();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [desc, setDesc] = useState("");

  const addComment = async () => {
    if (!user) return;

    addOptimisticComment({
      user: {
        id: user.id,
        username: "Loading...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        city: "",
        school: "",
        work: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      _count: {
        likes: 0,
      },
      likes: [
        {
          userId: "",
        },
      ],
    });
    try {
      const newComment = await createComment(postId, desc);
      setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (prevState, payload: Comment) => [payload, ...prevState]
  );

  return (
    <div>
      <div>
        {/* WRITE */}
        <div className="flex items-center gap-4">
          <Image
            src={user?.imageUrl ?? "/noAvatar.png"}
            alt={user?.username!}
            className="size-8 rounded-full"
            width={32}
            height={32}
          />
          <form
            action={addComment}
            className="flex flex-1 gap-2 items-center justify-between  rounede-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="코멘트를 입력해주세요."
              className="bg-transparent outline-none flex-1 border-slate-300 border p-2 rounded-md"
            />
            <button>
              <FaRegSmileWink className="size-5 cursor-pointer " />
            </button>
          </form>
        </div>
        {/* COMMENTS */}
        {optimisticComments?.map((comment) => (
          <div key={comment.id} className="mb-5">
            {/* COMMENT */}
            <div className="flex gap-4 justify-between mt-6">
              {/* AVATAR */}
              <Image
                src={comment.user.avatar ?? "/noAvatar.png"}
                alt={comment.user.username}
                width={40}
                height={40}
                className="rounded-full size-10"
              />
              {/* DESC */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="font-medium">{comment.user.username}</span>
                <p>{comment.desc}</p>
                <CommentLikeButton
                  commentCount={comment._count.likes}
                  likes={comment.likes.map((like) => like.userId)}
                  commentId={comment.id}
                />
              </div>
              {/* ICON */}
              <IoIosMore size={22} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
