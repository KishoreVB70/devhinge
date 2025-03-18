"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { likeorPassAction } from "@/lib/actions/connectionAction";
import useFeedProfiles from "@/lib/hooks/useFeedProfiles";
import { useDemoStore } from "@/lib/store/useDemoStore";
import React from "react";

export default function FeedWrapper() {
  const { isDemo } = useDemoStore();
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

  const handleAction = (index: number, action: "interested" | "ignored") => {
    if (!isDemo) {
      likeorPassAction(profiles[index].id, action);
    }
    handleNext(index);
  };

  return (
    // 83% instead of 90% to prevent buttons from overflowing
    <div className="h-[83%] lg:h-full w-full flex justify-center items-center">
      <ProfileCard
        profiles={profiles}
        handleAction={handleAction}
        actions={["ignored", "interested"]}
      />
    </div>
  );
}
