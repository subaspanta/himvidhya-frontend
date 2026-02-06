"use client";

import React, { useState } from "react";
import { Conversation, MediaItem, FileItem } from "@/features/chat/types";
import Image from "next/image";

interface ChatDetailsPanelProps {
  conversation: Conversation | null;
  onClose?: () => void;
  media?: MediaItem[];
  files?: FileItem[];
  links?: LinkItem[];
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

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
  media = [],
  files = [],
  links = [],
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

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-4 border-b border-jet_black-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-alabaster_grey-900">
                Photos and Videos
              </h4>
              <span className="text-xs text-jet_black-700">{media.length}</span>
            </div>
            {media.length > 0 && (
              <button className="text-xs text-majorelle_blue-500 hover:text-majorelle_blue-600 transition-colors">
                See all
              </button>
            )}
          </div>
          {media.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5">
              {media.slice(0, 6).map((mediaItem: MediaItem) => (
                <div
                  key={mediaItem.id}
                  className="relative aspect-square rounded-md bg-jet_black-400 overflow-hidden"
                >
                  <Image
                    src={mediaItem.url}
                    alt="Media"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                  {mediaItem.type === "video" && (
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1 rounded">
                      ▶
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-jet_black-700 text-center py-4">
              No media shared yet
            </p>
          )}
        </div>

        <div className="p-4 border-b border-jet_black-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-alabaster_grey-900">
                Shared Files
              </h4>
              <span className="text-xs text-jet_black-700">{files.length}</span>
            </div>
            {files.length > 0 && (
              <button className="text-xs text-majorelle_blue-500 hover:text-majorelle_blue-600 transition-colors">
                See all
              </button>
            )}
          </div>
          {files.length > 0 ? (
            <div className="flex flex-col gap-2">
              {files.slice(0, 3).map((file: FileItem) => {
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
                      <p className="text-[10px] text-jet_black-700">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-jet_black-700 text-center py-4">
              No files shared yet
            </p>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-alabaster_grey-900">
                Shared Links
              </h4>
              <span className="text-xs text-jet_black-700">{links.length}</span>
            </div>
            {links.length > 0 && (
              <button className="text-xs text-majorelle_blue-500 hover:text-majorelle_blue-600 transition-colors">
                See all
              </button>
            )}
          </div>
          {links.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-start gap-2.5 py-1 cursor-pointer group"
                >
                  <span className="text-base">{link.favicon || "🔗"}</span>
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
          ) : (
            <p className="text-xs text-jet_black-700 text-center py-4">
              No links shared yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
