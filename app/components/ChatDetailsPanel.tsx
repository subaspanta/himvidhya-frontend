"use client";

import React, { useState } from "react";
import {
  Conversation,
  mockMedia,
  mockFiles,
  MediaItem,
  FileItem,
} from "@/app/data/mockData";

interface ChatDetailsPanelProps {
  conversation: Conversation | null;
  onClose?: () => void;
}

// Mock links for demonstration
const mockLinks = [
  {
    id: "link-1",
    title: "Economic Policy",
    url: "https://vm.tiktok.economic-policy",
    favicon: "📊",
  },
  {
    id: "link-2",
    title: "Microsoft",
    url: "https://www.microsoft.com/",
    favicon: "🪟",
  },
  {
    id: "link-3",
    title: "Contact Information",
    url: "https://vm.tiktok.economic-policy",
    favicon: "📇",
  },
  {
    id: "link-4",
    title: "Official Guide to Government",
    url: "https://www.usa.gov/",
    favicon: "🏛️",
  },
];

type TabId = "notifications" | "calendar" | "media" | "links";

const tabs: { id: TabId; icon: string; label: string }[] = [
  { id: "notifications", icon: "🔔", label: "Notifications" },
  { id: "calendar", icon: "📅", label: "Calendar" },
  { id: "media", icon: "🖼️", label: "Media" },
  { id: "links", icon: "🔗", label: "Links" },
];

export default function ChatDetailsPanel({
  conversation,
  onClose,
}: ChatDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("media");

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  // Get file icon color class based on type
  const getFileIcon = (type: string): { icon: string; color: string } => {
    switch (type) {
      case "pdf":
        return { icon: "📄", color: "text-red-400" };
      case "xlsx":
        return { icon: "📊", color: "text-green-400" };
      case "pptx":
        return { icon: "📑", color: "text-orange-400" };
      case "doc":
      case "docx":
        return { icon: "📝", color: "text-blue-400" };
      default:
        return { icon: "📁", color: "text-jet_black-700" };
    }
  };

  if (!conversation) {
    return (
      <div className="flex flex-col h-full p-4">
        <p className="text-jet_black-700 text-sm">No conversation selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with close button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-jet_black-600">
        <h3 className="text-sm font-semibold text-alabaster_grey-900">
          Chat Details
        </h3>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded flex items-center justify-center text-jet_black-700 hover:text-alabaster_grey-800 hover:bg-jet_black-400 transition-colors"
          aria-label="Close details"
        >
          ✕
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-jet_black-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === tab.id
                ? "bg-majorelle_blue-500 text-white"
                : "bg-jet_black-400 text-jet_black-700 hover:bg-jet_black-500"
            }`}
            aria-label={tab.label}
            title={tab.label}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Photos and Videos Section */}
        <div className="p-4 border-b border-jet_black-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-alabaster_grey-900">
                Photos and Videos
              </h4>
              <span className="text-xs text-jet_black-700">
                {mockMedia.length}
              </span>
            </div>
            <button className="text-xs text-majorelle_blue-500 hover:text-majorelle_blue-600 transition-colors">
              See all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {mockMedia.slice(0, 6).map((media: MediaItem, index) => (
              <div
                key={media.id}
                className="relative aspect-square rounded-md bg-jet_black-400 overflow-hidden"
              >
                <img
                  src={media.url}
                  alt="Media"
                  className="w-full h-full object-cover"
                />
                {/* Video duration overlay for last item */}
                {media.type === "video" && (
                  <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1 rounded">
                    01:56
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shared Files Section */}
        <div className="p-4 border-b border-jet_black-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-alabaster_grey-900">
                Shared Files
              </h4>
              <span className="text-xs text-jet_black-700">
                {mockFiles.length}
              </span>
            </div>
            <button className="text-xs text-majorelle_blue-500 hover:text-majorelle_blue-600 transition-colors">
              See all
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {mockFiles.slice(0, 3).map((file: FileItem) => {
              const fileStyle = getFileIcon(file.type);
              return (
                <div
                  key={file.id}
                  className="flex items-start gap-2.5 py-1 cursor-pointer group"
                >
                  <span className={`text-base ${fileStyle.color}`}>
                    {fileStyle.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-alabaster_grey-900 truncate group-hover:text-majorelle_blue-500 transition-colors">
                      {file.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shared Links Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-alabaster_grey-900">
                Shared Links
              </h4>
              <span className="text-xs text-jet_black-700">
                {mockLinks.length}
              </span>
            </div>
            <button className="text-xs text-majorelle_blue-500 hover:text-majorelle_blue-600 transition-colors">
              See all
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {mockLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-start gap-2.5 py-1 cursor-pointer group"
              >
                <span className="text-base">{link.favicon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-alabaster_grey-900 truncate group-hover:text-majorelle_blue-500 transition-colors">
                    {link.title}
                  </p>
                  <p className="text-[10px] text-jet_black-700 truncate">
                    {link.url}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
