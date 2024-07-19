"use client";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { InitialFollowRequests } from "./FriendRequest";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";

interface FriedRequestListProps {
  initialFollowRequests: InitialFollowRequests;
}

const FriendRequestList = ({
  initialFollowRequests,
}: FriedRequestListProps) => {
  const [requestState, setRequestState] = useState(initialFollowRequests);

  const accpet = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prevState) =>
        prevState.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prevState) =>
        prevState.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (prevState, value: number) => prevState.filter((req) => req.id !== value)
  );
  return (
    <div>
      {optimisticRequest.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <Link
            href={`/profile/${request.sender.username}`}
            className="flex items-center gap-4"
          >
            <Image
              alt={request.sender.username}
              src={request.sender.avatar ?? "/noAvatar.png"}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold">{request.sender.username}</span>
          </Link>
          <div className="flex gap-2">
            <form action={() => accpet(request.id, request.senderId)}>
              <button>
                <FaCheck
                  size={20}
                  className="text-blue-400 cursor-pointer hover:text-blue-700 transition "
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.senderId)}>
              <button>
                <MdOutlineCancel
                  size={22}
                  className="text-red-400 cursor-pointer hover:text-red-700 transition "
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
