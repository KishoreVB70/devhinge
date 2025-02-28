import ProfileImageUploadForm from "@/components/auth/signup/ProfileImageUpload";
import React from "react";

function EditProfile() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <ProfileImageUploadForm />
    </div>
  );
}

export default EditProfile;
