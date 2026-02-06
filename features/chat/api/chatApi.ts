/**
 * Chat API Client
 *
 * This file contains API functions for chat features.
 * TODO: Implement actual API calls to the backend
 */

import { apiClient } from "@/lib/api/apiClient";
import { Conversation, Message, User } from "../types";

/**
 * Fetch all conversations for the current user
 */
export async function getConversations(): Promise<Conversation[]> {
  try {
    const response = await apiClient.get("/conversations");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    throw error;
  }
}

/**
 * Fetch a specific conversation by ID
 */
export async function getConversation(id: string): Promise<Conversation> {
  try {
    const response = await apiClient.get(`/conversations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch conversation ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch messages for a conversation
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
  try {
    const response = await apiClient.get(
      `/conversations/${conversationId}/messages`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch messages for conversation ${conversationId}:`,
      error,
    );
    throw error;
  }
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(
  conversationId: string,
  text: string,
): Promise<Message> {
  try {
    const response = await apiClient.post(
      `/conversations/${conversationId}/messages`,
      {
        text,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}

/**
 * Create a new conversation
 */
export async function createConversation(
  participantIds: string[],
  isGroup: boolean = false,
  name?: string,
): Promise<Conversation> {
  try {
    const response = await apiClient.post("/conversations", {
      participantIds,
      isGroup,
      name,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create conversation:", error);
    throw error;
  }
}

/**
 * Mark messages as read
 */
export async function markAsRead(conversationId: string): Promise<void> {
  try {
    await apiClient.put(`/conversations/${conversationId}/read`);
  } catch (error) {
    console.error("Failed to mark as read:", error);
    throw error;
  }
}

/**
 * Search users to start a conversation with
 */
export async function searchUsers(query: string): Promise<User[]> {
  try {
    const response = await apiClient.get("/users/search", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to search users:", error);
    throw error;
  }
}
