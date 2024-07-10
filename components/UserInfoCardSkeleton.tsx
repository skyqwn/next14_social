import { FaCity } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";

const UserInfoCardSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 cursor-not-allowed">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">유저정보</span>
        <div className="text-blue-500 text-sm">모두 보기</div>
      </div>
      <div className="flex flex-col gap-4 text-gray-500 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="bg-slate-200 h-5 w-52 rounded-md"></div>
          <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
        </div>
        <div className="bg-slate-100 h-5 w-56 rounded-md"></div>
        <div className="bg-slate-100 h-5 w-56 rounded-md"></div>
        <div className="flex items-center gap-2">
          <FaCity />
          <div className="bg-slate-200 h-5 w-32 rounded-md"></div>
        </div>
        <div className="flex items-center gap-2">
          <FaSchool />
          <div className="bg-slate-200 h-5 w-32 rounded-md"></div>
        </div>
        <div className="flex items-center gap-2">
          <FaShoppingBag />
          <div className="bg-slate-200 h-5 w-32  rounded-md"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <FaLink />
            <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
          </div>
          <div className="flex gap-1 items-center">
            <FaRegCalendarAlt />
            <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
          </div>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-xl cursor-not-allowed">
          Follow
        </button>
        <span className="text-red-500 self-end text-xs cursor-not-allowed">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCardSkeleton;
