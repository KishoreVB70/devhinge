import SideBar from "@/components/SideBarWrapper";
import Image from "next/image";
import React, { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen">
      {/* Only on Mobile layout */}
      <div className="relative h-[5%] block lg:hidden w-[115px] ml-2 mb-1">
        <Image fill src="/devconnectwording.webp" alt="logo" />
      </div>
      <div className="h-full lg:h-full flex w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <SideBar />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
