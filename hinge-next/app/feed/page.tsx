import FeedCard from "@/components/FeedCard";
import React from "react";

async function page() {
  const feedProfiles = await getFeedProfiles();
  return (
    <div className="flex justify-center items-center">
      <FeedCard />
    </div>
  );
}

export default page;
