import Layout from "@/components/BaseLayout";
import EditProfileForm from "@/components/forms/edit-profile/EditProfileWrapper";
import { getEditableUserDetails } from "@/lib/dbhelpers/dbhelpers";

import React from "react";

export default async function EditProfile() {
  const user = await getEditableUserDetails();

  if (!user) return <div>loading...</div>;

  return (
    <Layout page="profile">
      <div className="flex flex-col items-center justify-center w-full">
        <EditProfileForm user={user} />
      </div>
    </Layout>
  );
}
