<template>
  <!-- The dark background overlay (Clicking it closes the modal) -->
  <div v-if="isOpen" @click.self="closeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
    
    <!-- The Modal Box -->
    <div class="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
      
      <!-- Close Button -->
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
        ✕
      </button>
      
      <!-- Header -->
      <h2 class="text-2xl font-serif font-bold text-[#113A28] mb-6 text-center">
        {{ isLogin ? 'Welcome Back' : 'Join CambodiaStay' }}
      </h2>
      
      <!-- The Form -->
      <form @submit.prevent="handleSubmit" class="space-y-5">
        
        <!-- Only show Name field if they are Signing Up -->
        <div v-if="!isLogin">
          <label class="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
          <input type="text" placeholder="Sokha Chea" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none transition-colors" required />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
          <input type="email" placeholder="hello@example.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none transition-colors" required />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none transition-colors" required />
        </div>
        
        <button type="submit" class="w-full bg-[#113A28] text-white py-3 rounded-xl font-bold hover:bg-[#0a261a] transition-colors shadow-md mt-2">
          {{ isLogin ? 'Log In' : 'Create Account' }}
        </button>
      </form>
      
      <!-- Toggle between Login and Sign Up -->
      <p class="text-center mt-6 text-sm text-gray-600">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <button @click="isLogin = !isLogin" class="text-[#113A28] font-bold hover:underline ml-1">
          {{ isLogin ? 'Sign Up' : 'Log In' }}
        </button>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Accept a prop to tell the modal when to open
defineProps({
  isOpen: Boolean
});

// Emit an event to tell the parent (Header) to close it
const emit = defineEmits(['close']);

// Tracks whether to show the Login or Signup form
const isLogin = ref(true);

const closeModal = () => {
  emit('close');
};

const handleSubmit = () => {
  alert(isLogin.value ? 'Logged in successfully!' : 'Account created successfully!');
  closeModal(); // Close modal after successful submit
};
</script>