"use client";
import InputWithLimit from "@/components/edit-profile/InputWithLimit";
import { Label } from "@/components/ui/label";
import { MAX_BIO_LENGTH } from "@/lib/constants";
import React from "react";

type BioInputProps = {
  bio: string;
  setBio: (bio: string) => void;
};

function BioInput({ bio, setBio }: BioInputProps) {
  return (
    <div className="w-3/12">
      <Label>Bio</Label>
      <InputWithLimit
        value={bio}
        setValue={setBio}
        maxLength={MAX_BIO_LENGTH}
      />
    </div>
  );
}

export default BioInput;
