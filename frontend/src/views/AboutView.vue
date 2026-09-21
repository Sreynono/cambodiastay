<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 flex flex-col">

    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">

      <!-- 1. Hero Title Section -->
      <section class="w-full text-center mb-12 sm:mb-16">
        <h1 class="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-serif font-bold text-[#113A28] mb-6 leading-tight max-w-6xl mx-auto">
          {{ t('about.heroTitle') }}
        </h1>
        <p class="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
          {{ t('about.heroSubtitle') }}
        </p>
      </section>

      <!-- 2. Story Section -->
      <section class="w-full flex flex-col md:flex-row items-center gap-10 lg:gap-16 mb-16 sm:mb-20">
        <div class="w-full md:w-1/2">
          <img
            src="@/assets/images/about.jpg"
            alt="About Us"
            class="w-full h-80 sm:h-[420px] object-cover rounded-2xl sm:rounded-3xl shadow-md"
          />
        </div>
        <div class="w-full md:w-1/2">
          <h4 class="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">{{ t('about.whereStartedTag') }}</h4>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-4 sm:mb-6">{{ t('about.storyTitle') }}</h2>
          <p class="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            {{ t('about.storyP1') }}
          </p>
          <p class="text-gray-700 leading-relaxed text-base sm:text-lg">
            {{ t('about.storyP2') }}
          </p>
        </div>
      </section>

      <!-- 3. Mission & Vision Section -->
      <section class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
        <!-- Mission Card -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <h3 class="text-2xl font-serif font-bold text-[#113A28] mb-4 tracking-wide">{{ t('about.missionTitle') }}</h3>
          <p class="text-gray-600 leading-relaxed text-base sm:text-lg">
            {{ t('about.missionDesc') }}
          </p>
        </div>

        <!-- Vision Card -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <h3 class="text-2xl font-serif font-bold text-[#113A28] mb-4 tracking-wide">{{ t('about.visionTitle') }}</h3>
          <p class="text-gray-600 leading-relaxed text-base sm:text-lg">
            {{ t('about.visionDesc') }}
          </p>
        </div>
      </section>

      <!-- 4. Values Section -->
      <section class="w-full mb-16 sm:mb-20 text-center">
        <h4 class="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">{{ t('about.valuesTag') }}</h4>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-8 sm:mb-12">{{ t('about.valuesTitle') }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('about.val1Title') }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              {{ t('about.val1Desc') }}
            </p>
          </div>
          <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('about.val2Title') }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              {{ t('about.val2Desc') }}
            </p>
          </div>
          <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ t('about.val3Title') }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              {{ t('about.val3Desc') }}
            </p>
          </div>
        </div>
      </section>

      <!-- 5. Call to Action Container -->
      <section class="w-full">
        <div class="bg-[#3D4C2F] rounded-3xl sm:rounded-[2.5rem] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl">
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            {{ t('about.ctaTitle') }}
          </h2>
          <p class="text-[#DCE0D3] mb-8 sm:mb-10 font-bold tracking-wide">
            {{ t('about.ctaSubtitle') }}
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <RouterLink
              to="/host-application"
              class="bg-[#DCE0D3] text-[#3D4C2F] px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-white transition-colors text-base sm:text-lg shadow-sm"
            >
              {{ t('about.registerHostBtn') }}
            </RouterLink>
            <RouterLink
              to="/explore"
              class="bg-transparent border border-[#7B8C63] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-[#4B5C3D] transition-colors text-base sm:text-lg"
            >
              {{ t('about.exploreHomestaysBtn') }}
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
import { useI18n } from '@/composables/useI18n';

// Import Reusable Layout Components
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

const { t } = useI18n();
</script>
