"use client";

import React from "react";
import { zUpdatableUser } from "@/lib/schema/userSchema";
import { z } from "zod";
import InputWithLimit from "@/components/edit-profile/InputWithLimit";
import { MAX_BIO_LENGTH } from "@/lib/constants";

type UpdatableUser = z.infer<typeof zUpdatableUser>;
type EditProfileProps = {
  user: UpdatableUser;
};

function EditProfileWrapper({ user }: EditProfileProps) {
  const [bio, setBio] = React.useState(user.bio || "");
  const [website, setWebsite] = React.useState(user.website || "");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <InputWithLimit
        value={bio}
        setValue={setBio}
        maxLength={MAX_BIO_LENGTH}
        label="Bio"
      />
      <InputWithLimit
        value={website}
        setValue={setWebsite}
        maxLength={MAX_BIO_LENGTH}
        label="Bio"
      />
    </div>
  );
}

export default EditProfileWrapper;
