import { Avatar } from "@/components/ui/avatar";
import { getUser } from "@/lib/dbhelpers/dbhelpers";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
export default async function SideBar() {
  const user = await getUser();
  const imageUrl = user ? user.avatar_url : "/devconnect.webp";
  const name = user ? user.name : "Prius";
  return (
    <div className="w-1/3 h-full border-r border-black">
      <div className="h-[10%] w-full bg-red-400 flex flex-row justify-start items-center p-3 text-white">
        <Avatar>
          <AvatarImage
            src={imageUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
          <AvatarFallback>DC</AvatarFallback>
        </Avatar>
        <p className="ml-3">{name}</p>
      </div>
    </div>
  );
}
