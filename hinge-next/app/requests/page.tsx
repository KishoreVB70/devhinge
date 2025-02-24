import RequestsClient from "@/components/RequestsWrapper";
import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export default async function page() {
  const interestedProfiles = await getInterestedProfiles();
  if (!interestedProfiles) {
    return <div>No interested profiles found</div>;
  }

  return <RequestsClient interestedProfiles={interestedProfiles} />;
}
