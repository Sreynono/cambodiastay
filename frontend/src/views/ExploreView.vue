<template>
  <div class="min-h-screen bg-[#F8F7F2] text-[#2C3E50] flex flex-col justify-between">
    <Header />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-1">
      <!-- Search Box Section (Place & Landscape Focused) -->
      <div class="flex justify-center mb-6 sm:mb-8">
        <div class="bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-md border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100 sm:divide-gray-200 w-full max-w-3xl">
          <!-- Place / Landscape / Province Input -->
          <div class="flex-1 px-4 sm:px-6 py-2 sm:py-1">
            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              {{ t('explore.searchTitle') }}
            </label>
            <input
              v-model="searchQuery.location"
              type="text"
              :placeholder="t('explore.searchPlaceholder')"
              class="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none"
            />
          </div>

          <!-- Dates Input (Visible on tablet & desktop) -->
          <div class="flex-1 px-4 sm:px-6 py-2 sm:py-1 hidden sm:block">
            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">{{ t('explore.datesLabel') }}</label>
            <input
              v-model="searchQuery.dates"
              type="text"
              :placeholder="t('explore.addDates')"
              class="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none"
            />
          </div>

          <!-- Guests Input & Search Button -->
          <div class="flex-1 px-4 sm:pl-6 sm:pr-2 py-2 sm:py-1 flex items-center justify-between">
            <div class="min-w-0 flex-grow">
              <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">{{ t('explore.guestsLabel') }}</label>
              <input
                v-model="searchQuery.guests"
                type="text"
                :placeholder="t('explore.addGuests')"
                class="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>
            <button 
              class="w-10 h-10 sm:w-12 sm:h-12 bg-[#113A28] text-white rounded-full flex items-center justify-center hover:bg-[#0a261a] transition shadow ml-3 shrink-0 active:scale-95"
              :title="t('nav.search')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Categories & Landscape Filter Bar (Scrollable on Mobile) -->
      <div class="flex overflow-x-auto no-scrollbar gap-2 md:gap-3 mb-8 sm:mb-10 pb-2 px-1 sm:justify-center sm:flex-wrap">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="selectedCategory === cat ? 'bg-[#113A28] text-white border-[#113A28] shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'"
          class="px-4 sm:px-5 py-2 rounded-full text-xs md:text-sm font-bold border transition shadow-sm whitespace-nowrap shrink-0"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>

      <!-- Header Title & View Toggle -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28]">
            {{
              searchQuery.location
                ? t('explore.staysNear', { location: searchQuery.location })
                : selectedCategory === 'All'
                  ? t('explore.heritageStays')
                  : t('explore.categoryStays', { category: getCategoryLabel(selectedCategory) })
            }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            {{ t('explore.discoverCount', { count: filteredHomestays.length }) }}
          </p>
        </div>

        <div class="inline-flex bg-white rounded-xl border border-gray-200 p-1 self-start md:self-auto shadow-sm">
          <button 
            @click="viewMode = 'list'" 
            :class="viewMode === 'list' ? 'bg-gray-100 font-bold text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'" 
            class="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>{{ t('explore.listView') }}</span>
          </button>
          <button 
            @click="viewMode = 'map'" 
            :class="viewMode === 'map' ? 'bg-gray-100 font-bold text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'" 
            class="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>{{ t('explore.mapView') }}</span>
          </button>
        </div>
      </div>

      <!-- 1. MAP VIEW MODE -->
      <div v-if="viewMode === 'map'" class="mb-12 bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Province Map Interactive Canvas -->
          <div class="lg:w-2/3 bg-[#EAE7DC]/60 rounded-2xl p-6 relative min-h-[420px] flex flex-col justify-between border border-gray-200 overflow-hidden">
            <div class="flex justify-between items-start z-10">
              <div>
                <h3 class="font-bold text-sm text-[#113A28] uppercase tracking-wider">{{ t('explore.interactiveMapTitle') }}</h3>
                <p class="text-xs text-gray-600">{{ t('explore.interactiveMapSubtitle') }}</p>
              </div>
              <span class="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                Cambodia (Kingdom of Wonder)
              </span>
            </div>

            <!-- Province Pins on Canvas -->
            <div class="relative w-full h-80 my-4">
              <button
                v-for="pin in provincePins"
                :key="pin.name"
                @click="searchQuery.location = pin.name"
                class="absolute transform -translate-x-1/2 -translate-y-1/2 group transition-transform hover:scale-110 focus:outline-none"
                :style="{ top: pin.top, left: pin.left }"
              >
                <div class="flex flex-col items-center">
                  <div class="bg-[#113A28] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 border-2 border-white group-hover:bg-[#0a261a]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ translateProvince(pin.name) }}</span>
                  </div>
                  <span class="text-[10px] bg-white/90 px-1.5 py-0.5 rounded shadow-sm text-gray-600 font-semibold mt-1">
                    {{ t('explore.staysCount', { count: getStaysCountForProvince(pin.name) }) }}
                  </span>
                </div>
              </button>
            </div>

            <div class="flex justify-between items-center text-xs text-gray-500 z-10">
              <span>{{ t('explore.mapTip') }}</span>
              <button @click="searchQuery.location = ''" class="text-[#113A28] font-bold hover:underline">
                {{ t('explore.resetPlaceFilter') }}
              </button>
            </div>
          </div>

          <!-- Stays List for Selected Map Area -->
          <div class="lg:w-1/3 flex flex-col justify-between">
            <h3 class="font-bold text-base text-gray-900 mb-4">
              {{ searchQuery.location ? t('explore.staysNear', { location: searchQuery.location }) : t('explore.allFeaturedPlaces') }}
            </h3>

            <div class="space-y-4 max-h-[380px] overflow-y-auto pr-2">
              <div
                v-for="prop in filteredHomestays.slice(0, 4)"
                :key="prop.id"
                @click="goToDetail(prop.id)"
                class="flex gap-4 p-3 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 cursor-pointer transition"
              >
                <img
                  v-if="prop.coverPhotoUrl"
                  :src="prop.coverPhotoUrl"
                  class="w-20 h-20 rounded-xl object-cover"
                />
                <div v-else class="w-20 h-20 rounded-xl bg-gradient-to-br from-[#113A28] to-emerald-800 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-sm text-gray-900 line-clamp-1">{{ prop.name }}</h4>
                  <p class="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ translateProvince(prop.province) }} · {{ prop.landscape || prop.category }}</span>
                  </p>
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-[#113A28]">${{ prop.price }} {{ t('common.perNight') }}</span>
                    <span class="text-xs text-black font-bold">★ {{ prop.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. HOMESTAYS GRID -->
      <div v-if="filteredHomestays.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="prop in filteredHomestays" 
          :key="prop.id" 
          class="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group cursor-pointer"
          @click="goToDetail(prop.id)"
        >
          <!-- Homestay Cover Image with Fallback -->
          <div class="relative h-56 w-full bg-gray-100 overflow-hidden">
            <img 
              v-if="prop.coverPhotoUrl"
              :src="prop.coverPhotoUrl" 
              :alt="prop.name"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-[#113A28] to-emerald-800 flex flex-col items-center justify-center text-white p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mb-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-serif font-bold text-sm tracking-wide text-emerald-100 text-center">{{ prop.name }}</span>
              <span class="text-[10px] text-emerald-300 uppercase tracking-widest mt-1">{{ translateProvince(prop.province) }}</span>
            </div>
            
            <!-- Landscape Badge -->
            <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#113A28] shadow-sm">
              {{ prop.landscape || prop.category }}
            </div>

            <!-- Wishlist Button -->
            <button
              @click.stop="propertyStore.toggleWishlist(prop.id)"
              class="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full shadow-sm transition flex items-center justify-center cursor-pointer"
              :title="t('homestay.saveWishlist')"
            >
              <svg
                v-if="propertyStore.isWishlisted(prop.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-1">
              <h2 class="text-lg font-bold text-gray-900 group-hover:text-[#113A28] transition">{{ prop.name }}</h2>
              <span class="text-sm font-bold flex items-center gap-1 text-gray-800">
                <span class="text-black font-bold">★</span> {{ prop.rating || '4.9' }}
              </span>
            </div>

            <p class="text-xs text-gray-500 mb-2 capitalize flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ prop.province ? translateProvince(prop.province) + ', Cambodia' : 'Cambodia' }}</span>
            </p>

            <!-- Nearby Place Tags (Shows WHY it matches the place search) -->
            <div v-if="prop.nearPlaces && prop.nearPlaces.length > 0" class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="(place, idx) in prop.nearPlaces.slice(0, 2)"
                :key="idx"
                class="text-[10px] font-medium bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-100"
              >
                {{ t('common.near') }} {{ place }}
              </span>
            </div>

            <p class="text-xs text-gray-600 line-clamp-2 mb-4">{{ prop.description }}</p>

            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div class="flex items-baseline gap-1">
                <span class="text-lg font-bold text-[#113A28]">${{ prop.price || 0 }}</span>
                <span class="text-xs text-gray-500 font-medium">{{ t('common.perNight') }}</span>
              </div>
              <span class="text-xs font-bold text-[#113A28] group-hover:underline">
                {{ t('common.exploreStay') }} →
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-black border border-gray-200 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ t('explore.noResultsTitle') }}</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">
          {{ t('explore.noResultsDesc') }}
        </p>
        <div class="flex justify-center gap-3">
          <button 
            @click="resetFilters" 
            class="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 transition"
          >
            {{ t('explore.resetFilters') }}
          </button>
          <RouterLink
            to="/host-application"
            class="bg-[#113A28] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0a261a] transition"
          >
            {{ t('explore.listHomestayBtn') }}
          </RouterLink>
        </div>
      </div>

    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import { usePropertyStore } from '@/stores/usePropertyStore';
import { useI18n } from '@/composables/useI18n';

const router = useRouter();
const route = useRoute();
const propertyStore = usePropertyStore();
const { t, translateProvince } = useI18n();

const viewMode = ref<'list' | 'map'>('list');

// Categories State (Focused on Places & Landscapes)
const categories = ['All', 'Mountain', 'Rice Farm', 'Riverside', 'Sea', 'Lake', 'Eco-Lodge'];
const selectedCategory = ref('All');

const getCategoryLabel = (cat: string) => {
  const map: Record<string, string> = {
    'All': t('explore.categories.All'),
    'Mountain': t('explore.categories.Mountain'),
    'Rice Farm': t('explore.categories.Farm'),
    'Riverside': t('explore.categories.River'),
    'Sea': t('explore.categories.Sea'),
    'Lake': t('explore.categories.Lake'),
    'Eco-Lodge': t('explore.categories.EcoLodge'),
  };
  return map[cat] || cat;
};

// Search Box State
const searchQuery = ref({
  location: '',
  dates: '',
  guests: ''
});

// Map Pins Coordinates
const provincePins = [
  { name: 'Siem Reap', top: '35%', left: '38%' },
  { name: 'Battambang', top: '48%', left: '26%' },
  { name: 'Preah Vihear', top: '22%', left: '50%' },
  { name: 'Kampot', top: '78%', left: '42%' },
  { name: 'Mondulkiri', top: '55%', left: '78%' },
  { name: 'Preah Sihanouk', top: '82%', left: '32%' },
  { name: 'Kampong Speu', top: '65%', left: '45%' },
];

const getStaysCountForProvince = (provinceName: string) => {
  return propertyStore.properties.value.filter(
    (h) => h.status === 'Approved' && h.province?.toLowerCase().includes(provinceName.toLowerCase())
  ).length;
};

const syncQueryFromUrl = () => {
  if (route.query.location) searchQuery.value.location = String(route.query.location);
  if (route.query.place) searchQuery.value.location = String(route.query.place);
  if (route.query.dates) searchQuery.value.dates = String(route.query.dates);
  if (route.query.guests) searchQuery.value.guests = String(route.query.guests);
  if (route.query.category) selectedCategory.value = String(route.query.category);
};

onMounted(async () => {
  syncQueryFromUrl();
  await propertyStore.fetchBackendProperties();
});

watch(() => route.query, () => {
  syncQueryFromUrl();
});

// Place-Focused Filtering Algorithm:
// Matches landscape, terrain, province, nearby landmarks, experiences, and description
const filteredHomestays = computed(() => {
  // Only show approved properties to public travelers
  let results = propertyStore.properties.value.filter((h) => h.status === 'Approved');

  // 1. Filter by Category / Landscape Pill
  if (selectedCategory.value !== 'All') {
    const cat = selectedCategory.value.toLowerCase();
    results = results.filter((h) => {
      const hLand = (h.landscape || '').toLowerCase();
      const hCat = (h.category || '').toLowerCase();
      return hLand.includes(cat) || hCat.includes(cat);
    });
  }

  // 2. Filter by Place / Landscape / Province Search Query
  const term = searchQuery.value.location.trim().toLowerCase();
  if (term) {
    results = results.filter((h) => {
      const matchLandscape = (h.landscape || '').toLowerCase().includes(term);
      const matchCategory = (h.category || '').toLowerCase().includes(term);
      const matchProvince = (h.province || '').toLowerCase().includes(term);
      const matchLocation = (h.location || '').toLowerCase().includes(term);
      const matchNearPlaces = Array.isArray(h.nearPlaces) && h.nearPlaces.some((p) => p.toLowerCase().includes(term));
      const matchExperiences = Array.isArray(h.experiences) && h.experiences.some((e) => e.toLowerCase().includes(term));
      const matchDesc = (h.description || '').toLowerCase().includes(term);
      const matchName = (h.name || '').toLowerCase().includes(term);

      return (
        matchLandscape ||
        matchCategory ||
        matchProvince ||
        matchLocation ||
        matchNearPlaces ||
        matchExperiences ||
        matchDesc ||
        matchName
      );
    });
  }

  return results;
});

const resetFilters = () => {
  selectedCategory.value = 'All';
  searchQuery.value.location = '';
  searchQuery.value.dates = '';
  searchQuery.value.guests = '';
};

const goToDetail = (id: number) => {
  router.push(`/homestay/${id}`);
};
</script>