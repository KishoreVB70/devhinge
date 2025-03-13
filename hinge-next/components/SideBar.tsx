import ConnectionsSVG from "@/components/svgs/ConnectionsSVG";
import FeedSVG from "@/components/svgs/FeedSVG";
import ProfileSVG from "@/components/svgs/ProfileSVG";
import RequestsSVG from "@/components/svgs/RequestsSVG";
import SVGLink from "@/components/svgs/SVGLink";
import { Avatar } from "@/components/ui/avatar";
import { getUserSelf } from "@/lib/dbhelpers/dbhelpers";
import { Page } from "@/lib/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
// import Link from "next/link";
import React from "react";

type SideBarProps = {
  page: Page;
};

export default async function SideBar({ page }: SideBarProps) {
  const user = await getUserSelf();
  const imageUrl = user ? user.avatar_url : "/devconnect.webp";
  const name = user ? user.name : "Prius";
  return (
    <>
      <div className="lg:hidden z-20 w-full flex flex-row absolute bottom-0 bg-gray-100 justify-between">
        {/* Feed */}
        <SVGLink href="/feed">
          <FeedSVG variant="sidebar" selected={page === "feed"} />
        </SVGLink>

        {/* View requests */}
        <SVGLink href="/requests">
          <RequestsSVG selected={page === "requests"} />
        </SVGLink>

        {/* View Connections */}
        <SVGLink href="/connections">
          <ConnectionsSVG selected={page === "connections"} />
        </SVGLink>
        <SVGLink href="/profile">
          <ProfileSVG selected={page === "profile"} />
        </SVGLink>
      </div>
      <div className="hidden lg:block w-[24.5%] h-full border-r border-gray-200 shadow-lg">
        <div className="h-[10%] w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 flex flex-row justify-start items-center p-3 text-white">
          <Link
            href="/profile"
            className="hover:cursor-pointer hover:bg-gray-600 hover:rounded-3xl p-2  flex flex-row justify-start items-center"
          >
            <Avatar>
              <AvatarImage
                src={imageUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <p className="ml-3 font-bold">{name}</p>
          </Link>
        </div>
        {/* Sidebar Options */}
        <div className="flex flex-col mt-4 px-4 space-y-3">
          {/* Feed */}
          {page !== "feed" && (
            <SVGLink href="/feed">
              <FeedSVG variant="sidebar" selected={true} />
            </SVGLink>
          )}
          {page !== "requests" && (
            <SVGLink href="/requests">
              <RequestsSVG selected={true} />
            </SVGLink>
          )}
          {page !== "connections" && (
            <SVGLink href="/connections">
              <ConnectionsSVG selected={true} />
            </SVGLink>
          )}
        </div>
      </div>
    </>
  );
}
