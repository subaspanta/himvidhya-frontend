"use client";

import React, { useState } from "react";
import { Conversation } from "@/features/chat/types";
import ChatLayout from "@/components/layout/ChatLayout";
import AppSidebar from "@/features/chat/components/AppSidebar";
import ConversationList from "@/features/chat/components/ConversationList";
import ChatArea from "@/features/chat/components/ChatArea";
import ChatDetailsPanel from "@/features/chat/components/ChatDetailsPanel";

export default function ChatPageLayout({}: { children: React.ReactNode }) {
  // TODO: Replace with API calls
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Get from auth context
  const currentUserId = "current-user-id";

  // Get selected conversation
  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) || null;

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSendMessage = (text: string) => {
    console.log("Sending message:", text);
    // TODO: Implement API call to send message
    // After sending, update conversations state
  };

  // TODO: Fetch conversations on mount
  // useEffect(() => {
  //   const fetchConversations = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await conversationApi.getAll();
  //       setConversations(data);
  //       if (data.length > 0) {
  //         setSelectedConversationId(data[0].id);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch conversations:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchConversations();
  // }, []);

  return (
    <ChatLayout
      sidebar={<AppSidebar navItems={[]} />}
      conversationList={
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
          isLoading={isLoading}
        />
      }
      chatArea={
        <ChatArea
          conversation={selectedConversation}
          currentUserId={currentUserId}
          onToggleDetails={handleToggleDetails}
          onSendMessage={handleSendMessage}
        />
      }
      detailsPanel={<ChatDetailsPanel conversation={selectedConversation} />}
      showDetails={showDetails}
    />
  );
}
