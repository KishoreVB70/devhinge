import ConnectionsPage from "@/components/ConnectionsPage";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { ConnectedProfilesCursor } from "@/lib/schema/connectionSchema";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["connectedProfilesDemo"],
    queryFn: ({ pageParam }) => getConnectedProfiles(pageParam, true),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ConnectedProfilesCursor | null) =>
      lastPage?.nextPage,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConnectionsPage />
    </HydrationBoundary>
  );
}
