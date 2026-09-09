<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- 1. Hero Section -->
      <section class="relative bg-[#EAE7DC] pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden">
        <div class="max-w-5xl mx-auto text-center relative z-10">
          <h1 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#113A28] mb-4 sm:mb-6 leading-tight">
            Experience the <span class="text-[#8C9A73] italic">heart</span> of <br class="hidden sm:inline" /> rural Cambodia
          </h1>
          <p class="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Disconnect from the city and immerse yourself in authentic farm life, traditional crafts, and breathtaking landscapes.
          </p>

          <!-- The Clickable Search Bar Trigger (Airbnb 4-Column Style) -->
          <div 
            @click="isHeroSearchOpen = true" 
            class="bg-white rounded-full shadow-lg hover:shadow-2xl border border-gray-200/80 p-2 sm:p-2.5 flex items-center w-full max-w-4xl mx-auto z-10 cursor-pointer transition-all duration-300"
          >
            <!-- 1. WHERE -->
            <div class="flex-[1.4] min-w-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-left group">
              <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">Where</span>
              <span class="text-gray-500 text-xs sm:text-sm font-medium truncate block">Search destinations or landscapes</span>
            </div>

            <!-- Divider 1 -->
            <div class="h-8 w-[1px] bg-gray-200 hidden md:block self-center"></div>

            <!-- 2. CHECK IN -->
            <div class="flex-1 min-w-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-left hidden md:block group">
              <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">Check in</span>
              <span class="text-gray-400 text-xs sm:text-sm font-normal truncate block">Add dates</span>
            </div>

            <!-- Divider 2 -->
            <div class="h-8 w-[1px] bg-gray-200 hidden md:block self-center"></div>

            <!-- 3. CHECK OUT -->
            <div class="flex-1 min-w-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-left hidden md:block group">
              <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">Check out</span>
              <span class="text-gray-400 text-xs sm:text-sm font-normal truncate block">Add dates</span>
            </div>

            <!-- Divider 3 -->
            <div class="h-8 w-[1px] bg-gray-200 hidden sm:block self-center"></div>

            <!-- 4. WHO & SEARCH BUTTON -->
            <div class="flex-1 min-w-0 pl-4 sm:pl-6 pr-1.5 py-1.5 rounded-full hover:bg-gray-100/80 transition-colors text-left hidden sm:flex items-center justify-between group">
              <div class="min-w-0 pr-2">
                <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">Who</span>
                <span class="text-gray-400 text-xs sm:text-sm font-normal truncate block">Add guests</span>
              </div>
              <div class="bg-[#113A28] group-hover:bg-[#0a261a] text-white px-4 py-3 rounded-full shadow-md transition-all flex items-center gap-2 font-bold text-xs sm:text-sm shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="hidden lg:inline">Search</span>
              </div>
            </div>

            <!-- Mobile Search Button (<sm) -->
            <div class="sm:hidden ml-auto pr-1">
              <div class="bg-[#113A28] text-white p-3 rounded-full shadow-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative Background Circle -->
        <div class="absolute -bottom-[400px] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-[#113A28] rounded-full opacity-5"></div>
      </section>

      <!-- 2. Featured Homestays Section (Dynamic Live Stays) -->
      <section class="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-8 sm:mb-10">
          <div>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#113A28] mb-1 sm:mb-2">Featured Homestays</h2>
            <p class="text-xs sm:text-sm text-gray-600">Handpicked rural stays across Cambodia's stunning landscapes.</p>
          </div>
          <RouterLink to="/explore" class="hidden md:flex items-center space-x-2 text-[#113A28] font-bold hover:underline">
            <span>Explore all ({{ featuredStays.length }})</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </RouterLink>
        </div>

        <div v-if="featuredStays.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <RouterLink 
            :to="`/homestay/${stay.id}`" 
            v-for="stay in featuredStays" 
            :key="stay.id" 
            class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition block cursor-pointer group"
          >
            <div class="relative h-64 overflow-hidden bg-gray-100">
              <img
                v-if="stay.coverPhotoUrl"
                :src="stay.coverPhotoUrl"
                :alt="stay.name"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-[#113A28] to-emerald-800 flex flex-col items-center justify-center text-white p-4">
                <span class="text-4xl mb-2">🏡</span>
                <span class="font-serif font-bold text-sm text-emerald-100 text-center">{{ stay.name }}</span>
              </div>
              <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#113A28] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {{ stay.landscape || stay.category }}
              </span>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-[#113A28] transition leading-snug">{{ stay.name }}</h3>
                <span class="flex items-center text-sm font-bold text-gray-900 whitespace-nowrap ml-2">
                  <span class="text-yellow-500 mr-1">★</span> {{ stay.rating }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-2">📍 {{ stay.province }}, Cambodia</p>
              
              <div v-if="stay.nearPlaces && stay.nearPlaces.length > 0" class="flex flex-wrap gap-1 mb-4">
                <span class="text-[10px] bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-100">
                  near {{ stay.nearPlaces[0] }}
                </span>
              </div>

              <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                <div class="text-lg font-bold text-gray-900">${{ stay.price }} <span class="text-sm font-normal text-gray-500">/ night</span></div>
                <span class="text-xs font-bold text-[#113A28] group-hover:underline">Explore Stay →</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <div v-else class="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <p class="text-gray-500 text-sm mb-4">No live homestays currently available on the public catalog.</p>
          <RouterLink to="/explore" class="bg-[#113A28] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0a261a] transition">
            Explore All Stays
          </RouterLink>
        </div>
      </section>

      <!-- 3. Nurturing Connections Section -->
      <section class="py-20 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-4">Nurturing Connections</h2>
          <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for an authentic escape or want to share your heritage with the world, AgriStay makes the process seamless and secure.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <!-- For Travelers Column -->
          <div>
            <div class="flex items-center space-x-4 mb-8">
              <div class="w-10 h-10 bg-[#354F3B] text-white flex items-center justify-center rounded-lg font-bold text-lg shadow-md">1</div>
              <h3 class="text-xl font-serif font-bold text-gray-800">For Travelers</h3>
            </div>
            
            <div class="space-y-8 ml-2">
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#52738C] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 7.5v6M7.5 10.5h6" /></svg>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Discover Unique Stays</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">Browse our curated collection of authentic farms and rural homes across the Kingdom.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#528C52] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Instant Booking</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">Check availability and book securely. Your stay directly supports local farming livelihoods.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#8C6B52] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Cultural Exchange</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">Participate in daily farm activities, learn traditional crafts, and enjoy home-cooked meals.</p>
                </div>
              </div>
            </div>
            <RouterLink to="/explore" class="inline-block mt-10 ml-2 bg-[#5B6D51] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#485740] transition shadow-sm">
              Start Exploring
            </RouterLink>
          </div>

          <!-- For Farm Owners Column -->
          <div>
            <div class="flex items-center space-x-4 mb-8">
              <div class="w-10 h-10 bg-[#354F3B] text-white flex items-center justify-center rounded-lg font-bold text-lg shadow-md">2</div>
              <h3 class="text-xl font-serif font-bold text-gray-800">For Farm Owners</h3>
            </div>
            
            <div class="space-y-8 ml-2">
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#52738C] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">List Your Property</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">Showcase your farm and hospitality. We help you with photography and property descriptions.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#528C52] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Earn Fair Income</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">Supplement your farming income with hospitality. Set your own prices and hosting rules.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#8C6B52] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Grow Your Community</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">Connect with mindful travelers who appreciate your hard work and rural heritage.</p>
                </div>
              </div>
            </div>
            <RouterLink to="/for-host" class="inline-block mt-10 ml-2 bg-[#5B6D51] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#485740] transition shadow-sm">
              Become a Host
            </RouterLink>
          </div>

        </div>
      </section>

      <!-- 4. The Heritage Pulse Section -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2">
            <img src="@/assets/images/heritage.jpg" alt="Cambodian Heritage Home" class="rounded-[2.5rem] shadow-xl w-full h-[500px] object-cover" />
          </div>
          <div class="w-full lg:w-1/2">
            <h5 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">The Heritage Pulse</h5>
            <h2 class="text-4xl md:text-5xl font-serif font-bold text-[#113A28] mb-6 leading-tight">
              Preserving the soul of the Khmer countryside.
            </h2>
            <p class="text-gray-600 text-sm leading-relaxed mb-10 max-w-lg">
              CambodiaStay is more than a booking platform. It's a mission to safeguard traditional Cambodian ways of life. By choosing a homestay, you are preserving local crafts, supporting organic agriculture, and ensuring that future generations can continue to call these lands home.
            </p>
            <div class="flex gap-12 mb-10">
              <div>
                <div class="text-4xl font-serif font-bold text-[#113A28] mb-1">200+</div>
                <div class="text-sm font-bold text-gray-800">Heritage Homes</div>
              </div>
              <div>
                <div class="text-4xl font-serif font-bold text-[#113A28] mb-1">15</div>
                <div class="text-sm font-bold text-gray-800">Province Covered</div>
              </div>
            </div>
            <a href="#" class="text-[#113A28] font-bold text-sm underline hover:text-gray-600 transition-colors">
              Learn more our Impact
            </a>
          </div>
        </div>
      </section>

      <!-- 5. Newsletter Section -->
      <section class="py-16 px-6 max-w-5xl mx-auto mb-20">
        <div class="bg-[#3D4C2F] rounded-[3rem] px-8 py-16 md:py-20 text-center shadow-2xl relative overflow-hidden">
          <div class="relative z-10 max-w-2xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#F8F7F2] mb-4">Stay rooted in our journey</h2>
            <p class="text-[#DCE0D3] mb-10 text-sm md:text-base leading-relaxed">
              Subscribe for seasonal farm updates, exclusive heritage stories, and first access to new homestays.
            </p>
            <form @submit.prevent class="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                class="w-full sm:w-80 px-6 py-4 rounded-xl outline-none bg-[#DCE0D3] text-gray-800 placeholder-gray-600 font-medium" 
              />
              <button 
                class="bg-transparent border border-[#7B8C63] text-[#F8F7F2] px-8 py-4 rounded-xl font-medium hover:bg-[#4B5C3D] transition-colors"
              >
                Join the Circle
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>

    <!-- Global Footer -->
    <Footer />
    
    <!-- The Search Modal -->
    <SearchModal 
      v-if="isHeroSearchOpen" 
      @close="isHeroSearchOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import SearchModal from '@/components/common/SearchModal.vue';
import { usePropertyStore } from '@/stores/usePropertyStore';

const isHeroSearchOpen = ref(false);
const propertyStore = usePropertyStore();

// Dynamically display up to 6 approved live homestays
const featuredStays = computed(() => {
  return propertyStore.properties.value
    .filter((p) => p.status === 'Approved')
    .slice(0, 6);
});
</script>