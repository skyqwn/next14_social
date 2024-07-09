import Link from "next/link";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

const FriendRequest = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">친구요청</span>
        <Link href={"/"} className="text-blue-500 text-xs">
          모두 보기
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-slate-500" />
          <span className="font-semibold">Randall Dixon</span>
        </div>
        <div className="flex gap-2">
          <FaCheck
            size={20}
            className="text-blue-400 cursor-pointer hover:text-blue-700 transition "
          />
          <MdOutlineCancel
            size={22}
            className="text-red-400 cursor-pointer hover:text-red-700 transition "
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-slate-500" />
          <span className="font-semibold">Randall Dixon</span>
        </div>
        <div className="flex gap-2">
          <FaCheck
            size={20}
            className="text-blue-400 cursor-pointer hover:text-blue-700 transition "
          />
          <MdOutlineCancel
            size={22}
            className="text-red-400 cursor-pointer hover:text-red-700 transition "
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-slate-500" />
          <span className="font-semibold">Randall Dixon</span>
        </div>
        <div className="flex gap-2">
          <FaCheck
            size={20}
            className="text-blue-400 cursor-pointer hover:text-blue-700 transition "
          />
          <MdOutlineCancel
            size={22}
            className="text-red-400 cursor-pointer hover:text-red-700 transition "
          />
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
