"use client";

import Link from "next/link";
import Image from "next/image";
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
  UserButton,
} from "@clerk/nextjs";
import { FaRegUser } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const routes = useMemo(() => {
    return [
      {
        icon: <GoHome size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <GoHome size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <GoHome size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
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
      <section className="hidden md:flex w-[50%]">
        <div className="flex gap-6 text-gray-600 items-center justify-between">
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
      </section>
      {/* RIGHT */}
      <section className="flex items-center gap-4 lx:gap-8">
        <ClerkLoading>
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <IoPeopleOutline size={24} />
            </div>
            <div className="cursor-pointer">
              <AiOutlineMessage size={24} />
            </div>
            <div className="cursor-pointer">
              <IoNotificationsOutline size={24} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 tex-sm">
              <FaRegUser size={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </section>
    </header>
  );
};

export default Navbar;
