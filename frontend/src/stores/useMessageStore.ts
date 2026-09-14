import { reactive, computed } from 'vue';
import { API_BASE_URL } from '@/config/api';
import { authState } from '@/stores/useAuthStore';

export interface OtherUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ConversationItem {
  id: number;
  guest_id: number;
  host_id: number;
  homestay_id: number;
  homestay_title: string;
  homestay_image: string;
  homestay_province?: string;
  other_user: OtherUser;
  last_message: string;
  last_message_at: string;
  created_at?: string;
  unread_count: number;
}

export interface ChatMessage {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  sender_name: string;
  content: string;
  is_read: boolean;
  created_at: string;
  is_mine: boolean;
}

interface MessageStoreState {
  conversations: ConversationItem[];
  activeConversation: ConversationItem | null;
  messages: ChatMessage[];
  unreadCount: number;
  isLoading: boolean;
  isSending: boolean;
  pollIntervalId: any | null;
}

const state = reactive<MessageStoreState>({
  conversations: [],
  activeConversation: null,
  messages: [],
  unreadCount: 0,
  isLoading: false,
  isSending: false,
  pollIntervalId: null,
});

function getAuthHeaders(): Record<string, string> {
  const token = authState.token || localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function useMessageStore() {
  /**
   * Fetch user's conversation list
   */
  async function fetchConversations() {
    if (!authState.isLoggedIn) return [];
    try {
      const res = await fetch(`${API_BASE_URL}/messages/conversations`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        state.conversations = Array.isArray(data) ? data : [];
        return state.conversations;
      }
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
    return [];
  }

  /**
   * Fetch total unread count for badge
   */
  async function fetchUnreadCount() {
    if (!authState.isLoggedIn) {
      state.unreadCount = 0;
      return 0;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/messages/unread-count`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        state.unreadCount = Number(data.unread) || 0;
        return state.unreadCount;
      }
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
    return 0;
  }

  /**
   * Select a conversation and load its messages
   */
  async function selectConversation(conversationId: number) {
    state.isLoading = true;
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${conversationId}`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        state.messages = Array.isArray(data.messages) ? data.messages : [];
        
        // Find or build active conversation
        const found = state.conversations.find((c) => c.id === conversationId);
        if (found) {
          found.unread_count = 0;
          state.activeConversation = found;
        } else if (data.conversation) {
          const lastMsg = state.messages.length > 0 ? state.messages[state.messages.length - 1] : undefined;
          state.activeConversation = {
            ...data.conversation,
            last_message: lastMsg?.content || '',
            last_message_at: lastMsg?.created_at || new Date().toISOString(),
            unread_count: 0,
          };
        }
        
        // Refresh unread count
        fetchUnreadCount();
      }
    } catch (err) {
      console.error('Failed to load conversation messages:', err);
    } finally {
      state.isLoading = false;
    }
  }

  /**
   * Silently refresh messages of the active conversation (for polling)
   */
  async function refreshActiveMessages() {
    if (!state.activeConversation) return;
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${state.activeConversation.id}`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        const incoming = Array.isArray(data.messages) ? data.messages : [];
        
        // Only update if count changed or last message id is newer to avoid jerky re-renders
        if (incoming.length !== state.messages.length) {
          state.messages = incoming;
        }
      }
    } catch {
      // ignore silent poll failure
    }
  }

  /**
   * Send a message in the active conversation
   */
  async function sendMessage(content: string) {
    if (!state.activeConversation || !content.trim()) return null;
    state.isSending = true;

    try {
      const res = await fetch(`${API_BASE_URL}/messages/send`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          conversation_id: state.activeConversation.id,
          content: content.trim(),
        }),
      });

      if (res.ok) {
        const newMsg = await res.json();
        state.messages.push(newMsg);

        // Update active conversation preview
        if (state.activeConversation) {
          state.activeConversation.last_message = newMsg.content;
          state.activeConversation.last_message_at = newMsg.created_at;
        }

        // Update conversations list order
        const idx = state.conversations.findIndex((c) => c.id === state.activeConversation?.id);
        if (idx !== -1 && state.conversations[idx]) {
          const itemToUpdate = state.conversations[idx];
          if (itemToUpdate) {
            itemToUpdate.last_message = newMsg.content;
            itemToUpdate.last_message_at = newMsg.created_at;
            const removed = state.conversations.splice(idx, 1);
            if (removed[0]) {
              state.conversations.unshift(removed[0]);
            }
          }
        }

        return newMsg;
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      state.isSending = false;
    }
    return null;
  }

  /**
   * Start a new conversation or open existing one (e.g. from Homestay details page)
   */
  async function startConversation(hostId: number, homestayId: number, initialMessage?: string) {
    state.isLoading = true;
    try {
      const res = await fetch(`${API_BASE_URL}/messages/start`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          host_id: hostId,
          homestay_id: homestayId,
          initial_message: initialMessage || '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        await fetchConversations();
        if (data.conversation?.id) {
          await selectConversation(data.conversation.id);
          return data.conversation.id;
        }
      }
    } catch (err) {
      console.error('Failed to start conversation:', err);
    } finally {
      state.isLoading = false;
    }
    return null;
  }

  /**
   * Start polling every 4 seconds
   */
  function startPolling() {
    if (state.pollIntervalId) return;
    state.pollIntervalId = setInterval(() => {
      fetchUnreadCount();
      if (state.activeConversation) {
        refreshActiveMessages();
      }
    }, 4000);
  }

  /**
   * Stop polling
   */
  function stopPolling() {
    if (state.pollIntervalId) {
      clearInterval(state.pollIntervalId);
      state.pollIntervalId = null;
    }
  }

  return {
    conversations: computed(() => state.conversations),
    activeConversation: computed(() => state.activeConversation),
    messages: computed(() => state.messages),
    unreadCount: computed(() => state.unreadCount),
    isLoading: computed(() => state.isLoading),
    isSending: computed(() => state.isSending),
    fetchConversations,
    fetchUnreadCount,
    selectConversation,
    sendMessage,
    startConversation,
    startPolling,
    stopPolling,
  };
}
