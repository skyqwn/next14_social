import { dislikePost, getIsLiked, likePost } from "@/lib/actions";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";

interface PostInteractionProps {
  postId: number;
}

const PostInteraction = async ({ postId }: PostInteractionProps) => {
  const isLiked = await getIsLiked(postId);
  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <form
          action={isLiked ? () => dislikePost(postId) : () => likePost(postId)}
          className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl"
        >
          <button className="flex gap-2">
            <FaRegThumbsUp size={20} className="cursor-pointer" />
            <span className="text-slate-300">|</span>
            <div className="text-slate-500">
              {/* {post._count.likes} */}
              <span className="hidden md:inline"> Likes</span>
            </div>
          </button>
        </form>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <FaRegCommentDots size={20} className="cursor-pointer" />
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            {/* {post._count.comments} */}
            <span className="hidden md:inline"> Comments</span>
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
  );
};

export default PostInteraction;
