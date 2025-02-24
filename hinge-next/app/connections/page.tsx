import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export default async function page() {
  const connections = await getConnectedProfiles();

  if (!connections || connections.length === 0) {
    return <div>No Connections Found</div>;
  }
  return <div>page</div>;
}
