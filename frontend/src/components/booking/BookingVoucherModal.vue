<template>
  <Teleport to="body">
    <div
      v-if="isOpen && booking"
      class="fixed inset-0 z-[190] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in print:p-0 print:bg-white print:static"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 my-auto print:shadow-none print:border-none print:max-w-none print:w-full print:rounded-none">
        <!-- Header Bar (Screen only) -->
        <div class="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 print:hidden">
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <h3 class="font-bold text-sm text-gray-900">Booking Confirmed</h3>
          </div>
          <button
            type="button"
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Printable & Downloadable E-Ticket Body -->
        <div id="voucher-print-area" class="p-5 print:p-0">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs print:border-gray-300">
            <!-- Ticket Top Brand Bar -->
            <div class="px-5 py-3.5 bg-gray-950 text-white flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm tracking-tight text-white">CamStay</span>
                <span class="text-[9px] uppercase tracking-wider font-semibold text-gray-300 bg-gray-800 px-2 py-0.5 rounded-full">
                  E-Ticket
                </span>
              </div>
              <div class="text-right">
                <span class="text-[9px] text-gray-400 block uppercase font-mono leading-none">Booking Ref</span>
                <span class="text-xs font-mono font-bold tracking-wider text-emerald-400 block mt-0.5">
                  CS-{{ bookingYear }}-{{ bookingRefId }}
                </span>
              </div>
            </div>

            <!-- Main Ticket Body -->
            <div class="p-5 space-y-3.5">
              <!-- Property Info & Status -->
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <h4 class="font-bold text-base text-gray-900 leading-tight truncate">
                    {{ booking?.property_name || homestay?.name || 'Homestay' }}
                  </h4>
                  <p class="text-xs text-gray-500 mt-1 truncate">
                    📍 {{ homestay?.district ? `${homestay.district}, ` : '' }}{{ booking?.province || homestay?.province || 'Cambodia' }}
                  </p>
                </div>
                <span class="shrink-0 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Confirmed
                </span>
              </div>

              <!-- Guest & Host Bar -->
              <div class="flex items-center justify-between text-xs py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <span class="text-[9px] text-gray-400 block uppercase font-medium">Guest</span>
                  <span class="font-semibold text-gray-800 block truncate">{{ guestDisplayName }}</span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-gray-400 block uppercase font-medium">Host</span>
                  <span class="font-semibold text-gray-800 block truncate">{{ hostDisplayName }}</span>
                </div>
              </div>

              <!-- Check-In / Check-Out Grid -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <span class="text-[9px] text-gray-400 uppercase block font-medium">Check-In</span>
                  <span class="font-bold text-gray-900 block mt-0.5">{{ booking?.check_in_date || '—' }}</span>
                  <span class="text-[10px] text-gray-500">From 2:00 PM</span>
                </div>
                <div class="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <span class="text-[9px] text-gray-400 uppercase block font-medium">Check-Out</span>
                  <span class="font-bold text-gray-900 block mt-0.5">{{ booking?.check_out_date || '—' }}</span>
                  <span class="text-[10px] text-gray-500">Until 11:00 AM</span>
                </div>
              </div>
            </div>

            <!-- Perforated Tear Line with Side Notches -->
            <div class="relative flex items-center justify-between px-1">
              <div class="w-3.5 h-3.5 bg-gray-100 rounded-full -ml-2 border-r border-gray-200 print:hidden"></div>
              <div class="w-full border-t border-dashed border-gray-300 mx-2"></div>
              <div class="w-3.5 h-3.5 bg-gray-100 rounded-full -mr-2 border-l border-gray-200 print:hidden"></div>
            </div>

            <!-- Ticket Stub: Total & QR Token -->
            <div class="p-4 bg-gray-50/80 flex items-center justify-between gap-3">
              <div>
                <span class="text-[9px] text-gray-400 uppercase block font-medium">Total Paid</span>
                <div class="flex items-baseline gap-1 mt-0.5">
                  <span class="text-lg font-black text-gray-900 font-sans">${{ Number(booking?.total_price || 0).toFixed(2) }}</span>
                  <span class="text-[11px] text-gray-500">USD</span>
                </div>
                <span class="text-[11px] text-gray-600 block mt-0.5 font-medium">
                  {{ paymentMethod === 'khqr' ? 'Bakong KHQR' : paymentMethod === 'card' ? 'Credit Card' : 'Pay on Arrival' }}
                </span>
                <span class="text-[10px] text-gray-400 block mt-1">
                  {{ calculatedNights }} {{ calculatedNights === 1 ? 'Night' : 'Nights' }} · {{ booking?.guests_count || 1 }} {{ (booking?.guests_count || 1) === 1 ? 'Guest' : 'Guests' }}
                </span>
              </div>

              <!-- Compact QR Code -->
              <div class="text-center shrink-0">
                <div class="w-16 h-16 bg-white p-1 rounded-lg border border-gray-200 flex items-center justify-center">
                  <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#FFFFFF" rx="2" />
                    <rect x="8" y="8" width="26" height="26" rx="2" fill="#111827" />
                    <rect x="13" y="13" width="16" height="16" rx="1" fill="#FFFFFF" />
                    <rect x="17" y="17" width="8" height="8" fill="#111827" />
                    <rect x="66" y="8" width="26" height="26" rx="2" fill="#111827" />
                    <rect x="71" y="13" width="16" height="16" rx="1" fill="#FFFFFF" />
                    <rect x="75" y="17" width="8" height="8" fill="#111827" />
                    <rect x="8" y="66" width="26" height="26" rx="2" fill="#111827" />
                    <rect x="13" y="71" width="16" height="16" rx="1" fill="#FFFFFF" />
                    <rect x="17" y="75" width="8" height="8" fill="#111827" />
                    <rect x="42" y="12" width="16" height="6" fill="#111827" />
                    <rect x="42" y="24" width="8" height="16" fill="#111827" />
                    <rect x="54" y="24" width="16" height="6" fill="#111827" />
                    <rect x="42" y="44" width="16" height="16" fill="#111827" />
                    <rect x="66" y="44" width="16" height="6" fill="#111827" />
                    <rect x="12" y="44" width="16" height="8" fill="#111827" />
                    <rect x="42" y="68" width="8" height="16" fill="#111827" />
                    <rect x="56" y="68" width="16" height="6" fill="#111827" />
                    <rect x="66" y="80" width="20" height="8" fill="#111827" />
                  </svg>
                </div>
                <span class="text-[8px] font-mono text-gray-400 block mt-0.5">CHECK-IN TOKEN</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions (Screen only) -->
        <div class="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2 print:hidden">
          <RouterLink
            to="/dashboard/guest"
            @click="$emit('close')"
            class="text-xs text-gray-500 hover:text-gray-900 transition font-medium"
          >
            My Trips →
          </RouterLink>

          <div class="flex items-center gap-2">
            <!-- Direct Download E-Ticket Button -->
            <button
              type="button"
              @click="downloadETicket"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 text-xs font-medium transition cursor-pointer shadow-2xs"
              title="Download E-Ticket file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>

            <!-- Print / PDF Button -->
            <button
              type="button"
              @click="printVoucher"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 text-xs font-medium transition cursor-pointer shadow-2xs"
              title="Print or Save as PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print / PDF</span>
            </button>

            <!-- Done Button -->
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-medium transition cursor-pointer"
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
    paymentMethod?: 'khqr' | 'card' | 'cash';
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

const guestDisplayName = computed(() => {
  return (
    props.booking?.guest_name ||
    props.booking?.user?.name ||
    props.booking?.user?.full_name ||
    'Guest'
  );
});

const hostDisplayName = computed(() => {
  return (
    props.homestay?.hostName ||
    props.homestay?.host?.full_name ||
    'CamStay Host'
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
  const originalTitle = document.title;
  document.title = `CamStay-ETicket-CS-${bookingYear.value}-${bookingRefId.value}`;
  window.print();
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
};

const downloadETicket = () => {
  const refCode = `CS-${bookingYear.value}-${bookingRefId.value}`;
  const propName = props.booking?.property_name || props.homestay?.name || 'CamStay Homestay';
  const location = `${props.homestay?.district ? props.homestay.district + ', ' : ''}${props.booking?.province || props.homestay?.province || 'Cambodia'}`;
  const checkIn = props.booking?.check_in_date || '—';
  const checkOut = props.booking?.check_out_date || '—';
  const total = Number(props.booking?.total_price || 0).toFixed(2);
  const payType = props.paymentMethod === 'khqr' ? 'Bakong KHQR' : props.paymentMethod === 'card' ? 'Credit Card' : 'Pay on Arrival';

  const ticketHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CamStay-ETicket-${refCode}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background: #f3f4f6; padding: 30px 16px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .ticket { background: #fff; width: 100%; max-width: 440px; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
    .ticket-head { background: #09090b; color: #fff; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 16px; font-weight: 800; letter-spacing: -0.3px; }
    .badge { font-size: 10px; background: #27272a; color: #d4d4d8; padding: 2px 8px; border-radius: 12px; margin-left: 8px; text-transform: uppercase; }
    .ref-label { font-size: 9px; color: #a1a1aa; text-transform: uppercase; font-family: monospace; }
    .ref-code { font-size: 12px; font-weight: 700; color: #34d399; font-family: monospace; }
    .ticket-body { padding: 20px; }
    .prop-name { font-size: 18px; font-weight: 700; color: #18181b; }
    .prop-loc { font-size: 12px; color: #71717a; margin-top: 4px; }
    .guest-bar { display: flex; justify-content: space-between; background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 10px; padding: 10px 12px; margin-top: 14px; font-size: 12px; }
    .guest-bar .label { font-size: 9px; color: #71717a; text-transform: uppercase; }
    .guest-bar .val { font-weight: 600; color: #18181b; margin-top: 2px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
    .grid-box { background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 10px; padding: 10px 12px; }
    .grid-box .label { font-size: 9px; color: #71717a; text-transform: uppercase; }
    .grid-box .val { font-size: 13px; font-weight: 700; color: #18181b; margin-top: 2px; }
    .grid-box .sub { font-size: 10px; color: #71717a; margin-top: 2px; }
    .tear-line { display: flex; align-items: center; position: relative; padding: 0 4px; }
    .notch-l { width: 14px; height: 14px; background: #f3f4f6; border-radius: 50%; margin-left: -7px; }
    .line { flex: 1; border-top: 1px dashed #d4d4d8; margin: 0 6px; }
    .notch-r { width: 14px; height: 14px; background: #f3f4f6; border-radius: 50%; margin-right: -7px; }
    .stub { background: #fafafa; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
    .total-label { font-size: 9px; color: #71717a; text-transform: uppercase; }
    .total-val { font-size: 20px; font-weight: 900; color: #18181b; }
    .pay-sub { font-size: 11px; color: #52525b; font-weight: 500; margin-top: 2px; }
    .print-btn-wrap { text-align: center; margin-top: 16px; }
    .print-btn { background: #18181b; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
    @media print {
      body { background: white; padding: 0; }
      .ticket { box-shadow: none; border: 1px solid #d4d4d8; max-width: 100%; }
      .print-btn-wrap { display: none; }
    }
  </style>
</head>
<body>
  <div>
    <div class="ticket">
      <div class="ticket-head">
        <div style="display:flex; align-items:center;">
          <span class="brand">CamStay</span>
          <span class="badge">E-Ticket</span>
        </div>
        <div style="text-align:right;">
          <div class="ref-label">Booking Ref</div>
          <div class="ref-code">${refCode}</div>
        </div>
      </div>
      <div class="ticket-body">
        <div class="prop-name">${propName}</div>
        <div class="prop-loc">📍 ${location}</div>
        <div class="guest-bar">
          <div>
            <div class="label">Guest</div>
            <div class="val">${guestDisplayName.value}</div>
          </div>
          <div style="text-align:right;">
            <div class="label">Host</div>
            <div class="val">${hostDisplayName.value}</div>
          </div>
        </div>
        <div class="grid">
          <div class="grid-box">
            <div class="label">Check-In</div>
            <div class="val">${checkIn}</div>
            <div class="sub">From 2:00 PM</div>
          </div>
          <div class="grid-box">
            <div class="label">Check-Out</div>
            <div class="val">${checkOut}</div>
            <div class="sub">Until 11:00 AM</div>
          </div>
        </div>
      </div>
      <div class="tear-line">
        <div class="notch-l"></div>
        <div class="line"></div>
        <div class="notch-r"></div>
      </div>
      <div class="stub">
        <div>
          <div class="total-label">Total Amount</div>
          <div class="total-val">$${total} <span style="font-size:12px; font-weight:normal; color:#71717a;">USD</span></div>
          <div class="pay-sub">${payType}</div>
          <div style="font-size:10px; color:#a1a1aa; margin-top:4px;">${calculatedNights.value} Night(s) · ${props.booking?.guests_count || 1} Guest(s)</div>
        </div>
        <div style="text-align:center;">
          <div style="width:68px; height:68px; background:white; padding:4px; border:1px solid #e4e4e7; border-radius:8px; display:inline-block;">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <rect width="100" height="100" fill="#FFFFFF"/>
              <rect x="8" y="8" width="26" height="26" fill="#111827"/>
              <rect x="13" y="13" width="16" height="16" fill="#FFFFFF"/>
              <rect x="17" y="17" width="8" height="8" fill="#111827"/>
              <rect x="66" y="8" width="26" height="26" fill="#111827"/>
              <rect x="71" y="13" width="16" height="16" fill="#FFFFFF"/>
              <rect x="75" y="17" width="8" height="8" fill="#111827"/>
              <rect x="8" y="66" width="26" height="26" fill="#111827"/>
              <rect x="13" y="71" width="16" height="16" fill="#FFFFFF"/>
              <rect x="17" y="75" width="8" height="8" fill="#111827"/>
              <rect x="42" y="12" width="16" height="6" fill="#111827"/>
              <rect x="42" y="24" width="8" height="16" fill="#111827"/>
              <rect x="54" y="24" width="16" height="6" fill="#111827"/>
              <rect x="42" y="44" width="16" height="16" fill="#111827"/>
              <rect x="66" y="44" width="16" height="6" fill="#111827"/>
              <rect x="12" y="44" width="16" height="8" fill="#111827"/>
              <rect x="42" y="68" width="8" height="16" fill="#111827"/>
              <rect x="56" y="68" width="16" height="6" fill="#111827"/>
              <rect x="66" y="80" width="20" height="8" fill="#111827"/>
            </svg>
          </div>
          <div style="font-size:8px; font-family:monospace; color:#a1a1aa; margin-top:2px;">CHECK-IN TOKEN</div>
        </div>
      </div>
    </div>
    <div class="print-btn-wrap">
      <button class="print-btn" onclick="window.print()">Print E-Ticket / Save PDF</button>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([ticketHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CamStay-ETicket-${refCode}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>

<style>
@media print {
  @page {
    size: auto;
    margin: 12mm;
  }
  body * {
    visibility: hidden;
  }
  #voucher-print-area,
  #voucher-print-area * {
    visibility: visible;
  }
  #voucher-print-area {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
    padding: 0;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
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
