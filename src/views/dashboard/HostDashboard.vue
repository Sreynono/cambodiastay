<template>
  <div class="min-h-screen bg-[#F8F7F2] flex">
    
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      <div class="p-6 border-b border-gray-100">
        <RouterLink to="/" class="text-2xl font-serif font-bold text-[#113A28] block">CambodiaStay</RouterLink>
        <p class="text-xs font-bold text-[#8C9A73] uppercase tracking-widest mt-2">Host Dashboard</p>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <button 
          @click="activeTab = 'listings'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'listings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">🏠</span> My Properties
        </button>
        
        <button 
          @click="activeTab = 'bookings'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'bookings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">📅</span> Reservations
        </button>

        <button 
          @click="activeTab = 'earnings'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'earnings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">💰</span> Earnings
        </button>

        <button 
          @click="activeTab = 'inbox'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'inbox' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">💬</span> Messages
          <!-- Notification Dot -->
          <span class="ml-auto w-2 h-2 rounded-full bg-red-500"></span>
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
            activeTab === 'listings' ? 'Property Management' : 
            activeTab === 'bookings' ? 'Manage Reservations' : 
            activeTab === 'earnings' ? 'Financial Overview' : 
            activeTab === 'inbox' ? 'Guest Messages' : 
            'Account Settings' 
          }}
        </h2>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-600">Host Sokha</span>
          <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <!-- Dynamic Tab Content -->
      <div class="p-8 overflow-y-auto flex-grow">
         
         <!-- 1. Property Management (Listings) -->
         <div v-if="activeTab === 'listings'">
           <div class="flex justify-between items-center mb-6">
             <p class="text-gray-600">Manage your active farmstays and rural retreats.</p>
             <button class="bg-[#113A28] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0a261a] transition-colors shadow-sm">
               + Add New Property
             </button>
           </div>
           
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <!-- Example Property Card -->
             <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
               <div class="relative h-48">
                 <img src="https://images.unsplash.com/photo-1542361048-31627993a40b?auto=format&fit=crop&w=600&q=80" alt="Siem Reap Homestay" class="w-full h-full object-cover" />
                 <div class="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">Active</div>
               </div>
               <div class="p-5">
                 <h3 class="text-lg font-bold text-gray-900 mb-1">Siem Reap Mango Farm</h3>
                 <p class="text-sm text-gray-500 mb-4">Siem Reap, Cambodia</p>
                 <div class="flex justify-between items-center border-t border-gray-100 pt-4">
                   <div class="text-sm font-bold text-[#113A28]">$25 <span class="font-normal text-gray-500">/ night</span></div>
                   <button class="text-gray-500 hover:text-[#113A28] text-sm font-bold transition-colors">Edit Listing →</button>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <!-- 2. Manage Reservations (Bookings) -->
         <div v-if="activeTab === 'bookings'">
           <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div class="p-6 border-b border-gray-100 flex justify-between items-center">
               <h3 class="font-bold text-gray-900">Upcoming Guests</h3>
               <button class="text-sm text-[#113A28] font-bold">View Calendar</button>
             </div>
             <table class="w-full text-left border-collapse">
               <thead>
                 <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                   <th class="p-4 font-bold">Guest Name</th>
                   <th class="p-4 font-bold">Dates</th>
                   <th class="p-4 font-bold">Status</th>
                   <th class="p-4 font-bold text-right">Actions</th>
                 </tr>
               </thead>
               <tbody class="divide-y divide-gray-100">
                 <!-- Example Booking Row -->
                 <tr class="hover:bg-gray-50 transition-colors">
                   <td class="p-4 font-medium text-gray-900">David Smith</td>
                   <td class="p-4 text-gray-600">Sep 10 - Sep 14, 2026</td>
                   <td class="p-4"><span class="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md">Pending</span></td>
                   <td class="p-4 text-right space-x-2">
                     <button class="bg-[#113A28] text-white text-xs font-bold px-3 py-2 rounded hover:bg-[#0a261a]">Approve</button>
                     <button class="bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded hover:bg-red-200">Decline</button>
                   </td>
                 </tr>
                 <tr class="hover:bg-gray-50 transition-colors">
                   <td class="p-4 font-medium text-gray-900">Nita Leng</td>
                   <td class="p-4 text-gray-600">Sep 20 - Sep 22, 2026</td>
                   <td class="p-4"><span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">Confirmed</span></td>
                   <td class="p-4 text-right">
                     <button class="text-gray-500 hover:text-[#113A28] text-xs font-bold px-3 py-2">Message</button>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>

         <!-- 3. Earnings & Financials -->
         <div v-if="activeTab === 'earnings'">
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Total Earnings</p>
               <h3 class="text-2xl font-bold text-[#113A28]">$1,240.00</h3>
             </div>
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Pending Payouts</p>
               <h3 class="text-2xl font-bold text-[#8C9A73]">$150.00</h3>
             </div>
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Completed Stays</p>
               <h3 class="text-2xl font-bold text-gray-900">14</h3>
             </div>
           </div
           
           <!-- Payout History Placeholder -->
           <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
             <div class="text-4xl mb-4">🏦</div>
             <h4 class="font-bold text-gray-900 mb-2">Payout History</h4>
             <p class="text-gray-500 mb-4">Detailed transaction logs will appear here.</p>
             <button class="border border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-50">Set Up Bank Account</button>
           </div>
         </div>

         <!-- 4. Inbox & Messages -->
         <div v-if="activeTab === 'inbox'" class="h-full">
           <div class="bg-white rounded-2xl border border-gray-100 shadow-sm flex h-[600px] overflow-hidden">
             <!-- Chat List -->
             <div class="w-1/3 border-r border-gray-100 bg-white overflow-y-auto">
               <div class="p-5 border-b border-gray-100 bg-gray-50 cursor-pointer border-l-4 border-l-[#113A28]">
                 <h4 class="font-bold text-gray-900 mb-1">David Smith</h4>
                 <p class="text-sm text-gray-500 truncate">Is breakfast included with the stay?</p>
               </div>
             </div>
             <!-- Chat Window -->
             <div class="w-2/3 bg-[#F8F7F2] flex flex-col">
               <div class="p-6 flex-grow flex flex-col justify-end space-y-4">
                 <!-- Guest Message -->
                 <div class="bg-white text-gray-800 border border-gray-200 p-4 rounded-2xl rounded-bl-none self-start max-w-md shadow-sm">
                   Hi! I just booked a stay for September 10th. Is breakfast included?
                 </div>
               </div>
               <!-- Message Input -->
               <div class="p-4 bg-white border-t border-gray-200 flex gap-3">
                 <input type="text" placeholder="Reply to David..." class="flex-grow px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition-colors" />
                 <button class="bg-[#113A28] hover:bg-[#0a261a] text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm">Send</button>
               </div>
             </div>
           </div>
         </div>

         <!-- 5. Shared Profile Settings Tab -->
         <div v-if="activeTab === 'settings'">
           <!-- Reusing the exact same component we built for the guest! -->
           <ProfileSettings />
         </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
// Importing our shared component
import ProfileSettings from './shared/ProfileSettings.vue'

// Defaults to 'listings' for the host view
const activeTab = ref('listings')
</script>