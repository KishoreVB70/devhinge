import FeedClient from "@/components/FeedWrapper";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FeedProfileCursor } from "@/lib/schema/userSchema";
import Layout from "@/components/BaseLayout";

async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feedProfiles"],
    queryFn: ({ pageParam }) => getFeedProfiles(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage: FeedProfileCursor) => lastPage.nextCursor,
  });

  return (
    <Layout page="feed">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedClient />
      </HydrationBoundary>
    </Layout>
  );
}

export default page;
