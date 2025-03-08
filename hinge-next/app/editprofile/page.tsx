import EditProfileForm from "@/components/edit-profile/EditProfileWrapperKaapy";
import { getEditableUserDetails } from "@/lib/dbhelpers/dbhelpers";

import React from "react";

export default async function EditProfile() {
  const user = await getEditableUserDetails();
  /*
    1) Age
    Experience
    Avatar
    
    Gender
    Gender Preference

    Website

    *1) Bio
    2) Interests
    Hobbies
   */

  if (!user) return <div>loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <EditProfileForm user={user} />{" "}
    </div>
  );
}
