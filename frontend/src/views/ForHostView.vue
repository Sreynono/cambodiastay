<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- Hero Section -->
      <section class="relative bg-[#113A28] text-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div class="w-full md:w-1/2 space-y-8">
            <h1 class="text-5xl md:text-6xl font-serif font-bold leading-tight">
              {{ t('forHost.heroTitlePrefix') }} <span class="text-[#8C9A73] not-italic">{{ t('forHost.heroTitleHighlight') }}</span><br/> {{ t('forHost.heroTitleSuffix') }}
            </h1>
            <p class="text-lg text-gray-300 max-w-lg leading-relaxed">
              {{ t('forHost.heroSubtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <RouterLink to="/host-application" class="inline-block text-center bg-[#8C9A73] text-[#113A28] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#7a8762] transition-colors shadow-lg">
                {{ t('forHost.becomeHostBtn') }}
              </RouterLink>
            </div>
          </div>
          
          <div class="w-full md:w-1/2">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2B4C38]">
              <!-- Image of a rural host/farmer -->
              <img src="@/assets/images/forhost1.jpg" alt="Cambodian Farmer" class="w-full h-[400px] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#113A28]/80 to-transparent flex items-end p-8">
                <p class="text-white font-medium italic text-lg">{{ t('forHost.quote') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Decorative Background Pattern -->
        <div class="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-white opacity-5"></div>
        <div class="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] rounded-full bg-[#8C9A73] opacity-10"></div>
      </section>

      <!-- Why Host Section -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-4">{{ t('forHost.whyHostTitle') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">{{ t('forHost.whyHostSubtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Benefit 1 -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
            <div class="w-16 h-16 mx-auto bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('forHost.benefit1Title') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ t('forHost.benefit1Desc') }}</p>
          </div>

          <!-- Benefit 2 -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
            <div class="w-16 h-16 mx-auto bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('forHost.benefit2Title') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ t('forHost.benefit2Desc') }}</p>
          </div>

          <!-- Benefit 3 -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition text-center">
            <div class="w-16 h-16 mx-auto bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('forHost.benefit3Title') }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ t('forHost.benefit3Desc') }}</p>
          </div>
        </div>
      </section>

      <!-- How it Works Section -->
      <section class="py-24 bg-[#F8FAFC] border-y border-gray-100 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row items-center gap-16">
            <div class="w-full md:w-1/2">
              <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-10">{{ t('forHost.howWorksTitle') }}</h2>
              
              <div class="space-y-8">
                <div class="flex gap-6">
                  <div class="flex-shrink-0 w-12 h-12 rounded-full bg-[#113A28] text-white flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-2">{{ t('forHost.step1Title') }}</h4>
                    <p class="text-gray-600 text-sm">{{ t('forHost.step1Desc') }}</p>
                  </div>
                </div>
                
                <div class="flex gap-6">
                  <div class="flex-shrink-0 w-12 h-12 rounded-full bg-[#113A28] text-white flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-2">{{ t('forHost.step2Title') }}</h4>
                    <p class="text-gray-600 text-sm">{{ t('forHost.step2Desc') }}</p>
                  </div>
                </div>
                
                <div class="flex gap-6">
                  <div class="flex-shrink-0 w-12 h-12 rounded-full bg-[#113A28] text-white flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 mb-2">{{ t('forHost.step3Title') }}</h4>
                    <p class="text-gray-600 text-sm">{{ t('forHost.step3Desc') }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="w-full md:w-1/2">
              <img src="@/assets/images/forhost2.jpg" alt="Smiling Host" class="rounded-3xl shadow-xl w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-6">{{ t('forHost.ctaTitle') }}</h2>
        <p class="text-gray-600 mb-10 text-lg">{{ t('forHost.ctaSubtitle') }}</p>
        <RouterLink to="/host-application" class="inline-block bg-[#113A28] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#0a261a] transition-colors shadow-lg">
          {{ t('forHost.ctaBtn') }}
        </RouterLink>
      </section>

    </main>

    <!-- Global Footer Component -->
    <Footer />
    
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from '@/composables/useI18n';

// Import Reusable Layout Components
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

const { t } = useI18n();
</script>