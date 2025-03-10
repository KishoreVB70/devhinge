"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { modifyConnectionAction } from "@/lib/actions/connectionAction";
import { InterestedProfiles } from "@/lib/schema/connectionSchema";
import React from "react";
type RequestsClientProps = {
  interestedProfiles: InterestedProfiles;
};
function RequestsClient({ interestedProfiles }: RequestsClientProps) {
  const profiles = interestedProfiles.map((profile) => {
    return profile.sender_profile;
  });

  const handleAction = (index: number, action: "accepted" | "rejected") => {
    modifyConnectionAction(interestedProfiles[index].sender_profile.id, action);
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <ProfileCard
        profiles={profiles}
        handleAction={handleAction}
        actions={["rejected", "accepted"]}
      />
    </div>
  );
}

export default RequestsClient;
