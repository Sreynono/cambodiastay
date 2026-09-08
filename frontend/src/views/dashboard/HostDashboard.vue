<template>
  <div class="flex h-screen bg-[#F8F7F2] text-[#2C3E50]">
    <!-- Mobile Drawer for < lg -->
    <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden flex">
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="isSidebarOpen = false"></div>
      <aside class="relative w-72 max-w-[85vw] bg-[#113A28] text-white h-full flex flex-col shadow-2xl z-10 animate-slide-in">
        <div class="p-5 border-b border-emerald-900/50 flex items-center justify-between">
          <div>
            <RouterLink to="/" class="text-xl font-serif font-bold text-white block" @click="isSidebarOpen = false">CambodiaStay</RouterLink>
            <p class="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mt-1">Host Partner Panel</p>
          </div>
          <button @click="isSidebarOpen = false" class="p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition" aria-label="Close sidebar">✕</button>
        </div>

        <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            @click="activeTab = 'overview'; isSidebarOpen = false"
            :class="[
              'w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3 text-sm',
              activeTab === 'overview' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-300 hover:bg-white/5'
            ]"
          >
            <span>📊</span> Overview
          </button>

          <button
            @click="activeTab = 'properties'; isSidebarOpen = false"
            :class="[
              'w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center justify-between text-sm',
              activeTab === 'properties' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-300 hover:bg-white/5'
            ]"
          >
            <div class="flex items-center gap-3">
              <span>🏡</span> My Homestays
            </div>
            <span class="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold">{{ myProperties.length }}</span>
          </button>

          <button
            @click="activeTab = 'reservations'; isSidebarOpen = false"
            :class="[
              'w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center justify-between text-sm',
              activeTab === 'reservations' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-300 hover:bg-white/5'
            ]"
          >
            <div class="flex items-center gap-3">
              <span>📅</span> Reservations
            </div>
            <span v-if="pendingBookings.length > 0" class="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {{ pendingBookings.length }}
            </span>
          </button>
        </nav>

        <!-- Mobile Sidebar Footer -->
        <div class="p-4 border-t border-emerald-900/50 space-y-2">
          <RouterLink
            to="/explore"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-emerald-200 hover:bg-white/5 rounded-xl transition"
          >
            <span>🌐</span> View Public Website
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-red-300 hover:bg-red-500/10 rounded-xl transition"
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>
    </div>

    <!-- Desktop Sidebar Navigation -->
    <aside class="hidden lg:flex w-64 bg-[#113A28] text-white flex-col shadow-xl z-10 shrink-0">
      <div class="p-6 border-b border-emerald-900/50">
        <RouterLink to="/" class="text-2xl font-serif font-bold text-white block">CambodiaStay</RouterLink>
        <p class="text-xs font-bold text-emerald-300 uppercase tracking-widest mt-1">Host Partner Panel</p>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <button
          @click="activeTab = 'overview'"
          :class="[
            'w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center gap-3',
            activeTab === 'overview' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-300 hover:bg-white/5'
          ]"
        >
          <span>📊</span> Overview
        </button>

        <button
          @click="activeTab = 'properties'"
          :class="[
            'w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center justify-between',
            activeTab === 'properties' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-300 hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <span>🏡</span> My Homestays
          </div>
          <span class="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold">{{ myProperties.length }}</span>
        </button>

        <button
          @click="activeTab = 'reservations'"
          :class="[
            'w-full text-left px-4 py-3 rounded-xl font-medium transition flex items-center justify-between',
            activeTab === 'reservations' ? 'bg-white/15 text-white font-bold shadow' : 'text-gray-300 hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <span>📅</span> Reservations
          </div>
          <span v-if="pendingBookings.length > 0" class="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
            {{ pendingBookings.length }}
          </span>
        </button>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-emerald-900/50 space-y-2">
        <RouterLink
          to="/explore"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-emerald-200 hover:bg-white/5 rounded-xl transition"
        >
          <span>🌐</span> View Public Website
        </RouterLink>
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-red-300 hover:bg-red-500/10 rounded-xl transition"
        >
          <span>🚪</span> Log Out
        </button>
      </div>
    </aside>

    <!-- Main Workspace -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Workspace Bar -->
      <header class="h-16 sm:h-20 bg-white border-b border-gray-200 flex justify-between items-center px-4 sm:px-8 shadow-sm">
        <div class="flex items-center gap-3 min-w-0">
          <button
            @click="isSidebarOpen = true"
            class="lg:hidden p-2 -ml-1 text-gray-600 hover:text-[#113A28] hover:bg-gray-100 rounded-xl transition"
            aria-label="Open sidebar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div class="min-w-0">
            <h1 class="text-base sm:text-2xl font-serif font-bold text-gray-900 truncate">
              {{
                activeTab === 'overview'
                  ? 'Host Overview'
                  : activeTab === 'properties'
                    ? 'My Homestays'
                    : 'Reservations'
              }}
            </h1>
            <p class="text-[11px] sm:text-xs text-gray-500 truncate hidden sm:block">Welcome back, {{ authStore.user.value?.name || 'Host Member' }}!</p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            @click="isModalOpen = true"
            class="bg-[#113A28] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow hover:bg-[#0a261a] transition flex items-center gap-1 sm:gap-2"
          >
            <span>+</span> <span class="hidden xs:inline">New Stay</span><span class="inline xs:hidden">Add</span>
          </button>

          <div class="flex items-center gap-2 pl-2 sm:pl-4 border-l border-gray-200">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8C9A73] text-[#113A28] font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">
              {{ (authStore.user.value?.name || 'Host').substring(0, 2).toUpperCase() }}
            </div>
          </div>
        </div>
      </header>

      <!-- Tab Content Area -->
      <div class="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <!-- 1. OVERVIEW TAB -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <!-- Summary Metric Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#113A28]">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">My Homestays</p>
              <h3 class="text-3xl font-bold text-gray-900">{{ myProperties.length }}</h3>
              <p class="text-[11px] text-gray-500 mt-1">{{ approvedCount }} live · {{ pendingCount }} pending</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-500">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Approval</p>
              <h3 class="text-3xl font-bold text-amber-600">{{ pendingCount }}</h3>
              <p class="text-[11px] text-gray-500 mt-1">Under Admin Review</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Confirmed Bookings</p>
              <h3 class="text-3xl font-bold text-gray-900">{{ confirmedBookings.length }}</h3>
              <p class="text-[11px] text-gray-500 mt-1">Guest reservations</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Estimated Earnings</p>
              <h3 class="text-3xl font-bold text-emerald-800">${{ totalEarnings }}</h3>
              <p class="text-[11px] text-gray-500 mt-1">From approved bookings</p>
            </div>
          </div>

          <!-- Quick Actions and Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Listings Preview -->
            <section class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold text-gray-900">Your Homestays</h2>
                <button @click="activeTab = 'properties'" class="text-xs font-bold text-[#113A28] hover:underline">
                  View all ({{ myProperties.length }})
                </button>
              </div>

              <div v-if="myProperties.length === 0" class="text-center py-10 bg-gray-50 rounded-2xl p-6">
                <p class="text-sm font-semibold text-gray-600 mb-2">You don't have any homestays listed yet.</p>
                <p class="text-xs text-gray-400 mb-4">Create your first listing to begin hosting eco-travelers.</p>
                <button
                  @click="isModalOpen = true"
                  class="bg-[#113A28] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#0a261a] transition"
                >
                  + Add Your First Homestay
                </button>
              </div>

              <ul v-else class="space-y-3">
                <li
                  v-for="prop in myProperties.slice(0, 4)"
                  :key="prop.id"
                  class="flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition"
                >
                  <div class="flex items-center gap-3">
                    <img
                      v-if="prop.coverPhotoUrl"
                      :src="prop.coverPhotoUrl"
                      class="w-12 h-12 rounded-xl object-cover"
                    />
                    <div v-else class="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center text-white text-lg">
                      🏡
                    </div>
                    <div>
                      <h4 class="font-bold text-sm text-gray-900">{{ prop.name }}</h4>
                      <p class="text-xs text-gray-500">{{ prop.landscape || prop.category }} · {{ prop.province }} · ${{ prop.price }}/night</p>
                    </div>
                  </div>
                  <span
                    :class="[
                      'text-[11px] font-bold px-2.5 py-1 rounded-full',
                      prop.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : prop.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ prop.status === 'Approved' ? '● Live' : prop.status === 'Pending' ? '⏳ Under Review' : '✕ Rejected' }}
                  </span>
                </li>
              </ul>
            </section>

            <!-- Pending Reservations Preview -->
            <section class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold text-gray-900">Pending Guest Requests</h2>
                <button @click="activeTab = 'reservations'" class="text-xs font-bold text-[#113A28] hover:underline">
                  View all
                </button>
              </div>

              <div v-if="pendingBookings.length === 0" class="text-center py-10 bg-gray-50 rounded-2xl text-gray-400 text-xs font-medium">
                No pending guest reservation requests at this time.
              </div>

              <ul v-else class="space-y-3">
                <li
                  v-for="b in pendingBookings.slice(0, 3)"
                  :key="b.id"
                  class="p-3 border border-gray-100 rounded-2xl bg-gray-50/50"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <p class="font-bold text-sm text-gray-900">{{ b.property_name }}</p>
                      <p class="text-xs text-gray-500">Guest: {{ b.guest_name }} ({{ b.guests_count }} guests)</p>
                      <p class="text-xs text-gray-400">{{ b.check_in_date }} → {{ b.check_out_date }}</p>
                    </div>
                    <span class="font-bold text-sm text-[#113A28]">${{ b.total_price }}</span>
                  </div>
                  <div class="flex gap-2">
                    <button
                      @click="manageBooking(b.id, 'approved')"
                      class="flex-1 bg-[#113A28] text-white py-1.5 rounded-lg text-xs font-bold hover:bg-[#0a261a] transition"
                    >
                      Approve
                    </button>
                    <button
                      @click="manageBooking(b.id, 'rejected')"
                      class="flex-1 bg-red-50 text-red-600 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                    >
                      Decline
                    </button>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <!-- 2. MY PROPERTIES TAB -->
        <div v-else-if="activeTab === 'properties'" class="space-y-6">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Your Registered Homestays</h2>
              <p class="text-xs text-gray-500">New listings require Admin approval before appearing on the public search page.</p>
            </div>
            <div class="flex items-center gap-3">
              <button
                @click="isModalOpen = true"
                class="bg-[#113A28] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#0a261a] transition shadow"
              >
                + Add Homestay
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="myProperties.length === 0" class="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
            <div class="text-5xl mb-4">🏡</div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">No Homestay Listings Yet</h3>
            <p class="text-xs text-gray-500 max-w-md mx-auto mb-6">
              You have not registered any homestays under this host account. Click the button below to register a homestay with place and landscape details.
            </p>
            <button
              @click="isModalOpen = true"
              class="bg-[#113A28] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow hover:bg-[#0a261a] transition"
            >
              + Create Homestay Listing
            </button>
          </div>

          <!-- Grid of Properties -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="prop in myProperties"
              :key="prop.id"
              class="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition"
            >
              <div class="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  v-if="prop.coverPhotoUrl"
                  :src="prop.coverPhotoUrl"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-[#113A28] to-emerald-800 flex flex-col items-center justify-center text-white p-4">
                  <span class="text-4xl mb-1">🏡</span>
                  <span class="font-serif font-bold text-xs text-emerald-100 text-center">{{ prop.name }}</span>
                </div>
                <!-- Status Badge -->
                <span
                  :class="[
                    'absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm',
                    prop.status === 'Approved' ? 'bg-emerald-600 text-white' : prop.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-red-600 text-white'
                  ]"
                >
                  {{ prop.status === 'Approved' ? '✓ Approved & Live' : prop.status === 'Pending' ? '⏳ Pending Admin Approval' : '✕ Rejected' }}
                </span>

                <!-- Landscape Badge -->
                <span class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[#113A28] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {{ prop.landscape || prop.category }}
                </span>
              </div>

              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-base text-gray-900 mb-1">{{ prop.name }}</h3>
                  <p class="text-xs text-gray-500 mb-2">📍 {{ prop.province }}, Cambodia</p>
                  
                  <!-- Nearby Places Tags -->
                  <div v-if="prop.nearPlaces && prop.nearPlaces.length > 0" class="flex flex-wrap gap-1.5 mb-3">
                    <span
                      v-for="(place, pIdx) in prop.nearPlaces.slice(0, 3)"
                      :key="pIdx"
                      class="text-[10px] font-medium bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-100"
                    >
                      near {{ place }}
                    </span>
                  </div>

                  <p class="text-xs text-gray-600 line-clamp-2 mb-4">{{ prop.description }}</p>
                </div>

                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span class="font-bold text-sm text-[#113A28]">${{ prop.price }} <span class="text-xs font-normal text-gray-500">/ night</span></span>
                  
                  <div class="flex items-center gap-3">
                    <RouterLink
                      v-if="prop.status === 'Approved'"
                      :to="`/homestay/${prop.id}`"
                      class="text-xs font-bold text-[#113A28] hover:underline"
                    >
                      View Live →
                    </RouterLink>
                    <button
                      @click="deleteProperty(prop.id, prop.name)"
                      class="text-xs font-bold text-red-500 hover:text-red-700 hover:underline"
                      title="Delete this homestay"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. RESERVATIONS TAB -->
        <div v-else-if="activeTab === 'reservations'" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Reservations & Requests</h2>
              <p class="text-xs text-gray-500">Manage bookings for your registered homestays.</p>
            </div>
          </div>

          <div v-if="myBookings.length === 0" class="bg-white p-12 text-center rounded-3xl border border-gray-200 shadow-sm">
            <div class="text-4xl mb-3">📅</div>
            <p class="text-gray-600 font-bold text-sm">No reservations recorded yet.</p>
            <p class="text-xs text-gray-400 mt-1">When travelers book your approved homestays, requests will appear here.</p>
          </div>

          <div v-else class="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[620px] text-left border-collapse text-sm">
                <thead class="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th class="p-4 font-bold">Property & Dates</th>
                    <th class="p-4 font-bold">Guest Details</th>
                    <th class="p-4 font-bold">Amount</th>
                    <th class="p-4 font-bold">Status</th>
                    <th class="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="b in myBookings" :key="b.id" class="hover:bg-gray-50/80 transition">
                    <td class="p-4">
                      <p class="font-bold text-gray-900">{{ b.property_name }}</p>
                      <p class="text-xs text-gray-500">{{ b.check_in_date }} → {{ b.check_out_date }}</p>
                    </td>
                    <td class="p-4">
                      <p class="font-medium text-gray-900">{{ b.guest_name || 'Guest' }}</p>
                      <p class="text-xs text-gray-500">{{ b.guests_count }} Guests · {{ b.guest_email }}</p>
                    </td>
                    <td class="p-4 font-bold text-[#113A28]">${{ b.total_price }}</td>
                    <td class="p-4">
                      <span
                        :class="[
                          'text-xs font-bold px-2.5 py-1 rounded-full uppercase',
                          b.status === 'approved' ? 'bg-green-100 text-green-800' : b.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        ]"
                      >
                        {{ b.status }}
                      </span>
                    </td>
                    <td class="p-4 text-right">
                      <div v-if="b.status === 'pending'" class="flex justify-end gap-2">
                        <button
                          @click="manageBooking(b.id, 'approved')"
                          class="bg-[#113A28] text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#0a261a]"
                        >
                          Approve
                        </button>
                        <button
                          @click="manageBooking(b.id, 'rejected')"
                          class="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </div>
                      <span v-else class="text-xs text-gray-400 font-medium">No action needed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- New Property Modal -->
      <NewPropertyModal
        :isOpen="isModalOpen"
        @close="isModalOpen = false"
        @property-created="onPropertyCreated"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePropertyStore } from '@/stores/usePropertyStore';
import NewPropertyModal from '@/components/host/NewPropertyModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const propertyStore = usePropertyStore();

const isSidebarOpen = ref(false);
const activeTab = ref<'overview' | 'properties' | 'reservations'>('overview');
const isModalOpen = ref(false);

const currentHostId = computed(() => authStore.user.value?.id);
const currentHostEmail = computed(() => authStore.user.value?.email || '');

// Filter real properties belonging to this host
const myProperties = computed(() => {
  const email = currentHostEmail.value.toLowerCase();
  const id = currentHostId.value;
  return propertyStore.properties.value.filter(
    (p) => (id && p.host_id === id) || (email && p.hostEmail?.toLowerCase() === email)
  );
});

const myPropertyIds = computed(() => myProperties.value.map((p) => p.id));

const myBookings = computed(() => {
  return propertyStore.bookings.value.filter((b) => myPropertyIds.value.includes(b.property_id));
});

const pendingBookings = computed(() =>
  myBookings.value.filter((b) => b.status === 'pending')
);

const confirmedBookings = computed(() =>
  myBookings.value.filter((b) => b.status === 'approved' || b.status === 'confirmed')
);

const approvedCount = computed(() =>
  myProperties.value.filter((p) => p.status === 'Approved').length
);

const pendingCount = computed(() =>
  myProperties.value.filter((p) => p.status === 'Pending').length
);

const totalEarnings = computed(() => {
  return confirmedBookings.value
    .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0)
    .toFixed(2);
});

const manageBooking = async (bookingId: number, action: 'approved' | 'rejected') => {
  await propertyStore.updateBookingStatus(bookingId, action);
  await propertyStore.fetchHostBookings();
};

const deleteProperty = async (id: number, name: string) => {
  if (confirm(`Are you sure you want to delete "${name}"?`)) {
    await propertyStore.deleteProperty(id);
    await propertyStore.fetchBackendProperties();
  }
};

const onPropertyCreated = async () => {
  await propertyStore.fetchBackendProperties();
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

onMounted(async () => {
  if (!authStore.isLoggedIn.value) {
    router.push('/login');
    return;
  }
  await Promise.all([
    propertyStore.fetchBackendProperties(),
    propertyStore.fetchHostBookings(),
  ]);
});
</script>
