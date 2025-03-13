import React from "react";

type ConnectionsSVGProps = {
  selected: boolean;
};

export default function ConnectionsSVG({ selected }: ConnectionsSVGProps) {
  return (
    <>
      <svg
        className={`w-6 h-6 ${selected ? "text-red-500" : "text-black"}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm14 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM5 15c-2.21 0-4 1.79-4 4v2h6v-2c0-2.21-1.79-4-4-4zm14 0c-2.21 0-4 1.79-4 4v2h6v-2c0-2.21-1.79-4-4-4zm-7-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"
        />
      </svg>

      <span className="hidden lg:block lg:font-medium lg:text-gray-700">
        View Connections
      </span>
    </>
  );
}
