import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex lg:items-center mt-12 lg:mt-0 justify-center min-h-screen p-4 lg:px-0 w-full">
      {children}
    </div>
  );
}
