import Link from "next/link";

import { FaCity } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

interface UserInfoCardProps {
  userId: string;
}

async function getLoading() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

const UserInfoCard = async ({ userId }: UserInfoCardProps) => {
  const test = await getLoading();
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">유저 정보</span>
        <Link href={"/"} className="text-blue-500 text-xs">
          모두 보기
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">Allie Fernandez</span>
          <span className="text-sm">White</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          repellat facere ullam consequuntur inventore accusamus .
        </p>
        <div className="flex items-center gap-2">
          <FaCity />
          <span>
            Living in <b>Incheon</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaSchool />
          <span>
            Went to <b>백석고등학교</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaShoppingBag />
          <span>
            Works at <b>Apple Inc.</b>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <FaLink />
            <Link
              href={"https://modong.site"}
              className="text-blut-500 font-medium"
            >
              modong
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <FaRegCalendarAlt />
            <span>Joined November 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-xl cursor-pointer">
          Follow
        </button>
        <span className="text-red-500 self-end text-xs cursor-pointer">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
