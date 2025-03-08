"use client";

import React from "react";
import { zUpdatableUser } from "@/lib/schema/userSchema";
import { z } from "zod";
import BioInput from "@/components/edit-profile/BioInput";

type UpdatableUser = z.infer<typeof zUpdatableUser>;
type EditProfileProps = {
  user: UpdatableUser;
};

function EditProfileWrapper({ user }: EditProfileProps) {
  const [bio, setBio] = React.useState(user && user.bio ? user.bio : "");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BioInput bio={bio} setBio={setBio} />
    </div>
  );
}

export default EditProfileWrapper;
