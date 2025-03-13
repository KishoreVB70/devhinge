import Link from "next/link";
import React from "react";

type ChildProps = {
  selected?: boolean;
};

type SVGLinkProps = {
  href: string;
  children: React.ReactElement<ChildProps>;
  selected: boolean;
};

function SVGLink({ children, href, selected }: SVGLinkProps) {
  return (
    <Link
      href={href}
      className="flex flex-row justify-center items-center gap-3 w-full px-4 py-3 lg:bg-gray-100 lg:hover:bg-gray-200 transition-all lg:rounded-lg lg:shadow-sm"
    >
      {React.cloneElement(children, { selected })}
    </Link>
  );
}

export default SVGLink;
