import EditProfileForm from "@/components/forms/edit-profile/EditProfileWrapper";
import { getEditableUserDetailsDemo } from "@/lib/dbhelpers/demoDataHelpers";

import React from "react";

export default async function EditProfile() {
  const user = await getEditableUserDetailsDemo();

  if (!user) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-y-hidden">
      <EditProfileForm user={user} />
    </div>
  );
}
