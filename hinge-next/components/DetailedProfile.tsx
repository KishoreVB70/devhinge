import { FeedProfile } from "@/lib/schema/userSchema";
import Image from "next/image";
import React from "react";
import { ArrowDownFromLine, Globe } from "lucide-react";
import MultiItemsView from "@/components/MultiItemsView";

type DetailedProfileProps = {
  profile: FeedProfile;
  setBasicView?: (v: boolean) => void;
};

function DetailedProfile({ profile, setBasicView }: DetailedProfileProps) {
  return (
    <div className="fixed inset-0 z-20 lg:static overflow-y-auto pb-12 lg:pb-6 bg-gray-200 flex flex-col items-center lg:shadow-2xl lg:w-[400px] lg:h-[600px]">
      {/* Gradient */}
      <div className="hidden lg:block z-50 absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-gray-300/80 via-gray-300/40 to-transparent"></div>

      {/* Name, Age, Downbutton */}
      <div className="flex top-0 sticky z-10 bg-white flex-row py-2 items-center w-[100%] px-4 justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <p className="font-semibold text-2xl">{profile.name}</p>
          <p className="text-2xl">{profile.age}</p>
        </div>
        {setBasicView && (
          <button
            onClick={() => setBasicView(true)}
            className="w-9 h-9 right-5 p-1 bottom-28 border-2 border-red-500 hover:border-red-600 flex flex-col items-center justify-center rounded-full group"
          >
            <ArrowDownFromLine className="w-5 h-5 text-red-500" />
          </button>
        )}
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
      <div className="bg-white rounded-xl w-full flex flex-col items-center space-y-4 mt-2 p-3">
        {/* Gender Display */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
          {profile.gender}
        </div>
        <span className="block w-[75%] h-px bg-gray-300"></span>

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
        <div className="mt-2 rounded-xl space-y-2 bg-white p-3 w-full text-center text-gray-800">
          <p className="font-semibold text-sm">About me</p>
          <p className="text-sm">{profile.bio}</p>
        </div>
      )}

      {/* Experience and website */}
      <div className="bg-white rounded-xl p-4 w-full flex flex-col items-center space-y-2 mt-2">
        {/* Experience Years */}
        {profile.experience_years && (
          <div className="w-full mt-2 text-gray-700 text-center flex flex-row items-center justify-center">
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
            className="text-blue-500 mt-2 hover:underline flex items-center space-x-1"
          >
            <Globe className="w-5 h-5 text-blue-500" />
            <span>Visit Website</span>
          </a>
        )}
      </div>

      {/* Skills and hobbies */}
      {profile.skills && profile.skills.length > 0 && (
        <MultiItemsView type="Skills" items={profile.skills} />
      )}
      {profile.hobbies && profile.hobbies.length > 0 && (
        <MultiItemsView type="Hobbies" items={profile.hobbies} />
      )}
    </div>
  );
}

export default DetailedProfile;
