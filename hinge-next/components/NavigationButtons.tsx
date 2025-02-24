// Required to be a client due to router.push to change pages
"use client";
import { Button } from "@/components/ui/button";
import { CONNECTIONS_PER_PAGE } from "@/lib/constants";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

function NavigationButtons({ totalConnections }: { totalConnections: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);

  console.log(page * CONNECTIONS_PER_PAGE, totalConnections);

  return (
    <div className="w-[50%] flex justify-between flex-row mt-4">
      {page > 1 && (
        <Button
          onClick={() => {
            router.push(`?page=${page - 1}`);
          }}
        >
          Previous
        </Button>
      )}

      {totalConnections > page * CONNECTIONS_PER_PAGE && (
        <Button
          className="ml-auto"
          onClick={() => {
            router.push(`?page=${page + 1}`);
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
}

export default NavigationButtons;
