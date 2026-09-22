<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[180] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 relative my-auto">
        <!-- Close Button (top-right) -->
        <button
          type="button"
          @click="$emit('close')"
          class="absolute top-3.5 right-3.5 z-20 text-white/80 hover:text-white transition cursor-pointer p-1 rounded-full hover:bg-white/20"
          title="Close Modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Official NBC Bakong KHQR Header Banner -->
        <div class="bg-[#E1251B] text-white px-6 pt-5 pb-4 relative">
          <div class="flex items-center justify-between pr-6">
            <div class="flex items-center gap-2">
              <!-- KHQR Logo Badge -->
              <div class="bg-white text-[#E1251B] px-2.5 py-0.5 rounded-md font-black text-sm tracking-wider shadow-xs">
                KHQR
              </div>
              <span class="text-xs text-white/90 font-bold uppercase tracking-wider">Bakong Official</span>
            </div>
            <span class="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-white/90 font-medium">
              National Bank of Cambodia
            </span>
          </div>
          <p class="text-[11px] text-white/80 mt-1 font-khmer">
            ទូទាត់ប្រាក់តាម KHQR ជាមួយគ្រប់កម្មវិធីធនាគារក្នុងប្រទេសកម្ពុជា
          </p>
        </div>

        <!-- Body Content -->
        <div class="p-6">
          <!-- Merchant & Property Details -->
          <div class="text-center pb-4 border-b border-gray-100">
            <h3 class="text-base font-serif font-bold text-gray-900 truncate">
              {{ homestay?.name || 'Cambodian Homestay' }}
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">
              {{ homestay?.province || 'Cambodia' }} · Stay for {{ bookingDetails?.guests || 1 }} {{ (bookingDetails?.guests || 1) === 1 ? 'Guest' : 'Guests' }}
            </p>
            <p class="text-[11px] text-gray-400 font-mono mt-0.5">
              Ref: {{ transactionRef }}
            </p>
          </div>

          <!-- Total Amount with Dual Currency (USD & KHR) -->
          <div class="py-4 text-center bg-[#FCFAF6] rounded-2xl my-4 border border-gray-200/80">
            <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Total Amount Due</span>
            <div class="flex items-baseline justify-center gap-2">
              <span class="text-3xl font-serif font-bold text-[#113A28]">
                ${{ Number(bookingDetails?.totalPrice || 0).toFixed(2) }}
              </span>
              <span class="text-xs font-semibold text-gray-500">USD</span>
            </div>
            <div class="text-xs font-bold text-gray-600 mt-0.5 font-khmer">
              ≈ ៛{{ rielAmount.toLocaleString('en-US') }} KHR
              <span class="text-[10px] font-normal text-gray-400">(@ 4,100 KHR/USD)</span>
            </div>
          </div>

          <!-- KHQR Code Display Card -->
          <div class="relative bg-white rounded-2xl p-4 border-2 border-dashed border-gray-200 text-center flex flex-col items-center justify-center">
            <!-- Simulated Authentic KHQR SVG Pattern -->
            <div class="relative w-48 h-48 bg-white p-2 rounded-xl shadow-xs border border-gray-200 flex items-center justify-center">
              <svg
                class="w-full h-full"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Outer Border / Background -->
                <rect width="200" height="200" fill="#FFFFFF" rx="8" />

                <!-- Top-Left QR Target -->
                <rect x="14" y="14" width="44" height="44" rx="4" fill="#111827" />
                <rect x="22" y="22" width="28" height="28" rx="2" fill="#FFFFFF" />
                <rect x="28" y="28" width="16" height="16" rx="1" fill="#111827" />

                <!-- Top-Right QR Target -->
                <rect x="142" y="14" width="44" height="44" rx="4" fill="#111827" />
                <rect x="150" y="22" width="28" height="28" rx="2" fill="#FFFFFF" />
                <rect x="156" y="28" width="16" height="16" rx="1" fill="#111827" />

                <!-- Bottom-Left QR Target -->
                <rect x="14" y="142" width="44" height="44" rx="4" fill="#111827" />
                <rect x="22" y="150" width="28" height="28" rx="2" fill="#FFFFFF" />
                <rect x="28" y="156" width="16" height="16" rx="1" fill="#111827" />

                <!-- Decorative QR Matrix Grid Dots -->
                <rect x="68" y="16" width="8" height="8" rx="1" fill="#111827" />
                <rect x="84" y="16" width="16" height="8" rx="1" fill="#111827" />
                <rect x="108" y="16" width="8" height="8" rx="1" fill="#111827" />
                <rect x="124" y="16" width="8" height="8" rx="1" fill="#111827" />

                <rect x="68" y="32" width="16" height="8" rx="1" fill="#111827" />
                <rect x="100" y="32" width="8" height="8" rx="1" fill="#111827" />
                <rect x="116" y="32" width="16" height="8" rx="1" fill="#111827" />

                <rect x="76" y="48" width="8" height="8" rx="1" fill="#111827" />
                <rect x="92" y="48" width="16" height="8" rx="1" fill="#111827" />
                <rect x="124" y="48" width="8" height="8" rx="1" fill="#111827" />

                <rect x="16" y="68" width="8" height="16" rx="1" fill="#111827" />
                <rect x="32" y="68" width="16" height="8" rx="1" fill="#111827" />
                <rect x="56" y="68" width="8" height="8" rx="1" fill="#111827" />
                <rect x="72" y="68" width="16" height="16" rx="1" fill="#111827" />
                <rect x="112" y="68" width="16" height="8" rx="1" fill="#111827" />
                <rect x="136" y="68" width="8" height="16" rx="1" fill="#111827" />
                <rect x="152" y="68" width="16" height="8" rx="1" fill="#111827" />
                <rect x="176" y="68" width="8" height="8" rx="1" fill="#111827" />

                <rect x="68" y="142" width="8" height="16" rx="1" fill="#111827" />
                <rect x="84" y="142" width="16" height="8" rx="1" fill="#111827" />
                <rect x="108" y="142" width="8" height="8" rx="1" fill="#111827" />
                <rect x="124" y="142" width="16" height="16" rx="1" fill="#111827" />
                <rect x="152" y="142" width="16" height="8" rx="1" fill="#111827" />
                <rect x="176" y="142" width="8" height="16" rx="1" fill="#111827" />

                <rect x="68" y="166" width="16" height="8" rx="1" fill="#111827" />
                <rect x="92" y="166" width="8" height="16" rx="1" fill="#111827" />
                <rect x="108" y="166" width="16" height="8" rx="1" fill="#111827" />
                <rect x="144" y="166" width="24" height="8" rx="1" fill="#111827" />
                <rect x="176" y="166" width="8" height="8" rx="1" fill="#111827" />

                <!-- Center Bakong Red Emblem Badge -->
                <rect x="76" y="76" width="48" height="48" rx="12" fill="#E1251B" stroke="#FFFFFF" stroke-width="4" />
                <circle cx="100" cy="100" r="14" fill="#FFFFFF" />
                <text x="100" y="104" font-size="12" font-weight="bold" fill="#E1251B" text-anchor="middle" font-family="Arial, sans-serif">$</text>
              </svg>

              <!-- Payment Success Overlay on Simulated Scan -->
              <div
                v-if="isPaymentApproved"
                class="absolute inset-0 bg-emerald-700/95 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white animate-fade-in"
              >
                <div class="w-12 h-12 rounded-full bg-white text-emerald-700 flex items-center justify-center text-2xl font-black mb-2 shadow-md animate-bounce">
                  ✓
                </div>
                <p class="font-bold text-sm">Payment Verified!</p>
                <p class="text-[10px] text-emerald-100">Generating voucher...</p>
              </div>
            </div>

            <!-- Expiry timer & Bank icons -->
            <div class="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Expires in: <strong>{{ timerString }}</strong></span>
            </div>

            <p class="text-[10px] text-gray-400 mt-1">
              Supported by ABA, ACLEDA, Wing, Canadia & 30+ Cambodian banks
            </p>
          </div>

          <!-- Actions Bar -->
          <div class="mt-5 space-y-2.5">
            <!-- Primary Demo Trigger: Simulate Bakong Scan -->
            <button
              type="button"
              @click="simulatePayment"
              :disabled="isProcessing || isPaymentApproved"
              class="w-full bg-[#E1251B] hover:bg-[#c41e15] disabled:bg-gray-400 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <svg v-if="!isProcessing && !isPaymentApproved" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span v-if="isProcessing">Verifying with Bakong Network...</span>
              <span v-else-if="isPaymentApproved">Payment Confirmed ✓</span>
              <span v-else>Simulate Bakong App Scan & Pay</span>
            </button>

            <!-- Secondary: Pay Cash on Arrival -->
            <button
              type="button"
              @click="payCashOnArrival"
              :disabled="isProcessing || isPaymentApproved"
              class="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl font-semibold text-xs transition border border-gray-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>💵</span>
              <span>Reserve & Pay Cash on Arrival</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  homestay: any;
  bookingDetails: {
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    totalPrice: number;
    subtotal?: number;
    discount?: number;
    couponCode?: string;
  };
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'paySuccess', payload: { paymentMethod: 'khqr' | 'cash'; transactionId: string }): void;
}>();

const transactionRef = ref(`CS-KHQR-${Date.now().toString().slice(-6)}`);
const isProcessing = ref(false);
const isPaymentApproved = ref(false);

const rielAmount = computed(() => {
  return Math.round((props.bookingDetails?.totalPrice || 0) * 4100);
});

// 10-minute countdown timer
const remainingSeconds = ref(600);
let timerInterval: any = null;

const timerString = computed(() => {
  const m = Math.floor(remainingSeconds.value / 60);
  const s = remainingSeconds.value % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
});

onMounted(() => {
  timerInterval = setInterval(() => {
    if (remainingSeconds.value > 0) {
      remainingSeconds.value--;
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const simulatePayment = () => {
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    isPaymentApproved.value = true;

    setTimeout(() => {
      emit('paySuccess', {
        paymentMethod: 'khqr',
        transactionId: transactionRef.value,
      });
      isPaymentApproved.value = false;
    }, 1200);
  }, 1500);
};

const payCashOnArrival = () => {
  emit('paySuccess', {
    paymentMethod: 'cash',
    transactionId: `CASH-${Date.now().toString().slice(-6)}`,
  });
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>
