import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-gray-500" />
          <span className="font-medium">Henry Ford</span>
        </div>
        <IoIosMore />
      </div>
      {/* DESC*/}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/21352835/pexels-photo-21352835.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
          illo vitae assumenda sequi, animi corrupti sapiente. Provident maxime
          impedit tempora nulla ut vel cupiditate veritatis reprehenderit eum
          quos, velit saepe?
        </p>
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
