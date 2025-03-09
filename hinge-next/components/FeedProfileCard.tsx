"use client";
import { FeedProfile } from "@/lib/schema/userSchema";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, X, ArrowUpFromLine } from "lucide-react"; // Import Lucide icons

type ProfileCardProps = {
  profiles: FeedProfile[];
  handleAction: (index: number, action: "interested" | "ignored") => void;
};

function FeedProfileCard({ profiles, handleAction }: ProfileCardProps) {
  const [index, setIndex] = useState(0);
  const profile = profiles[index];

  function moveIndex() {
    if (index + 1 < profiles.length) {
      setIndex(index + 1);
    }
  }

  // TODO: Clear doubt on what would happen if I unmount component on handleLike, will it still increment index?
  return (
    <div className="relative flex flex-col items-center justify-center w-[400px] h-[600px]">
      <h1 className="z-50 absolute bottom-16 left-10 text-2xl font-bold text-white">
        {profile.name} {profile.age}
      </h1>
      <div className="relative w-[400px] h-[600px]">
        <Image
          src={profile.avatar_url}
          className="rounded-3xl"
          alt="Image"
          width={400}
          height={600}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[33%] bg-gradient-to-t from-black via-black/70 to-transparent rounded-b-3xl"></div>
      </div>
      <button className="absolute w-9 h-9 right-5 bottom-28 border-2 border-gray-200 hover:border-gray-300 flex flex-col items-center justify-center rounded-full group">
        <ArrowUpFromLine className="w-5 h-5 text-gray-200" />
      </button>

      {/* Action Buttons */}
      <div className="w-[70%] flex justify-between absolute -bottom-3">
        <button
          className="w-14 h-14 bg-white border-2 border-gray-400 hover:bg-gray-200 hover:border-gray-700 flex flex-col items-center justify-center rounded-full group"
          onClick={() => {
            moveIndex();
            handleAction(index, "ignored");
          }}
        >
          <X className="w-6 h-6 text-gray-600 group-hover:text-gray-700" />
        </button>
        <button
          className="w-14 h-14 bg-white border-2 border-red-500 hover:bg-red-100 hover:border-red-700 rounded-full  flex flex-col items-center justify-center group"
          onClick={() => {
            moveIndex();
            handleAction(index, "interested");
          }}
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500 group-hover:fill-red-600 group-hover:text-red-700" />
        </button>
      </div>
    </div>
  );
}

export default FeedProfileCard;
