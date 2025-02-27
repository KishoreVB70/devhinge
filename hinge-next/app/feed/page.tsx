import FeedClient from "@/components/FeedWrapper";
import SideBar from "@/components/SideBar";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { FeedUserCursor } from "@/lib/schema/userSchema";
import React from "react";

async function page() {
  let feedProfiles: FeedUserCursor = { profiles: [], nextCursor: null };

  try {
    feedProfiles = await getFeedProfiles(null);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="h-screen flex w-full">
      <SideBar />
      <FeedClient feedProfiles={feedProfiles} />
    </div>
  );
}

export default page;
