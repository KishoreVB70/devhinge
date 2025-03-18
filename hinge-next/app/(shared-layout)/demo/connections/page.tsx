import ConnectionsPage from "@/components/ConnectionsPage";
import { getConnectedProfilesDemo } from "@/lib/dbhelpers/demoDataHelpers";
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
    queryFn: ({ pageParam }) => getConnectedProfilesDemo(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ConnectedProfilesCursor) => lastPage?.nextPage,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConnectionsPage />
    </HydrationBoundary>
  );
}
