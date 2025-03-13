"use client";
import ProfileCard from "@/components/FeedProfileCard";
import { modifyConnectionAction } from "@/lib/actions/connectionAction";
import { FeedProfile } from "@/lib/schema/userSchema";
import React from "react";
import NoProfilesFound from "@/components/NoProfilesFound";
type RequestsClientProps = {
  profiles: FeedProfile[] | null;
};
function RequestsClient({ profiles }: RequestsClientProps) {
  if (!profiles || profiles.length === 0)
    return <NoProfilesFound message="No Connection Requests Found" />;
  const handleAction = (index: number, action: "accepted" | "rejected") => {
    modifyConnectionAction(profiles[index].id, action);
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
