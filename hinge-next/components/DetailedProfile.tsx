import { FeedProfile } from "@/lib/schema/userSchema";
import Image from "next/image";
import React from "react";
import { ArrowDownFromLine } from "lucide-react";

// 1) Name, Age, Downbutton
// 2) Image
// 3)

type DetailedProfileProps = {
  profile: FeedProfile;
  setBasicView: (v: boolean) => void;
};

function DetailedProfile({ profile, setBasicView }: DetailedProfileProps) {
  return (
    <div className="flex flex-col justify-center items-center shadow-2xl w-[400px] h-[600px]">
      <div className="flex flex-row space-x-2">
        <p>{profile.name}</p>
        <p>{profile.age}</p>
        <button
          onClick={() => setBasicView(true)}
          className="right-5 bottom-28 border-2 border-red-500 hover:border-red-600 flex flex-col items-center justify-center rounded-full group"
        >
          <ArrowDownFromLine className="w-5 h-5 text-red-500" />
        </button>
      </div>
      {/* Todo: Shrink the size of the image with correct aspect ratio */}
      <Image src={profile.avatar_url} alt="Image" width={300} height={500} />
    </div>
  );
}

export default DetailedProfile;
