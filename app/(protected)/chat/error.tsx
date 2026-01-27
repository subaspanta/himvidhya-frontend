"use client";

export default function ChatError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-full min-h-[40vh] items-center justify-center bg-white text-black">
      <div className="text-center">
        <p className="text-red-600 font-medium mb-3">Something went wrong.</p>
        <pre className="text-sm text-gray-700 mb-4">{error.message}</pre>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
