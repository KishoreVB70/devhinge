import ConnectionsPage from "@/components/ConnectionsPage";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

type ConnectionsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: ConnectionsPageProps) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const connections = await getConnectedProfiles(page);

  return <ConnectionsPage profiles={connections} />;
}
