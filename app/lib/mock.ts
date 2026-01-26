/*
 * NOTE: This file is currently used by ChatSidebar.tsx, but it duplicates functionality
 * in app/data/mockData.ts. Consider consolidating to use mockData.ts exclusively.
 *
 * This file is NOT commented out because it's actively imported, but it represents
 * duplicate code that could be cleaned up in a future refactor.
 */

export const mockConversations = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

export const mockMessages = [
  { id: "1", content: "Hello!", isMe: false },
  { id: "2", content: "Hi there 👋", isMe: true },
];
