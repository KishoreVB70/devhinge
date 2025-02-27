"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { likeorPassAction } from "@/lib/actions/connectionAction";
import useFeedProfiles from "@/lib/hooks/useFeedProfiles";
import React from "react";

export default function FeedWrapper() {
  const { data, isLoading, isError } = useFeedProfiles();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: loading data</div>;
  }
  const profiles = data?.profiles;

  if (!data || !profiles || profiles?.length === 0) {
    return <div>No Profiles Found</div>;
  }

  // TODO: consolidate the following two functions into one
  const handleLike = (index: number) => {
    likeorPassAction(profiles[index].id, "interested");
  };

  const handlePass = async (index: number) => {
    likeorPassAction(profiles[index].id, "ignored");
  };

  console.log("Obtained profiles: ", data);

  const UserProfiles = profiles.map((profile) => {
    return {
      name: profile.name,
      avatar_url: profile.avatar_url,
    };
  });

  return (
    <div className="h-full w-full flex justify-center items-center">
      <ProfileCard
        profiles={UserProfiles}
        handleLike={handleLike}
        handlePass={handlePass}
      />
    </div>
  );
}
