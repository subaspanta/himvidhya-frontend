/**
 * Chat feature types
 */

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  email?: string;
  username?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  read: boolean;
  type: "text" | "image" | "file";
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  participants: User[];
  messages: Message[];
  isGroup: boolean;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  timestamp: number;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  timestamp: number;
}
