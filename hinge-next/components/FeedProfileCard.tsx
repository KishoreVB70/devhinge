"use client";
import { FeedProfile } from "@/lib/schema/userSchema";
import { Heart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import BasicProfile from "@/components/BasicProfile";
import DetailedProfile from "@/components/DetailedProfile";
import KeyBindingsInfo from "@/components/KeyBindingsInfo";

type ProfileCardProps<T extends string> = {
  profiles: FeedProfile[];
  actions: T[];
  handleAction: (index: number, action: T) => void;
};

function FeedProfileCard<T extends string>({
  profiles,
  actions,
  handleAction,
}: ProfileCardProps<T>) {
  const [index, setIndex] = useState(0);
  const [basicView, setBasicView] = useState(true);
  const profile = profiles[index];

  function moveIndex() {
    if (index + 1 < profiles.length) {
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Like
      if (e.key === "ArrowRight") {
        handleAction(index, actions[1]);
        moveIndex();
      }
      // Ignore
      if (e.key === "ArrowLeft") {
        handleAction(index, actions[1]);
        moveIndex();
      }
      // Open profile
      if (e.key === "ArrowUp") {
        setBasicView(false);
      }

      // Close profile
      if (e.key === "ArrowDown") {
        setBasicView(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // TODO: Clear doubt on what would happen if I unmount component on handleLike, will it still increment index?
  return (
    <div className="relative w-full h-full lg:w-[600px] lg:h-[800px] flex flex-col items-center justify-center">
      <div className="relative h-full w-full lg:w-[400px] lg:h-[600px] flex flex-col items-center justify-center">
        {basicView ? (
          <BasicProfile profile={profile} setBasicView={setBasicView} />
        ) : (
          <DetailedProfile profile={profile} setBasicView={setBasicView} />
        )}
        {/* Action Buttons */}
        <div className="z-50 w-[70%] flex justify-between absolute -bottom-3">
          {/* Pass Button */}
          <button
            className="w-14 h-14 bg-white border-2 border-gray-400 hover:bg-gray-200 hover:border-gray-700 flex flex-col items-center justify-center rounded-full group"
            onClick={() => {
              moveIndex();
              handleAction(index, actions[0]);
            }}
          >
            <X className="w-6 h-6 text-gray-600 group-hover:text-gray-700" />
          </button>
          {/* Like button */}
          <button
            className="w-14 h-14 bg-white border-2 border-red-500 hover:bg-red-100 hover:border-red-700 rounded-full  flex flex-col items-center justify-center group"
            onClick={() => {
              moveIndex();
              handleAction(index, actions[1]);
            }}
          >
            <Heart className="w-6 h-6 text-red-500 fill-red-500 group-hover:fill-red-600 group-hover:text-red-700" />
          </button>
        </div>
      </div>
      <KeyBindingsInfo />
    </div>
  );
}

export default FeedProfileCard;
