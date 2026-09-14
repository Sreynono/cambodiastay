<template>
  <header class="bg-white/95 backdrop-blur-md py-3 sm:py-4 px-4 sm:px-6 md:px-10 flex justify-between items-center sticky top-0 z-40 border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors">
    <!-- Logo & Mobile Menu Toggle -->
    <div class="flex items-center gap-3">
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden p-2 text-gray-700 hover:text-[#113A28] rounded-xl hover:bg-black/5 transition cursor-pointer"
        :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
      >
        <span v-if="!isMobileMenuOpen" class="text-xl font-bold">☰</span>
        <span v-else class="text-xl font-bold">✕</span>
      </button>

      <RouterLink to="/" class="group flex items-center gap-2.5 sm:gap-3 transition-all duration-300 active:scale-95 cursor-pointer" aria-label="CamStay Homepage">
        <!-- New Handcrafted Sun & Homestay Emblem -->
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300 shrink-0">
          <img src="/camstay-emblem.png" alt="CamStay Logo" class="w-full h-full object-contain" />
        </div>

        <!-- Wordmark -->
        <div class="flex flex-col leading-none">
          <div class="flex items-baseline tracking-tight">
            <span class="text-xl sm:text-2xl md:text-[26px] font-brand font-bold text-[#113A28] group-hover:text-[#0D2D1F] transition-colors">Cam</span>
            <span class="text-xl sm:text-2xl md:text-[26px] font-brand font-semibold text-[#D4A373] ml-0.5 group-hover:text-[#B87333] transition-colors">Stay</span>
            <span class="w-1.5 h-1.5 rounded-full bg-[#E07A5F] ml-1 self-center transition-transform group-hover:scale-125"></span>
          </div>
          <span class="text-[8.5px] sm:text-[9px] font-sans font-bold tracking-[0.24em] text-[#8C9A73] uppercase -mt-0.5 hidden sm:block">Homestay</span>
        </div>
      </RouterLink>
    </div>

    <!-- Navigation Links -->
    <nav class="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-bold text-gray-600">
      <RouterLink to="/" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">{{ t('nav.home') }}</RouterLink>
      <RouterLink to="/explore" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">{{ t('nav.explore') }}</RouterLink>
      <RouterLink to="/for-host" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">{{ t('nav.forHost') }}</RouterLink>
      <RouterLink to="/about" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">{{ t('nav.about') }}</RouterLink>
    </nav>

    <!-- Right Side Actions -->
    <div class="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
      <!-- Search Trigger Button -->
      <button
        @click="showSearchModal = true"
        class="text-gray-600 hover:text-[#113A28] p-2 hover:bg-black/5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        :title="t('nav.search')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="hidden lg:inline text-gray-700 font-medium">{{ t('nav.search') }}</span>
      </button>

      <!-- Language Selector Dropdown (Between Search & Profile) -->
      <div class="relative" ref="languageDropdownRef">
        <button
          type="button"
          @click.stop="isLanguageDropdownOpen = !isLanguageDropdownOpen"
          class="p-2 text-gray-700 hover:text-[#113A28] hover:bg-black/5 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          :title="`Language: ${currentLanguage.name} (${currentLanguage.nativeName})`"
          aria-label="Select Language"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5 text-black hover:text-gray-600 transition-colors"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isLanguageDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 animate-fade-in"
          @click.stop
        >
          <div class="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1 flex items-center justify-between">
            <span>Language / ភាសា</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          <button
            v-for="lang in availableLanguages"
            :key="lang.code"
            type="button"
            @click="selectLanguage(lang)"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
            :class="currentLanguage.code === lang.code ? 'bg-[#113A28] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'"
          >
            <div class="flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center shrink-0" :class="currentLanguage.code === lang.code ? 'bg-white text-black' : 'bg-black text-white'">
                {{ lang.code.toUpperCase() }}
              </span>
              <div class="text-left">
                <span class="font-bold block leading-tight">{{ lang.nativeName }}</span>
                <span class="text-[10px] block opacity-80" :class="currentLanguage.code === lang.code ? 'text-emerald-100' : 'text-gray-400'">{{ lang.name }}</span>
              </div>
            </div>
            <span v-if="currentLanguage.code === lang.code" class="text-xs font-bold">✓</span>
          </button>
        </div>
      </div>

      <!-- Auth Controls -->
      <div class="flex items-center">
        <!-- SHOW WHEN LOGGED OUT -->
        <button
          v-if="!authState.isLoggedIn"
          @click="showAuthModal = true"
          class="bg-[#113A28] hover:bg-[#0a261a] text-white px-4 sm:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          {{ t('nav.login') }}
        </button>

        <!-- SHOW WHEN LOGGED IN -->
        <div v-else class="flex items-center">
          <RouterLink
            :to="dashboardUrl"
            class="group p-0.5 rounded-full hover:ring-2 hover:ring-[#113A28]/40 transition-all flex items-center justify-center cursor-pointer"
            :title="`Go to ${authStore.user.value?.name ? authStore.user.value.name + '\'s' : 'User'} Dashboard`"
          >
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-[#113A28] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm border border-emerald-800 transition-transform group-hover:scale-105">
              <img
                v-if="authStore.user.value?.profilePhoto"
                :src="authStore.user.value.profilePhoto"
                :alt="authStore.user.value?.name || 'Profile'"
                class="w-full h-full object-cover"
              />
              <span v-else>
                {{ (authStore.user.value?.name || 'U').substring(0, 2).toUpperCase() }}
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer Overlay (phones & small tablets < md) -->
    <Teleport to="body">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-50 md:hidden flex"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          @click="isMobileMenuOpen = false"
        ></div>

        <!-- Drawer Content -->
        <div class="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col p-6 z-10 border-r border-gray-100">
          <div class="flex items-center justify-between pb-4 border-b border-gray-100">
            <RouterLink to="/" @click="isMobileMenuOpen = false" class="group flex items-center gap-2.5" aria-label="CamStay Homepage">
              <div class="w-8 h-8 rounded-full overflow-hidden shadow-xs flex-shrink-0">
                <img src="/camstay-emblem.png" alt="CamStay Logo" class="w-full h-full object-contain" />
              </div>
              <div class="flex items-baseline tracking-tight">
                <span class="text-xl font-brand font-bold text-[#113A28]">Cam</span>
                <span class="text-xl font-brand font-semibold text-[#D4A373] ml-0.5">Stay</span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#E07A5F] ml-1 self-center"></span>
              </div>
            </RouterLink>
            <button
              @click="isMobileMenuOpen = false"
              class="p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-black/5 cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="flex flex-col space-y-3 py-6 text-sm font-bold text-gray-700 flex-grow">
            <RouterLink
              to="/"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-gray-50 transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{{ t('nav.home') }}</span>
            </RouterLink>
            <RouterLink
              to="/explore"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>{{ t('nav.explore') }}</span>
            </RouterLink>
            <RouterLink
              to="/for-host"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{{ t('nav.forHost') }}</span>
            </RouterLink>
            <RouterLink
              to="/about"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>{{ t('nav.about') }}</span>
            </RouterLink>

            <button
              @click="showSearchModal = true; isMobileMenuOpen = false"
              class="px-3 py-2 text-left rounded-xl hover:bg-white transition flex items-center gap-3 text-gray-700 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{{ t('nav.search') }}</span>
            </button>
          </nav>

          <!-- Language Selector in Mobile Drawer -->
          <div class="py-3 px-1 border-t border-gray-200">
            <span class="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2 px-2">{{ t('nav.language') }} / ភាសា</span>
            <div class="grid grid-cols-2 gap-1.5 bg-white p-1 rounded-xl border border-gray-200">
              <button
                v-for="lang in availableLanguages"
                :key="lang.code"
                type="button"
                @click="selectLanguage(lang)"
                class="py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer"
                :class="currentLanguage.code === lang.code ? 'bg-[#113A28] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'"
              >
                <span>{{ lang.code.toUpperCase() }}</span>
              </button>
            </div>
          </div>

          <!-- Drawer Footer with Auth -->
          <div class="pt-4 border-t border-gray-200">
            <div v-if="authState.isLoggedIn">
              <RouterLink
                :to="dashboardUrl"
                @click="isMobileMenuOpen = false"
                class="w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-emerald-50/50 transition cursor-pointer"
              >
                <div class="w-9 h-9 rounded-full overflow-hidden bg-[#113A28] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-800">
                  <img
                    v-if="authStore.user.value?.profilePhoto"
                    :src="authStore.user.value.profilePhoto"
                    :alt="authStore.user.value?.name || 'Profile'"
                    class="w-full h-full object-cover"
                  />
                  <span v-else>
                    {{ (authStore.user.value?.name || 'U').substring(0, 2).toUpperCase() }}
                  </span>
                </div>
                <div class="flex flex-col text-left flex-1 min-w-0">
                  <span class="text-xs font-bold text-gray-900 truncate">{{ authStore.user.value?.name }}</span>
                  <span class="text-[10px] text-emerald-700 capitalize font-medium">{{ authStore.user.value?.role }} Dashboard</span>
                </div>
              </RouterLink>
            </div>
            <div v-else>
              <button
                @click="showAuthModal = true; isMobileMenuOpen = false"
                class="w-full bg-[#113A28] hover:bg-[#0a261a] text-white py-3 rounded-xl font-bold text-xs transition shadow-sm text-center cursor-pointer"
              >
                {{ t('nav.login') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modals -->
    <AuthModal v-if="showAuthModal" :isOpen="showAuthModal" @close="showAuthModal = false" />
    <SearchModal v-if="showSearchModal" @close="showSearchModal = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import AuthModal from './AuthModal.vue';
import SearchModal from './SearchModal.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useI18n, type LanguageOption } from '@/composables/useI18n';

const { currentLang, availableLanguages, setLanguage, t } = useI18n();

const currentLanguage = computed<LanguageOption>(() => {
  return availableLanguages.find((l) => l.code === currentLang.value) || availableLanguages[0]!;
});

const isLanguageDropdownOpen = ref(false);
const languageDropdownRef = ref<HTMLElement | null>(null);

const selectLanguage = (lang: LanguageOption) => {
  setLanguage(lang.code);
  isLanguageDropdownOpen.value = false;
};

const handleWindowClick = (event: MouseEvent) => {
  if (languageDropdownRef.value && !languageDropdownRef.value.contains(event.target as Node)) {
    isLanguageDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleWindowClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleWindowClick);
});

const showAuthModal = ref(false);
const showSearchModal = ref(false);
const isMobileMenuOpen = ref(false);

const authStore = useAuthStore();
const { authState } = authStore;

const dashboardUrl = computed(() => {
  const role = authStore.user.value?.role;
  if (role === 'admin') return '/dashboard/admin';
  if (role === 'host') return '/dashboard/host';
  return '/dashboard/guest';
});
</script>