import React from "react";
import Image from "next/image";
import { ArrowUpFromLine } from "lucide-react";
import { FeedProfile } from "@/lib/schema/userSchema";

type BasicProfileProps = {
  profile: FeedProfile;
  setBasicView: (v: boolean) => void;
};

function BasicProfile({ profile, setBasicView }: BasicProfileProps) {
  return (
    <>
      <h1 className="z-50 absolute bottom-16 left-10 text-2xl font-bold text-white">
        {profile.name} {profile.age}
      </h1>
      <div className="relative w-[400px] h-[600px]">
        <Image
          src={profile.avatar_url}
          className="rounded-3xl"
          alt="Image"
          width={400}
          height={600}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[33%] bg-gradient-to-t from-black via-black/70 to-transparent rounded-b-3xl"></div>
      </div>

      {/* View profile button */}
      <button
        onClick={() => setBasicView(false)}
        className="absolute w-9 h-9 right-5 bottom-28 border-2 border-gray-200 hover:border-gray-300 flex flex-col items-center justify-center rounded-full group"
      >
        <ArrowUpFromLine className="w-5 h-5 text-gray-200" />
      </button>
    </>
  );
}

export default BasicProfile;
