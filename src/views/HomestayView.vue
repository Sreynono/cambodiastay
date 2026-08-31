<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 pb-24">
      
      <!-- 1. Breadcrumbs & Title Section -->
      <div class="mb-6">
        <RouterLink to="/explore" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#113A28] transition-colors mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Explore
        </RouterLink>
        
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-2">
          Preah Vihear Homestay & Organic Farm
        </h1>
        
        <div class="flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-gray-600">
          <div class="flex items-center gap-4">
            <span class="flex items-center text-gray-900 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.90 <span class="text-gray-500 font-normal ml-1 underline cursor-pointer">(42 reviews)</span>
            </span>
            <span>•</span>
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Preah Vihear, Cambodia
            </span>
          </div>
          
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg> Share
            </button>
            <button class="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg> Save
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Photo Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[450px] mb-12 rounded-[2rem] overflow-hidden relative">
        
        <!-- Image 1: Main View (Uses your local PreahVihearTemple.jpg) -->
        <div class="md:col-span-2 md:row-span-2 h-full">
          <img :src="mainImg" alt="Main Homestay View" class="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
        </div>
        
        <!-- Image 2: (Uses your local PreahVihearTemple1.jpg) -->
        <!-- <div class="hidden md:block h-full">
          <img :src="subImg1" alt="Rural detail" class="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
        </div>
         -->
        <!-- Image 3: (Uses your local PreahVihearTemple2.jpg) -->
        <div class="hidden md:block h-full">
          <img :src="subImg2" alt="Food detail" class="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
        </div>
        
        <!-- Image 4: (Placeholder until you add a 4th local image) -->
        <div class="hidden md:block h-full">
          <img :src="subImg3" alt="Nature detail" class="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
        </div>
        
        <!-- Image 5: (Placeholder until you add a 5th local image) -->
        <div class="hidden md:block h-full">
          <img :src="subImg4" alt="Farming detail" class="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
        </div>
        <!-- Image 6: (Placeholder until you add a 6th local image) -->
        <div class="hidden md:block h-full">
          <img :src="subImg5" alt="Cultural detail" class="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
        </div>


        <button class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-gray-50 flex items-center gap-2 border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Show all photos
        </button>
      </div>

      <!-- 3. Layout Split: Left (Details) & Right (Booking Card) -->
      <div class="flex flex-col lg:flex-row gap-12 relative">
        
        <!-- LEFT COLUMN: Main Details -->
        <div class="w-full lg:w-2/3">
          
          <!-- Host & Basic Details -->
          <div class="flex justify-between items-center border-b border-gray-200 pb-8 mb-8">
            <div>
              <h2 class="text-2xl font-serif font-bold text-gray-900 mb-1">Entire traditional home hosted by Sophea</h2>
              <p class="text-gray-600 text-sm">4 guests • 2 bedrooms • 2 beds • 1 shared bath</p>
            </div>
            <div class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" alt="Host" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Highlight Features -->
          <div class="space-y-6 border-b border-gray-200 pb-8 mb-8">
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#528C52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div>
                <h3 class="font-bold text-gray-900">Authentic Rural Life</h3>
                <p class="text-sm text-gray-600">Experience true Cambodian hospitality in a traditional wooden stilt house.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#528C52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div>
                <h3 class="font-bold text-gray-900">Eco-Guardian Property</h3>
                <p class="text-sm text-gray-600">This host actively protects local wildlife and uses 100% organic farming methods.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#528C52]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <div>
                <h3 class="font-bold text-gray-900">Home-cooked Meals Included</h3>
                <p class="text-sm text-gray-600">Breakfast and dinner made from ingredients grown right in the backyard.</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="border-b border-gray-200 pb-8 mb-8">
            <h2 class="text-2xl font-serif font-bold text-[#113A28] mb-4">About this space</h2>
            <div class="text-gray-600 space-y-4 leading-relaxed">
              <p>
                Welcome to our family home in the heart of Preah Vihear province. Surrounded by endless rice paddies and organic vegetable gardens, our traditional wooden stilt house offers a peaceful retreat away from the busy city.
              </p>
              <p>
                Guests will have their own private bedroom equipped with comfortable mattresses, clean linens, and mosquito nets. During the day, you are welcome to join us in the fields, learn how to weave traditional baskets, or simply relax in the hammocks downstairs.
              </p>
            </div>
            <button class="mt-4 font-bold text-gray-900 underline hover:text-[#113A28]">Show more ></button>
          </div>

          <!-- Amenities Section -->
          <div class="pb-8">
            <h2 class="text-2xl font-serif font-bold text-[#113A28] mb-6">What this place offers</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div class="flex items-center gap-4 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Farm-to-table meals
              </div>
              <div class="flex items-center gap-4 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
                Wifi (Reliable connection)
              </div>
              <div class="flex items-center gap-4 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                Mosquito nets
              </div>
              <div class="flex items-center gap-4 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                Bicycles available
              </div>
              <div class="flex items-center gap-4 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Local guide included
              </div>
              <div class="flex items-center gap-4 text-gray-400 line-through">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Television
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sticky Booking Widget -->
        <div class="w-full lg:w-1/3 relative">
          <div class="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl sticky top-32">
            
            <div class="flex items-end justify-between mb-6">
              <div>
                <span class="text-2xl font-bold text-gray-900">$22</span>
                <span class="text-gray-500 font-medium"> / night</span>
              </div>
              <div class="text-sm font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.90 <span class="text-gray-400 font-normal ml-1">· 42 reviews</span>
              </div>
            </div>

            <!-- Booking Form -->
            <div class="border border-gray-300 rounded-xl overflow-hidden mb-4">
              <div class="flex border-b border-gray-300">
                <div class="w-1/2 p-3 border-r border-gray-300">
                  <label class="block text-[10px] font-bold text-gray-800 tracking-wider">CHECK-IN</label>
                  <input type="date" class="w-full text-sm outline-none text-gray-600 bg-transparent" />
                </div>
                <div class="w-1/2 p-3">
                  <label class="block text-[10px] font-bold text-gray-800 tracking-wider">CHECKOUT</label>
                  <input type="date" class="w-full text-sm outline-none text-gray-600 bg-transparent" />
                </div>
              </div>
              <div class="p-3">
                <label class="block text-[10px] font-bold text-gray-800 tracking-wider">GUESTS</label>
                <select class="w-full text-sm outline-none text-gray-600 bg-transparent appearance-none">
                  <option>1 guest</option>
                  <option selected>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </div>
            </div>

            <button class="w-full bg-[#113A28] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0a261a] transition-colors mb-4">
              Reserve
            </button>
            <p class="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-4 text-gray-600 pb-4 border-b border-gray-200">
              <div class="flex justify-between">
                <span class="underline cursor-pointer">$22 x 3 nights</span>
                <span>$66.00</span>
              </div>
              <div class="flex justify-between">
                <span class="underline cursor-pointer">Cleaning fee</span>
                <span>$10.00</span>
              </div>
              <div class="flex justify-between">
                <span class="underline cursor-pointer">CambodiaStay service fee</span>
                <span>$8.50</span>
              </div>
            </div>
            <div class="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>$84.50</span>
            </div>

          </div>
        </div>
      </div>
    </main>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

// Reusable Components
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import mainImg from '@/assets/images/homestay3.jpg';
import subImg2 from '@/assets/images/homestay4.jpg';
import subImg3 from '@/assets/images/PreahVihearTemple2.jpg';
import subImg4 from '@/assets/images/homestay5.jpg';
import subImg5 from '@/assets/images/homestay6.jpg';

</script>