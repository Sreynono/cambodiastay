<template>
  <footer class="pt-10 sm:pt-12 pb-6 sm:pb-8 border-t border-gray-200 bg-[#EEEEEE]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10">
        <div class="max-w-sm">
          <RouterLink to="/" class="inline-flex items-center gap-2 mb-2.5 sm:mb-3" aria-label="CamStay Homepage">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-xs shrink-0">
              <img src="/camstay-emblem.png" alt="CamStay Logo" class="w-full h-full object-contain" />
            </div>
            <div class="flex items-baseline tracking-tight">
              <span class="text-xl sm:text-2xl font-brand font-bold text-[#113A28]">Cam</span>
              <span class="text-xl sm:text-2xl font-brand font-semibold text-[#D4A373] ml-0.5">Stay</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#E07A5F] ml-1 self-center"></span>
            </div>
          </RouterLink>
          <p class="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium max-w-md">{{ t('footer.tagline') }}</p>
          <!-- Social Media Channels (Facebook, Telegram, Instagram) -->
          <div class="flex items-center space-x-2">
            <!-- Facebook -->
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 border border-gray-300 bg-white rounded-lg flex items-center justify-center text-black hover:text-white hover:bg-black hover:border-black transition shadow-xs"
              title="Follow on Facebook"
              aria-label="Facebook"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>

            <!-- Telegram -->
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 border border-gray-300 bg-white rounded-lg flex items-center justify-center text-black hover:text-white hover:bg-black hover:border-black transition shadow-xs"
              title="Join our Telegram Community"
              aria-label="Telegram"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>

            <!-- Instagram -->
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 border border-gray-300 bg-white rounded-lg flex items-center justify-center text-black hover:text-white hover:bg-black hover:border-black transition shadow-xs"
              title="Follow on Instagram"
              aria-label="Instagram"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-bold text-gray-800 tracking-wider text-xs sm:text-sm mb-3 sm:mb-4 uppercase">{{ t('footer.platform') }}</h4>
          <ul class="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-600 font-medium">
            <li>
              <RouterLink
                to="/"
                @click="scrollToTopIfCurrent('/')"
                class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block"
              >
                {{ t('footer.home') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/explore"
                @click="scrollToTopIfCurrent('/explore')"
                class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block"
              >
                {{ t('footer.exploreStays') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/for-host"
                @click="scrollToTopIfCurrent('/for-host')"
                class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block"
              >
                {{ t('footer.hostWithUs') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                @click="scrollToTopIfCurrent('/about')"
                class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block"
              >
                {{ t('footer.aboutUs') }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-gray-800 tracking-wider text-xs sm:text-sm mb-3 sm:mb-4 uppercase">{{ t('footer.community') }}</h4>
          <ul class="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-600 font-medium">
            <li>
              <a href="#" class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block">
                {{ t('footer.sustainability') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block">
                {{ t('footer.communityFund') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block">
                {{ t('footer.heritageStories') }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-gray-800 tracking-wider text-xs sm:text-sm mb-3 sm:mb-4 uppercase">{{ t('footer.support') }}</h4>
          <ul class="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-600 font-medium">
            <li>
              <a href="#" class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block">
                {{ t('footer.terms') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block">
                {{ t('footer.privacy') }}
              </a>
            </li>
            <li>
              <a href="#" class="hover:text-[#113A28] hover:underline underline-offset-4 decoration-[#113A28] transition-colors cursor-pointer inline-block">
                {{ t('footer.helpSupport') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-medium pt-4 sm:pt-5 border-t border-gray-300 gap-2.5">
        <p>{{ t('footer.copyright') }}</p>
        <p class="text-center sm:text-right">{{ t('footer.empowering') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
const route = useRoute();

const scrollToTopIfCurrent = (path: string) => {
  if (route.path === path) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
};
</script>