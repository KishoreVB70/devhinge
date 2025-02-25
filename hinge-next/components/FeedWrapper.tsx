"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { likeorPassAction } from "@/lib/actions/connectionAction";
import useFeedProfiles from "@/lib/hooks/useFeedProfiles";
import { FeedUser } from "@/lib/schema/userSchema";
import React from "react";
type RequestsClientProps = {
  feedProfiles: FeedUser;
};

export default function FeedWrapper({ feedProfiles }: RequestsClientProps) {
  const { data, isLoading, isError, prefetch, mergeQuery } =
    useFeedProfiles(feedProfiles);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: loading data</div>;
  }

  if (data.length === 0) {
    return <div>No Profiles Found</div>;
  }

  const handleIncrement = async (index: number) => {
    if (index === 6) {
      prefetch();
    } else if (index === feedProfiles.length - 1) {
      mergeQuery();
    }
  };

  const handleLike = (index: number) => {
    likeorPassAction(feedProfiles[index].id, "interested");
    handleIncrement(index);
  };

  const handlePass = (index: number) => {
    likeorPassAction(feedProfiles[index].id, "ignored");
    handleIncrement(index);
  };
  console.log("Obtained profiles: ", data);

  const profiles = data.map((profile) => {
    return {
      name: profile.name,
      avatar_url: profile.avatar_url,
    };
  });

  return (
    <div className="h-full w-full flex justify-center items-center">
      <ProfileCard
        profiles={profiles}
        handleLike={handleLike}
        handlePass={handlePass}
      />
    </div>
  );
}
