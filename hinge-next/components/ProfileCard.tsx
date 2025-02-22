"use client";
import { Button } from "@/components/ui/button";
import { UserCardProfiles } from "@/lib/schema/userSchema";
import Image from "next/image";
import React, { useState } from "react";

type ProfileCardProps = {
  profiles: UserCardProfiles;
  handleLike: (index: number) => void;
  handlePass: (index: number) => void;
};

function ProfileCard({ profiles, handleLike, handlePass }: ProfileCardProps) {
  const [index, setIndex] = useState(0);
  const image_url = profiles[index].avatar_url;
  const name = profiles[index].name;

  // TODO: Clear doubt on what would happen if I unmount component on handleLike, will it still increment index?
  return (
    <div className="max-w-[1200px] flex flex-col items-center max-h-screen shadow-md p-4">
      <h1 className="text-2xl">{name}</h1>
      <Image src={image_url} alt="Image" width={400} height={600} />
      <div className="w-[50%] flex justify-between mt-4">
        <Button
          variant={"pass"}
          onClick={() => {
            handlePass(index);
            setIndex(index + 1);
          }}
        >
          Pass
        </Button>
        <Button
          variant={"like"}
          onClick={() => {
            handleLike(index);
            setIndex(index + 1);
          }}
        >
          Like
        </Button>
      </div>
    </div>
  );
}

export default ProfileCard;
