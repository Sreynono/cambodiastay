<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Using the @/ alias guarantees it finds the file!
import { useAuthStore } from '@/stores/useAuthStore' 

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const { login } = useAuthStore()

const handleLogin = () => {
  errorMessage.value = ''
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password.'
    return
  }

  login() 
  router.push('/dashboard/host') 
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f7f6] bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:20px_20px] p-4">
    <div class="bg-white p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-[#1b4332] text-3xl font-bold mb-2">Welcome Back</h1>
        <p class="text-gray-500 text-sm">Log in to manage your rural retreats and farmstays.</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label for="email" class="font-semibold text-[#2d6a4f] text-sm">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="farmer@example.com" 
            required 
            class="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#2d6a4f] focus:ring-3 focus:ring-[#2d6a4f]/10 transition-colors"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="font-semibold text-[#2d6a4f] text-sm">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="••••••••" 
            required 
            class="p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#2d6a4f] focus:ring-3 focus:ring-[#2d6a4f]/10 transition-colors"
          />
        </div>

        <p v-if="errorMessage" class="text-red-600 text-sm text-center m-0">{{ errorMessage }}</p>

        <button type="submit" class="mt-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white py-3 px-4 rounded-lg text-lg font-bold cursor-pointer transition-colors">
          Sign In
        </button>
      </form>
      
      <p class="text-center mt-6 text-sm text-gray-500">
        Don't have an account? <a href="#" class="text-[#dda15e] font-bold no-underline hover:underline">Register here</a>
      </p>
    </div>
  </div>
</template>