<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm"
        @click.self="handleBackdropClick"
        tabindex="-1"
      >
        <Transition
          enter-active-class="transition duration-250 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-3"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-3"
        >
          <div
            class="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-center select-none"
            role="dialog"
            aria-modal="true"
          >
            <!-- Top Status Icon -->
            <div class="mx-auto mb-4 flex items-center justify-center">
              <!-- Danger Icon -->
              <div
                v-if="options.type === 'danger'"
                class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 border border-red-200/60 flex items-center justify-center shadow-inner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <!-- Warning Icon -->
              <div
                v-else-if="options.type === 'warning'"
                class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shadow-inner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <!-- Success Icon -->
              <div
                v-else-if="options.type === 'success'"
                class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shadow-inner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <!-- Default / Confirm / Info Icon -->
              <div
                v-else
                class="w-14 h-14 rounded-2xl bg-[#113A28]/10 text-[#113A28] border border-[#113A28]/20 flex items-center justify-center shadow-inner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <!-- Title -->
            <h3 class="font-serif font-bold text-xl sm:text-2xl text-gray-900 mb-2 leading-snug">
              {{ options.title }}
            </h3>

            <!-- Message Body -->
            <p class="text-sm text-gray-600 leading-relaxed font-medium mb-6 whitespace-pre-line px-2">
              {{ options.message }}
            </p>

            <!-- Action Buttons -->
            <div v-if="options.cancelText" class="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3">
              <button
                type="button"
                @click="onCancel"
                class="w-full sm:flex-1 py-3 px-4 rounded-2xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-100 active:scale-95 transition text-xs sm:text-sm cursor-pointer"
              >
                {{ options.cancelText || t('common.cancel') }}
              </button>

              <button
                type="button"
                @click="onConfirm"
                :class="[
                  'w-full sm:flex-1 py-3 px-4 rounded-2xl font-bold active:scale-95 transition text-xs sm:text-sm cursor-pointer shadow-sm',
                  options.type === 'danger'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-[#113A28] hover:bg-[#0a261a] text-white'
                ]"
              >
                {{ options.confirmText || (options.type === 'danger' ? t('common.delete') : t('common.confirm')) }}
              </button>
            </div>

            <!-- Single Button for Alerts / Notifications -->
            <div v-else>
              <button
                type="button"
                @click="onConfirm"
                class="w-full py-3.5 px-6 rounded-2xl bg-[#113A28] hover:bg-[#0a261a] text-white font-bold active:scale-95 transition text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                {{ options.confirmText || t('common.close') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useI18n } from '@/composables/useI18n';

const { isOpen, options, onConfirm, onCancel } = useConfirmDialog();
const { t } = useI18n();

const handleBackdropClick = () => {
  if (options.value.cancelText) {
    onCancel();
  } else {
    onConfirm();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return;
  if (e.key === 'Escape') {
    if (options.value.cancelText) {
      onCancel();
    } else {
      onConfirm();
    }
  } else if (e.key === 'Enter') {
    onConfirm();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
