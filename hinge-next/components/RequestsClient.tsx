"use client";
import ProfileCard from "@/components/ProfileCard";
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

  const handleLike = (index: number) => {
    modifyConnectionAction(
      interestedProfiles[index].sender_profile.id,
      "accepted"
    );
  };

  const handlePass = (index: number) => {
    modifyConnectionAction(
      interestedProfiles[index].sender_profile.id,
      "rejected"
    );
  };

  return (
    <ProfileCard
      profiles={profiles}
      handleLike={handleLike}
      handlePass={handlePass}
    />
  );
}

export default RequestsClient;
