import Layout from "@/components/BaseLayout";
import RequestsClient from "@/components/RequestsWrapper";
import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

export default async function page() {
  const interestedProfiles = await getInterestedProfiles();

  return (
    <Layout page="requests">
      <RequestsClient profiles={interestedProfiles} />
    </Layout>
  );
}
