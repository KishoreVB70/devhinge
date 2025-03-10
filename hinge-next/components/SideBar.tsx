import { Avatar } from "@/components/ui/avatar";
import { getUser } from "@/lib/dbhelpers/dbhelpers";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react";

type SideBarProps = {
  page: "requests" | "feed" | "connections";
};

export default async function SideBar({ page }: SideBarProps) {
  const user = await getUser();
  const imageUrl = user ? user.avatar_url : "/devconnect.webp";
  const name = user ? user.name : "Prius";
  return (
    <div className="w-[24.5%] h-full border-r border-gray-200 shadow-lg">
      <div className="h-[10%] w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 flex flex-row justify-start items-center p-3 text-white">
        <Avatar>
          <AvatarImage
            src={imageUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
          <AvatarFallback>DC</AvatarFallback>
        </Avatar>
        <p className="ml-3 font-bold">{name}</p>
      </div>
      {/* Sidebar Options */}
      <div className="flex flex-col mt-4 px-4 space-y-3">
        {/* Feed */}
        {page !== "feed" && (
          <Link
            href={"/feed"}
            className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all rounded-lg shadow-sm"
          >
            <svg
              className="w-6 h-6 text-red-700"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                fill="currentColor"
                d="M62.242 53.757L51.578 43.093C54.373 38.736 56 33.56 56 28C56 12.536 43.464 0 28 0S0 12.536 0 28s12.536 28 28 28c5.56 0 10.736-1.627 15.093-4.422l10.664 10.664c2.344 2.344 6.142 2.344 8.485 0s2.344-6.142 0-8.485zM28 54C13.641 54 2 42.359 2 28S13.641 2 28 2s26 11.641 26 26-11.641 26-26 26zm32.828 6.828c-1.562 1.562-4.095 1.562-5.656 0L44.769 50.425c2.145-1.606 4.051-3.513 5.657-5.656l10.402 10.402c1.562 1.562 1.562 4.095 0 5.657z"
              />
              <path
                fill="currentColor"
                d="M28 4C14.745 4 4 14.745 4 28s10.745 24 24 24 24-10.745 24-24S41.255 4 28 4zm0 46C15.85 50 6 40.15 6 28S15.85 6 28 6s22 9.85 22 22-9.85 22-22 22z"
              />
              <path
                fill="currentColor"
                d="M28 11c-.553 0-1 .447-1 1s.447 1 1 1c8.284 0 15 6.716 15 15 0 .553.447 1 1 1s1-.447 1-1c0-9.389-7.611-17-17-17z"
              />
            </svg>

            <span className="font-medium text-gray-700">Get back to feed</span>
          </Link>
        )}
        {/* View Connections */}
        {page !== "connections" && (
          <Link
            href={"/requests"}
            className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all rounded-lg shadow-sm"
          >
            <svg
              className="w-6 h-6 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm14 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM5 15c-2.21 0-4 1.79-4 4v2h6v-2c0-2.21-1.79-4-4-4zm14 0c-2.21 0-4 1.79-4 4v2h6v-2c0-2.21-1.79-4-4-4zm-7-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"
              />
            </svg>

            <span className="font-medium text-gray-700">View Connections</span>
          </Link>
        )}

        {/* View Matches */}
        {page !== "requests" && (
          <Link
            href={"/requests"}
            className="flex items-center gap-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all rounded-lg shadow-sm"
          >
            <svg
              className="w-6 h-6 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              />
            </svg>
            <span className="font-medium text-gray-700">View Matches</span>
          </Link>
        )}
      </div>
    </div>
  );
}
