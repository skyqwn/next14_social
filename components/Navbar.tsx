"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import MobileMenu from "./MobileMenu";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineProfile } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = useMemo(() => {
    return [
      {
        icon: <GoHome size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <IoChatboxEllipsesOutline size={24} />,
        label: "채팅",
        isActive: pathname === "/chats",
        href: "/chats",
      },
      {
        icon: <AiOutlineProfile size={24} />,
        label: "내정보",
        isActive: pathname === "/profile",
        href: `/profile/${user?.username}`,
      },
    ];
  }, []);

  return (
    <header className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <section className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          NEXT_SOCIAL
        </Link>
      </section>
      {/* CENTER */}
      <section className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="xl:hidden flex gap-6 text-gray-600 items-center justify-between">
          {routes.map((route) => {
            return (
              <Link href={route.href} key={route.label}>
                <div
                  className={cn(
                    "*:text-[16px] flex items-center gap-4 rounded-lg p-2 *:text-slate-600"
                    // route.isActive && "bg-slate-100"
                  )}
                >
                  {route.icon}
                  <span>{route.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="hidden xl:flex xl:flex-1 p-2 bg-slate-100 items-center rouded-xl justify-between">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <CiSearch size={20} />
        </div>
      </section>
      {/* RIGHT */}
      <section className="flex items-center gap-4 lx:gap-8">
        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 tex-sm">
              <FaRegUser size={18} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu username={user?.username!} />
      </section>
    </header>
  );
};

export default Navbar;
