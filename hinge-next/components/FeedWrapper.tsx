"use client";
import ProfileCard from "@/components/ProfileCard";
import SideBar from "@/components/SideBar";
import { likeorPassAction } from "@/lib/actions/connectionAction";
import { FeedUser } from "@/lib/schema/userSchema";
import React from "react";
type RequestsClientProps = {
  feedProfiles: FeedUser;
};

export default function FeedWrapper({ feedProfiles }: RequestsClientProps) {
  const handleLike = (index: number) => {
    likeorPassAction(feedProfiles[index].id, "interested");
  };

  const handlePass = (index: number) => {
    likeorPassAction(feedProfiles[index].id, "ignored");
  };

  const profiles = feedProfiles.map((profile) => {
    return {
      name: profile.name,
      avatar_url: profile.avatar_url,
    };
  });

  return (
    <div className="h-screen flex w-full">
      <SideBar />
      <div className="h-full w-full flex justify-center items-center">
        <ProfileCard
          profiles={profiles}
          handleLike={handleLike}
          handlePass={handlePass}
        />
      </div>
    </div>
  );
}
