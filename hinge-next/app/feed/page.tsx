import FeedClient from "@/components/FeedWrapper";
import SideBar from "@/components/SideBar";
import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
// import { FeedUserCursor } from "@/lib/schema/userSchema";
import React from "react";

// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { FeedUserCursor } from "@/lib/schema/userSchema";

async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feedProfiles"],
    queryFn: ({ pageParam }) => getFeedProfiles(pageParam),
    initialPageParam: "0",
    getNextPageParam: (lastPage: FeedUserCursor) => lastPage.nextCursor,
  });

  return (
    <div className="h-screen flex w-full">
      <SideBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedClient />
      </HydrationBoundary>
    </div>
  );
}

export default page;
