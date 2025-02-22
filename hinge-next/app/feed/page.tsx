import FeedClient from "@/components/FeedClient";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

async function page() {
  const feedProfiles = await getFeedProfiles();

  if (!feedProfiles) {
    return <div>Unable to obtain feed</div>;
  }

  return <FeedClient feedProfiles={feedProfiles} />;
}

export default page;
