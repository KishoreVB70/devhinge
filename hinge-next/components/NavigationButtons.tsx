// Required to be a client due to router.push to change pages
"use client";
import { Button } from "@/components/ui/button";
import { CONNECTIONS_PER_PAGE } from "@/lib/constants";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

function NavigationButtons({ totalProfiles }: { totalProfiles: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page") || 1);

  return (
    <div className="w-[50%] flex justify-between mt-4">
      {page > 1 && (
        <Button
          onClick={() => {
            router.push(`?page=${page - 1}`);
          }}
        >
          Previous
        </Button>
      )}

      {totalProfiles > page * CONNECTIONS_PER_PAGE && (
        <Button
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
