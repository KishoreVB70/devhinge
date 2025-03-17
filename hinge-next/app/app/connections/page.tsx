import ConnectionsPage from "@/components/ConnectionsPage";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { ConnectedProfilesCursor } from "@/lib/schema/connectionSchema";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["connectedProfiles"],
    queryFn: ({ pageParam }) => getConnectedProfiles(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ConnectedProfilesCursor | null) =>
      lastPage?.nextPage,
  });

  return <ConnectionsPage />;
}
