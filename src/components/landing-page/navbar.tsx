"use client";
import React from "react";
import Section from "../section";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { useSupabaseUser } from "../providers/supabase-user-provider";
import Image from "next/image";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useSupabaseUser();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <header className=" md:px-10 lg:px-16 w-full flex px-10 items-center h-24 backdrop-blur-lg border-b">
      <div className="mr-10">
        <Link href="/" className="text-brand/yellow font-bold text-4xl">
          APEX
        </Link>
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-10">
          <li className="hover:text-brand/yellow">
            <Link href={"/join-environments"}>Popular_Environments</Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-end   ">
        <ModeToggle />

        <Button className="bg-yellow-400 mx-2 text-black">
          <Link href={"/dashboard"}>Get Started</Link>
        </Button>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Image
                src="/boardApe.png"
                alt="profile"
                width={30}
                height={30}
                className="rounded-full w-full h-full"
              />
            </PopoverTrigger>
            <PopoverContent className="w-[100px] flex flex-col">
              <Link
                href={"/profile"}
                className=" flex mx-3 items-center justify-center cursor-pointer shadow-2xl rounded-full"
              >
                profile
              </Link>
              <Button
                onClick={handleSignOut}
                className=" flex  items-center bg-transparent text-white justify-center cursor-pointer shadow-2xl rounded-[10px] p-2"
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href={"/login"}>
            <Button className="mx-4 right-0 cursor-pointer relative shadow-2xl w-[80px] bg-yellow-200 shadow-zinc-900 dark:shadow-white  p-px text-xs font-semibold leading-6  text-black inline-block">
              <span>Login</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
