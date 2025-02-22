"use client";
import { Button } from "@/components/ui/button";
import { likeorPassAction } from "@/lib/actions/connectionAction";
import { UserFeedProfiles } from "@/lib/schema/userSchema";
import Image from "next/image";
import React, { useState } from "react";

type FeedCardProps = {
  profiles: UserFeedProfiles;
};

function FeedCard({ profiles }: FeedCardProps) {
  const [index, setIndex] = useState(0);
  const image_url = profiles[index].avatar_url;
  const name = profiles[index].name;

  const handleLike = () => {
    likeorPassAction(profiles[index].id, "interested");
    setIndex(index + 1);
  };

  const handlePass = () => {
    likeorPassAction(profiles[index].id, "ignored");
    setIndex(index + 1);
  };

  return (
    <div className="max-w-[1200px] flex flex-col items-center max-h-screen shadow-md p-4">
      <h1 className="text-2xl">{name}</h1>
      <Image src={image_url} alt="Image" width={400} height={600} />
      <div className="w-[50%] flex justify-between mt-4">
        <Button variant={"pass"} onClick={handlePass}>
          Pass
        </Button>
        <Button variant={"like"} onClick={handleLike}>
          Like
        </Button>
      </div>
    </div>
  );
}

export default FeedCard;
