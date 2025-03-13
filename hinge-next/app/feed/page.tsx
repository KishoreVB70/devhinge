import FeedClient from "@/components/FeedWrapper";
import SideBar from "@/components/SideBar";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FeedProfileCursor } from "@/lib/schema/userSchema";

async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feedProfiles"],
    queryFn: ({ pageParam }) => getFeedProfiles(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage: FeedProfileCursor) => lastPage.nextCursor,
  });

  return (
    <>
      <div className="block w-screen md:hidden">
        <h1>Dev connect</h1>
      </div>
      <div className="h-[90%] lg:h-screen flex w-screen">
        <SideBar page="feed" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FeedClient />
        </HydrationBoundary>
      </div>
    </>
  );
}

export default page;
