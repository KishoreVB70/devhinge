import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export async function ConnectionRequests() {
  const interestedProfiles = await getInterestedProfiles();
  console.log(interestedProfiles);
  return <div>ConnectionRequests</div>;
}

export default ConnectionRequests;
