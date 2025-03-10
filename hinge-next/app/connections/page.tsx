import ConnectionsPage from "@/components/ConnectionsPage";
import SideBar from "@/components/SideBar";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

type ConnectionsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: ConnectionsPageProps) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const connections = await getConnectedProfiles(page);

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
