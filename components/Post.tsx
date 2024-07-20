import Image from "next/image";
import { IoIosMore } from "react-icons/io";

import { User } from "@prisma/client";
import Link from "next/link";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { getCachedLikeStatus } from "@/app/posts/[id]/actions";

interface PostProps {
  post: {
    user: User;
    id: number;
    desc: string;
    img: string | null;
    _count: {
      likes: number;
      comments: number;
    };
    createdAt: Date;
  };
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="flex flex-col gap-4 border-b ">
      {/* USER */}
      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${post.user.username}`}
          className="flex items-center gap-4"
        >
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt={post.user.username}
            className="rounded-full size-10 "
          />
          <span className="font-medium">{post.user.username}</span>
        </Link>
        <IoIosMore />
      </div>
      {/* DESC*/}
      <Link href={`/posts/${post.id}`}>
        <section className="flex flex-col gap-4 mb-4">
          <div className="w-full min-h-96 relative">
            <Image
              src={`${post.img}/public`}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          <p>{post.desc}</p>
        </section>
        <section className="flex items-center justify-end text-sm my-4">
          <div className="flex gap-8 ">
            <div className="flex gap-2 items-center border rounded-xl p-2">
              <FaRegThumbsUp size={20} className="cursor-pointer" />
              <span className="text-slate-300">|</span>
              <div className="text-slate-500">
                {post._count.likes}
                <span className="hidden md:inline"> Likes</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-2 rounded-xl border">
              <FaRegCommentDots size={20} className="cursor-pointer" />
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">
                {post._count.comments}
                <span className="hidden md:inline"> Comments</span>
              </span>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default Post;
