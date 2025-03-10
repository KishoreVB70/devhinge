import FeedSVG from "@/components/feed/FeedSVG";
import NavigationButtons from "@/components/NavigationButtons";
import ProfileCard from "@/components/ProfileCard";
import { UserProfile } from "@/lib/schema/userSchema";
import React from "react";

type ConnectionsPageProps = {
  profiles: UserProfile[] | null;
  totalConnections: number;
};

function ConnectionsPage({ profiles, totalConnections }: ConnectionsPageProps) {
  if (!profiles || profiles.length === 0) {
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

  const cardProfiles = profiles.map((profile) => {
    return {
      name: profile.name,
      avatar_url: profile.avatar_url,
    };
  });
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-4">
        {cardProfiles.map((profile) => (
          <ProfileCard key={profile.name} profile={profile} />
        ))}
      </div>
      <NavigationButtons totalConnections={totalConnections} />
    </div>
  );
}

export default ConnectionsPage;
