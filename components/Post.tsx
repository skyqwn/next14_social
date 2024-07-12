import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Comments from "./Comments";

interface PostProps {
  post: {
    user: {
      id: string;
      username: string;
      avatar: string | null;
      cover: string | null;
      name: string | null;
      surname: string | null;
      description: string | null;
      city: string | null;
      school: string | null;
      work: string | null;
      website: string | null;
      createdAt: Date;
    };
    id: number;
    desc: string;
    img: string | null;
    createdAt: Date;
  };
}

const Post = ({ post }: PostProps) => {
  console.log(post);
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt={post.user.username}
            className="rounded-full size-10"
          />
          <span className="font-medium">{post.user.username}</span>
        </div>
        <IoIosMore />
      </div>
      {/* DESC*/}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src={`${post.img}/public`}
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <FaRegThumbsUp size={20} className="cursor-pointer" />
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              500<span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <FaRegCommentDots size={20} className="cursor-pointer" />
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              98<span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <IoShareOutline size={20} className="cursor-pointer" />
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              98<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
