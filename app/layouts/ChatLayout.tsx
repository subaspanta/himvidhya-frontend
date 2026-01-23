"use client";

import React, { useState } from "react";
import { Conversation } from "@/app/data/mockData";

interface ChatLayoutProps {
  sidebar: React.ReactNode;
  conversationList: React.ReactNode;
  chatArea: React.ReactNode;
  detailsPanel?: React.ReactNode;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  sidebar,
  conversationList,
  chatArea,
  detailsPanel,
  showDetails = false,
  onToggleDetails,
}) => {
  return (
    <div className="flex h-screen w-full bg-jet_black-100">
      {/* Panel 1: App Sidebar */}
      <aside className="w-sidebar flex-shrink-0 bg-jet_black-200 border-r border-jet_black-600">
        {sidebar}
      </aside>

      {/* Panel 2: Conversation List */}
      <aside className="w-conversations flex-shrink-0 bg-jet_black-300 border-r border-jet_black-600 flex flex-col">
        {conversationList}
      </aside>

      {/* Panel 3: Main Chat Area */}
      <main className="flex-1 flex flex-col bg-jet_black-100 min-w-0">
        {chatArea}
      </main>

      {/* Panel 4: Chat Details Panel (toggleable) */}
      {showDetails && detailsPanel && (
        <aside className="w-[22rem] max-w-[22rem] flex-shrink-0 bg-jet_black-300 border-l border-jet_black-600 overflow-y-auto z-10">
          {detailsPanel}
        </aside>
      )}
    </div>
  );
};

export default ChatLayout;
