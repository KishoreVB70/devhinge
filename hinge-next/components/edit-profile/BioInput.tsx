"use client";
import { MAX_BIO_LENGTH } from "@/lib/constants";
import React from "react";

type BioInputProps = {
  bio: string;
  setBio: (bio: string) => void;
};

function BioInput({ bio, setBio }: BioInputProps) {
  return (
    <div>
      <p>
        {bio.length}/{MAX_BIO_LENGTH}
      </p>
      <input type="text" onChange={(e) => setBio(e.target.value)} />
    </div>
  );
}

export default BioInput;
