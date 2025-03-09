import { FeedProfile } from "@/lib/schema/userSchema";
import Image from "next/image";
import React from "react";

// 1) Name, Age, Downbutton
// 2) Image
// 3)

type DetailedProfileProps = {
  profile: FeedProfile;
};
function DetailedProfile({ profile }: DetailedProfileProps) {
  return (
    <div>
      <div className="flex flex-row space-x-2">
        <p>{profile.name}</p>
        <p>{profile.age}</p>
        <button>Down Button</button>
      </div>
      {/* Todo: Shrink the size of the image with correct aspect ratio */}
      <Image
        src={profile.avatar_url}
        className="rounded-3xl"
        alt="Image"
        width={300}
        height={500}
      />
    </div>
  );
}

export default DetailedProfile;
