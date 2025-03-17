"use client";
import ConnectionsSVG from "@/components/svgs/ConnectionsSVG";
import FeedSVG from "@/components/svgs/FeedSVG";
import ProfileSVG from "@/components/svgs/ProfileSVG";
import RequestsSVG from "@/components/svgs/RequestsSVG";
import SVGLink from "@/components/svgs/SVGLink";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SideBarProps = {
  user: {
    name: string;
    avatar_url: string;
  };
  demo?: boolean;
};

function SideBar({ user, demo }: SideBarProps) {
  const imageUrl = user.avatar_url;
  const name = user.name;
  const path = usePathname();

  const feedLink = demo ? "/demo/feed" : "/app/feed";
  const profileLink = demo ? "/demo/feed" : "/app/profile";
  const requestsLink = demo ? "/demo/feed" : "/app/requests";
  const connectionsLink = demo ? "/demo/feed" : "/app/connections";

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden h-[10%] z-10 w-full flex flex-row absolute bottom-0 bg-gray-100 justify-between">
        {/* Feed */}
        <SVGLink href={feedLink}>
          <FeedSVG variant="sidebar" selected={path.includes("feed")} />
        </SVGLink>

        {/* View requests */}
        <SVGLink href={requestsLink}>
          <RequestsSVG selected={path.includes("requests")} />
        </SVGLink>

        {/* View Connections */}
        <SVGLink href={connectionsLink}>
          <ConnectionsSVG selected={path.includes("connections")} />
        </SVGLink>

        {/* Profile */}
        <SVGLink href={profileLink}>
          <ProfileSVG selected={path.includes("profile")} />
        </SVGLink>
      </div>

      {/* Lg layout */}
      <div className="hidden lg:block w-[35%] max-w-[375px] h-full border-r border-gray-200 shadow-lg">
        <div className="h-[87px] w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 flex flex-row justify-start items-center p-3 text-white">
          <Link
            href={profileLink}
            className="hover:cursor-pointer hover:bg-gray-600 hover:rounded-3xl p-2  flex flex-row justify-start items-center"
          >
            <Avatar>
              <AvatarImage
                src={imageUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
              <AvatarFallback>
                <ProfileSVG selected={false} />
              </AvatarFallback>
            </Avatar>
            <p className="ml-3 font-bold">{name}</p>
          </Link>
        </div>
        {/* Sidebar Options */}
        <div className="flex flex-col mt-4 px-4 space-y-3">
          {/* Feed */}
          {!path.includes("feed") && (
            <SVGLink href={feedLink}>
              <FeedSVG variant="sidebar" selected={true} />
            </SVGLink>
          )}
          {!path.includes("requests") && (
            <SVGLink href={requestsLink}>
              <RequestsSVG selected={true} />
            </SVGLink>
          )}
          {!path.includes("connections") && (
            <SVGLink href={connectionsLink}>
              <ConnectionsSVG selected={true} />
            </SVGLink>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
