import { Suspense } from "react";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequest from "./FriendRequest";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import UserInfoCardSkeleton from "./UserInfoCardSkeleton";

interface RightMenuProps {
  userId?: string;
}

const RightMenu = ({ userId }: RightMenuProps) => {
  return (
    <div className="flex flex-col gap-6">
      {userId ? (
        <>
          <Suspense fallback={<UserInfoCardSkeleton />}>
            <UserInfoCard userId={userId} />
          </Suspense>
          <UserMediaCard userId={userId} />
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
