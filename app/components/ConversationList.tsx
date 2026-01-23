"use client";

import React, { useState, useMemo } from "react";
import { mockConversations } from "@/app/data/mockData";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  selectedId?: string | null;
  onSelectConversation?: (id: string) => void;
}

export default function ConversationList({
  selectedId,
  onSelectConversation,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Use provided selectedId or default to first conversation
  const currentSelectedId = selectedId ?? mockConversations[0]?.id ?? "";

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    return mockConversations.filter((conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleSelect = (id: string) => {
    if (onSelectConversation) {
      onSelectConversation(id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-jet_black-300">
      {/* Search Section */}
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

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.length > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center h-full text-jet_black-700 text-sm">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
}
