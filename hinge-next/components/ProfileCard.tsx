// import { Avatar } from "@/components/ui/avatar";
import { SimpleProfile } from "@/lib/schema/userSchema";
// import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type ProfileCardProps = {
  profile: SimpleProfile;
};

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link
      href={`/user/${profile.id}`}
      className="rounded-lg relative cursor-pointer flex flex-col justify-center items-center shadow-lg border border-gray-300"
    >
      <h1 className="absolute bottom-5 left-5 font-semibold text-white text-2xl z-10">
        {profile.name}
      </h1>
      <Image
        src={profile.avatar_url}
        className="w-[220px] h-[300px] object-cover"
        alt="Image"
        width={220}
        height={300}
      />
      <div className="absolute inset-x-0 bottom-0 h-[33%] bg-gradient-to-t from-black via-black/70 to-transparent rounded-sm"></div>
    </Link>
  );
  // Mobile Profile
  // return (
  //   <Link
  //     href={`/user/${profile.id}`}
  //     className="cursor-pointer flex flex-row space-x-2 justify-center items-center max-h-[800px] shadow-md p-4"
  //   >
  //     <Avatar>
  //       <AvatarImage
  //         src={profile.avatar_url}
  //         alt="avatar"
  //         className="w-full h-full object-cover"
  //       />
  //     </Avatar>
  //     <h1 className="text-2xl">{profile.name}</h1>
  //   </Link>
  // );
}

export default ProfileCard;
