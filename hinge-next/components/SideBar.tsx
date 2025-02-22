import ConnectionRequests from "@/components/ConnectionRequests";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

function SideBar() {
  return (
    <div className="w-1/3 h-full border-r border-black">
      <div className="h-[10%] w-full bg-red-400 flex flex-row justify-start items-center p-3 text-white">
        <Avatar>
          <AvatarImage src="/devconnect.webp" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="ml-3">Showdown</p>
      </div>
      <ConnectionRequests />
    </div>
  );
}

export default SideBar;
