import ConnectionsPage from "@/components/ConnectionsPage";
import SideBar from "@/components/SideBar";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { InterestedProfilesCursor } from "@/lib/schema/connectionSchema";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export default async function Page() {
  const connections = await getConnectedProfiles(1);
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => getConnectedProfiles(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: InterestedProfilesCursor) => lastPage.nextPage,
  });

  return (
    <div className="h-screen flex w-full">
      <SideBar page="connections" />
      <SConnectionsPage
        profiles={connections?.profiles || null}
        totalConnections={connections?.total || 1}
      />
    </div>
  );
}
