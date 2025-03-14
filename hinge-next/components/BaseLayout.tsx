import SideBar from "@/components/SideBar";
import { Page } from "@/lib/types";
import React from "react";

type LayoutProps = {
  page: Page;
  children: React.ReactElement;
};

function Layout({ children, page }: LayoutProps) {
  return (
    <div className="h-screen w-screen">
      {/* Only on Mobile layout */}
      <div className="block mb-2 lg:mb-0 lg:hidden w-screen">
        <h1>Dev connect</h1>
      </div>
      <div className="h-full lg:h-screen flex w-screen">
        <SideBar page={page} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
