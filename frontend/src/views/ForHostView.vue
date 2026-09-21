<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
    
    <!-- Global Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      
      <!-- Hero Section with Soft Mint & Sage Gradient -->
      <section 
        class="relative overflow-hidden border-b border-[#c1dfc4]/60"
        style="background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10 md:gap-12 relative z-10">
          <div class="w-full md:w-1/2 space-y-6 sm:space-y-8">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-[#113A28]">
              {{ t('forHost.heroTitlePrefix') }} <span class="text-[#3F6C50] not-italic">{{ t('forHost.heroTitleHighlight') }}</span><br/> {{ t('forHost.heroTitleSuffix') }}
            </h1>
            <p class="text-base sm:text-lg text-[#264E36] max-w-lg leading-relaxed font-medium">
              {{ t('forHost.heroSubtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <RouterLink to="/host-application" class="inline-block text-center bg-[#113A28] hover:bg-[#0D2D1F] text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl active:scale-95">
                {{ t('forHost.becomeHostBtn') }}
              </RouterLink>
            </div>
          </div>
          
          <div class="w-full md:w-1/2">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90">
              <!-- Image of a rural host/farmer -->
              <img src="@/assets/images/forhost1.jpg" alt="Cambodian Farmer" class="w-full h-80 sm:h-[400px] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#113A28]/90 via-[#113A28]/35 to-transparent flex items-end p-6 sm:p-8">
                <p class="text-white font-medium italic text-base sm:text-lg">{{ t('forHost.quote') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Decorative Ambient Soft Glow Orbs -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-white/50 blur-2xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 -ml-24 -mb-24 w-[28rem] sm:w-[36rem] h-[28rem] sm:h-[36rem] rounded-full bg-white/30 blur-2xl pointer-events-none"></div>
      </section>

      <!-- Why Host Section with Soft Eco-Green Gradient -->
      <section class="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F2F7F4]/80 via-[#F7FAF8] to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10 sm:mb-14">
            <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-3 sm:mb-4">{{ t('forHost.whyHostTitle') }}</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{{ t('forHost.whyHostSubtitle') }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <!-- Benefit 1: Reliable Income -->
            <div class="group bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(17,58,40,0.04)] border border-emerald-900/5 hover:border-emerald-800/15 hover:shadow-[0_12px_32px_rgba(17,58,40,0.08)] hover:-translate-y-1 transition-all duration-300 text-center">
              <div class="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[#113A28]/5 transition-all duration-300">
                <img src="@/assets/icons/income-coins.png" alt="Reliable Income" class="w-10 h-10 sm:w-11 sm:h-11 object-contain" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{{ t('forHost.benefit1Title') }}</h3>
              <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">{{ t('forHost.benefit1Desc') }}</p>
            </div>

            <!-- Benefit 2: Cultural Exchange -->
            <div class="group bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(17,58,40,0.04)] border border-emerald-900/5 hover:border-emerald-800/15 hover:shadow-[0_12px_32px_rgba(17,58,40,0.08)] hover:-translate-y-1 transition-all duration-300 text-center">
              <div class="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[#113A28]/5 transition-all duration-300">
                <img src="@/assets/icons/cultural-exchange.png" alt="Cultural Exchange" class="w-10 h-10 sm:w-11 sm:h-11 object-contain" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{{ t('forHost.benefit2Title') }}</h3>
              <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">{{ t('forHost.benefit2Desc') }}</p>
            </div>

            <!-- Benefit 3: Eco-Guardian Support -->
            <div class="group bg-white/95 backdrop-blur-xs p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(17,58,40,0.04)] border border-emerald-900/5 hover:border-emerald-800/15 hover:shadow-[0_12px_32px_rgba(17,58,40,0.08)] hover:-translate-y-1 transition-all duration-300 text-center">
              <div class="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[#113A28]/5 transition-all duration-300">
                <img src="@/assets/icons/eco-support.png" alt="Eco-Guardian Support" class="w-10 h-10 sm:w-11 sm:h-11 object-contain" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{{ t('forHost.benefit3Title') }}</h3>
              <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">{{ t('forHost.benefit3Desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works Section with Harmonious Gradient -->
      <section class="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F2F7F4]/60 via-[#F7FAF8] to-[#EFF5F1] border-t border-[#113A28]/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <!-- Image Column (Left on Desktop) -->
            <div class="w-full md:w-1/2 order-2 md:order-1">
              <img src="@/assets/images/forhost2.jpg" alt="Smiling Host" class="rounded-3xl shadow-xl w-full h-80 sm:h-[400px] md:h-[400px] object-cover" />
            </div>

            <!-- Content & Steps Column (Right on Desktop) -->
            <div class="w-full md:w-1/2 order-1 md:order-2">
              <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-8 sm:mb-10">{{ t('forHost.howWorksTitle') }}</h2>
              
              <div class="space-y-6 sm:space-y-8">
                <div class="flex gap-4 sm:gap-6">
                  <div class="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#113A28] to-[#1C4E36] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">1</div>
                  <div>
                    <h4 class="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{{ t('forHost.step1Title') }}</h4>
                    <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">{{ t('forHost.step1Desc') }}</p>
                  </div>
                </div>
                
                <div class="flex gap-4 sm:gap-6">
                  <div class="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#113A28] to-[#1C4E36] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">2</div>
                  <div>
                    <h4 class="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{{ t('forHost.step2Title') }}</h4>
                    <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">{{ t('forHost.step2Desc') }}</p>
                  </div>
                </div>
                
                <div class="flex gap-4 sm:gap-6">
                  <div class="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#113A28] to-[#1C4E36] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">3</div>
                  <div>
                    <h4 class="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">{{ t('forHost.step3Title') }}</h4>
                    <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">{{ t('forHost.step3Desc') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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