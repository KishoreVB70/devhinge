import { FeedProfile } from "@/lib/schema/userSchema";
import Image from "next/image";
import React from "react";
import { ArrowDownFromLine, Globe } from "lucide-react";
import MultiItemsView from "@/components/MultiItemsView";

type DetailedProfileProps = {
  profile: FeedProfile;
  setBasicView: (v: boolean) => void;
};

function DetailedProfile({ profile, setBasicView }: DetailedProfileProps) {
  return (
    <div className="overflow-y-auto space-y-3 pt-3 pb-16  flex flex-col items-center  shadow-2xl w-[400px] h-[600px]">
      {/* Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-gray-300/80 via-gray-300/40 to-transparent"></div>

      {/* Name, Age, Downbutton */}
      <div className="flex flex-row items-center w-[90%] justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <p className="font-semibold text-2xl">{profile.name}</p>
          <p className="text-2xl">{profile.age}</p>
        </div>
        <button
          onClick={() => setBasicView(true)}
          className="w-9 h-9 right-5 p-1 bottom-28 border-2 border-red-500 hover:border-red-600 flex flex-col items-center justify-center rounded-full group"
        >
          <ArrowDownFromLine className="w-5 h-5 text-red-500" />
        </button>
      </div>
      {/* Profile Image */}
      <Image
        src={profile.avatar_url}
        width={400}
        height={400} // Original height
        alt="Profile Image"
        priority
        className="object-cover h-[450px] w-[400px] rounded-lg"
      />

      {/* Gender & Gender Preference */}
      <div className="w-full flex flex-col items-center space-y-4 p-4">
        {/* Gender Display */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          {profile.gender}
        </div>

        {/* Gender Preference Section */}
        <div className="w-full flex flex-col items-center">
          <p className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
            Interested In
          </p>
          <div className="flex gap-2 flex-wrap justify-center mt-2">
            {profile.gender_preference?.map((pref, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 px-4 py-1 rounded-lg text-sm font-medium shadow-sm transition-all hover:scale-105"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {profile.bio && (
        <div className="bg-gray-100 p-3 rounded-sm w-full text-center text-gray-800">
          <p className="font-semibold text-sm">Bio</p>
          <p className="text-sm">{profile.bio}</p>
        </div>
      )}

      {/* Experience Years */}
      {profile.experience_years && (
        <div className="w-full text-gray-700 text-center flex flex-row items-center justify-center">
          <p className="font-semibold pr-1">Experience:</p>
          <p>{profile.experience_years} years</p>
        </div>
      )}

      {/* Website URL */}
      {profile.website_url && (
        <a
          href={profile.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline flex items-center space-x-1"
        >
          <Globe className="w-5 h-5 text-blue-500" />
          <span>Visit Website</span>
        </a>
      )}

      {/* Skills and hobbies */}
      {profile.skills && (
        <MultiItemsView type="Skills" items={profile.skills} />
      )}
      {profile.hobbies && (
        <MultiItemsView type="Hobbies" items={profile.hobbies} />
      )}
    </div>
  );
}

export default DetailedProfile;
