import ConnectionsSVG from "@/components/svgs/ConnectionsSVG";
import FeedSVG from "@/components/svgs/FeedSVG";
import RequestsSVG from "@/components/svgs/RequestsSVG";
import { Avatar } from "@/components/ui/avatar";
import { getUserSelf } from "@/lib/dbhelpers/dbhelpers";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import Link from "next/link";
import React from "react";

type SideBarProps = {
  page: "requests" | "feed" | "connections";
};

export default async function SideBar({ page }: SideBarProps) {
  const user = await getUserSelf();
  const imageUrl = user ? user.avatar_url : "/devconnect.webp";
  const name = user ? user.name : "Prius";
  return (
    <div className="flex flex-row absolute bottom-0">
      {/* Feed */}
      <FeedSVG variant="sidebar" />

      {/* View Connections */}
      <ConnectionsSVG />

      {/* View Matches */}
      <RequestsSVG />
    </div>
  );
}
