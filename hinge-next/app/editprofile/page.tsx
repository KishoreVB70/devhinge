import { getUser } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

function EditProfile() {
  // 1) Obtain the user's data from the server

  const user = getUserData();
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
  return (
    <div className="flex flex-col h-screen items-center justify-center"></div>
  );
}

export default EditProfile;
