import DetailedProfile from "@/components/DetailedProfile";
import SideBar from "@/components/SideBarWrapper";
import { getUser } from "@/lib/dbhelpers/dbhelpers";
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: PageProps) {
  const { id } = await params;

  const profile = await getUser(id);

  if (!profile) {
    return (
      <div>
        Profile not found, you search for a non existent profile, try again, go
        back to home
      </div>
    );
  }

  return (
    <div className="h-screen flex w-full">
      <SideBar />
      <div className="relative flex items-center justify-center w-full">
        <div className="relative w-[400px] h-[600px]">
          <DetailedProfile profile={profile} />
        </div>
      </div>
    </div>
  );
}
