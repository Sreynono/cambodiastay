<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[180] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden border border-gray-100 relative my-auto">
        <!-- Close Button (top-right) -->
        <button
          type="button"
          @click="$emit('close')"
          class="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-700 transition cursor-pointer p-1.5 rounded-lg hover:bg-gray-100"
          title="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Header (Clean, Minimalist, No Color) -->
        <div class="bg-white border-b border-gray-100 px-6 pt-5 pb-4 relative pr-12">
          <h3 class="text-base sm:text-lg font-bold text-gray-900">
            {{ t('paymentModal.secureCheckout') || 'Checkout' }}
          </h3>
          <p class="text-xs text-gray-500 mt-0.5 truncate">
            {{ homestay?.name || 'Cambodian Homestay' }} · {{ homestay?.province || 'Cambodia' }}
          </p>
        </div>

        <!-- Body Content -->
        <div class="p-5 sm:p-6">
          <!-- Total Amount Due Card -->
          <div class="py-3 px-4 text-center bg-gray-50 rounded-xl border border-gray-200/80 mb-5">
            <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-0.5">
              {{ t('paymentModal.totalDue') || 'Total Amount Due' }}
            </span>
            <div class="flex items-baseline justify-center gap-1.5">
              <span class="text-3xl font-bold text-gray-900 font-sans">
                ${{ Number(bookingDetails?.totalPrice || 0).toFixed(2) }}
              </span>
              <span class="text-xs font-semibold text-gray-500">USD</span>
            </div>
            <div class="text-xs text-gray-500 mt-0.5 font-khmer">
              ≈ ៛{{ rielAmount.toLocaleString('en-US') }} KHR
              <span class="text-[10px] text-gray-400">(@ 4,100 KHR/USD)</span>
            </div>
          </div>

          <!-- Payment Method Selector Tabs -->
          <div class="mb-5">
            <label class="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {{ t('paymentModal.chooseMethod') || 'Payment Method' }}
            </label>
            <div class="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-xl">
              <!-- KHQR Tab -->
              <button
                type="button"
                @click="selectedMethod = 'khqr'"
                :class="[
                  'py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer text-center',
                  selectedMethod === 'khqr' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                ]"
              >
                {{ t('paymentModal.khqrTab') || 'KHQR' }}
              </button>

              <!-- Visa / Card Tab -->
              <button
                type="button"
                @click="selectedMethod = 'card'"
                :class="[
                  'py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer text-center',
                  selectedMethod === 'card' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                ]"
              >
                {{ t('paymentModal.cardTab') || 'Card' }}
              </button>

              <!-- Cash Tab -->
              <button
                type="button"
                @click="selectedMethod = 'cash'"
                :class="[
                  'py-2 px-2 rounded-lg text-xs font-semibold transition cursor-pointer text-center',
                  selectedMethod === 'cash' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                ]"
              >
                {{ t('paymentModal.cashTab') || 'Cash' }}
              </button>
            </div>
          </div>

          <!-- TAB 1: KHQR / BAKONG -->
          <div v-if="selectedMethod === 'khqr'" class="space-y-4">
            <!-- KHQR Code Display Card (Clean, Simple, No Red Border) -->
            <div class="relative bg-white rounded-xl p-4 border border-gray-200 text-center flex flex-col items-center justify-center">
              <!-- Host Uploaded QR Code Display -->
              <div v-if="hasHostQr" class="relative w-52 max-w-full bg-white p-3 rounded-xl border border-gray-200 flex flex-col items-center">
                <!-- KHQR Header -->
                <div class="w-full flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                  <span class="text-xs font-bold text-gray-900">KHQR</span>
                  <span class="text-[10px] text-gray-500 font-medium truncate max-w-[100px]">
                    {{ homestay?.hostName || 'Host' }}
                  </span>
                </div>

                <!-- Host Actual Uploaded QR Image -->
                <div class="relative w-44 h-44 flex items-center justify-center bg-white rounded-lg overflow-hidden border border-gray-100 p-1">
                  <img
                    :src="hostQrImage"
                    alt="Host KHQR Payment Code"
                    class="w-full h-full object-contain"
                  />
                  <!-- Payment Success Overlay -->
                  <div
                    v-if="isPaymentApproved"
                    class="absolute inset-0 bg-gray-900/95 backdrop-blur-xs rounded-lg flex flex-col items-center justify-center text-white animate-fade-in"
                  >
                    <div class="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center text-xl font-bold mb-1 shadow-md">
                      ✓
                    </div>
                    <p class="font-bold text-xs">{{ t('paymentModal.paymentVerified') || 'Payment Verified' }}</p>
                  </div>
                </div>

                <p class="text-[10px] text-gray-400 font-medium mt-2">
                  {{ t('paymentModal.hostOfficialQr') || 'Scan with your banking app' }}
                </p>
              </div>

              <!-- Fallback: NBC Bakong Generated SVG QR Pattern (Monochrome Clean) -->
              <div v-else class="relative w-48 h-48 bg-white p-2 rounded-xl border border-gray-200 flex items-center justify-center">
                <svg class="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="#FFFFFF" rx="8" />
                  <rect x="14" y="14" width="44" height="44" rx="4" fill="#111827" />
                  <rect x="22" y="22" width="28" height="28" rx="2" fill="#FFFFFF" />
                  <rect x="28" y="28" width="16" height="16" rx="1" fill="#111827" />
                  <rect x="142" y="14" width="44" height="44" rx="4" fill="#111827" />
                  <rect x="150" y="22" width="28" height="28" rx="2" fill="#FFFFFF" />
                  <rect x="156" y="28" width="16" height="16" rx="1" fill="#111827" />
                  <rect x="14" y="142" width="44" height="44" rx="4" fill="#111827" />
                  <rect x="22" y="150" width="28" height="28" rx="2" fill="#FFFFFF" />
                  <rect x="28" y="156" width="16" height="16" rx="1" fill="#111827" />
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
                  <rect x="76" y="76" width="48" height="48" rx="12" fill="#111827" stroke="#FFFFFF" stroke-width="4" />
                  <circle cx="100" cy="100" r="14" fill="#FFFFFF" />
                  <text x="100" y="104" font-size="12" font-weight="bold" fill="#111827" text-anchor="middle" font-family="Arial, sans-serif">$</text>
                </svg>

                <div
                  v-if="isPaymentApproved"
                  class="absolute inset-0 bg-gray-900/95 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white animate-fade-in"
                >
                  <div class="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center text-xl font-bold mb-1 shadow-md">
                    ✓
                  </div>
                  <p class="font-bold text-xs">{{ t('paymentModal.paymentVerified') || 'Payment Verified' }}</p>
                </div>
              </div>

              <!-- Expiry timer & notice -->
              <div class="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{{ t('paymentModal.expiresIn') || 'Expires in' }}: <strong>{{ timerString }}</strong></span>
              </div>

              <p class="text-[10px] text-gray-400 mt-1">
                {{ hasHostQr ? (t('paymentModal.scanDirectly') || 'Scan with your banking app') : 'Supported by ABA, ACLEDA, Wing, Canadia & 30+ Cambodian banks' }}
              </p>
            </div>

            <!-- Trigger: Simulate Bakong Scan (Clean Neutral Button) -->
            <button
              type="button"
              @click="simulatePayment('khqr')"
              :disabled="isProcessing || isPaymentApproved"
              class="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white py-3 rounded-xl font-medium text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <svg v-if="!isProcessing && !isPaymentApproved" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span v-if="isProcessing">{{ t('paymentModal.verifyingKhqr') || 'Verifying Payment...' }}</span>
              <span v-else-if="isPaymentApproved">{{ t('paymentModal.paymentVerified') || 'Payment Verified ✓' }}</span>
              <span v-else>Simulate Bakong App Scan & Pay</span>
            </button>
          </div>

          <!-- TAB 2: VISA / CREDIT CARD -->
          <div v-else-if="selectedMethod === 'card'" class="space-y-3.5">
            <!-- Accepted Card Badges (Clean Neutral) -->
            <div class="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
              <span class="text-xs font-semibold text-gray-700">Visa · Mastercard · JCB</span>
              <!-- Demo Fill Button -->
              <button
                type="button"
                @click="fillDemoCard"
                class="text-[10px] font-semibold text-gray-700 hover:text-black bg-white border border-gray-200 px-2 py-0.5 rounded-lg transition shadow-2xs cursor-pointer"
              >
                {{ t('paymentModal.demoCardBtn') || 'Demo Fill' }}
              </button>
            </div>

            <!-- Cardholder Name -->
            <div>
              <label class="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {{ t('paymentModal.cardholderName') || 'Cardholder Name' }}
              </label>
              <input
                v-model="cardForm.name"
                type="text"
                placeholder="e.g. SOKHA CHEA"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-xs font-medium uppercase"
              />
            </div>

            <!-- Card Number -->
            <div>
              <label class="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {{ t('paymentModal.cardNumber') || 'Card Number' }}
              </label>
              <div class="relative">
                <input
                  v-model="cardForm.number"
                  type="text"
                  maxlength="19"
                  @input="formatCardNumber"
                  placeholder="4532 8200 1234 5678"
                  class="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-xs font-mono font-semibold tracking-wider"
                />
                <div class="absolute right-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Expiry & CVC Grid -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {{ t('paymentModal.expiryDate') || 'Expiry Date' }}
                </label>
                <input
                  v-model="cardForm.expiry"
                  type="text"
                  maxlength="5"
                  @input="formatExpiry"
                  placeholder="MM/YY"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-xs font-mono font-semibold text-center"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {{ t('paymentModal.cvc') || 'CVC' }}
                </label>
                <input
                  v-model="cardForm.cvc"
                  type="password"
                  maxlength="4"
                  placeholder="•••"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none text-xs font-mono font-semibold text-center"
                />
              </div>
            </div>

            <!-- Pay With Card Button (Clean Neutral) -->
            <button
              type="button"
              @click="simulatePayment('card')"
              :disabled="isProcessing || isPaymentApproved"
              class="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white py-3 rounded-xl font-medium text-xs transition cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span v-if="isProcessing">{{ t('paymentModal.authorizingCard') || 'Authorizing...' }}</span>
              <span v-else-if="isPaymentApproved">{{ t('paymentModal.paymentVerified') || 'Payment Verified ✓' }}</span>
              <span v-else>Pay with Card (${{ Number(bookingDetails?.totalPrice || 0).toFixed(2) }})</span>
            </button>
          </div>

          <!-- TAB 3: CASH ON ARRIVAL -->
          <div v-else-if="selectedMethod === 'cash'" class="space-y-4">
            <div class="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <h4 class="font-semibold text-sm text-gray-900 mb-1">
                {{ t('paymentModal.cashTitle') || 'Cash on Arrival' }}
              </h4>
              <p class="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                {{ t('paymentModal.cashDescription') || 'Pay directly to your host upon checking in at the property.' }}
              </p>
            </div>

            <!-- Confirm Cash Reservation Button (Clean Neutral) -->
            <button
              type="button"
              @click="payCashOnArrival"
              :disabled="isProcessing"
              class="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white py-3 rounded-xl font-medium text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{{ t('paymentModal.confirmCashReservation') || 'Confirm Reservation' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from '@/composables/useI18n';

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
  (e: 'paySuccess', payload: { paymentMethod: 'khqr' | 'card' | 'cash'; transactionId: string }): void;
}>();

const { t } = useI18n();

const selectedMethod = ref<'khqr' | 'card' | 'cash'>('khqr');
const transactionRef = ref(`CS-PAY-${Date.now().toString().slice(-6)}`);
const isProcessing = ref(false);
const isPaymentApproved = ref(false);

// Host Uploaded KHQR check
const hasHostQr = computed(() => {
  return !!(props.homestay?.payment_qr_url || props.homestay?.paymentQrUrl);
});

const hostQrImage = computed(() => {
  return props.homestay?.payment_qr_url || props.homestay?.paymentQrUrl || '';
});

// Card Payment State
const cardForm = reactive({
  name: '',
  number: '',
  expiry: '',
  cvc: '',
});

const detectedCardBrand = computed(() => {
  const clean = cardForm.number.replace(/\s+/g, '');
  if (clean.startsWith('4')) return 'visa';
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
  return '';
});

const formatCardNumber = () => {
  let v = cardForm.number.replace(/\D/g, '').slice(0, 16);
  cardForm.number = v.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const formatExpiry = () => {
  let v = cardForm.expiry.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) {
    cardForm.expiry = `${v.slice(0, 2)}/${v.slice(2)}`;
  } else {
    cardForm.expiry = v;
  }
};

const fillDemoCard = () => {
  cardForm.name = 'TRAVELER GUEST';
  cardForm.number = '4532 8200 1234 5678';
  cardForm.expiry = '12/28';
  cardForm.cvc = '888';
};

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

const simulatePayment = (method: 'khqr' | 'card') => {
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    isPaymentApproved.value = true;

    setTimeout(() => {
      emit('paySuccess', {
        paymentMethod: method,
        transactionId: method === 'card' 
          ? `VISA-${Date.now().toString().slice(-6)}` 
          : transactionRef.value,
      });
      isPaymentApproved.value = false;
    }, 1200);
  }, 1400);
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
