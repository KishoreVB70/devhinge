"use client";
import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      {/* Error Icon & Message */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
        <h1 className="text-2xl font-semibold">Oops! Something Went Wrong</h1>
        <p className="text-gray-300 max-w-md">
          We encountered an issue while processing your request. Please try
          again later.
        </p>
        <p className="text-sm text-gray-400 italic">Error: {error.message}</p>
      </div>

      {/* Retry Button */}
      <button
        onClick={reset}
        className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all px-5 py-2 rounded-md font-semibold text-white shadow-lg"
      >
        <RefreshCcw className="w-5 h-5" />
        Retry
      </button>
    </div>
  );
}
