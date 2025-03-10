import FeedSVG from "@/components/feed/FeedSVG";
import ProfileCard from "@/components/ProfileCard";
import { useConnectedProfiles } from "@/lib/hooks/useConnectedProfiles";
import React from "react";

export default function SConnectionsPage() {
  const { data, isError, isLoading } = useConnectedProfiles();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Retry</div>;
  }

  const profiles = data.pages?.flatMap((page) => page.profiles);

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-full text-center">
        {/* Empty State Illustration */}
        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 shadow-lg rounded-xl border border-gray-200">
          {/* Message */}
          <p className="text-lg font-semibold text-gray-700">
            No Connections Found
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

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-4 gap-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.name} profile={profile} />
        ))}
      </div>
    </div>
  );
}
