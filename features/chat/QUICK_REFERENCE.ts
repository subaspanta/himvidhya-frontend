// =============================================================================
// 1. FETCH CONVERSATIONS (in chat layout)
// =============================================================================

// import { useEffect, useState } from 'react';
// import { getConversations } from '@/features/chat/api';

// const [conversations, setConversations] = useState<Conversation[]>([]);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   const fetchConversations = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getConversations();
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

// =============================================================================
// 2. SEND MESSAGE
// =============================================================================

// import { sendMessage } from '@/features/chat/api';
// import { toast } from 'react-hot-toast';

// const handleSendMessage = async (text: string) => {
//   if (!selectedConversationId || !text.trim()) return;

//   try {
//     const newMessage = await sendMessage(selectedConversationId, text);

//     // Update conversations state with new message
//     setConversations(prevConvs =>
//       prevConvs.map(conv => {
//         if (conv.id === selectedConversationId) {
//           return {
//             ...conv,
//             messages: [...conv.messages, newMessage],
//             lastMessage: text,
//             lastMessageTime: Date.now(),
//           };
//         }
//         return conv;
//       })
//     );
//   } catch (error) {
//     console.error('Failed to send message:', error);
//     toast.error('Failed to send message');
//   }
// };

// =============================================================================
// 3. REAL-TIME UPDATES WITH SOCKET.IO
// =============================================================================

// import { useEffect } from 'react';
// import { socket } from '@/lib/socket/socket';

// useEffect(() => {
//   if (!selectedConversationId) return;

//   // Join conversation room
//   socket.emit('join-conversation', selectedConversationId);

//   // Listen for new messages
//   const handleNewMessage = (message: Message) => {
//     setConversations(prevConvs =>
//       prevConvs.map(conv => {
//         if (conv.id === selectedConversationId) {
//           return {
//             ...conv,
//             messages: [...conv.messages, message],
//             lastMessage: message.text,
//             lastMessageTime: message.timestamp,
//           };
//         }
//         return conv;
//       })
//     );
//   };

//   socket.on('new-message', handleNewMessage);

//   // Cleanup
//   return () => {
//     socket.off('new-message', handleNewMessage);
//     socket.emit('leave-conversation', selectedConversationId);
//   };
// }, [selectedConversationId]);

// =============================================================================
// 4. GET CURRENT USER FROM AUTH
// =============================================================================

// import { useAuth } from '@/features/auth/hooks/useAuth';

// const { user } = useAuth();
// const currentUserId = user?.id;

// =============================================================================
// 5. SEARCH USERS
// =============================================================================

// import { searchUsers } from '@/features/chat/api';
// import { useState } from 'react';

// const [searchQuery, setSearchQuery] = useState('');
// const [searchResults, setSearchResults] = useState<User[]>([]);

// const handleSearch = async (query: string) => {
//   setSearchQuery(query);
//   if (query.length < 2) {
//     setSearchResults([]);
//     return;
//   }
//
//   try {
//     const results = await searchUsers(query);
//     setSearchResults(results);
//   } catch (error) {
//     console.error('Search failed:', error);
//   }
// };

// =============================================================================
// 6. CREATE NEW CONVERSATION
// =============================================================================

// import { createConversation } from '@/features/chat/api';

// const handleCreateConversation = async (userId: string) => {
//   try {
//     const newConv = await createConversation([userId], false);
//     setConversations(prev => [newConv, ...prev]);
//     setSelectedConversationId(newConv.id);
//     toast.success('Conversation started');
//   } catch (error) {
//     console.error('Failed to create conversation:', error);
//     toast.error('Failed to start conversation');
//   }
// };

// =============================================================================
// 7. MARK AS READ
// =============================================================================

// import { markAsRead } from '@/features/chat/api';

// useEffect(() => {
//   if (!selectedConversationId) return;
//
//   // Mark as read when opening conversation
//   markAsRead(selectedConversationId).catch(console.error);
//
//   // Update unread count in state
//   setConversations(prevConvs =>
//     prevConvs.map(conv =>
//       conv.id === selectedConversationId
//         ? { ...conv, unreadCount: 0 }
//         : conv
//     )
//   );
// }, [selectedConversationId]);

// =============================================================================
// 8. TYPING INDICATOR
// =============================================================================

// import { useEffect, useState } from 'react';

// const [isTyping, setIsTyping] = useState(false);
// let typingTimeout: NodeJS.Timeout;

// const handleTyping = () => {
//   if (!selectedConversationId) return;
//
//   // Emit typing event
//   socket.emit('typing', { conversationId: selectedConversationId });
//
//   // Clear existing timeout
//   clearTimeout(typingTimeout);
//
//   // Stop typing after 2 seconds of inactivity
//   typingTimeout = setTimeout(() => {
//     socket.emit('stop-typing', { conversationId: selectedConversationId });
//   }, 2000);
// };

// // Listen for typing from others
// useEffect(() => {
//   socket.on('user-typing', ({ userId }) => {
//     if (userId !== currentUserId) {
//       setIsTyping(true);
//       setTimeout(() => setIsTyping(false), 3000);
//     }
//   });
//
//   return () => {
//     socket.off('user-typing');
//   };
// }, [currentUserId]);

// =============================================================================
// 9. WITH REACT QUERY (Optional but Recommended)
// =============================================================================

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getConversations, sendMessage } from '@/features/chat/api';

// // Fetch conversations
// const { data: conversations, isLoading } = useQuery({
//   queryKey: ['conversations'],
//   queryFn: getConversations,
// });

// // Send message mutation
// const queryClient = useQueryClient();
// const sendMessageMutation = useMutation({
//   mutationFn: ({ conversationId, text }: { conversationId: string; text: string }) =>
//     sendMessage(conversationId, text),
//   onSuccess: () => {
//     // Invalidate and refetch
//     queryClient.invalidateQueries({ queryKey: ['conversations'] });
//   },
// });

// // Usage
// const handleSendMessage = (text: string) => {
//   if (selectedConversationId) {
//     sendMessageMutation.mutate({ conversationId: selectedConversationId, text });
//   }
// };

// =============================================================================
// 10. ERROR HANDLING WITH CUSTOM HOOK
// =============================================================================

// import { useErrorResponse } from '@/lib/hooks/useErrorResponse';

// // Use with mutations
// const mutation = useMutation({
//   mutationFn: sendMessage,
// });

// // Automatically shows error toast
// useErrorResponse(mutation.error);

// // Or with custom handling
// useErrorResponse(mutation.error, {
//   onError: (error) => {
//     if (error.response?.status === 403) {
//       // Handle permission denied
//       router.push('/login');
//     }
//   },
// });

// =============================================================================
// COMPLETE EXAMPLE: Chat Layout with All Features
// =============================================================================

// "use client";

// import React, { useState, useEffect } from "react";
// import { Conversation } from "@/features/chat/types";
// import { getConversations, sendMessage, markAsRead } from "@/features/chat/api";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { socket } from "@/lib/socket/socket";
// import { toast } from "react-hot-toast";
// import ChatLayout from "@/components/layout/ChatLayout";
// import AppSidebar from "@/features/chat/components/AppSidebar";
// import ConversationList from "@/features/chat/components/ConversationList";
// import ChatArea from "@/features/chat/components/ChatArea";
// import ChatDetailsPanel from "@/features/chat/components/ChatDetailsPanel";

// export default function ChatPageLayout() {
//   const { user } = useAuth();
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const currentUserId = user?.id;
//   const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || null;

//   // Fetch conversations on mount
//   useEffect(() => {
//     const fetchConversations = async () => {
//       setIsLoading(true);
//       try {
//         const data = await getConversations();
//         setConversations(data);
//         if (data.length > 0) {
//           setSelectedConversationId(data[0].id);
//         }
//       } catch (error) {
//         console.error('Failed to fetch conversations:', error);
//         toast.error('Failed to load conversations');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchConversations();
//   }, []);

//   // Socket.IO real-time updates
//   useEffect(() => {
//     if (!selectedConversationId) return;

//     socket.emit('join-conversation', selectedConversationId);

//     const handleNewMessage = (message: Message) => {
//       setConversations(prevConvs =>
//         prevConvs.map(conv => {
//           if (conv.id === selectedConversationId) {
//             return {
//               ...conv,
//               messages: [...conv.messages, message],
//               lastMessage: message.text,
//               lastMessageTime: message.timestamp,
//             };
//           }
//           return conv;
//         })
//       );
//     };

//     socket.on('new-message', handleNewMessage);

//     return () => {
//       socket.off('new-message', handleNewMessage);
//       socket.emit('leave-conversation', selectedConversationId);
//     };
//   }, [selectedConversationId]);

//   // Mark as read when selecting conversation
//   useEffect(() => {
//     if (!selectedConversationId) return;
//
//     markAsRead(selectedConversationId).catch(console.error);
//
//     setConversations(prevConvs =>
//       prevConvs.map(conv =>
//         conv.id === selectedConversationId
//           ? { ...conv, unreadCount: 0 }
//           : conv
//       )
//     );
//   }, [selectedConversationId]);

//   const handleToggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   const handleSendMessage = async (text: string) => {
//     if (!selectedConversationId || !text.trim()) return;
//
//     try {
//       const newMessage = await sendMessage(selectedConversationId, text);
//
//       setConversations(prevConvs =>
//         prevConvs.map(conv => {
//           if (conv.id === selectedConversationId) {
//             return {
//               ...conv,
//               messages: [...conv.messages, newMessage],
//               lastMessage: text,
//               lastMessageTime: Date.now(),
//             };
//           }
//           return conv;
//         })
//       );
//     } catch (error) {
//       console.error('Failed to send message:', error);
//       toast.error('Failed to send message');
//     }
//   };

//   return (
//     <ChatLayout
//       sidebar={<AppSidebar navItems={[]} />}
//       conversationList={
//         <ConversationList
//           conversations={conversations}
//           selectedId={selectedConversationId}
//           onSelectConversation={setSelectedConversationId}
//           isLoading={isLoading}
//         />
//       }
//       chatArea={
//         <ChatArea
//           conversation={selectedConversation}
//           currentUserId={currentUserId}
//           onToggleDetails={handleToggleDetails}
//           onSendMessage={handleSendMessage}
//         />
//       }
//       detailsPanel={<ChatDetailsPanel conversation={selectedConversation} />}
//       showDetails={showDetails}
//     />
//   );
// }
