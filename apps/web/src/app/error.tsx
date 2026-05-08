"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-semibold text-red-600">Something went wrong</h2>
      <p className="mt-2 text-gray-500">{error.message ?? "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  );
}
