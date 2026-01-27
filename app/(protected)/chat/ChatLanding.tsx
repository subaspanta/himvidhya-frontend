"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatLanding() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const startNewChat = async () => {
    if (isStarting) return;
    setIsStarting(true);
    try {
      // TODO: create a conversation via API, then navigate to /chat/[id]
      // For now, navigate to a placeholder route
      router.push("/chat/new");
    } catch (e) {
      console.error("Failed to start new chat", e);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <main className="flex h-full min-h-[60vh] items-center justify-center bg-white text-black">
      <div className="max-w-md w-full px-6 py-8 rounded-lg border border-gray-200 bg-white">
        <h1 className="text-2xl font-semibold mb-2">Welcome to Chat</h1>
        <p className="text-sm text-gray-600 mb-6">
          Select a conversation from the sidebar or start a new one.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={startNewChat}
            disabled={isStarting}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {isStarting ? "Starting…" : "Start new chat"}
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
          >
            Go to Home
          </button>
        </div>
      </div>
    </main>
  );
}
