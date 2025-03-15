"use client";
import ProfileCard from "@/components/ProfileCard";
import { useConnectedProfiles } from "@/lib/hooks/useConnectedProfiles";
import React from "react";
import NoProfilesFound from "@/components/NoProfilesFound";

export default function ConnectionsPage() {
  const { data, isError, isLoading } = useConnectedProfiles();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Retry</div>;
  }

  const profiles = data.pages?.flatMap((page) => page.profiles);

  if (profiles.length === 0)
    return <NoProfilesFound message="No Connected Profiles Found" />;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-h-[80vh] p-4 lg:w-[50%] mx-auto my-auto overflow-y-auto">
        <div className="lg:grid lg:grid-cols-4 lg:gap-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.name} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}
