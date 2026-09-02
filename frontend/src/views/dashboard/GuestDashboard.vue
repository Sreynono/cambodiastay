<template>
  <div class="min-h-screen bg-[#F8F7F2] flex">
    
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      <div class="p-6 border-b border-gray-100">
        <RouterLink to="/" class="text-2xl font-serif font-bold text-[#113A28] block">CambodiaStay</RouterLink>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Guest Dashboard</p>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <button 
          @click="activeTab = 'trips'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'trips' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">✈️</span> Upcoming Trips
        </button>
        
        <button 
          @click="activeTab = 'history'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'history' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">📜</span> Past Trips
        </button>

        <!-- NEW: Messages Tab -->
        <button 
          @click="activeTab = 'inbox'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'inbox' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">💬</span> Messages
        </button>

        <!-- NEW: Wishlist Tab -->
        <button 
          @click="activeTab = 'wishlist'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'wishlist' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">❤️</span> Saved Stays
        </button>
        
        <button 
          @click="activeTab = 'settings'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left mt-6', activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">⚙️</span> Profile Settings
        </button>
      </nav>

      <!-- Logout Button -->
      <div class="p-4 border-t border-gray-100">
         <RouterLink to="/" class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
           <span class="mr-3 text-lg">🚪</span> Log Out
         </RouterLink>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-grow flex flex-col overflow-hidden">
      
      <!-- Top Header Bar -->
      <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-0">
        <h2 class="text-xl font-bold text-gray-800">
          {{ 
            activeTab === 'trips' ? 'Your Upcoming Trips' : 
            activeTab === 'history' ? 'Booking History' : 
            activeTab === 'inbox' ? 'Messages & Inbox' : 
            activeTab === 'wishlist' ? 'Your Saved Stays' : 
            'Account Settings' 
          }}
        </h2>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-600">Sokha Chea</span>
          <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <!-- Dynamic Tab Content -->
      <div class="p-8 overflow-y-auto flex-grow">
         
         <!-- 1. Upcoming Trips Tab -->
         <div v-if="activeTab === 'trips'">
           <div class="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm max-w-2xl mx-auto mt-10">
             <div class="text-6xl mb-4">🌾</div>
             <h3 class="text-2xl font-bold text-gray-900 mb-2">No upcoming trips yet!</h3>
             <p class="text-gray-500 mb-8">Time to pack your bags and explore the beautiful Cambodian countryside.</p>
             <RouterLink to="/explore" class="bg-[#113A28] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0a261a] transition-colors shadow-md">
               Explore Homestays
             </RouterLink>
           </div>
         </div>

         <!-- 2. Past Trips History Tab -->
         <div v-if="activeTab === 'history'">
           <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
             <p class="text-gray-500">Your past adventures and reviews will appear here.</p>
           </div>
         </div>

         <!-- 3. NEW: Messages Inbox Tab -->
         <div v-if="activeTab === 'inbox'" class="h-full">
           <div class="bg-white rounded-2xl border border-gray-100 shadow-sm flex h-[600px] overflow-hidden">
             <!-- Chat List -->
             <div class="w-1/3 border-r border-gray-100 bg-white overflow-y-auto">
               <div class="p-5 border-b border-gray-100 bg-gray-50 cursor-pointer">
                 <h4 class="font-bold text-gray-900 mb-1">Host Sophea</h4>
                 <p class="text-sm text-gray-500 truncate">Looking forward to hosting you next week!</p>
               </div>
               <div class="p-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                 <h4 class="font-bold text-gray-900 mb-1">Host Bopha</h4>
                 <p class="text-sm text-gray-500 truncate">Thanks for staying at the Mango Orchard.</p>
               </div>
             </div>
             <!-- Chat Window -->
             <div class="w-2/3 bg-[#F8F7F2] flex flex-col">
               <div class="p-6 flex-grow flex flex-col justify-end space-y-4">
                 <!-- Guest Message -->
                 <div class="bg-[#113A28] text-white p-4 rounded-2xl rounded-br-none self-end max-w-md shadow-sm">
                   Hi Sophea, is it possible to check in around 4 PM? We are taking the bus from Phnom Penh.
                 </div>
                 <!-- Host Reply -->
                 <div class="bg-white text-gray-800 border border-gray-200 p-4 rounded-2xl rounded-bl-none self-start max-w-md shadow-sm">
                   Yes, that works perfectly! I'll be at the farm. Just message me when you arrive at the station.
                 </div>
               </div>
               <!-- Message Input -->
               <div class="p-4 bg-white border-t border-gray-200 flex gap-3">
                 <input type="text" placeholder="Type a message..." class="flex-grow px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition-colors" />
                 <button class="bg-[#113A28] hover:bg-[#0a261a] text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm">Send</button>
               </div>
             </div>
           </div>
         </div>

         <!-- 4. NEW: Wishlist (Saved Stays) Tab -->
         <div v-if="activeTab === 'wishlist'">
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             
             <!-- Example Saved Property Card -->
             <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
               <div class="relative h-56">
                 <img src="https://images.unsplash.com/photo-1590418366978-e508eb675865?auto=format&fit=crop&w=600&q=80" alt="Homestay" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <!-- Red Heart Button -->
                 <button class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-red-500 hover:scale-110 transition-transform">
                   ❤️
                 </button>
               </div>
               <div class="p-6">
                 <div class="flex justify-between items-start mb-2">
                   <h3 class="text-lg font-bold text-gray-900">Kampot River Eco-Stay</h3>
                   <span class="text-sm font-bold flex items-center">★ 4.8</span>
                 </div>
                 <p class="text-sm text-gray-500 mb-4">Kampot, Cambodia</p>
                 <div class="text-lg font-bold text-[#113A28]">$30 <span class="text-sm font-normal text-gray-500">/ night</span></div>
               </div>
             </div>

           </div>
         </div>

         <!-- 5. Profile Settings Tab (Using Shared Component) -->
         <div v-if="activeTab === 'settings'">
           <ProfileSettings />
         </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProfileSettings from './shared/ProfileSettings.vue'

// Keeps track of the active menu tab
const activeTab = ref('trips')
</script>