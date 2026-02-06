"use client";

import React, { useState, useMemo } from "react";
import { Conversation } from "@/features/chat/types";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations?: Conversation[];
  selectedId?: string | null;
  onSelectConversation?: (id: string) => void;
  isLoading?: boolean;
}

export default function ConversationList({
  conversations = [],
  selectedId,
  onSelectConversation,
  isLoading = false,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Use provided selectedId or default to first conversation
  const currentSelectedId = selectedId ?? conversations[0]?.id ?? "";

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [conversations, searchQuery]);

  const handleSelect = (id: string) => {
    if (onSelectConversation) {
      onSelectConversation(id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-jet_black-300">
      <div className="flex-shrink-0 p-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-jet_black-700 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-jet_black-500 text-alabaster_grey-900 rounded-lg text-sm placeholder-jet_black-700 focus:outline-none focus:ring-1 focus:ring-majorelle_blue-500 transition-all"
            aria-label="Search conversations"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-majorelle_blue-500 mx-auto mb-2"></div>
              <p className="text-jet_black-700 text-sm">
                Loading conversations...
              </p>
            </div>
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="flex flex-col">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={currentSelectedId === conversation.id}
                onSelect={() => handleSelect(conversation.id)}
              />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex items-center justify-center h-full px-6">
            <div className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-alabaster_grey-900 font-medium mb-1">
                No conversations yet
              </h3>
              <p className="text-jet_black-700 text-sm">
                Start a new conversation to get chatting
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full px-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-alabaster_grey-900 font-medium mb-1">
                No results found
              </h3>
              <p className="text-jet_black-700 text-sm">
                Try searching with a different keyword
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
