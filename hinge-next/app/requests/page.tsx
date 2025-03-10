import RequestsClient from "@/components/RequestsWrapper";
import SideBar from "@/components/SideBar";
import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export default async function page() {
  const interestedProfiles = await getInterestedProfiles();

  return (
    <div className="h-screen flex w-full">
      <SideBar page="requests" />
      <RequestsClient interestedProfiles={interestedProfiles} />
    </div>
  );
}
