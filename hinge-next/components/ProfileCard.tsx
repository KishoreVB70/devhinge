import { Avatar } from "@/components/ui/avatar";
import { UserCardProfile } from "@/lib/schema/userSchema";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
type ProfileCardProps = {
  profile: UserCardProfile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="flex flex-row space-x-2 justify-center items-center max-h-[800px] shadow-md p-4">
      <Avatar>
        <AvatarImage
          src={profile.avatar_url}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </Avatar>
      <h1 className="text-xl">{profile.name}</h1>
    </div>
  );
}

export default ProfileCard;
