import SideBar from "@/components/SideBarWrapper";
import Image from "next/image";
import React, { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen overflow-y-hidden">
      {/* Only on Mobile layout */}
      <div className="relative h-[4%] block lg:hidden w-[115px] ml-2 my-2">
        <Image fill src="/tindertext.png" alt="logo" />
      </div>
      <div className="h-[96%] lg:h-full flex w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <SideBar />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </div>
  );
}
