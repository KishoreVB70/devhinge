"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { likeorPassAction } from "@/lib/actions/connectionAction";
import useFeedProfiles from "@/lib/hooks/useFeedProfiles";
import React from "react";

export default function FeedWrapper() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useFeedProfiles();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: loading data</div>;
  }

  const profiles = data.pages?.flatMap((page) => page.profiles);

  if (profiles.length === 0) {
    return <div>No profiles found</div>;
  }

  const handleNext = (index: number) => {
    if (index >= Math.floor((profiles.length - 1) / 2) && hasNextPage) {
      fetchNextPage();
    }
  };

  // TODO: consolidate the following two functions into one
  const handleLike = (index: number) => {
    likeorPassAction(profiles[index].id, "interested");
    handleNext(index);
  };

  const handlePass = async (index: number) => {
    likeorPassAction(profiles[index].id, "ignored");
    handleNext(index);
  };

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
