import SideBar from "@/components/SideBar";
import { Page } from "@/lib/types";
import Image from "next/image";
import React from "react";

type LayoutProps = {
  page: Page;
  children: React.ReactElement;
};

function Layout({ children, page }: LayoutProps) {
  return (
    <div className="h-screen w-screen">
      {/* Only on Mobile layout */}
      <div className="relative h-[5%] block lg:hidden w-[115px] ml-2 mb-1">
        <Image fill src="/devconnectwording.webp" alt="logo" />
      </div>
      <div className="h-full lg:h-screen flex w-screen">
        <SideBar page={page} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
