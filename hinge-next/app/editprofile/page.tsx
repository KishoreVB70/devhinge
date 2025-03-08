import EditProfileWrapper from "@/components/edit-profile/EditProfileWrapper";
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

  return <EditProfileWrapper user={user} />;
}
