import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import Ad from "./Ad";
import { Suspense } from "react";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";

interface LeftMenuProps {
  type: "home" | "profile";
}

const LeftMenu = ({ type }: LeftMenuProps) => {
  return (
    <div className="flex flex-col gap-8">
      {type === "home" && (
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard />
        </Suspense>
      )}
      <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm text-slate-500 flex flex-col gap-2">
        <Link
          href="/chats"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <IoChatboxEllipsesOutline size={20} />
          <span>채팅</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/noAvatar.png" alt="" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <AiOutlineProfile size={20} />
          <span>내 정보</span>
        </Link>
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
