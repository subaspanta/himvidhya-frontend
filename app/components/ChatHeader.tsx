"use client";

import React from "react";
import { Conversation } from "@/app/data/mockData";

interface ChatHeaderProps {
  conversation: Conversation | null;
  onToggleDetails?: () => void;
}

export default function ChatHeader({
  conversation,
  onToggleDetails,
}: ChatHeaderProps) {
  if (!conversation) {
    return (
      <header className="h-14 border-b border-jet_black-600 bg-jet_black-200 px-4 flex items-center">
        <span className="text-jet_black-700 text-sm">
          Select a conversation
        </span>
      </header>
    );
  }

  // Count online members
  const onlineCount = conversation.participants.filter(
    (p) => p.status === "online",
  ).length;
  const totalMembers = conversation.participants.length;

  // Get status text
  const statusText = conversation.isGroup
    ? `${totalMembers} members, ${onlineCount} online`
    : conversation.participants[0]?.status || "offline";

  return (
    <header className="h-14 border-b border-jet_black-600 bg-jet_black-200 px-4 flex items-center justify-between gap-2 min-w-0">
      {/* Left: Name and Status */}
      <div className="flex flex-col min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-alabaster_grey-900 truncate">
          {conversation.name}
        </h3>
        <p className="text-xs text-jet_black-700 capitalize truncate">
          {statusText}
        </p>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Search */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-jet_black-700 hover:bg-jet_black-400 hover:text-alabaster_grey-800 transition-colors"
          aria-label="Search in conversation"
          title="Search"
        >
          🔍
        </button>

        {/* Phone call */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-jet_black-700 hover:bg-jet_black-400 hover:text-alabaster_grey-800 transition-colors"
          aria-label="Voice call"
          title="Voice call"
        >
          📞
        </button>

        {/* Video call */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-jet_black-700 hover:bg-jet_black-400 hover:text-alabaster_grey-800 transition-colors"
          aria-label="Video call"
          title="Video call"
        >
          📹
        </button>

        {/* Screen share */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-jet_black-700 hover:bg-jet_black-400 hover:text-alabaster_grey-800 transition-colors"
          aria-label="Screen share"
          title="Screen share"
        >
          🖥️
        </button>

        {/* Toggle details */}
        <button
          onClick={onToggleDetails}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-jet_black-700 hover:bg-jet_black-400 hover:text-alabaster_grey-800 transition-colors"
          aria-label="Toggle chat details"
          title="More"
        >
          ⋮
        </button>
      </div>
    </header>
  );
}
