<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- 1. Hero Section -->
      <section class="relative bg-gradient-to-b from-[#F2F7F4]/60 via-[#FAFCFA] to-white pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div class="max-w-5xl mx-auto text-center relative z-10">
          <h1 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#113A28] mb-4 sm:mb-6 leading-tight">
            {{ t('home.heroTitlePrefix') }} <span class="text-[#8C9A73] not-italic">{{ t('home.heroTitleHeart') }}</span> <br class="hidden sm:inline" /> {{ t('home.heroTitleSuffix') }}
          </h1>
          <p class="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            {{ t('home.heroSubtitle') }}
          </p>

          <!-- The Clickable Search Bar Trigger (Airbnb 4-Column Style) -->
          <div 
            @click="isHeroSearchOpen = true" 
            class="bg-white rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] border border-gray-100 p-2 sm:p-2.5 flex items-center w-full max-w-4xl mx-auto z-10 cursor-pointer transition-all duration-300"
          >
            <!-- 1. WHERE -->
            <div class="flex-[1.4] min-w-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-left group">
              <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">{{ t('home.where') }}</span>
              <RunningText :text="t('home.wherePlaceholder')" textClass="text-gray-500 text-xs sm:text-sm font-medium" />
            </div>

            <!-- Divider 1 -->
            <div class="h-8 w-[1px] bg-gray-200 hidden md:block self-center"></div>

            <!-- 2. CHECK IN -->
            <div class="flex-1 min-w-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-left hidden md:block group">
              <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">{{ t('home.checkIn') }}</span>
              <RunningText :text="t('home.addDates')" textClass="text-gray-400 text-xs sm:text-sm font-normal" />
            </div>

            <!-- Divider 2 -->
            <div class="h-8 w-[1px] bg-gray-200 hidden md:block self-center"></div>

            <!-- 3. CHECK OUT -->
            <div class="flex-1 min-w-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100/80 transition-colors text-left hidden md:block group">
              <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">{{ t('home.checkOut') }}</span>
              <RunningText :text="t('home.addDates')" textClass="text-gray-400 text-xs sm:text-sm font-normal" />
            </div>

            <!-- Divider 3 -->
            <div class="h-8 w-[1px] bg-gray-200 hidden sm:block self-center"></div>

            <!-- 4. WHO & SEARCH BUTTON -->
            <div class="flex-1 min-w-0 pl-4 sm:pl-6 pr-1.5 py-1.5 rounded-full hover:bg-gray-100/80 transition-colors text-left hidden sm:flex items-center justify-between group">
              <div class="min-w-0 pr-2 flex-1">
                <span class="block text-[10px] sm:text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-0.5">{{ t('home.who') }}</span>
                <RunningText :text="t('home.addGuests')" textClass="text-gray-400 text-xs sm:text-sm font-normal" />
              </div>
              <div class="bg-[#113A28] group-hover:bg-[#0a261a] text-white px-4 py-3 rounded-full shadow-md transition-all flex items-center gap-2 font-bold text-xs sm:text-sm shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="hidden lg:inline">{{ t('home.searchBtn') }}</span>
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
      <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-8 sm:mb-10">
          <div>
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#113A28] mb-1 sm:mb-2">{{ t('home.featuredTitle') }}</h2>
            <p class="text-xs sm:text-sm text-gray-600">{{ t('home.featuredSubtitle') }}</p>
          </div>
          <RouterLink to="/explore" class="hidden md:flex items-center space-x-2 text-[#113A28] font-bold hover:underline">
            <span>{{ t('common.exploreAll') }} ({{ featuredStays.length }})</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </RouterLink>
        </div>

        <div v-if="featuredStays.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <RouterLink 
            :to="`/homestay/${stay.id}`" 
            v-for="stay in featuredStays" 
            :key="stay.id" 
            class="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
          >
            <!-- Image with Price Badge -->
            <div class="relative h-64 overflow-hidden shrink-0">
              <img :src="stay.coverPhotoUrl" :alt="stay.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold text-[#113A28] shadow-sm text-xs">
                ${{ stay.price }} <span class="font-normal text-gray-500 text-[11px]">{{ t('homestay.perNight') }}</span>
              </div>
              <div class="absolute top-4 left-4 bg-[#113A28]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                {{ stay.landscape }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div class="flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-2 gap-2 min-h-[3rem]">
                  <h3 class="text-lg font-serif font-bold text-gray-900 group-hover:text-[#113A28] transition-colors leading-snug line-clamp-2 flex-1" :title="stay.name">{{ stay.name }}</h3>
                  <div class="flex items-center space-x-1 text-xs font-bold text-gray-900 shrink-0 ml-2 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{{ stay.rating }}</span>
                    <span class="text-gray-400 font-normal">({{ stay.reviewsCount }})</span>
                  </div>
                </div>

                <p class="text-gray-500 text-xs mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="truncate">{{ translateProvince(stay.province) }}, Cambodia</span>
                </p>

                <!-- Experiences Tags -->
                <div class="flex flex-wrap gap-1.5 mb-6">
                  <span v-for="exp in stay.experiences.slice(0, 2)" :key="exp" class="bg-gray-50 text-gray-600 text-[11px] px-2.5 py-1 rounded-lg border border-gray-100">
                    {{ exp }}
                  </span>
                  <span v-if="stay.experiences.length > 2" class="text-gray-400 text-[11px] py-1">
                    +{{ stay.experiences.length - 2 }}
                  </span>
                </div>
              </div>

              <!-- Footer with Host Info -->
              <div class="pt-4 border-t border-gray-100 flex items-center justify-between text-xs mt-auto">
                <span class="text-gray-500 flex items-center gap-1.5 truncate">
                  <span class="w-5 h-5 rounded-full bg-emerald-100 text-[#113A28] flex items-center justify-center font-bold text-[9px] shrink-0">
                    {{ (stay.hostName || 'H').substring(0, 1) }}
                  </span>
                  <span class="truncate">{{ stay.hostName || 'Local Host' }}</span>
                </span>
                <span class="text-[#113A28] font-bold group-hover:underline shrink-0">{{ t('homestay.viewDetails') }} →</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <div class="mt-8 text-center md:hidden">
          <RouterLink to="/explore" class="inline-block w-full bg-[#113A28] text-white py-3.5 rounded-2xl font-bold text-sm shadow">
            {{ t('common.exploreAll') }}
          </RouterLink>
        </div>
      </section>

      <!-- 3. Nurturing Connections Section -->
      <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-10 sm:mb-14">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-3 sm:mb-4">{{ t('home.nurturingTitle') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {{ t('home.nurturingSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          <!-- For Travelers Column -->
          <div>
            <div class="flex items-center space-x-4 mb-6 sm:mb-8">
              <div class="w-10 h-10 bg-[#354F3B] text-white flex items-center justify-center rounded-lg font-bold text-lg shadow-md">{{ t('home.forTravelersNum') }}</div>
              <h3 class="text-xl font-serif font-bold text-gray-800">{{ t('home.forTravelersHeading') }}</h3>
            </div>
            
            <div class="space-y-6 sm:space-y-8 ml-2">
              <div class="flex gap-4">
                <img src="@/assets/icons/traveler-discover.png" alt="Discover" class="w-6 h-6 object-contain flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ t('home.travelerPoint1Title') }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ t('home.travelerPoint1Desc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <img src="@/assets/icons/traveler-booking.png" alt="Booking" class="w-6 h-6 object-contain flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ t('home.travelerPoint2Title') }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ t('home.travelerPoint2Desc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <img src="@/assets/icons/traveler-exchange.png" alt="Cultural Exchange" class="w-6 h-6 object-contain flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ t('home.travelerPoint3Title') }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ t('home.travelerPoint3Desc') }}</p>
                </div>
              </div>
            </div>
            <RouterLink to="/explore" class="inline-block mt-8 sm:mt-10 ml-2 bg-[#5B6D51] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#485740] transition shadow-sm">
              {{ t('home.startExploringBtn') }}
            </RouterLink>
          </div>

          <!-- For Farm Owners Column -->
          <div>
            <div class="flex items-center space-x-4 mb-6 sm:mb-8">
              <div class="w-10 h-10 bg-[#354F3B] text-white flex items-center justify-center rounded-lg font-bold text-lg shadow-md">{{ t('home.forHostsNum') }}</div>
              <h3 class="text-xl font-serif font-bold text-gray-800">{{ t('home.forHostsHeading') }}</h3>
            </div>
            
            <div class="space-y-6 sm:space-y-8 ml-2">
              <div class="flex gap-4">
                <img src="@/assets/icons/host-property.png" alt="List Property" class="w-6 h-6 object-contain flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ t('home.hostPoint1Title') }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ t('home.hostPoint1Desc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <img src="@/assets/icons/host-income.png" alt="Earn Fair Income" class="w-6 h-6 object-contain flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ t('home.hostPoint2Title') }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ t('home.hostPoint2Desc') }}</p>
                </div>
              </div>
              <div class="flex gap-4">
                <img src="@/assets/icons/host-community.png" alt="Grow Your Community" class="w-6 h-6 object-contain flex-shrink-0 mt-1" />
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ t('home.hostPoint3Title') }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ t('home.hostPoint3Desc') }}</p>
                </div>
              </div>
            </div>
            <RouterLink to="/for-host" class="inline-block mt-8 sm:mt-10 ml-2 bg-[#5B6D51] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#485740] transition shadow-sm">
              {{ t('home.becomeHostBtn') }}
            </RouterLink>
          </div>

        </div>
      </section>

      <!-- 4. The Heritage Pulse Section -->
      <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div class="w-full lg:w-1/2">
            <img src="@/assets/images/heritage.jpg" alt="Cambodian Heritage Home" class="rounded-[2.5rem] shadow-xl w-full h-[380px] sm:h-[480px] object-cover" />
          </div>
          <div class="w-full lg:w-1/2">
            <h5 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 sm:mb-4">{{ t('home.heritageTag') }}</h5>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#113A28] mb-4 sm:mb-6 leading-tight">
              {{ t('home.heritageTitle') }}
            </h2>
            <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-lg">
              {{ t('home.heritageDesc') }}
            </p>
            <div class="flex gap-8 sm:gap-12 mb-8 sm:mb-10">
              <div>
                <div class="text-3xl sm:text-4xl font-serif font-bold text-[#113A28] mb-1">{{ t('home.heritageHomesCount') }}</div>
                <div class="text-xs sm:text-sm font-bold text-gray-800">{{ t('home.heritageHomesLabel') }}</div>
              </div>
              <div>
                <div class="text-3xl sm:text-4xl font-serif font-bold text-[#113A28] mb-1">{{ t('home.provincesCount') }}</div>
                <div class="text-xs sm:text-sm font-bold text-gray-800">{{ t('home.provincesLabel') }}</div>
              </div>
            </div>
            <RouterLink to="/explore" class="text-[#113A28] font-bold text-sm underline hover:text-gray-600 transition-colors">
              {{ t('home.learnImpact') }}
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- 5. Newsletter Section -->
      <section class="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="bg-[#3D4C2F] rounded-3xl sm:rounded-[2.5rem] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl relative overflow-hidden">
          <div class="relative z-10 max-w-2xl mx-auto">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-3 sm:mb-4">{{ t('home.newsletterTitle') }}</h2>
            <p class="text-[#DCE0D3] mb-8 sm:mb-10 text-xs sm:text-sm md:text-base leading-relaxed">
              {{ t('home.newsletterDesc') }}
            </p>
            <form @submit.prevent class="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                :placeholder="t('home.newsletterPlaceholder')" 
                class="w-full sm:w-80 px-6 py-4 rounded-xl outline-none bg-[#DCE0D3] text-gray-800 placeholder-gray-600 font-medium" 
              />
              <button 
                class="bg-transparent border border-[#7B8C63] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#4B5C3D] transition-colors"
              >
                {{ t('home.newsletterBtn') }}
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
import RunningText from '@/components/common/RunningText.vue';
import { usePropertyStore } from '@/stores/usePropertyStore';
import { useI18n } from '@/composables/useI18n';

const { t, translateProvince } = useI18n();
const isHeroSearchOpen = ref(false);
const propertyStore = usePropertyStore();

// Dynamically display up to 6 approved live homestays
const featuredStays = computed(() => {
  return propertyStore.properties.value
    .filter((p) => p.status === 'Approved')
    .slice(0, 6);
});
</script>