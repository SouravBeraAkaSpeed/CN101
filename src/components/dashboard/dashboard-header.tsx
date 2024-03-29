"use client";
import { IoIosSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppState } from "../providers/state-provider";
import { useRouter } from "next/navigation";

const Header = ({ environmentId }: { environmentId: string }) => {
  const { state } = useAppState();
  const router = useRouter();
  return (
    <div className="lg:hidden w-full dark:bg-black/20 h-16 fixed backdrop-blur-md z-50 ">
      <div className="flex justify-between items-center h-full px-4">
        <h1 className="text-4xl font-extrabold  text-brand/yellow">APEX</h1>

        <div className="flex items-center gap-12">
          <Select
            value={environmentId}
            onValueChange={(value) => {
              router.push(`/${value}/dashboard`);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {state.environments.map((env, index) => (
                <SelectItem value={env?.id ? env.id : ""} key={index}>
                  {env?.name ? env.name : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <Link href={`/edit-environment/?env=${environmentId}`}>
            <div className="flex border-2 bg-yellow-200 rounded-[20px]  p-2 font-semibold text-black">
              <div className="flex">Edit Environment</div>
              <div className="flex mx-1">
                <Edit />
              </div>
            </div>
          </Link> */}
          <Popover>
            <PopoverTrigger>
              <Avatar className="h-12 w-12 border-2 border-black">
                <AvatarImage src="/boardApe.png" />
                <AvatarFallback>
                  <FaUser />
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto flex flex-col items-start gap-3"
            >
              <Link className="flex items-center gap-2" href="/profile">
                <FaUser className="h-4 w-4" />
                <span>Profile</span>
              </Link>

              <Link
                className="flex gap-2 items-center"
                href={`/edit-environment/?env=${environmentId}`}
              >
                <IoIosSettings className="h-4 w-4" />
                <span>Edit Environment</span>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
