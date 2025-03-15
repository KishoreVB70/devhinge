import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 lg:px-0 flex flex-row h-full w-full items-center justify-center">
      {children}
    </div>
  );
}
