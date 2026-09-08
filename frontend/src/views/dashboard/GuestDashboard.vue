<template>
  <div class="min-h-screen bg-[#F8F7F2] flex">
    <!-- Mobile Drawer Overlay for < lg -->
    <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden flex">
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="isSidebarOpen = false"></div>
      <aside class="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 animate-slide-in">
        <div class="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <RouterLink to="/" class="text-xl font-serif font-bold text-[#113A28] block" @click="isSidebarOpen = false">CambodiaStay</RouterLink>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Guest Dashboard</p>
          </div>
          <button @click="isSidebarOpen = false" class="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition" aria-label="Close Sidebar">
            ✕
          </button>
        </div>

        <nav class="flex-grow p-4 space-y-2 overflow-y-auto">
          <button
            @click="activeTab = 'trips'; isSidebarOpen = false"
            :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left justify-between text-sm', activeTab === 'trips' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
          >
            <div class="flex items-center">
              <span class="mr-3 text-lg">✈️</span> Upcoming Trips
            </div>
            <span v-if="myActiveTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full" :class="activeTab === 'trips' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800 font-bold'">
              {{ myActiveTrips.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'history'; isSidebarOpen = false"
            :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left justify-between text-sm', activeTab === 'history' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
          >
            <div class="flex items-center">
              <span class="mr-3 text-lg">📜</span> Booking History
            </div>
            <span v-if="pastTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold">
              {{ pastTrips.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'inbox'; isSidebarOpen = false"
            :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left text-sm', activeTab === 'inbox' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
          >
            <span class="mr-3 text-lg">💬</span> Messages
          </button>

          <button
            @click="activeTab = 'wishlist'; isSidebarOpen = false"
            :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left justify-between text-sm', activeTab === 'wishlist' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
          >
            <div class="flex items-center">
              <span class="mr-3 text-lg">❤️</span> Saved Stays
            </div>
            <span v-if="savedHomestays.length > 0" class="text-xs px-2 py-0.5 rounded-full" :class="activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700 font-bold'">
              {{ savedHomestays.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'settings'; isSidebarOpen = false"
            :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left mt-6 text-sm', activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
          >
            <span class="mr-3 text-lg">⚙️</span> Profile Settings
          </button>
        </nav>

        <div class="p-4 border-t border-gray-100 space-y-1">
          <RouterLink to="/" class="w-full flex items-center px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <span class="mr-3 text-base">🏠</span> Back to Home
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full flex items-center px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <span class="mr-3 text-base">🚪</span> Log Out
          </button>
        </div>
      </aside>
    </div>

    <!-- Desktop Sidebar Navigation -->
    <aside class="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm z-10 shrink-0">
      <div class="p-6 border-b border-gray-100">
        <RouterLink to="/" class="text-2xl font-serif font-bold text-[#113A28] block">CambodiaStay</RouterLink>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Guest Dashboard</p>
      </div>

      <nav class="flex-grow p-4 space-y-2">
        <button
          @click="activeTab = 'trips'"
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left justify-between', activeTab === 'trips' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <div class="flex items-center">
            <span class="mr-3 text-lg">✈️</span> Upcoming Trips
          </div>
          <span v-if="myActiveTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full" :class="activeTab === 'trips' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800 font-bold'">
            {{ myActiveTrips.length }}
          </span>
        </button>

        <button
          @click="activeTab = 'history'"
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left justify-between', activeTab === 'history' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <div class="flex items-center">
            <span class="mr-3 text-lg">📜</span> Booking History
          </div>
          <span v-if="pastTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold">
            {{ pastTrips.length }}
          </span>
        </button>

        <button
          @click="activeTab = 'inbox'"
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left', activeTab === 'inbox' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">💬</span> Messages
        </button>

        <button
          @click="activeTab = 'wishlist'"
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left justify-between', activeTab === 'wishlist' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <div class="flex items-center">
            <span class="mr-3 text-lg">❤️</span> Saved Stays
          </div>
          <span v-if="savedHomestays.length > 0" class="text-xs px-2 py-0.5 rounded-full" :class="activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700 font-bold'">
            {{ savedHomestays.length }}
          </span>
        </button>

        <button
          @click="activeTab = 'settings'"
          :class="['w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors text-left mt-6', activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50']"
        >
          <span class="mr-3 text-lg">⚙️</span> Profile Settings
        </button>
      </nav>

      <!-- Return & Logout Buttons -->
      <div class="p-4 border-t border-gray-100 space-y-1">
        <RouterLink to="/" class="w-full flex items-center px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
          <span class="mr-3 text-base">🏠</span> Back to Home
        </RouterLink>
        <button
          @click="handleLogout"
          class="w-full flex items-center px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <span class="mr-3 text-base">🚪</span> Log Out
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-grow flex flex-col min-w-0 overflow-hidden">
      <!-- Top Header Bar -->
      <header class="h-16 sm:h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shadow-sm z-0">
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
          <h2 class="text-base sm:text-xl font-bold text-gray-800 truncate">
            {{
              activeTab === 'trips' ? 'Upcoming Trips' :
              activeTab === 'history' ? 'Booking History' :
              activeTab === 'inbox' ? 'Messages with Host' :
              activeTab === 'wishlist' ? 'Saved Homestays' :
              'Account Settings'
            }}
          </h2>
        </div>
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <span class="text-xs sm:text-sm font-medium text-gray-600 max-w-[100px] sm:max-w-none truncate">{{ currentUser?.name || 'Guest User' }}</span>
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#113A28] text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm overflow-hidden border border-emerald-800">
            <img v-if="currentUser?.profilePhoto" :src="currentUser.profilePhoto" class="w-full h-full object-cover" />
            <span v-else>{{ userInitials }}</span>
          </div>
        </div>
      </header>

      <!-- Dynamic Tab Content -->
      <div class="p-4 sm:p-6 md:p-8 overflow-y-auto flex-grow">
        <!-- 1. Upcoming Trips Tab -->
        <div v-if="activeTab === 'trips'">
          <div v-if="myActiveTrips.length === 0" class="bg-white p-6 sm:p-12 rounded-3xl border border-gray-100 text-center shadow-sm max-w-2xl mx-auto mt-6 sm:mt-10">
            <div class="text-5xl sm:text-6xl mb-4">🌾</div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No upcoming trips yet!</h3>
            <p class="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">You have not booked any homestays yet. Time to pack your bags and explore authentic Cambodian rural culture!</p>
            <RouterLink to="/explore" class="bg-[#113A28] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-[#0a261a] transition-colors shadow-md inline-block text-sm sm:text-base">
              Explore Homestays
            </RouterLink>
          </div>

          <div v-else class="space-y-4 sm:space-y-6 max-w-4xl">
            <div
              v-for="trip in myActiveTrips"
              :key="trip.id"
              class="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
            >
              <div class="flex gap-3 sm:gap-4 items-center w-full sm:w-auto">
                <img
                  v-if="trip.property_image"
                  :src="trip.property_image"
                  class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0"
                />
                <div v-else class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-900 flex items-center justify-center text-white text-2xl shrink-0">
                  🏡
                </div>
                <div class="min-w-0 flex-grow">
                  <span
                    :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1',
                      (trip.status === 'approved' || trip.status === 'confirmed') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    ]"
                  >
                    {{ (trip.status === 'approved' || trip.status === 'confirmed') ? 'Confirmed by Host' : 'Pending Confirmation' }}
                  </span>
                  <h3 class="text-base sm:text-lg font-bold text-gray-900 truncate">{{ trip.property_name }}</h3>
                  <p class="text-xs text-gray-500">📍 {{ trip.province }}</p>
                  <p class="text-xs text-gray-700 font-medium mt-1">
                    Dates: {{ trip.check_in_date }} → {{ trip.check_out_date }} ({{ trip.guests_count }} Guests)
                  </p>
                </div>
              </div>

              <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <span class="text-lg sm:text-xl font-bold text-[#113A28]">${{ trip.total_price }}</span>
                <div class="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  <RouterLink
                    :to="`/homestay/${trip.property_id}`"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
                  >
                    Details
                  </RouterLink>
                  <button
                    @click="openRateModal(trip)"
                    :class="[
                      'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
                      getBookingReview(trip.id)
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-[#113A28] hover:bg-[#0a261a] text-white shadow-sm'
                    ]"
                  >
                    <span v-if="getBookingReview(trip.id)">⭐ {{ getBookingReview(trip.id)?.rating }}/5 (Edit)</span>
                    <span v-else>⭐ Rate & Recommend</span>
                  </button>
                  <button
                    v-if="trip.status === 'pending'"
                    @click="cancelTrip(trip.id)"
                    class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition"
                  >
                    Cancel Stay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Past Trips History Tab -->
        <div v-if="activeTab === 'history'">
          <div v-if="pastTrips.length === 0" class="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-2xl mx-auto mt-10">
            <div class="text-5xl mb-3">📜</div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">No past booking history</h3>
            <p class="text-gray-500 text-sm">Your completed or cancelled reservations will appear here.</p>
          </div>
          <div v-else class="space-y-4 max-w-4xl">
            <div
              v-for="trip in pastTrips"
              :key="trip.id"
              class="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div class="flex gap-4 items-center">
                <img
                  v-if="trip.property_image"
                  :src="trip.property_image"
                  class="w-20 h-20 rounded-2xl object-cover"
                />
                <div v-else class="w-20 h-20 rounded-2xl bg-emerald-900 flex items-center justify-center text-white text-xl">
                  🏡
                </div>
                <div>
                  <span
                    :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full',
                      trip.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ trip.status === 'completed' ? 'Completed Stay' : trip.status }}
                  </span>
                  <h4 class="font-bold text-base text-gray-900 mt-1">{{ trip.property_name }}</h4>
                  <p class="text-xs text-gray-500">📍 {{ trip.province }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ trip.check_in_date }} → {{ trip.check_out_date }}</p>
                </div>
              </div>

              <div class="flex flex-col items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <span class="text-lg font-bold text-[#113A28]">${{ trip.total_price }}</span>
                <div class="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  <RouterLink
                    :to="`/homestay/${trip.property_id}`"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
                  >
                    View Homestay
                  </RouterLink>
                  <button
                    v-if="trip.status === 'completed' || trip.status === 'confirmed'"
                    @click="openRateModal(trip)"
                    :class="[
                      'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5',
                      getBookingReview(trip.id)
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-[#113A28] hover:bg-[#0a261a] text-white shadow-sm'
                    ]"
                  >
                    <span v-if="getBookingReview(trip.id)">⭐ {{ getBookingReview(trip.id)?.rating }}/5 (Edit)</span>
                    <span v-else>⭐ Rate Stay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Messages Inbox Tab -->
        <div v-if="activeTab === 'inbox'" class="h-full">
          <div v-if="myActiveTrips.length === 0" class="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm max-w-2xl mx-auto mt-10">
            <div class="text-5xl mb-3">💬</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">No active messages</h3>
            <p class="text-gray-500 text-sm mb-6">When you book a homestay, you can communicate directly with your local host here.</p>
            <RouterLink to="/explore" class="bg-[#113A28] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0a261a] transition shadow inline-block">
              Discover Stays
            </RouterLink>
          </div>

          <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row h-[600px] sm:h-[560px] overflow-hidden">
            <div class="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-100 bg-white overflow-y-auto max-h-48 sm:max-h-none shrink-0">
              <div
                v-for="trip in myActiveTrips"
                :key="trip.id"
                class="p-4 sm:p-5 border-b border-gray-100 bg-gray-50 cursor-pointer hover:bg-emerald-50/50 transition"
              >
                <h4 class="font-bold text-gray-900 mb-1 text-sm">{{ trip.property_name }}</h4>
                <p class="text-xs text-gray-500 truncate">Reservation #{{ trip.id }}</p>
              </div>
            </div>
            <div class="w-full sm:w-2/3 bg-[#F8F7F2] flex flex-col flex-grow min-h-0">
              <div class="p-4 sm:p-6 flex-grow flex flex-col justify-end space-y-4 overflow-y-auto">
                <div class="bg-white text-gray-800 border border-gray-200 p-4 rounded-2xl rounded-bl-none self-start max-w-md shadow-sm text-sm">
                  Hello! We have received your booking request for {{ myActiveTrips[0]?.property_name }}. Looking forward to hosting you!
                </div>
              </div>
              <div class="p-3 sm:p-4 bg-white border-t border-gray-200 flex gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder="Type a message to your host..."
                  class="flex-grow px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#113A28] text-sm min-w-0"
                />
                <button class="bg-[#113A28] hover:bg-[#0a261a] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold transition-colors text-sm shadow shrink-0">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Wishlist Tab -->
        <div v-if="activeTab === 'wishlist'">
          <div v-if="savedHomestays.length === 0" class="bg-white p-12 rounded-3xl border border-gray-100 text-center max-w-2xl mx-auto mt-10">
            <div class="text-5xl mb-3">❤️</div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">Your wishlist is empty</h3>
            <p class="text-gray-400 text-sm mb-6">Click the heart icon on any homestay in Explore to save it here for later.</p>
            <RouterLink to="/explore" class="bg-[#113A28] text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0a261a] transition shadow inline-block">
              Explore Cambodia Homestays →
            </RouterLink>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              v-for="stay in savedHomestays"
              :key="stay.id"
              class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 group cursor-pointer hover:shadow-md transition flex flex-col justify-between"
              @click="$router.push(`/homestay/${stay.id}`)"
            >
              <div class="relative h-48">
                <img :src="stay.coverPhotoUrl" :alt="stay.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <button
                  @click.stop="propertyStore.toggleWishlist(stay.id)"
                  class="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow text-red-500 hover:scale-110 transition text-sm"
                  title="Remove from saved"
                >
                  ❤️
                </button>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-1">
                  <h3 class="text-base font-bold text-gray-900 group-hover:text-[#113A28] transition">{{ stay.name }}</h3>
                  <span class="text-xs font-bold">★ {{ stay.rating }}</span>
                </div>
                <p class="text-xs text-gray-500 mb-3">📍 {{ stay.province }}, Cambodia</p>
                <div class="text-sm font-bold text-[#113A28] pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span>${{ stay.price }} <span class="text-xs font-normal text-gray-500">/ night</span></span>
                  <span class="text-xs font-bold text-[#113A28] group-hover:underline">View Stay →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Profile Settings Tab -->
        <div v-if="activeTab === 'settings'">
          <ProfileSettings />
        </div>
      </div>
    </main>

    <!-- Rate Homestay Modal -->
    <RateHomestayModal
      :isOpen="isRateModalOpen"
      :booking="selectedTripForRating"
      :existingReview="selectedTripForRating ? getBookingReview(selectedTripForRating.id) : null"
      @close="isRateModalOpen = false"
      @reviewSubmitted="onReviewSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePropertyStore, type Booking, type ReviewData } from '@/stores/usePropertyStore';
import ProfileSettings from './shared/ProfileSettings.vue';
import RateHomestayModal from '@/components/RateHomestayModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const propertyStore = usePropertyStore();

const isSidebarOpen = ref(false);
const activeTab = ref<'trips' | 'history' | 'inbox' | 'wishlist' | 'settings'>('trips');
const isRateModalOpen = ref(false);
const selectedTripForRating = ref<Booking | null>(null);

const currentUser = computed(() => authStore.user.value);
const currentEmail = computed(() => currentUser.value?.email?.toLowerCase());
const currentId = computed(() => currentUser.value?.id);

const userInitials = computed(() => {
  if (currentUser.value?.firstName && currentUser.value?.lastName) {
    return (currentUser.value.firstName.charAt(0) + currentUser.value.lastName.charAt(0)).toUpperCase();
  }
  if (currentUser.value?.name) {
    return currentUser.value.name.substring(0, 2).toUpperCase();
  }
  return 'G';
});

const getBookingReview = (bookingId: number): ReviewData | undefined => {
  return propertyStore.myReviews.value.find((r) => r.booking_id === bookingId);
};

const openRateModal = (trip: Booking) => {
  selectedTripForRating.value = trip;
  isRateModalOpen.value = true;
};

const onReviewSubmitted = async () => {
  await Promise.all([
    propertyStore.fetchMyReviews(),
    propertyStore.fetchMyBookings(),
    propertyStore.fetchBackendProperties(),
  ]);
};

// Real trips filtered ONLY for the current user from MySQL database
const myActiveTrips = computed(() => {
  if (!currentEmail.value && !currentId.value) return [];
  return propertyStore.bookings.value.filter((b) =>
    (b.guest_email?.toLowerCase() === currentEmail.value || b.guest_id === currentId.value) &&
    (b.status === 'pending' || b.status === 'approved' || b.status === 'confirmed')
  );
});

const pastTrips = computed(() => {
  if (!currentEmail.value && !currentId.value) return [];
  return propertyStore.bookings.value.filter((b) =>
    (b.guest_email?.toLowerCase() === currentEmail.value || b.guest_id === currentId.value) &&
    (b.status === 'completed' || b.status === 'cancelled' || b.status === 'rejected')
  );
});

const savedHomestays = computed(() =>
  propertyStore.properties.value.filter((p) => propertyStore.wishlist.value.includes(p.id))
);

const cancelTrip = async (bookingId: number) => {
  if (confirm('Are you sure you want to cancel this reservation?')) {
    await propertyStore.cancelBooking(bookingId);
    await propertyStore.fetchMyBookings();
  }
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
    propertyStore.fetchMyBookings(),
    propertyStore.fetchMyReviews(),
  ]);
});
</script>