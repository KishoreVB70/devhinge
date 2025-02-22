import RequestsClient from "@/components/RequestsClient";
import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export async function page() {
  const interestedProfiles = await getInterestedProfiles();
  if (!interestedProfiles) {
    return <div>No interested profiles found</div>;
  }

  return <RequestsClient interestedProfiles={interestedProfiles} />;
}

export default page;
