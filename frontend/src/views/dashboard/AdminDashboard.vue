<template>
  <div class="min-h-screen bg-[#F8F7F2] flex">
    
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      <div class="p-6 border-b border-gray-100">
        <RouterLink to="/" class="text-2xl font-serif font-bold text-[#113A28] block">CambodiaStay</RouterLink>
        <p class="text-xs font-bold text-blue-600 uppercase tracking-widest mt-2">Admin Portal</p>
      </div>
      
      <nav class="flex-grow p-4 space-y-2">
        <button 
          @click="activeTab = 'overview'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'overview' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">📊</span> Overview
        </button>
        
        <button 
          @click="activeTab = 'users'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'users' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">👥</span> Manage Users
        </button>

        <button 
          @click="activeTab = 'properties'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'properties' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">🏡</span> Properties
          <span class="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </button>

        <button 
          @click="activeTab = 'support'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'support' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">🎧</span> Support Tickets
        </button>
        
        <button 
          @click="activeTab = 'settings'" 
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left mt-6', activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">⚙️</span> Admin Settings
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
            activeTab === 'overview' ? 'Platform Overview' : 
            activeTab === 'users' ? 'User Moderation' : 
            activeTab === 'properties' ? 'Property Approvals' : 
            activeTab === 'support' ? 'Customer Support' : 
            'System Settings' 
          }}
        </h2>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-600">Super Admin</span>
          <div class="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <!-- Dynamic Tab Content -->
      <div class="p-8 overflow-y-auto flex-grow">
         
         <!-- 1. Overview (Dashboard Stats) -->
         <div v-if="activeTab === 'overview'">
           <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Total Users</p>
               <h3 class="text-2xl font-bold text-gray-900">4,205</h3>
             </div>
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-green-500">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Active Hosts</p>
               <h3 class="text-2xl font-bold text-gray-900">312</h3>
             </div>
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-purple-500">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Bookings (MTD)</p>
               <h3 class="text-2xl font-bold text-gray-900">842</h3>
             </div>
             <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#113A28]">
               <p class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Platform Revenue</p>
               <h3 class="text-2xl font-bold text-[#113A28]">$12,450</h3>
             </div>
           </div>
           
           <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-64 text-gray-400">
             [ Growth Chart Placeholder ]
           </div>
         </div>

         <!-- 2. User Moderation -->
         <div v-if="activeTab === 'users'">
           <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
               <input type="text" placeholder="Search users by name or email..." class="px-4 py-2 w-1/3 rounded-lg border border-gray-200 outline-none focus:border-[#113A28]" />
             </div>
             <table class="w-full text-left border-collapse">
               <thead>
                 <tr class="text-gray-500 text-xs uppercase tracking-wider">
                   <th class="p-4 font-bold border-b border-gray-100">User</th>
                   <th class="p-4 font-bold border-b border-gray-100">Role</th>
                   <th class="p-4 font-bold border-b border-gray-100">Status</th>
                   <th class="p-4 font-bold border-b border-gray-100 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody class="divide-y divide-gray-100">
                 <tr class="hover:bg-gray-50">
                   <td class="p-4 font-medium text-gray-900">Sokha Chea <br><span class="text-xs text-gray-500">sokha@example.com</span></td>
                   <td class="p-4 text-gray-600">Guest</td>
                   <td class="p-4"><span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">Active</span></td>
                   <td class="p-4 text-right space-x-2">
                     <button class="text-blue-600 text-xs font-bold px-3 py-2 hover:underline">Edit</button>
                     <button class="text-red-600 text-xs font-bold px-3 py-2 hover:underline">Suspend</button>
                   </td>
                 </tr>
                 <tr class="hover:bg-gray-50">
                   <td class="p-4 font-medium text-gray-900">Host Bopha <br><span class="text-xs text-gray-500">bopha@farm.com</span></td>
                   <td class="p-4 text-gray-600 font-bold">Host</td>
                   <td class="p-4"><span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">Active</span></td>
                   <td class="p-4 text-right space-x-2">
                     <button class="text-blue-600 text-xs font-bold px-3 py-2 hover:underline">Edit</button>
                     <button class="text-red-600 text-xs font-bold px-3 py-2 hover:underline">Suspend</button>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>

         <!-- 3. Property Approvals -->
         <div v-if="activeTab === 'properties'">
           <h3 class="text-lg font-bold text-gray-900 mb-4">Pending Approvals</h3>
           
           <!-- Show a message if there's nothing to approve -->
           <div v-if="pendingProperties.length === 0" class="bg-white p-8 rounded-2xl shadow-sm text-center">
             <p class="text-gray-500">No new applications right now!</p>
           </div>

           <!-- Loop through the pending properties from the store -->
           <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div v-for="prop in pendingProperties" :key="prop.id" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-yellow-200 relative">
               <div class="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full z-10">Review Needed</div>
               <div class="bg-gray-200 w-full h-40 flex items-center justify-center text-4xl">🏡</div>
               <div class="p-4">
                 <h4 class="font-bold text-gray-900">{{ prop.name || 'Unnamed Property' }}</h4>
                 <p class="text-xs text-gray-500 mb-4">📍 {{ prop.province || 'Unknown' }}</p>
                 <div class="flex gap-2">
                   <button @click="updatePropertyStatus(prop.id, 'Active')" class="flex-1 bg-[#113A28] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#0a261a]">Approve</button>
                   <button @click="updatePropertyStatus(prop.id, 'Rejected')" class="flex-1 bg-red-50 text-red-600 text-xs font-bold py-2 rounded-lg hover:bg-red-100">Reject</button>
                 </div>
               </div>
             </div>
           </div>
         </div>

         <!-- 4. Support Tickets -->
         <div v-if="activeTab === 'support'">
           <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
             <div class="text-4xl mb-4">🎧</div>
             <h4 class="font-bold text-gray-900 mb-2">No active support tickets</h4>
             <p class="text-gray-500 mb-4">All guest and host inquiries have been resolved.</p>
           </div>
         </div>

         <!-- 5. Admin Profile Settings -->
         <div v-if="activeTab === 'settings'">
           <!-- Our trusty shared component! -->
           <ProfileSettings />
         </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
// Import the store!
import { usePropertyStore } from '@/stores/usePropertyStore'; 

const activeTab = ref('properties'); // Let's default to properties so you can see it immediately

const { properties, updatePropertyStatus } = usePropertyStore();

// Filter to only show pending applications
const pendingProperties = computed(() => {
  return properties.value.filter((p: any) => p.status === 'Pending');
});
</script>