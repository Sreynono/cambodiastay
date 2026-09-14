<template>
  <div class="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <!-- Main Two-Column Box -->
    <div class="flex-1 flex min-h-0 overflow-hidden relative">
      
      <!-- 1. LEFT PANE: Conversations List -->
      <div
        :class="[
          'w-full lg:w-80 xl:w-96 flex flex-col bg-white border-r border-gray-100 shrink-0 transition-all duration-300',
          activeConversation && !isMobileThreadClosed ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Conversations Header & Search -->
        <div class="p-4 border-b border-gray-100 bg-[#FCFAF6]/60">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>{{ t('messages.conversations') }}</span>
              <span
                v-if="conversations.length > 0"
                class="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-[#113A28]"
              >
                {{ conversations.length }}
              </span>
            </h2>
            <button
              v-if="unreadCount > 0"
              class="text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full transition"
            >
              {{ unreadCount }} unread
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('messages.searchPlaceholder')"
              class="w-full pl-9 pr-8 py-2 text-xs bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition"
            />
            <svg
              class="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Conversations List Items -->
        <div class="flex-1 overflow-y-auto divide-y divide-gray-50">
          <!-- Loading skeleton -->
          <div v-if="isLoading && conversations.length === 0" class="p-4 space-y-4">
            <div v-for="n in 3" :key="n" class="flex gap-3 animate-pulse">
              <div class="w-12 h-12 bg-gray-200 rounded-2xl shrink-0"></div>
              <div class="flex-1 space-y-2 py-1">
                <div class="h-3.5 bg-gray-200 rounded w-2/3"></div>
                <div class="h-3 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
          </div>

          <!-- Empty list state -->
          <div
            v-else-if="filteredConversations.length === 0"
            class="p-8 text-center flex flex-col items-center justify-center h-full text-gray-400"
          >
            <div class="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3 text-gray-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p class="text-sm font-semibold text-gray-700 mb-1">{{ t('messages.noConversations') }}</p>
            <p class="text-xs text-gray-400 max-w-[200px] leading-relaxed">
              {{ t('messages.noConversationsSub') }}
            </p>
          </div>

          <!-- Conversation Item Card -->
          <div
            v-for="conv in filteredConversations"
            :key="conv.id"
            @click="handleSelectConversation(conv.id)"
            :class="[
              'p-3.5 flex items-start gap-3 cursor-pointer transition relative group',
              activeConversation?.id === conv.id
                ? 'bg-emerald-50/70 border-l-4 border-[#113A28]'
                : 'hover:bg-gray-50 border-l-4 border-transparent'
            ]"
          >
            <!-- Homestay / User Thumbnail Avatar -->
            <div class="relative shrink-0">
              <div class="w-12 h-12 rounded-2xl bg-[#113A28] text-white flex items-center justify-center font-bold text-sm overflow-hidden shadow-xs border border-gray-100">
                <img
                  v-if="conv.homestay_image"
                  :src="conv.homestay_image"
                  :alt="conv.homestay_title"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ (conv.other_user?.name || 'C').substring(0, 2).toUpperCase() }}</span>
              </div>
              <span
                v-if="conv.unread_count > 0"
                class="absolute -top-1 -right-1 bg-[#113A28] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
              >
                {{ conv.unread_count }}
              </span>
            </div>

            <!-- Content preview -->
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline justify-between mb-0.5">
                <h4
                  class="text-xs font-bold text-gray-900 truncate"
                  :class="{ 'text-emerald-950 font-extrabold': conv.unread_count > 0 }"
                >
                  {{ conv.other_user?.name || 'CamStay User' }}
                </h4>
                <span class="text-[10px] text-gray-400 shrink-0 ml-2">
                  {{ formatTime(conv.last_message_at) }}
                </span>
              </div>

              <!-- Homestay tag -->
              <div class="flex items-center gap-1 mb-1">
                <span class="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium truncate max-w-[170px]">
                  🏡 {{ conv.homestay_title }}
                </span>
                <span
                  v-if="conv.other_user?.role"
                  class="text-[9px] uppercase tracking-wider text-gray-500 bg-gray-100 px-1 py-0.5 rounded font-semibold"
                >
                  {{ conv.other_user.role }}
                </span>
              </div>

              <!-- Last Message Snippet -->
              <p
                class="text-xs truncate leading-tight"
                :class="conv.unread_count > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'"
              >
                {{ conv.last_message }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. RIGHT PANE: Message Stream & Input -->
      <div
        :class="[
          'flex-1 flex flex-col bg-[#F8FAFC] min-w-0 transition-all duration-300',
          !activeConversation || isMobileThreadClosed ? 'hidden lg:flex' : 'flex'
        ]"
      >
        <!-- Active Thread Header -->
        <div
          v-if="activeConversation"
          class="p-3.5 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-2xs z-10"
        >
          <div class="flex items-center gap-3 min-w-0">
            <!-- Mobile Back Button -->
            <button
              @click="closeMobileThread"
              class="lg:hidden p-2 -ml-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition cursor-pointer"
              aria-label="Back to conversations"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- User Avatar -->
            <div class="w-10 h-10 rounded-2xl bg-[#113A28] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 overflow-hidden">
              <img
                v-if="activeConversation.homestay_image"
                :src="activeConversation.homestay_image"
                class="w-full h-full object-cover"
              />
              <span v-else>{{ (activeConversation.other_user?.name || 'U').substring(0, 2).toUpperCase() }}</span>
            </div>

            <!-- User Info & Homestay Link -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-gray-900 truncate">
                  {{ activeConversation.other_user?.name || 'CamStay User' }}
                </h3>
                <span class="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full capitalize">
                  {{ activeConversation.other_user?.role || 'Member' }}
                </span>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-gray-500 truncate">
                <RouterLink
                  v-if="activeConversation.homestay_id"
                  :to="`/homestay/${activeConversation.homestay_id}`"
                  target="_blank"
                  class="text-[#113A28] hover:underline font-medium flex items-center gap-1 truncate"
                >
                  <span>🏡 {{ activeConversation.homestay_title }}</span>
                  <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </RouterLink>
                <span v-if="activeConversation.homestay_province" class="text-gray-300">·</span>
                <span v-if="activeConversation.homestay_province" class="truncate">{{ activeConversation.homestay_province }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Action: Homestay View Link -->
          <RouterLink
            v-if="activeConversation.homestay_id"
            :to="`/homestay/${activeConversation.homestay_id}`"
            target="_blank"
            class="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 transition"
          >
            <span>{{ t('messages.homestayLabel') }}</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </RouterLink>
        </div>

        <!-- Chat Stream (Scrollable messages area) -->
        <div
          v-if="activeConversation"
          ref="messagesContainer"
          class="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5"
        >
          <!-- Homestay Greeting Banner at thread top -->
          <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs max-w-md mx-auto text-center my-2">
            <div class="w-10 h-10 rounded-full bg-emerald-50 text-[#113A28] flex items-center justify-center mx-auto mb-2 font-bold">
              🏡
            </div>
            <h4 class="text-xs font-bold text-gray-900">{{ activeConversation.homestay_title }}</h4>
            <p class="text-[11px] text-gray-500 mt-1">
              Direct conversation between traveler and host on CamStay. Keep personal information safe.
            </p>
          </div>

          <!-- Empty thread prompt -->
          <div v-if="messages.length === 0" class="text-center py-8 text-gray-400 text-xs">
            {{ t('messages.emptyThread') }}
          </div>

          <!-- Chat Message Bubbles -->
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['flex flex-col', msg.is_mine ? 'items-end' : 'items-start']"
          >
            <!-- Sender name for incoming messages -->
            <span v-if="!msg.is_mine" class="text-[10px] text-gray-400 font-medium mb-1 px-1">
              {{ msg.sender_name }}
            </span>

            <div
              :class="[
                'max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs break-words',
                msg.is_mine
                  ? 'bg-[#113A28] text-white rounded-br-2xs'
                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-2xs'
              ]"
            >
              {{ msg.content }}
            </div>

            <!-- Timestamp and read receipt -->
            <div
              :class="[
                'flex items-center gap-1 text-[10px] mt-1 px-1',
                msg.is_mine ? 'text-gray-400' : 'text-gray-400'
              ]"
            >
              <span>{{ formatBubbleTime(msg.created_at) }}</span>
              <span v-if="msg.is_mine" class="text-emerald-700 font-bold" :title="msg.is_read ? 'Read' : 'Delivered'">
                {{ msg.is_read ? '✓✓' : '✓' }}
              </span>
            </div>
          </div>
        </div>

        <!-- No active conversation selected placeholder (for desktop) -->
        <div
          v-else
          class="flex-1 flex flex-col items-center justify-center p-8 text-center"
        >
          <div class="w-16 h-16 rounded-3xl bg-emerald-50 text-[#113A28] flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-gray-800 mb-1">
            {{ t('messages.selectConversation') }}
          </h3>
          <p class="text-xs text-gray-500 max-w-sm">
            {{ t('messages.selectConversationSub') }}
          </p>
        </div>

        <!-- Message Input Bar (Only visible when a conversation is active) -->
        <div
          v-if="activeConversation"
          class="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0"
        >
          <!-- Quick Suggestion Chips -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              v-for="quick in quickReplies"
              :key="quick"
              @click="insertQuickReply(quick)"
              class="text-[11px] bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-[#113A28] border border-gray-200 px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
            >
              {{ quick }}
            </button>
          </div>

          <form @submit.prevent="handleSend" class="flex items-center gap-2 sm:gap-3">
            <input
              ref="inputRef"
              v-model="inputContent"
              type="text"
              :placeholder="t('messages.typeMessage')"
              class="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition"
              :disabled="isSending"
            />
            <button
              type="submit"
              :disabled="!inputContent.trim() || isSending"
              class="bg-[#113A28] hover:bg-[#0a261a] disabled:bg-gray-300 text-white px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <span v-if="!isSending">{{ t('messages.send') }}</span>
              <span v-else>{{ t('messages.sending') }}</span>
              <svg class="w-3.5 h-3.5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useI18n } from '@/composables/useI18n';
import { useMessageStore } from '@/stores/useMessageStore';

const { t, currentLang } = useI18n();
const messageStore = useMessageStore();

const conversations = messageStore.conversations;
const activeConversation = messageStore.activeConversation;
const messages = messageStore.messages;
const unreadCount = messageStore.unreadCount;
const isLoading = messageStore.isLoading;
const isSending = messageStore.isSending;

const searchQuery = ref('');
const inputContent = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const messagesContainer = ref<HTMLDivElement | null>(null);
const isMobileThreadClosed = ref(false);

const quickReplies = computed(() => {
  if (currentLang.value === 'km') {
    return [
      'តើផ្ទះស្នាក់ទំនេរទេ?',
      'តើម៉ោងចូលស្នាក់នៅបត់បែនបានទេ?',
      'តើមានអាហារពេលព្រឹកទេ?',
      'សូមអរគុណច្រើន!',
    ];
  }
  return [
    'Is the homestay available?',
    'Is check-in time flexible?',
    'Is breakfast included?',
    'Thank you so much!',
  ];
});

const filteredConversations = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return conversations.value;
  return conversations.value.filter((conv) => {
    const userName = conv.other_user?.name?.toLowerCase() || '';
    const stayTitle = conv.homestay_title?.toLowerCase() || '';
    const lastMsg = conv.last_message?.toLowerCase() || '';
    return userName.includes(q) || stayTitle.includes(q) || lastMsg.includes(q);
  });
});

async function handleSelectConversation(convId: number) {
  isMobileThreadClosed.value = false;
  await messageStore.selectConversation(convId);
  scrollToBottom();
  nextTick(() => {
    inputRef.value?.focus();
  });
}

function closeMobileThread() {
  isMobileThreadClosed.value = true;
}

function insertQuickReply(text: string) {
  inputContent.value = text;
  inputRef.value?.focus();
}

async function handleSend() {
  const text = inputContent.value.trim();
  if (!text || isSending.value) return;

  inputContent.value = '';
  const result = await messageStore.sendMessage(text);
  if (result) {
    scrollToBottom();
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

// Watch for incoming messages to auto-scroll if near bottom
watch(
  () => messages.value.length,
  () => {
    scrollToBottom();
  }
);

function formatTime(isoString?: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return t('messages.yesterday');
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

function formatBubbleTime(isoString?: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

onMounted(async () => {
  await messageStore.fetchConversations();
  messageStore.startPolling();

  // If there are conversations and none is active, auto-select the first on desktop
  if (window.innerWidth >= 1024 && conversations.value.length > 0 && !activeConversation.value && conversations.value[0]) {
    handleSelectConversation(conversations.value[0].id);
  }
});

onUnmounted(() => {
  messageStore.stopPolling();
});
</script>
