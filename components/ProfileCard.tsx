import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/14737803/pexels-photo-14737803.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/26098755/pexels-photo-26098755.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover size-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">Rosa Howell</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/26098755/pexels-photo-26098755.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover size-3 "
            />
          </div>
          <span className="text-xs text-slate-500">500 Followers</span>
        </div>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-lg">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
