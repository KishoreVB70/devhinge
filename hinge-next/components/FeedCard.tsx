import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function FeedCard() {
  return (
    <div className="max-w-[1200px] flex flex-col items-center max-h-screen shadow-md p-4">
      <Image src="/devconnect.webp" alt="Image" width={700} height={800} />
      <div className="w-[50%] flex justify-between mt-4">
        <Button variant={"pass"}>Pass</Button>
        <Button variant={"like"}>Like</Button>
      </div>
    </div>
  );
}

export default FeedCard;
