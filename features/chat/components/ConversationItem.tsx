"use client";

import React from "react";
import { Conversation } from "@/features/chat/types";
import Image from "next/image";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
  isPinned?: boolean;
}

export default function ConversationItem({
  conversation,
  isSelected,
  onSelect,
  isPinned = false,
}: ConversationItemProps) {
  // Format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d`;

    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Get online status indicator
  const participantStatus = conversation.participants[0]?.status || "offline";
  const statusColors: Record<string, string> = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-jet_black-600",
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full px-4 py-2.5 transition-colors flex items-center gap-3 ${
        isSelected
          ? "bg-jet_black-500"
          : "bg-jet_black-300 hover:bg-jet_black-400"
      }`}
      aria-label={`Conversation with ${conversation.name}`}
      aria-pressed={isSelected}
    >
      {/* Avatar with status indicator */}
      <div className="relative shrink-0">
        <Image
          src={conversation.avatar}
          alt={conversation.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        {/* Online status indicator */}
        {!conversation.isGroup && (
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-jet_black-300 ${statusColors[participantStatus]}`}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        {/* Name row */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-alabaster_grey-900 truncate">
            {conversation.name}
          </h3>
          {conversation.isGroup && (
            <span className="text-[10px] text-jet_black-700">
              {conversation.participants.length}
            </span>
          )}
        </div>

        {/* Last message */}
        <div className="flex items-center gap-1">
          {/* Read indicator */}
          {conversation.unreadCount === 0 && (
            <span className="text-[10px] text-majorelle_blue-500">✓</span>
          )}
          <p className="text-xs text-jet_black-700 truncate flex-1">
            {conversation.lastMessage}
          </p>
        </div>
      </div>

      {/* Right side: Time, Pin, Unread */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        {/* Time */}
        <span className="text-[11px] text-jet_black-700">
          {formatTime(conversation.lastMessageTime)}
        </span>

        {/* Pin or Unread badge */}
        <div className="flex items-center gap-1.5">
          {isPinned && (
            <span className="text-[10px] text-jet_black-700">📌</span>
          )}
          {conversation.unreadCount > 0 && (
            <div className="min-w-4 h-4 bg-majorelle_blue-500 rounded-full flex items-center justify-center px-1">
              <span className="text-[10px] font-bold text-white">
                {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
