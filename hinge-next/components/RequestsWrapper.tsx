"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { modifyConnectionAction } from "@/lib/actions/connectionAction";
import React, { useState } from "react";
import NoProfilesFound from "@/components/NoProfilesFound";
import useInterestedProfiles from "@/lib/hooks/useInterestedProfiles";
function RequestsClient() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInterestedProfiles();
  const [isDepleted, setIsDepleted] = useState(false);

  if (isLoading) return <div>Loading...</div>;

  const profiles = data?.pages.flatMap((page) => page.profiles);

  if (!profiles || isError || profiles.length === 0 || isDepleted)
    return <NoProfilesFound message="No Connection Requests Found" />;

  const handleNext = (index: number) => {
    if (index >= Math.floor((profiles.length - 1) / 2) && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleAction = (index: number, action: "accepted" | "rejected") => {
    modifyConnectionAction(profiles[index].id, action);
    if (index < profiles.length - 1) {
      handleNext(index);
    } else {
      setIsDepleted(true);
    }
  };

  return (
    <div className="h-[83%] lg:h-full w-full flex justify-center items-center">
      <ProfileCard
        profiles={profiles}
        handleAction={handleAction}
        actions={["rejected", "accepted"]}
      />
    </div>
  );
}

export default RequestsClient;
