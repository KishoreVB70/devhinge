import ProfileSVG from "@/components/svgs/ProfileSVG";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SimpleProfile } from "@/lib/schema/userSchema";
import Link from "next/link";
import React from "react";
type ProfileListingProps = {
  profile: SimpleProfile;
};
function ProfileListing({ profile }: ProfileListingProps) {
  return (
    <Link
      href={`/user/${profile.id}`}
      className={`py-2 space-x-2 cursor-pointer flex flex-row items-center shadow-lg border border-gray-100`}
    >
      <Avatar className="ml-2 h-16 w-16">
        <AvatarImage
          src={profile.avatar_url}
          alt="avatar"
          className="object-cover"
        />
        <AvatarFallback>
          <ProfileSVG selected={false} />
        </AvatarFallback>
      </Avatar>
      <h1 className="font-semibold text-black text-2xl">{profile.name}</h1>
    </Link>
  );
}

export default ProfileListing;
