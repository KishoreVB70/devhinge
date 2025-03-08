"use client";

import React from "react";
import { zUpdatableUser } from "@/lib/schema/userSchema";
import { z } from "zod";
import InputWithLimit from "@/components/forms/edit-profile/InputWithLimit";
import { MAX_BIO_LENGTH, MAX_WEBSITE_LENGTH } from "@/lib/constants";
import { Input } from "@/components/ui/input";

type UpdatableUser = z.infer<typeof zUpdatableUser>;
type EditProfileProps = {
  user: UpdatableUser;
};

export default function EditProfileForm({ user }: EditProfileProps) {
  const [bio, setBio] = React.useState(user.bio || "");
  const [website, setWebsite] = React.useState(user.website || "");
  return (
    <div className="w-3/12 flex flex-col space-y-4">
      {/* Bio */}
      <InputWithLimit
        value={bio}
        setValue={setBio}
        maxLength={MAX_BIO_LENGTH}
        label="Bio"
      />

      {/* WebsiteURl */}
      <InputWithLimit
        value={website}
        setValue={setWebsite}
        maxLength={MAX_WEBSITE_LENGTH}
        label="Website"
      />

      {/* Age */}
      <p>Age</p>
      <Input type="number" />

      {/* Experience */}
      <p>Experience</p>
      <Input type="number" />
    </div>
  );
}
