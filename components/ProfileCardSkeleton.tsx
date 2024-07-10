import Image from "next/image";

const ProfileCardSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-md text-sm flex flex-col gap-6 animate-pulse cursor-not-allowed">
      <div className="h-20 relative">
        <div className="bg-slate-500 rounded-md object-cover w-full h-full" />
        <div className="rounded-full object-cover size-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 bg-slate-200" />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-200 h-5 w-20 rounded-md"></div>
        </div>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-lg cursor-not-allowed">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
