import ConnectionsPage from "@/components/ConnectionsPage";
import SideBar from "@/components/SideBar";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export default async function Page() {
  const connections = await getConnectedProfiles(1);

  return (
    <div className="h-screen flex w-full">
      <SideBar page="connections" />
      <ConnectionsPage
        profiles={connections?.profiles || null}
        totalConnections={connections?.total || 1}
      />
    </div>
  );
}
