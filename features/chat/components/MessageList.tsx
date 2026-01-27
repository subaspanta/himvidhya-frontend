"use client";

import React, { useRef, useEffect } from "react";
import { Message, currentUser, mockUsers } from "@/features/chat/api/mockData";

interface MessageListProps {
  messages: Message[];
  isGroup?: boolean;
}

// Mock reactions for demonstration
const mockReactions: Record<string, { emoji: string; count: number }[]> = {
  "msg-1": [{ emoji: "😍", count: 2 }],
  "msg-3": [
    { emoji: "😆", count: 1 },
    { emoji: "❤️", count: 2 },
  ],
};

// Mock read counts
const mockReadCounts: Record<string, number> = {
  "msg-4": 3,
  "msg-5": 3,
};

export default function MessageList({
  messages,
  isGroup = false,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Get sender info from mock users
  const getSender = (senderId: string) => {
    return mockUsers.find((u) => u.id === senderId);
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-jet_black-100">
        <p className="text-jet_black-700 text-sm">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-jet_black-100 scrollbar-thin">
      <div className="flex flex-col gap-3">
        {messages.map((message, index) => {
          const isMe = message.senderId === currentUser.id;
          const sender = getSender(message.senderId);
          const reactions = mockReactions[message.id] || [];
          const readCount = mockReadCounts[message.id];

          // Show sender name if group chat and different sender from previous
          const prevMessage = messages[index - 1];
          const showSenderName =
            isGroup && !isMe && prevMessage?.senderId !== message.senderId;

          return (
            <div
              key={message.id}
              className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar for received messages */}
              {!isMe && (
                <div className="flex-shrink-0 self-end">
                  {showSenderName || index === 0 ? (
                    <img
                      src={sender?.avatar || "https://i.pravatar.cc/150?img=99"}
                      alt={sender?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8" /> // Spacer for alignment
                  )}
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`flex flex-col max-w-xs md:max-w-sm lg:max-w-md ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                {/* Sender name for group chats */}
                {showSenderName && (
                  <span className="text-xs text-jet_black-700 mb-1 ml-1">
                    {sender?.name || "Unknown"}
                  </span>
                )}

                {/* Message content */}
                <div
                  className={`px-3 py-2 ${
                    isMe
                      ? "bg-majorelle_blue-500 text-white rounded-2xl rounded-br-sm"
                      : "bg-jet_black-400 text-alabaster_grey-900 rounded-2xl rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm break-words">{message.text}</p>
                </div>

                {/* Reactions row */}
                {reactions.length > 0 && (
                  <div className="flex items-center gap-1 mt-0.5 ml-1">
                    {reactions.map((r, i) => (
                      <span key={i} className="text-xs">
                        {r.emoji}
                      </span>
                    ))}
                  </div>
                )}

                {/* Timestamp and read receipt */}
                <div className="flex items-center gap-1.5 mt-0.5 px-1">
                  <span className="text-[10px] text-jet_black-700">
                    {formatTime(message.timestamp)}
                  </span>
                  {readCount && (
                    <span className="flex items-center gap-0.5 text-[10px] text-jet_black-700">
                      <span>👁</span>
                      <span>{readCount}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Avatar for sent messages (on right) */}
              {isMe && (
                <div className="flex-shrink-0 self-end">
                  <img
                    src={currentUser.avatar}
                    alt="You"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
