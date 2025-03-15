import React from "react";

type RequestsSVGProps = {
  selected: boolean;
};

function RequestsSVG({ selected }: RequestsSVGProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        className={`size-6 ${
          selected
            ? "text-red-500 fill-red-500 lg:fill-transparent"
            : "text-black fill-transparent"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>

      <span className="hidden lg:block font-medium text-gray-700">
        View Matches
      </span>
    </>
  );
}

export default RequestsSVG;
