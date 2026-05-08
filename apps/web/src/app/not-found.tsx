import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-semibold">404 — Page Not Found</h2>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Back to home
      </Link>
    </main>
  );
}
