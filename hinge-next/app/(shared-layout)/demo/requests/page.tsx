import RequestsClient from "@/components/RequestsWrapper";
import { getInterestedProfilesDemo } from "@/lib/dbhelpers/demoDataHelpers";
import { FeedProfileCursor } from "@/lib/schema/userSchema";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["interestedProfiles"],
    queryFn: ({ pageParam }) => getInterestedProfilesDemo(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage: FeedProfileCursor | null) =>
      lastPage?.nextCursor,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RequestsClient />
    </HydrationBoundary>
  );
}
