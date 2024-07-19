import Link from "next/link";
import { IoGiftOutline } from "react-icons/io5";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">친구생일</span>
        <Link href={"/"} className="text-blue-500 text-xs">
          모두 보기
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-slate-500" />
          <span className="font-semibold">Randall Dixon</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            축하메시지
          </button>
        </div>
      </div>
      {/* UPCOMING */}
      <div className="p-4 bg-slate-50 rounded-lg flex items-center gap-4">
        <IoGiftOutline size={20} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-slate-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-slate-500">
            See other 16 have upcoming birthdays
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
