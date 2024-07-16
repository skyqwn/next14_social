import Image from "next/image";
import { IoIosMore } from "react-icons/io";

import { User } from "@prisma/client";
import Link from "next/link";

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
      <div className="flex flex-col gap-4 mb-4">
        <div className="w-full min-h-96 relative">
          <Link href={`/posts/${post.id}`}>
            <Image
              src={`${post.img}/public`}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </Link>
        </div>
        <p>{post.desc}</p>
      </div>
    </div>
  );
};

export default Post;
