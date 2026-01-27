export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  email?: string;
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

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "online",
    email: "alex@example.com",
  },
  {
    id: "user-2",
    name: "Sarah Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "online",
    email: "sarah@example.com",
  },
  {
    id: "user-3",
    name: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "away",
    email: "mike@example.com",
  },
  {
    id: "user-4",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    status: "offline",
    email: "emma@example.com",
  },
  {
    id: "user-5",
    name: "James Brown",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "online",
    email: "james@example.com",
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-1",
    text: "Hey! How are you doing?",
    timestamp: Date.now() - 300000,
    read: true,
    type: "text",
  },
  {
    id: "msg-2",
    senderId: "user-2",
    text: "I'm doing great, thanks for asking!",
    timestamp: Date.now() - 240000,
    read: true,
    type: "text",
  },
  {
    id: "msg-3",
    senderId: "user-1",
    text: "Want to grab coffee later?",
    timestamp: Date.now() - 180000,
    read: true,
    type: "text",
  },
  {
    id: "msg-4",
    senderId: "user-2",
    text: "Sure! How about 3 PM?",
    timestamp: Date.now() - 120000,
    read: true,
    type: "text",
  },
  {
    id: "msg-5",
    senderId: "user-1",
    text: "Perfect! See you then.",
    timestamp: Date.now() - 60000,
    read: true,
    type: "text",
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Perfect! See you then.",
    lastMessageTime: Date.now() - 60000,
    unreadCount: 0,
    participants: [mockUsers[0]],
    messages: mockMessages,
    isGroup: false,
  },
  {
    id: "conv-2",
    name: "Sarah Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Sounds good to me!",
    lastMessageTime: Date.now() - 420000,
    unreadCount: 2,
    participants: [mockUsers[1]],
    messages: [
      {
        id: "msg-6",
        senderId: "user-2",
        text: "Did you finish the project?",
        timestamp: Date.now() - 600000,
        read: true,
        type: "text",
      },
      {
        id: "msg-7",
        senderId: "user-2",
        text: "Sounds good to me!",
        timestamp: Date.now() - 420000,
        read: false,
        type: "text",
      },
    ],
    isGroup: false,
  },
  {
    id: "conv-3",
    name: "Team Project",
    avatar: "https://i.pravatar.cc/150?img=10",
    lastMessage: "Great work everyone!",
    lastMessageTime: Date.now() - 900000,
    unreadCount: 0,
    participants: [mockUsers[2], mockUsers[3], mockUsers[4]],
    messages: [
      {
        id: "msg-8",
        senderId: "user-3",
        text: "Let's sync up tomorrow",
        timestamp: Date.now() - 1200000,
        read: true,
        type: "text",
      },
      {
        id: "msg-9",
        senderId: "user-4",
        text: "I'll prepare the slides",
        timestamp: Date.now() - 1000000,
        read: true,
        type: "text",
      },
      {
        id: "msg-10",
        senderId: "user-5",
        text: "Great work everyone!",
        timestamp: Date.now() - 900000,
        read: true,
        type: "text",
      },
    ],
    isGroup: true,
  },
  {
    id: "conv-4",
    name: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Thanks! You too.",
    lastMessageTime: Date.now() - 1500000,
    unreadCount: 0,
    participants: [mockUsers[2]],
    messages: [
      {
        id: "msg-11",
        senderId: "user-3",
        text: "Have a great day!",
        timestamp: Date.now() - 1800000,
        read: true,
        type: "text",
      },
      {
        id: "msg-12",
        senderId: "user-3",
        text: "Thanks! You too.",
        timestamp: Date.now() - 1500000,
        read: true,
        type: "text",
      },
    ],
    isGroup: false,
  },
  {
    id: "conv-5",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "See you soon!",
    lastMessageTime: Date.now() - 2400000,
    unreadCount: 1,
    participants: [mockUsers[3]],
    messages: [
      {
        id: "msg-13",
        senderId: "user-4",
        text: "Are you coming to the event?",
        timestamp: Date.now() - 3000000,
        read: true,
        type: "text",
      },
      {
        id: "msg-14",
        senderId: "user-4",
        text: "See you soon!",
        timestamp: Date.now() - 2400000,
        read: false,
        type: "text",
      },
    ],
    isGroup: false,
  },
];

// Mock Media
export const mockMedia: MediaItem[] = [
  {
    id: "media-1",
    type: "image",
    url: "https://picsum.photos/300/300?random=1",
    timestamp: Date.now() - 86400000,
  },
  {
    id: "media-2",
    type: "image",
    url: "https://picsum.photos/300/300?random=2",
    timestamp: Date.now() - 172800000,
  },
  {
    id: "media-3",
    type: "video",
    url: "https://picsum.photos/300/300?random=3",
    timestamp: Date.now() - 259200000,
  },
];

// Mock Files
export const mockFiles: FileItem[] = [
  {
    id: "file-1",
    name: "project-proposal.pdf",
    size: 2048576,
    type: "pdf",
    url: "#",
    timestamp: Date.now() - 86400000,
  },
  {
    id: "file-2",
    name: "budget-2024.xlsx",
    size: 1048576,
    type: "xlsx",
    url: "#",
    timestamp: Date.now() - 172800000,
  },
  {
    id: "file-3",
    name: "presentation.pptx",
    size: 5242880,
    type: "pptx",
    url: "#",
    timestamp: Date.now() - 259200000,
  },
];

// Current user (for reference in UI)
export const currentUser: User = {
  id: "current-user",
  name: "You",
  avatar: "https://i.pravatar.cc/150?img=99",
  status: "online",
  email: "you@example.com",
};
