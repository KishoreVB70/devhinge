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
    return <div>No Connections Found</div>;
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
