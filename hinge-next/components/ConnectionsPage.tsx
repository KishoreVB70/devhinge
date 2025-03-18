"use client";
import { useConnectedProfiles } from "@/lib/hooks/useConnectedProfiles";
import React, { useEffect, useRef } from "react";
import NoProfilesFound from "@/components/NoProfilesFound";
import ProfileListing from "@/components/ProfileListing";

export default function ConnectionsPage() {
  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useConnectedProfiles();
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || isError) {
    return <div>Retry</div>;
  }
  console.log(data);
  const profiles = data.pages.flatMap((page) => page.profiles);

  if (profiles.length === 0)
    return <NoProfilesFound message="No Connected Profiles Found" />;

  return (
    <div className="w-full h-[83vh] lg:w-[400px] lg:h-[600px] flex flex-col overflow-y-auto lg:mx-auto lg:my-auto border border-gray-100 pb-4">
      <div className="flex flex-col space-y-4 w-full">
        {data?.pages.map((page) =>
          page.profiles.map((profile) => (
            <ProfileListing key={profile.name} profile={profile} />
          ))
        )}
        {hasNextPage && (
          <div ref={observerRef} className="h-8 bg-transparent"></div>
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
