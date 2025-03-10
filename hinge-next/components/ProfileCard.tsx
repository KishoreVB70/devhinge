import { Avatar } from "@/components/ui/avatar";
import { SimpleProfile } from "@/lib/schema/userSchema";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react";
type ProfileCardProps = {
  profile: SimpleProfile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link
      href={`/user/${profile.id}`}
      className=" cursor-pointer flex flex-row space-x-2 justify-center items-center max-h-[800px] shadow-md p-4"
    >
      <Avatar>
        <AvatarImage
          src={profile.avatar_url}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </Avatar>
      <h1 className="text-xl">{profile.name}</h1>
    </Link>
  );
}

export default ProfileCard;
