"use client";
import FeedSVG from "@/components/feed/FeedSVG";
import ProfileCard from "@/components/FeedProfileCard";
import { modifyConnectionAction } from "@/lib/actions/connectionAction";
import { InterestedProfiles } from "@/lib/schema/connectionSchema";
import React from "react";
type RequestsClientProps = {
  interestedProfiles: InterestedProfiles | null;
};
function RequestsClient({ interestedProfiles }: RequestsClientProps) {
  if (!interestedProfiles || interestedProfiles.length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-full text-center">
        {/* Empty State Illustration */}
        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 shadow-lg rounded-xl border border-gray-200">
          {/* Message */}
          <p className="text-lg font-semibold text-gray-700">
            No Interested Profiles Found
          </p>
          <p className="text-gray-500">
            Check back later or explore new connections.
          </p>

          {/* Explore More Button */}
          <FeedSVG variant="page" />
        </div>
      </div>
    );
  }

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
