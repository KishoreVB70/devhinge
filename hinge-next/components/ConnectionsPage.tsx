"use client";
import { useConnectedProfiles } from "@/lib/hooks/useConnectedProfiles";
import React from "react";
import NoProfilesFound from "@/components/NoProfilesFound";
import ProfileListing from "@/components/ProfileListing";

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
    <div className="w-full h-[83vh] lg:w-[400px] lg:h-[600px] flex border boder-gray-100 justify-center my-2 lg:mx-auto lg:my-auto overflow-y-auto ">
      <div className="flex flex-col space-y-4 w-full">
        {profiles.map((profile) => (
          <ProfileListing key={profile.name} profile={profile} />
        ))}
      </div>
    </div>
  );
}
