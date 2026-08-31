<template>
  <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
    
    <form @submit.prevent="handleSave" class="space-y-10">
      
      <!-- 1. Profile Photo Section -->
      <div class="flex items-center space-x-6 pb-8 border-b border-gray-100">
        <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
           <!-- Placeholder profile image -->
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Profile Photo" class="w-full h-full object-cover" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-[#113A28]">Profile Photo</h3>
          <p class="text-sm text-gray-400 mb-3">PNG, JPG under 5MB</p>
          <button type="button" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded-xl text-sm transition-colors">
            Upload New Photo
          </button>
        </div>
      </div>

      <!-- 2. Personal Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label class="block text-sm font-bold text-[#113A28] mb-2">First Name</label>
          <input type="text" v-model="profile.firstName" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition-colors text-gray-700" />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-[#113A28] mb-2">Last Name</label>
          <input type="text" v-model="profile.lastName" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition-colors text-gray-700" />
        </div>

        <div>
          <label class="block text-sm font-bold text-[#113A28] mb-2">Email Address</label>
          <input type="email" v-model="profile.email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition-colors text-gray-700" />
        </div>

        <div>
          <label class="block text-sm font-bold text-[#113A28] mb-2">Phone Number</label>
          <input type="text" v-model="profile.phone" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition-colors text-gray-700" />
        </div>
      </div>

      <!-- 3. Bio / About You -->
      <div>
        <label class="block text-sm font-bold text-[#113A28] mb-2">Bio / About You</label>
        <textarea 
          v-model="profile.bio" 
          rows="4" 
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none transition-colors text-gray-700 resize-y"
        ></textarea>
      </div>

      <!-- 4. Change Password Section (Appended as requested) -->
      <div class="pt-8 border-t border-gray-100">
        <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Change Password</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label class="block text-sm font-bold text-[#113A28] mb-2">Current Password</label>
            <input type="password" v-model="passwords.current" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-bold text-[#113A28] mb-2">New Password</label>
            <input type="password" v-model="passwords.new" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#113A28] outline-none transition-colors" />
          </div>
        </div>
      </div>

      <!-- 5. Save Button (Aligned to match your screenshot) -->
      <div class="flex justify-end pt-4">
        <button type="submit" class="bg-[#113A28] hover:bg-[#0a261a] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">
          Save Changes
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Updated state to match the screenshot fields
const profile = ref({
  firstName: 'Sokha',
  lastName: 'Chea',
  email: 'sokha@example.com',
  phone: '+855 12 345 678',
  bio: ''
})

const passwords = ref({
  current: '',
  new: ''
})

const handleSave = () => {
  console.log("Saving profile data:", profile.value)
  alert('Profile updated successfully!')
  // Next steps: connect this to your NestJS backend
}
</script>