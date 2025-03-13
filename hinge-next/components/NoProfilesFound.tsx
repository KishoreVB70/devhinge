import FeedSVG from "@/components/svgs/FeedSVG";
import SVGLink from "@/components/svgs/SVGLink";
import React from "react";

type NoProfilesFoundProps = {
  message: string;
};

function NoProfilesFound({ message }: NoProfilesFoundProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center h-full text-center">
      <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 shadow-lg rounded-xl border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">{message}</p>
        <p className="text-gray-500">
          Check back later or explore new profiles.
        </p>
        <SVGLink variant="page" href="/feed">
          <FeedSVG variant="page" />
        </SVGLink>
      </div>
    </div>
  );
}

export default NoProfilesFound;
