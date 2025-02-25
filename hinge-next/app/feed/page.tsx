import FeedClient from "@/components/FeedWrapper";
import SideBar from "@/components/SideBar";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { FeedUser } from "@/lib/schema/userSchema";
import React from "react";

async function page() {
  let feedProfiles: FeedUser = [];

  try {
    feedProfiles = await getFeedProfiles(false);
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
