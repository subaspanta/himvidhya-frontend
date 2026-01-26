"use client";

import React, { useState } from "react";
import { mockConversations } from "@/app/data/mockData";
import ChatLayout from "@/app/layouts/ChatLayout";
import AppSidebar from "../components/AppSidebar";
import ConversationList from "../components/ConversationList";
import ChatArea from "../components/ChatArea";
import ChatDetailsPanel from "../components/ChatDetailsPanel";

export default function ChatPageLayout({}: { children: React.ReactNode }) {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(mockConversations[0]?.id || null);
  const [showDetails, setShowDetails] = useState(false);

  // Get selected conversation from mock data
  const selectedConversation =
    mockConversations.find((c) => c.id === selectedConversationId) || null;

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <ChatLayout
      sidebar={<AppSidebar navItems={[]} />}
      conversationList={
        <ConversationList
          selectedId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
        />
      }
      chatArea={
        <ChatArea
          conversation={selectedConversation}
          onToggleDetails={handleToggleDetails}
        />
      }
      detailsPanel={<ChatDetailsPanel conversation={selectedConversation} />}
      showDetails={showDetails}
    />
  );
}
