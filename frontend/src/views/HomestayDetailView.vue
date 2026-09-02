<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    <Header />

    <main class="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
      <!-- Title & Location -->
      <div class="mb-8">
        <h1 class="text-4xl font-serif font-bold text-[#113A28] mb-2">Kampot River Eco-Stay</h1>
        <p class="text-gray-600 font-medium flex items-center gap-2">
          📍 Kampot, Cambodia · <span class="text-[#113A28] font-bold">★ 4.8</span> (24 Reviews)
        </p>
      </div>

      <!-- Photo Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 h-[400px]">
        <div class="md:col-span-2 h-full rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1590418366978-e508eb675865?auto=format&fit=crop&w=1000&q=80" class="w-full h-full object-cover" />
        </div>
        <div class="hidden md:flex flex-col gap-4 h-full">
          <img src="https://images.unsplash.com/photo-1542361048-31627993a40b?auto=format&fit=crop&w=600&q=80" class="w-full h-1/2 object-cover rounded-2xl" />
          <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80" class="w-full h-1/2 object-cover rounded-2xl" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Left Side: Homestay Details -->
        <div class="lg:w-2/3 space-y-10">
          <section>
            <h2 class="text-2xl font-bold text-[#113A28] mb-4">About this Farmstay</h2>
            <p class="text-gray-600 leading-relaxed">
              Experience the tranquility of the Kampot river. Wake up to the sound of birds, learn traditional farming techniques, and enjoy home-cooked meals prepared with organic ingredients from our backyard.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-[#113A28] mb-4">Heritage & Activities</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-xl border border-gray-100"><span class="text-2xl">🍳</span> Cooking Classes</div>
              <div class="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-xl border border-gray-100"><span class="text-2xl">🌱</span> Organic Farming</div>
              <div class="flex items-center gap-3 text-gray-700 bg-white p-4 rounded-xl border border-gray-100"><span class="text-2xl">🎣</span> Fishing</div>
            </div>
          </section>
        </div>

        <!-- Right Side: The Booking Box -->
        <div class="lg:w-1/3">
          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-32">
            <div class="mb-6">
              <span class="text-3xl font-bold text-[#113A28]">$25</span>
              <span class="text-gray-500"> / night</span>
            </div>
            
            <button class="w-full bg-[#113A28] text-white font-bold py-4 rounded-xl hover:bg-[#0a261a] transition-colors mb-4">
              Reserve Now
            </button>
            <p class="text-center text-sm text-gray-400">You won't be charged yet</p>
            
            <div class="mt-6 pt-6 border-t border-gray-100">
               <h4 class="text-sm font-bold text-gray-800 mb-3">Accepted Payments</h4>
               <div class="flex gap-2 text-sm text-gray-600">
                 <span class="bg-gray-100 px-3 py-1 rounded-lg">KH QR</span>
                 <span class="bg-gray-100 px-3 py-1 rounded-lg">ABA</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
</script>