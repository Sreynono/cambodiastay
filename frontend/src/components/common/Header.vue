<template>
  <header
    class="bg-[#F8F7F2] py-6 px-8 flex justify-between items-center sticky top-0 z-40 border-b border-gray-200 shadow-sm"
  >
    <!-- Logo -->
    <RouterLink to="/" class="text-3xl font-serif font-bold text-[#113A28]">
      CambodiaStay
    </RouterLink>

    <!-- Navigation Links -->
    <nav class="hidden md:flex space-x-8 text-sm font-bold text-gray-600">
      <RouterLink
        to="/"
        class="hover:text-[#113A28] transition-colors"
        active-class="text-[#113A28]"
        >Home</RouterLink
      >
      <RouterLink
        to="/explore"
        class="hover:text-[#113A28] transition-colors"
        active-class="text-[#113A28]"
        >Explore</RouterLink
      >
      <RouterLink
        to="/for-host"
        class="hover:text-[#113A28] transition-colors"
        active-class="text-[#113A28]"
        >For Host</RouterLink
      >
      <RouterLink
        to="/about"
        class="hover:text-[#113A28] transition-colors"
        active-class="text-[#113A28]"
        >About</RouterLink
      >
    </nav>

    <!-- Right Side Actions -->
    <div class="flex items-center space-x-6">
      <button class="text-gray-500 hover:text-[#113A28] transition-colors">
        <span class="text-xl">🔍</span>
      </button>
      <button class="text-gray-500 hover:text-[#113A28] transition-colors">
        <span class="text-xl">🌐</span>
      </button>

      <!-- EXACT TOGGLE LOGIC: Only one of these will ever render -->
      <div class="flex items-center gap-4">
        <!-- Show this if LOGGED OUT -->
        <button
          v-if="!isLoggedIn"
          @click="showAuthModal = true"
          class="bg-[#113A28] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#0a261a] transition-colors shadow-sm"
        >
          Login / Sign Up
        </button>

        <!-- Show this if LOGGED IN -->
        <div v-else class="flex items-center gap-4">
          <RouterLink
            to="/dashboard/host"
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#113A28] transition-all shadow-sm block"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
              class="w-full h-full object-cover"
            />
          </RouterLink>
          <button
            @click="handleLogout"
            class="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>

    <!-- Inject the Auth Modal -->
    <AuthModal v-if="showAuthModal" :isOpen="showAuthModal" @close="showAuthModal = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthModal from './AuthModal.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const showAuthModal = ref(false)

const { isLoggedIn, logout } = useAuthStore()

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>
