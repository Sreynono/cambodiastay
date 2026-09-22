<template>
  <Teleport to="body">
    <div
      v-if="isOpen && booking"
      class="fixed inset-0 z-[190] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white print:static"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 my-auto print:shadow-none print:border-none print:max-w-none print:w-full print:rounded-none">
        <!-- Top Action Bar (hidden on print) -->
        <div class="bg-[#113A28] text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-bold text-sm">
              ✓
            </div>
            <div>
              <h3 class="font-serif font-bold text-sm sm:text-base leading-tight">Stay Voucher Confirmed</h3>
              <p class="text-[11px] text-emerald-200">Official CamStay Booking Confirmation</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="printVoucher"
              class="bg-white hover:bg-emerald-50 text-[#113A28] px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="text-emerald-200 hover:text-white p-1 transition cursor-pointer"
              title="Close Voucher"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Printable Voucher Card Core -->
        <div id="voucher-print-area" class="p-6 sm:p-8 space-y-6">
          <!-- Official Header with CamStay Logo -->
          <div class="flex items-start justify-between border-b-2 border-gray-100 pb-5">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-serif font-bold text-[#113A28] tracking-tight">CamStay</span>
                <span class="text-xs bg-[#113A28] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">Homestays</span>
              </div>
              <p class="text-xs font-semibold text-gray-500 mt-1">Official Reservation Voucher & Stay Receipt</p>
              <p class="text-[11px] text-gray-400 font-khmer">វិក្កយបត្របញ្ជាក់ការកក់ស្នាក់នៅផ្លូវការ</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Booking Reference</span>
              <span class="text-base sm:text-lg font-mono font-bold text-gray-900 block">
                CS-{{ bookingYear }}-{{ bookingRefId }}
              </span>
              <span
                :class="[
                  'text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mt-1 uppercase tracking-wider',
                  (booking?.status === 'approved' || booking?.status === 'confirmed')
                    ? 'bg-emerald-100 text-emerald-800'
                    : booking?.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                ]"
              >
                {{ (booking?.status === 'approved' || booking?.status === 'confirmed') ? 'Confirmed ✓' : booking?.status === 'pending' ? 'Pending Host Approval' : 'Cancelled' }}
              </span>
            </div>
          </div>

          <!-- Homestay & Host Information Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FCFAF6] p-4 rounded-2xl border border-gray-200/80">
            <div>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Homestay Destination</span>
              <h4 class="font-serif font-bold text-base text-gray-900 leading-snug">
                {{ booking?.property_name || homestay?.name || 'Cambodian Countryside Homestay' }}
              </h4>
              <p class="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ homestay?.district ? `${homestay.district}, ` : '' }}{{ booking?.province || homestay?.province || 'Cambodia' }}</span>
              </p>
            </div>
            <div class="border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4 pt-3 sm:pt-0">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Host Contact</span>
              <p class="font-bold text-xs text-gray-900">{{ hostDisplayName }}</p>
              <p class="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ hostPhoneDisplay }}</span>
              </p>
            </div>
          </div>

          <!-- Schedule & Guest Details Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Check-In</span>
              <p class="font-bold text-xs text-gray-900 mt-0.5">{{ booking?.check_in_date || '—' }}</p>
              <span class="text-[10px] text-emerald-800 font-semibold">After 2:00 PM</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Check-Out</span>
              <p class="font-bold text-xs text-gray-900 mt-0.5">{{ booking?.check_out_date || '—' }}</p>
              <span class="text-[10px] text-gray-500 font-semibold">Before 11:00 AM</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Guests</span>
              <p class="font-bold text-xs text-gray-900 mt-0.5">{{ booking?.guests_count || 1 }} {{ (booking?.guests_count || 1) === 1 ? 'Guest' : 'Guests' }}</p>
              <span class="text-[10px] text-gray-500 truncate block">{{ booking?.guest_name || 'Traveler' }}</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Duration</span>
              <p class="font-bold text-xs text-gray-900 mt-0.5">{{ calculatedNights }} {{ calculatedNights === 1 ? 'Night' : 'Nights' }}</p>
              <span class="text-[10px] text-emerald-800 font-semibold">Village Stay</span>
            </div>
          </div>

          <!-- Financial Breakdown & Check-in Token QR -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
            <!-- Price Recap -->
            <div class="space-y-1.5 w-full sm:w-auto">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Settlement Summary</span>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-serif font-bold text-[#113A28]">${{ Number(booking?.total_price || 0).toFixed(2) }}</span>
                <span class="text-xs font-semibold text-gray-500">USD Total</span>
              </div>
              <p class="text-xs font-bold text-gray-700 font-khmer">
                ≈ ៛{{ (Number(booking?.total_price || 0) * 4100).toLocaleString('en-US') }} KHR
              </p>
              <div class="flex items-center gap-1.5 pt-1">
                <span
                  v-if="paymentMethod === 'khqr'"
                  class="text-[10px] font-bold bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                >
                  <span>Bakong KHQR Paid ✓</span>
                </span>
                <span
                  v-else
                  class="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md"
                >
                  Pay on Arrival (Cash)
                </span>
              </div>
            </div>

            <!-- Check-in Token Graphic -->
            <div class="text-center shrink-0">
              <div class="w-24 h-24 bg-white p-1.5 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-center mx-auto">
                <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Token QR Graphic -->
                  <rect width="100" height="100" fill="#FFFFFF" rx="4" />
                  <rect x="8" y="8" width="26" height="26" rx="2" fill="#113A28" />
                  <rect x="13" y="13" width="16" height="16" rx="1" fill="#FFFFFF" />
                  <rect x="17" y="17" width="8" height="8" fill="#113A28" />

                  <rect x="66" y="8" width="26" height="26" rx="2" fill="#113A28" />
                  <rect x="71" y="13" width="16" height="16" rx="1" fill="#FFFFFF" />
                  <rect x="75" y="17" width="8" height="8" fill="#113A28" />

                  <rect x="8" y="66" width="26" height="26" rx="2" fill="#113A28" />
                  <rect x="13" y="71" width="16" height="16" rx="1" fill="#FFFFFF" />
                  <rect x="17" y="75" width="8" height="8" fill="#113A28" />

                  <rect x="42" y="12" width="16" height="6" fill="#113A28" />
                  <rect x="42" y="24" width="8" height="16" fill="#113A28" />
                  <rect x="54" y="24" width="16" height="6" fill="#113A28" />
                  <rect x="42" y="44" width="16" height="16" fill="#113A28" />
                  <rect x="66" y="44" width="16" height="6" fill="#113A28" />
                  <rect x="12" y="44" width="16" height="8" fill="#113A28" />
                  <rect x="42" y="68" width="8" height="16" fill="#113A28" />
                  <rect x="56" y="68" width="16" height="6" fill="#113A28" />
                  <rect x="66" y="80" width="20" height="8" fill="#113A28" />
                </svg>
              </div>
              <span class="text-[9px] font-mono text-gray-400 block mt-1">Host Check-In Token</span>
            </div>
          </div>

          <!-- Stay Policies & Village Etiquette -->
          <div class="border-t border-gray-200 pt-4 text-xs text-gray-500 space-y-1.5">
            <h5 class="font-bold text-gray-800 text-[11px] uppercase tracking-wider">Stay Guidelines & Cambodian Hospitality:</h5>
            <ul class="list-disc pl-4 space-y-0.5 text-[11px] leading-relaxed">
              <li>Present this voucher or booking reference code upon arrival to your host.</li>
              <li>Quiet hours start after 9:30 PM to respect the peaceful countryside village community.</li>
              <li>Please keep surroundings clean and support local eco-friendly community tourism.</li>
            </ul>
          </div>
        </div>

        <!-- Bottom Modal Actions (hidden on print) -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3 print:hidden">
          <RouterLink
            to="/dashboard/guest"
            @click="$emit('close')"
            class="text-xs text-gray-600 hover:text-black font-semibold transition"
          >
            View all my trips in Guest Dashboard →
          </RouterLink>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="printVoucher"
              class="bg-[#113A28] hover:bg-[#0a261a] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print Voucher</span>
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    booking: any;
    homestay?: any;
    paymentMethod?: 'khqr' | 'cash';
    transactionId?: string;
  }>(),
  {
    paymentMethod: 'khqr',
  }
);

defineEmits<{
  (e: 'close'): void;
}>();

const bookingRefId = computed(() => {
  const id = props.booking?.id || props.booking?.booking_id || 101;
  return String(id).padStart(5, '0');
});

const bookingYear = computed(() => {
  if (props.booking?.created_at) {
    return new Date(props.booking.created_at).getFullYear();
  }
  return new Date().getFullYear();
});

const hostDisplayName = computed(() => {
  return (
    props.homestay?.hostName ||
    props.homestay?.host?.full_name ||
    'CamStay Verified Host'
  );
});

const hostPhoneDisplay = computed(() => {
  return (
    props.homestay?.hostPhone ||
    props.homestay?.host?.phone_number ||
    '+855 12 789 456'
  );
});

const calculatedNights = computed(() => {
  if (!props.booking?.check_in_date || !props.booking?.check_out_date) return 1;
  try {
    const s = new Date(props.booking.check_in_date).getTime();
    const e = new Date(props.booking.check_out_date).getTime();
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
});

const printVoucher = () => {
  window.print();
};
</script>

<style>
@media print {
  body * {
    visibility: hidden;
  }
  #voucher-print-area,
  #voucher-print-area * {
    visibility: visible;
  }
  #voucher-print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 20px;
    background: white;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>
