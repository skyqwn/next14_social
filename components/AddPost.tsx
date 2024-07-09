import Image from "next/image";
import { FaRegSmileWink } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";

const AddPost = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/19968907/pexels-photo-19968907.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
        width={48}
        height={48}
        alt=""
        className="size-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <div className="flex gap-4">
          <textarea
            placeholder="게시물을 입력해주세요!"
            className="bg-slate-100 rounded-lg flex-1 p-2"
          ></textarea>
          <FaRegSmileWink className="size-5 cursor-pointer self-end" />
        </div>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 ">
          <div className="flex items-center gap-2 cursor-pointer">
            <MdAddPhotoAlternate size={22} className="text-blue-500" />
            <span className="text-gray-400">Photo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
