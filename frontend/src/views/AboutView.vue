<template>
  <div class="min-h-screen bg-[#F8F7F2] font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow px-6 py-20 w-full">
      
      <!-- 1. Hero Title Section -->
      <section class="max-w-4xl mx-auto text-center mb-20">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-[#113A28] mb-8 leading-tight">
          Connecting travelers with the <br class="hidden md:block" /> heart of rural farming Cambodia
        </h1>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
          CambodiaStay exists so that farming families in rural Cambodia can open their doors, share their way of life, and earn income directly from travelers.
        </p>
      </section>

      <!-- 2. Story Section -->
      <section class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 mb-20">
        <div class="w-full md:w-1/2">
          <img 
            src="@/assets/images/about.jpg" 
            alt="About Us" 
            class="w-full h-[450px] object-cover rounded-sm shadow-md"
          />
        </div>
        <div class="w-full md:w-1/2">
          <h4 class="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Where it started</h4>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-6">It started with one trip</h2>
          <p class="text-gray-700 mb-6 leading-relaxed text-lg">
            We visited a village beside the rice fields and noticed how many families there had stories and skills worth sharing — but no platform to bring that to the outside world.
          </p>
          <p class="text-gray-700 leading-relaxed text-lg">
            CambodiaStay began as a class project with one simple goal: make homestay travel easy, honest, and fair for everyone involved.
          </p>
        </div>
      </section>

      <!-- 3. Mission & Vision Section -->
      <section class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <!-- Mission Card -->
        <div class="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <h3 class="text-2xl font-serif font-bold text-[#113A28] mb-6 tracking-wide">MISSION</h3>
          <p class="text-gray-600 leading-relaxed text-lg">
            Give farming families a simple way to list their homestay, set their price, and get paid directly — without going through a middleman.
          </p>
        </div>
        
        <!-- Vision Card -->
        <div class="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <h3 class="text-2xl font-serif font-bold text-[#113A28] mb-6 tracking-wide">VISION</h3>
          <p class="text-gray-600 leading-relaxed text-lg">
            A day where every rural district in Cambodia has at least one homestay on CambodiaStay making agri-tourism a real source of income for rural communities.
          </p>
        </div>
      </section>

      <!-- 4. Values Section -->
      <section class="max-w-5xl mx-auto mb-24 text-center">
        <h4 class="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">What we believe</h4>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-12">Our Values</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Direct & fair</h3>
            <p class="text-gray-600 leading-relaxed">
              Most of the income goes straight to the host family, not a middleman.
            </p>
          </div>
          <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Rooted in the land</h3>
            <p class="text-gray-600 leading-relaxed">
              We promote travel that doesn't disrupt farming life or the surrounding environment.
            </p>
          </div>
          <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Culture, kept alive</h3>
            <p class="text-gray-600 leading-relaxed">
              Every stay is a chance for farming stories and skills to live on.
            </p>
          </div>
        </div>
      </section>

      <!-- 5. Call to Action Container -->
      <section class="max-w-4xl mx-auto mb-10">
        <div class="bg-[#3D4C2F] rounded-[2.5rem] px-8 py-16 md:py-20 text-center shadow-xl">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#F8F7F2] mb-4">
            Want to share your homestay?
          </h2>
          <p class="text-[#DCE0D3] mb-12 font-bold tracking-wide">
            Become a host in under 10 minutes.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <RouterLink 
              to="/host-application" 
              class="bg-[#DCE0D3] text-[#3D4C2F] px-8 py-4 rounded-xl font-medium hover:bg-white transition-colors text-lg"
            >
              Register as a host
            </RouterLink>
            <RouterLink 
              to="/explore" 
              class="bg-transparent border border-[#7B8C63] text-[#F8F7F2] px-8 py-4 rounded-xl font-medium hover:bg-[#4B5C3D] transition-colors text-lg"
            >
              Explore homestays
            </RouterLink>
          </div>
        </div>
      </section>

    </main>

    <!-- Global Footer -->
    <Footer />
    
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

// Import Reusable Layout Components
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
</script>