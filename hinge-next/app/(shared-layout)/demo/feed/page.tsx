import FeedClient from "@/components/FeedWrapper";
import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FeedProfileCursor } from "@/lib/schema/userSchema";
import { getFeedProfilesDemo } from "@/lib/dbhelpers/demoDataHelpers";

async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feedProfiles"],
    queryFn: ({ pageParam }) => getFeedProfilesDemo(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage: FeedProfileCursor) => lastPage.nextCursor,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedClient />
    </HydrationBoundary>
  );
}

export default page;
