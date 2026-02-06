"use client";

import React, { useRef, useEffect } from "react";
import { Message, User } from "@/features/chat/types";

interface MessageListProps {
  messages: Message[];
  isGroup?: boolean;
  currentUserId?: string;
  participants?: User[];
}

export default function MessageList({
  messages,
  isGroup = false,
  currentUserId,
  participants = [],
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

  // Get sender info from participants
  const getSender = (senderId: string) => {
    return participants.find((u) => u.id === senderId);
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-jet_black-100">
        <div className="text-center px-6">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="text-alabaster_grey-900 font-medium mb-1">
            No messages yet
          </h3>
          <p className="text-jet_black-700 text-sm">
            Be the first to send a message
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-jet_black-100 scrollbar-thin">
      <div className="flex flex-col gap-3">
        {messages.map((message, index) => {
          const isMe = currentUserId
            ? message.senderId === currentUserId
            : false;
          const sender = getSender(message.senderId);

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
                      src={sender?.avatar || "/images/default-avatar.png"}
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

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 mt-0.5 px-1">
                  <span className="text-[10px] text-jet_black-700">
                    {formatTime(message.timestamp)}
                  </span>
                  {isMe && message.read && (
                    <span className="text-[10px] text-majorelle_blue-500">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>

              {/* Avatar for sent messages (on right) */}
              {isMe && sender && (
                <div className="flex-shrink-0 self-end">
                  <img
                    src={sender.avatar || "/images/default-avatar.png"}
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
