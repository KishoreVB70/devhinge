import Layout from "@/components/BaseLayout";
import SConnectionsPage from "@/components/ConnectionsPage";
import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
// import { InterestedProfilesCursor } from "@/lib/schema/connectionSchema";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => getConnectedProfiles(pageParam),
    initialPageParam: 0,
    // getNextPageParam: (lastPage: InterestedProfilesCursor) => lastPage.nextPage,
  });

  return (
    <Layout page="connections">
      <SConnectionsPage />
    </Layout>
  );
}
