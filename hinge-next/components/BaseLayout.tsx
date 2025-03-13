import SideBar from "@/components/SideBar";
import { Page } from "@/lib/types";
import React from "react";

type LayoutProps = {
  page: Page;
  children: React.ReactElement;
};

function Layout({ children, page }: LayoutProps) {
  return (
    <>
      <div className="block w-screen md:hidden">
        <h1>Dev connect</h1>
      </div>
      <div className="h-[90%] lg:h-screen flex w-screen">
        <SideBar page={page} />
        {children}
      </div>
    </>
  );
}

export default Layout;
