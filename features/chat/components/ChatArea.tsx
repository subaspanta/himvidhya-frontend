"use client";

import React from "react";
import { Conversation } from "@/features/chat/api/mockData";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface ChatAreaProps {
  conversation: Conversation | null;
  onToggleDetails?: () => void;
}

export default function ChatArea({
  conversation,
  onToggleDetails,
}: ChatAreaProps) {
  // Handle sending a new message (placeholder - will be implemented with backend)
  const handleSendMessage = (text: string) => {
    console.log("Sending message:", text);
    // TODO: Implement actual message sending with backend
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <ChatHeader
        conversation={conversation}
        onToggleDetails={onToggleDetails}
      />

      {/* Messages List */}
      {conversation ? (
        <MessageList
          messages={conversation.messages}
          isGroup={conversation.isGroup}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-jet_black-100">
          <div className="text-center">
            <p className="text-jet_black-700 text-lg mb-2">💬</p>
            <p className="text-jet_black-700 text-sm">
              Select a conversation to start chatting
            </p>
          </div>
        </div>
      )}

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={!conversation}
      />
    </div>
  );
}
