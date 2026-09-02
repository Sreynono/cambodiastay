<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- 1. Hero Section -->
      <section class="relative bg-[#EAE7DC] pt-20 pb-32 px-6 overflow-hidden">
        <div class="max-w-5xl mx-auto text-center relative z-10">
          <h1 class="text-5xl md:text-6xl font-serif font-bold text-[#113A28] mb-6 leading-tight">
            Experience the <span class="text-[#8C9A73] italic">heart</span> of <br/> rural Cambodia
          </h1>
          <p class="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Disconnect from the city and immerse yourself in authentic farm life, traditional crafts, and breathtaking landscapes.
          </p>

          <!-- The Clickable Search Bar Trigger -->
          <div 
            @click="isHeroSearchOpen = true" 
            class="bg-white rounded-full shadow-lg p-2 flex items-center justify-between w-full max-w-4xl mx-auto z-10 border border-gray-100 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div class="flex-grow w-full px-4 py-2 border-r border-gray-200 text-left hidden md:block">
              <label class="block text-xs font-bold text-gray-800 tracking-wider mb-1">LOCATION</label>
              <span class="text-gray-400">Where to go?</span>
            </div>
            <div class="flex-grow w-full px-4 py-2 border-r border-gray-200 text-left hidden md:block">
              <label class="block text-xs font-bold text-gray-800 tracking-wider mb-1">DATES</label>
              <span class="text-gray-400">Add dates</span>
            </div>
            <div class="flex-grow w-full px-4 py-2 text-left">
              <label class="block text-xs font-bold text-gray-800 tracking-wider mb-1">GUESTS</label>
              <span class="text-gray-400">Add guests</span>
            </div>
            <button class="bg-[#113A28] text-white p-4 rounded-full hover:bg-[#0a261a] transition flex items-center justify-center ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Decorative Background Circle -->
        <div class="absolute -bottom-[400px] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-[#113A28] rounded-full opacity-5"></div>
      </section>

      <!-- 2. Featured Homestays Section -->
      <section class="py-20 px-6 max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="text-3xl font-serif font-bold text-[#113A28] mb-2">Featured Homestays</h2>
            <p class="text-gray-600">Handpicked stays for your next adventure.</p>
          </div>
          <RouterLink to="/explore" class="hidden md:flex items-center space-x-2 text-[#113A28] font-bold hover:underline">
            <span>See all</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RouterLink 
            :to="`/homestay/${stay.id}`" 
            v-for="stay in featuredStays" 
            :key="stay.id" 
            class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition block cursor-pointer"
          >
            <div class="relative h-64">
              <img :src="stay.image" :alt="stay.title" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-900">{{ stay.title }}</h3>
                <span class="flex items-center text-sm font-bold text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-900" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  {{ stay.rating }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-4">{{ stay.location }}</p>
              <div class="flex justify-between items-center">
                <div class="text-lg font-bold text-gray-900">${{ stay.price }} <span class="text-sm font-normal text-gray-500">/ night</span></div>
              </div>
            </div>
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
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import SearchModal from '@/components/common/SearchModal.vue';

// 1. THIS IS THE VARIABLE YOU WERE MISSING!
const isHeroSearchOpen = ref(false);

const featuredStays = ref([
  {
    id: 1,
    title: 'Preah Vihear Homestay', 
    location: 'Preah Vihear, Cambodia',
    price: 22,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542315809-5690b24dc6f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Siem Reap Homestay',
    location: 'Siem Reap, Cambodia',
    price: 25,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542361048-31627993a40b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Kampot River Eco-Stay',
    location: 'Kampot, Cambodia',
    price: 30,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590418366978-e508eb675865?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Floating Homestay',
    location: 'Siem Reap, Cambodia',
    price: 38,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'Kompong Phluk Homestay',
    location: 'Siem Reap, Cambodia',
    price: 20,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1600762496700-1c0c660f9948?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: 'Battambang Rice Farm',
    location: 'Battambang, Cambodia',
    price: 18,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    title: 'Mondulkiri Eco Lodge',
    location: 'Mondulkiri, Cambodia',
    price: 45,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80'
  }
]);
</script>