"use client";

import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage?: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-14 border-t border-jet_black-600 bg-jet_black-200 px-4 flex items-center gap-3"
    >
      {/* Attachment button (left) */}
      <button
        type="button"
        className="w-8 h-8 rounded-full flex items-center justify-center text-jet_black-700 hover:text-alabaster_grey-800 hover:bg-jet_black-400 transition-colors"
        aria-label="Attach file"
        title="Attach file"
        disabled={disabled}
      >
        📎
      </button>

      {/* Message input */}
      <input
        type="text"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 px-4 py-2 bg-transparent text-alabaster_grey-900 text-sm placeholder-jet_black-700 focus:outline-none disabled:opacity-50"
        aria-label="Message input"
      />

      {/* Microphone button (right) */}
      <button
        type="button"
        className="w-8 h-8 rounded-full flex items-center justify-center text-jet_black-700 hover:text-alabaster_grey-800 hover:bg-jet_black-400 transition-colors"
        aria-label="Voice message"
        title="Voice message"
        disabled={disabled}
      >
        🎤
      </button>
    </form>
  );
}
