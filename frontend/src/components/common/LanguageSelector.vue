<template>
  <div class="relative" ref="dropdownRef">
    <!-- Language Trigger Button -->
    <button
      type="button"
      @click.stop="isOpen = !isOpen"
      :class="[
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer',
        dark
          ? 'text-emerald-100 hover:text-white hover:bg-white/10'
          : 'text-gray-700 hover:text-[#113A28] hover:bg-gray-100 border border-gray-200/80 bg-white/80 shadow-xs'
      ]"
      :title="`Language / ភាសា: ${currentLanguage.name} (${currentLanguage.nativeName})`"
      aria-label="Select Language"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :class="['w-4 h-4', dark ? 'text-emerald-200' : 'text-black']"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span class="font-bold tracking-wide uppercase text-[11px]">{{ currentLanguage.code }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 h-3 opacity-60 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      :class="[
        'absolute mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 animate-fade-in',
        placement === 'left' ? 'left-0' : 'right-0'
      ]"
      @click.stop
    >
      <div class="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1 flex items-center justify-between">
        <span>Language / ភាសា</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>

      <button
        v-for="lang in availableLanguages"
        :key="lang.code"
        type="button"
        @click="chooseLanguage(lang)"
        class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
        :class="currentLanguage.code === lang.code ? 'bg-[#113A28] text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'"
      >
        <div class="flex items-center gap-2.5">
          <span
            class="w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center shrink-0"
            :class="currentLanguage.code === lang.code ? 'bg-white text-black' : 'bg-black text-white'"
          >
            {{ lang.code.toUpperCase() }}
          </span>
          <div class="text-left">
            <span class="font-bold block leading-tight">{{ lang.nativeName }}</span>
            <span class="text-[10px] block opacity-80" :class="currentLanguage.code === lang.code ? 'text-emerald-100' : 'text-gray-400'">{{ lang.name }}</span>
          </div>
        </div>
        <span v-if="currentLanguage.code === lang.code" class="text-xs font-bold">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n, type LanguageOption } from '@/composables/useI18n';

const props = withDefaults(
  defineProps<{
    dark?: boolean;
    placement?: 'left' | 'right';
  }>(),
  {
    dark: false,
    placement: 'right',
  }
);

const { currentLang, availableLanguages, setLanguage } = useI18n();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currentLanguage = computed<LanguageOption>(() => {
  return availableLanguages.find((l) => l.code === currentLang.value) || availableLanguages[0]!;
});

const chooseLanguage = (lang: LanguageOption) => {
  setLanguage(lang.code);
  isOpen.value = false;
};

const handleOutsideClick = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.15s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
