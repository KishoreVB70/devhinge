import Link from "next/link";
import React from "react";

type SVGLinkProps = {
  href: string;
  children: React.ReactElement;
};

function SVGLink({ children, href }: SVGLinkProps) {
  return (
    <Link
      href={href}
      className="flex flex-row justify-center items-center gap-3 w-full px-4 py-3 lg:bg-gray-100 lg:hover:bg-gray-200 transition-all lg:rounded-lg lg:shadow-sm"
    >
      {children}
    </Link>
  );
}

export default SVGLink;
