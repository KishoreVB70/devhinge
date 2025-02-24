import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

type ConnectionsPageProps = {
  searchParams: { page?: string };
};

export default async function Page({ searchParams }: ConnectionsPageProps) {
  const page = Number(searchParams?.page) || 1;
  const connections = await getConnectedProfiles(page);

  if (!connections || connections.length === 0) {
    return <div>No Connections Found</div>;
  }

  return <div>Page</div>;
}
