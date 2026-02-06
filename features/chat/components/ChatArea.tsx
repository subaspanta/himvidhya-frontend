"use client";

import React from "react";
import { Conversation } from "@/features/chat/types";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatAreaProps {
  conversation: Conversation | null;
  currentUserId?: string;
  onToggleDetails?: () => void;
  onSendMessage?: (text: string) => void;
}

export default function ChatArea({
  conversation,
  currentUserId,
  onToggleDetails,
  onSendMessage,
}: ChatAreaProps) {
  // Handle sending a new message
  const handleSendMessage = (text: string) => {
    if (onSendMessage) {
      onSendMessage(text);
    } else {
      console.log("Sending message:", text);
      // TODO: Implement actual message sending with backend
    }
  };

  // Show empty state if no conversation selected
  if (!conversation) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center bg-jet_black-100">
          <div className="text-center px-6">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-alabaster_grey-900 mb-2">
              Welcome to Chat
            </h2>
            <p className="text-jet_black-700 text-sm max-w-sm">
              Select a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <ChatHeader
        conversation={conversation}
        onToggleDetails={onToggleDetails}
      />

      {/* Messages List */}
      <MessageList
        messages={conversation.messages || []}
        isGroup={conversation.isGroup}
        currentUserId={currentUserId}
        participants={conversation.participants}
      />

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={!conversation}
      />
    </div>
  );
}
