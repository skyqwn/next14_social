import { Suspense } from "react";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequest from "./FriendRequest";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import UserInfoCardSkeleton from "./UserInfoCardSkeleton";
import { User } from "@prisma/client";

interface RightMenuProps {
  user?: User;
}

const RightMenu = ({ user }: RightMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback={<UserInfoCardSkeleton />}>
            <UserInfoCard user={user} />
          </Suspense>
          <UserMediaCard user={user} />
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
