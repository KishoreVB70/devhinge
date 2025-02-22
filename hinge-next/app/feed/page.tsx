import FeedCard from "@/components/FeedCard";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

async function page() {
  const feedProfiles = await getFeedProfiles();
  if (!feedProfiles) {
    return <div>Unable to obtain feed</div>;
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <FeedCard profiles={feedProfiles} />
    </div>
  );
}

export default page;
