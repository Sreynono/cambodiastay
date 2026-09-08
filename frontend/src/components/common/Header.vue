<template>
  <header class="bg-[#F8F7F2] py-3 sm:py-4 px-4 sm:px-6 md:px-10 flex justify-between items-center sticky top-0 z-40 border-b border-gray-200 shadow-sm">
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

      <RouterLink to="/" class="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#113A28] tracking-tight hover:opacity-90 transition">
        CambodiaStay
      </RouterLink>
    </div>

    <!-- Desktop Navigation Links (md+) -->
    <nav class="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-bold text-gray-600">
      <RouterLink to="/" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">Home</RouterLink>
      <RouterLink to="/explore" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">Explore</RouterLink>
      <RouterLink to="/for-host" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">For Host</RouterLink>
      <RouterLink to="/about" class="hover:text-[#113A28] transition-colors" active-class="text-[#113A28] underline underline-offset-8">About</RouterLink>
    </nav>

    <!-- Right Side Actions -->
    <div class="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
      <!-- Search Trigger Button -->
      <button
        @click="showSearchModal = true"
        class="text-gray-600 hover:text-[#113A28] p-2 hover:bg-black/5 rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        title="Search Destinations"
      >
        <span class="text-base sm:text-lg">🔍</span>
        <span class="hidden lg:inline text-gray-500 font-medium">Search</span>
      </button>

      <!-- Auth Controls -->
      <div class="flex items-center">
        <!-- SHOW WHEN LOGGED OUT -->
        <button
          v-if="!authState.isLoggedIn"
          @click="showAuthModal = true"
          class="bg-[#113A28] hover:bg-[#0a261a] text-white px-3 sm:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          Login / Sign Up
        </button>

        <!-- SHOW WHEN LOGGED IN -->
        <div v-else class="flex items-center gap-2 sm:gap-3">
          <RouterLink
            :to="dashboardUrl"
            class="flex items-center gap-2 p-1 rounded-xl hover:bg-black/5 transition"
            :title="`Go to ${authStore.user.value?.role || 'user'} dashboard`"
          >
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#113A28] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-emerald-800">
              {{ (authStore.user.value?.name || 'U').substring(0, 2).toUpperCase() }}
            </div>
            <div class="hidden sm:flex flex-col text-left">
              <span class="text-xs font-bold text-gray-900 leading-tight line-clamp-1 max-w-[100px] md:max-w-[140px]">{{ authStore.user.value?.name }}</span>
              <span class="text-[10px] font-semibold text-emerald-700 capitalize tracking-wider">{{ authStore.user.value?.role }} Dashboard</span>
            </div>
          </RouterLink>

          <button
            @click="handleLogout"
            class="text-[11px] sm:text-xs font-bold text-red-600 hover:text-red-800 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          >
            Log Out
          </button>
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
        <div class="relative w-72 max-w-[80vw] bg-[#F8F7F2] h-full shadow-2xl flex flex-col p-6 z-10 border-r border-gray-200">
          <div class="flex items-center justify-between pb-4 border-b border-gray-200">
            <RouterLink to="/" @click="isMobileMenuOpen = false" class="text-2xl font-serif font-bold text-[#113A28]">
              CambodiaStay
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
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <span>🏠</span> Home
            </RouterLink>
            <RouterLink
              to="/explore"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <span>🧭</span> Explore Homestays
            </RouterLink>
            <RouterLink
              to="/for-host"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <span>🏡</span> For Host
            </RouterLink>
            <RouterLink
              to="/about"
              @click="isMobileMenuOpen = false"
              class="px-3 py-2 rounded-xl hover:bg-white transition flex items-center gap-3"
              active-class="bg-[#113A28] text-white"
            >
              <span>ℹ️</span> About Us
            </RouterLink>

            <button
              @click="showSearchModal = true; isMobileMenuOpen = false"
              class="px-3 py-2 text-left rounded-xl hover:bg-white transition flex items-center gap-3 text-gray-700 cursor-pointer"
            >
              <span>🔍</span> Search Destinations
            </button>
          </nav>

          <!-- Drawer Footer with Auth -->
          <div class="pt-4 border-t border-gray-200">
            <div v-if="authState.isLoggedIn" class="space-y-2">
              <RouterLink
                :to="dashboardUrl"
                @click="isMobileMenuOpen = false"
                class="w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div class="w-8 h-8 rounded-full bg-[#113A28] text-white flex items-center justify-center font-bold text-xs">
                  {{ (authStore.user.value?.name || 'U').substring(0, 2).toUpperCase() }}
                </div>
                <div class="flex flex-col text-left flex-1 min-w-0">
                  <span class="text-xs font-bold text-gray-900 truncate">{{ authStore.user.value?.name }}</span>
                  <span class="text-[10px] text-emerald-700 capitalize font-medium">{{ authStore.user.value?.role }} Dashboard</span>
                </div>
              </RouterLink>
              <button
                @click="handleLogout(); isMobileMenuOpen = false"
                class="w-full text-center py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
              >
                Log Out
              </button>
            </div>
            <div v-else>
              <button
                @click="showAuthModal = true; isMobileMenuOpen = false"
                class="w-full bg-[#113A28] hover:bg-[#0a261a] text-white py-3 rounded-xl font-bold text-xs transition shadow-sm text-center cursor-pointer"
              >
                Login / Sign Up
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
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import AuthModal from './AuthModal.vue';
import SearchModal from './SearchModal.vue';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter();
const showAuthModal = ref(false);
const showSearchModal = ref(false);
const isMobileMenuOpen = ref(false);

const authStore = useAuthStore();
const { authState, logout } = authStore;

const dashboardUrl = computed(() => {
  const role = authStore.user.value?.role;
  if (role === 'admin') return '/dashboard/admin';
  if (role === 'host') return '/dashboard/host';
  return '/dashboard/guest';
});

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>