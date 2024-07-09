import { FaRegSmileWink, FaRegThumbsUp } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const Comments = () => {
  return (
    <div>
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-full bg-slate-500" />
        <div className="flex flex-1 items-center justify-between bg-slate-100 rounede-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="코멘트를 입력해주세요."
            className="bg-transparent outline-none flex-1"
          />
          <FaRegSmileWink className="size-5 cursor-pointer " />
        </div>
      </div>
      {/* COMMENTS */}
      <div className="">
        {/* COMMENT */}
        <div className="flex gap-4 justify-between mt-6">
          {/* AVATAR */}
          <div className="size-10 rounded-full bg-slate-500" />
          {/* DESC */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Chris Brooks</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              quibusdam optio, distinctio similique magnam quis fugit nobis
              provident error animi dicta maiores nulla a, nesciunt ut officiis
              repellat eligendi ratione.
            </p>
            <div className="flex items-center gap-8 text-xs text-slate-500 mt-2">
              <div className="flex items-center gap-4">
                <FaRegThumbsUp />
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">123 Likes</span>
              </div>
              <div>Reply</div>
            </div>
          </div>
          {/* ICON */}
          <IoIosMore size={22} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
