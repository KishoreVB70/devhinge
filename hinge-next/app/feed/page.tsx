import FeedClient from "@/components/FeedWrapper";
import SideBar from "@/components/SideBar";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

async function page() {
  const feedProfiles = await getFeedProfiles();

  if (!feedProfiles || feedProfiles.length === 0) {
    return <div>No Profiles Found</div>;
  }

  return (
    <div className="h-screen flex w-full">
      <SideBar />
      <FeedClient feedProfiles={feedProfiles} />
    </div>
  );
}

export default page;
