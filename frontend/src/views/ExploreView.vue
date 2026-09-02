<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header -->
    <Header />

    <!-- Main Content Layout -->
    <main class="flex-grow max-w-[1400px] mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-10">
      
      <!-- LEFT SIDEBAR: Filters -->
      <aside class="w-full lg:w-72 flex-shrink-0">
        <div class="sticky top-32">
          
          <h1 class="text-3xl font-serif font-bold text-[#113A28] mb-2 leading-tight">Heritage<br>Homestays</h1>
          <p class="text-sm text-gray-500 mb-10 leading-relaxed pr-4">
            Discover authentic rural hospitality across Cambodia's provinces.
          </p>

          <!-- Price Filter -->
          <div class="mb-8">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Price Per Night</h3>
            <div class="relative w-full h-1 bg-gray-200 rounded-full mb-4">
              <div class="absolute left-0 top-0 h-full bg-[#113A28] w-[40%] rounded-full"></div>
              <div class="absolute left-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#113A28] rounded-full shadow cursor-pointer"></div>
            </div>
            <div class="flex justify-between text-xs font-bold text-gray-500">
              <span>$10</span>
              <span class="text-gray-900">$80 max</span>
              <span>$200</span>
            </div>
          </div>

          <!-- Province Filter -->
          <div class="mb-8">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Province</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="w-4 h-4 rounded border flex items-center justify-center transition-colors border-[#113A28] bg-[#113A28]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                </div>
                <span class="text-sm text-gray-700 font-medium">Siem Reap</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-colors group-hover:border-[#113A28]"></div>
                <span class="text-sm text-gray-600 group-hover:text-gray-900">Kampot</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-colors group-hover:border-[#113A28]"></div>
                <span class="text-sm text-gray-600 group-hover:text-gray-900">Battambang</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-colors group-hover:border-[#113A28]"></div>
                <span class="text-sm text-gray-600 group-hover:text-gray-900">Mondulkiri</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="w-4 h-4 rounded border border-gray-300 flex items-center justify-center transition-colors group-hover:border-[#113A28]"></div>
                <span class="text-sm text-gray-600 group-hover:text-gray-900">Preah Vihear</span>
              </label>
            </div>
          </div>

          <!-- Package Deals Filter -->
          <div class="mb-8">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Package Deals</h3>
            <div class="flex flex-wrap gap-2">
              <button class="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-[#113A28] hover:text-[#113A28] transition-colors bg-white">Cooking Class</button>
              <button class="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-[#113A28] hover:text-[#113A28] transition-colors bg-white">Trekking</button>
              <button class="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-[#113A28] hover:text-[#113A28] transition-colors bg-white">Organic Farm</button>
              <button class="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-[#113A28] hover:text-[#113A28] transition-colors bg-white">Silk Weaving</button>
              <button class="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-[#113A28] hover:text-[#113A28] transition-colors bg-white">Biking</button>
            </div>
          </div>

          <!-- Eco Guardian Toggle -->
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer group hover:border-[#113A28] transition-colors">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#528C52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              <span class="text-sm font-bold text-gray-900">Eco-Guardian Program</span>
            </div>
            <div class="w-10 h-5 bg-gray-200 rounded-full relative">
              <div class="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
            </div>
          </div>

        </div>
      </aside>

      <!-- RIGHT CONTENT: Grid -->
      <section class="flex-grow">
        
        <!-- Top Bar: Map Toggle -->
        <div class="flex justify-end mb-6">
          <div class="bg-white border border-gray-200 rounded-xl p-1 flex shadow-sm">
            <button class="px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-bold rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              List
            </button>
            <button class="px-4 py-1.5 text-gray-500 text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              Map
            </button>
          </div>
        </div>

        <!-- Homestays Grid (Identical structure to Home.vue) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <RouterLink 
            :to="`/homestay/${stay.id}`" 
            v-for="stay in exploreStays" 
            :key="stay.id" 
            class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block"
          >
            <!-- Image Area (h-64 to match Home page exactly) -->
            <div class="h-64 overflow-hidden relative bg-gray-100">
              <img 
                :src="stay.image" 
                :alt="stay.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <!-- Details Area (Identical padding and spacing to Home page) -->
            <div class="p-6">
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-bold text-lg text-gray-900 truncate pr-4">{{ stay.title }}</h3>
                <div class="flex items-center text-sm font-bold text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {{ stay.rating }}
                </div>
              </div>
              <p class="text-sm text-gray-500 mb-4">{{ stay.location }}</p>
              <p class="font-bold text-gray-900">${{ stay.price }} <span class="font-normal text-gray-500 text-sm">/ night</span></p>
            </div>
          </RouterLink>
          
        </div>

        <!-- Load More Button -->
        <div class="mt-12 text-center">
          <button class="bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:border-[#113A28] hover:text-[#113A28] transition-colors">
            Load More Homestays
          </button>
        </div>

      </section>
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Reusable Components
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

const exploreStays = ref([
  {
    id: 1, 
    title: 'Preah Vihear Homestay',
    location: 'Preah Vihear, Cambodia',
    price: 22,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542315809-5690b24dc6f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Siem Reap Homestay',
    location: 'Siem Reap, Cambodia',
    price: 25,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542361048-31627993a40b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Kampot River Eco-Stay',
    location: 'Kampot, Cambodia',
    price: 30,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590418366978-e508eb675865?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Floating Homestay',
    location: 'Siem Reap, Cambodia',
    price: 38,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Kompong Phluk Homestay',
    location: 'Siem Reap, Cambodia',
    price: 20,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1600762496700-1c0c660f9948?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Battambang Rice Farm',
    location: 'Battambang, Cambodia',
    price: 18,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
  }
]);
</script>