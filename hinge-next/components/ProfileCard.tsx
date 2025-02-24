import { UserCardProfile } from "@/lib/schema/userSchema";
import Image from "next/image";
import React from "react";
type ProfileCardProps = {
  profile: UserCardProfile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="max-w-[1200px] flex flex-col items-center max-h-screen shadow-md p-4">
      <h1 className="text-2xl">{profile.name}</h1>
      <Image src={profile.avatar_url} alt="Image" width={400} height={600} />
    </div>
  );
}

export default ProfileCard;
