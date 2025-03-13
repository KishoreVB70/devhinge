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
      <div className="block md:hidden w-screen">
        <h1>Dev connect</h1>
      </div>
      <div className="h-[90%] lg:h-screen flex w-screen">
        <SideBar page={page} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
