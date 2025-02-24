import FeedClient from "@/components/FeedClient";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

async function page() {
  const feedProfiles = await getFeedProfiles();

  if (!feedProfiles || feedProfiles.length === 0) {
    return <div>Unable to obtain feed</div>;
  }

  return <FeedClient feedProfiles={feedProfiles} />;
}

export default page;
