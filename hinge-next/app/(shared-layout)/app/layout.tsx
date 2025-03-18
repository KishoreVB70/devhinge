"use client";
import { useDemoStore } from "@/lib/store/useDemoStore";
import React, { Suspense, useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsDemo } = useDemoStore();
  useEffect(() => {
    setIsDemo(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
