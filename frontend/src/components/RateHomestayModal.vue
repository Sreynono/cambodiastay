<template>
  <div
    v-if="isOpen && (booking || homestay)"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="rate-modal-title"
    @keydown.esc="$emit('close')"
  >
    <div
      class="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-100 relative animate-fade-in my-8"
      @click.stop
    >
      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
        aria-label="Close review dialog"
      >
        ✕
      </button>

      <!-- Modal Header -->
      <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <img
          v-if="displayPhoto"
          :src="displayPhoto"
          :alt="displayName"
          class="w-16 h-16 rounded-2xl object-cover shadow-sm"
        />
        <div v-else class="w-16 h-16 rounded-2xl bg-[#113A28] flex items-center justify-center text-white text-xl shadow-sm">
          🏡
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            {{ isEditing ? 'Edit Your Review' : 'Rate & Recommend Homestay' }}
          </span>
          <h3 id="rate-modal-title" class="text-lg font-serif font-bold text-[#113A28] mt-1 line-clamp-1">
            {{ displayName }}
          </h3>
          <p class="text-xs text-gray-500">
            <span v-if="booking">Stayed: {{ booking.check_in_date }} → {{ booking.check_out_date }}</span>
            <span v-else>📍 {{ displayLocation }}</span>
          </p>
        </div>
      </div>

      <!-- Star Rating Picker -->
      <div class="mb-6 text-center">
        <p class="text-sm font-bold text-gray-800 mb-2">How would you rate your stay?</p>
        
        <div class="flex justify-center items-center gap-2 mb-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            class="p-1 text-3xl md:text-4xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
            :class="(hoverRating || selectedRating) >= star ? 'text-amber-400' : 'text-gray-200'"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
            @click="selectedRating = star"
            :aria-label="`Rate ${star} out of 5 stars`"
          >
            ★
          </button>
        </div>

        <p class="text-xs font-semibold h-5" :class="selectedRating > 0 ? 'text-[#113A28]' : 'text-gray-400'">
          {{ ratingLabels[hoverRating || selectedRating] || 'Tap a star to rate' }}
        </p>
      </div>

      <!-- Recommendation Toggle -->
      <div class="mb-5 p-4 bg-[#F8F7F2] rounded-2xl border border-gray-200">
        <label class="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
          Would you recommend this homestay to other guests?
        </label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="isRecommended = true"
            :class="[
              'py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border cursor-pointer',
              isRecommended
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            ]"
          >
            <span>👍</span>
            <span>Yes, Highly Recommend</span>
          </button>
          <button
            type="button"
            @click="isRecommended = false"
            :class="[
              'py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 border cursor-pointer',
              !isRecommended
                ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            ]"
          >
            <span>👎</span>
            <span>Needs Improvement</span>
          </button>
        </div>
      </div>

      <!-- Specific Recommendation Input -->
      <div class="mb-5">
        <label for="review-recommendation" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Your Tips & Recommendations (What do you recommend?)</span>
          <span class="text-gray-400 font-normal text-[11px]">{{ recommendation.length }}/200</span>
        </label>
        <input
          id="review-recommendation"
          v-model="recommendation"
          type="text"
          maxlength="200"
          placeholder="e.g., Ask the host for organic grilled fish, take the sunrise bicycle ride!"
          class="w-full text-xs md:text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition bg-[#F8F7F2]/40 placeholder-gray-400"
        />
      </div>

      <!-- Review Comment Textarea -->
      <div class="mb-5">
        <label for="review-comment" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Detailed Experience & Review</span>
          <span class="text-gray-400 font-normal text-[11px]">{{ comment.length }}/600</span>
        </label>
        <textarea
          id="review-comment"
          v-model="comment"
          rows="3"
          maxlength="600"
          placeholder="Share details about the hospitality, cleanliness, home-cooked food, peaceful rural atmosphere, or activities with the family..."
          class="w-full text-xs md:text-sm border border-gray-200 rounded-2xl p-3.5 outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition bg-[#F8F7F2]/40 placeholder-gray-400 resize-none"
        ></textarea>
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
        {{ errorMessage }}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-2">
        <button
          type="button"
          @click="$emit('close')"
          class="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition cursor-pointer"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleSubmit"
          class="flex-1 py-3 px-4 bg-[#113A28] hover:bg-[#0a261a] text-white rounded-xl font-bold text-xs transition shadow flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          :disabled="isSubmitting || selectedRating === 0"
        >
          <span v-if="isSubmitting" class="animate-spin">⌛</span>
          <span>{{ isSubmitting ? 'Posting Review...' : isEditing ? 'Update Review' : 'Post Review & Rating' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { usePropertyStore, type Booking, type Homestay, type ReviewData } from '@/stores/usePropertyStore';

const props = defineProps<{
  isOpen: boolean;
  booking?: Booking | null;
  homestay?: Homestay | null;
  existingReview?: ReviewData | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'reviewSubmitted', review: ReviewData): void;
}>();

const propertyStore = usePropertyStore();

const selectedRating = ref(5);
const hoverRating = ref(0);
const isRecommended = ref(true);
const recommendation = ref('');
const comment = ref('');
const isSubmitting = ref(false);
const errorMessage = ref('');

const isEditing = computed(() => !!props.existingReview);

const displayName = computed(() => {
  return props.booking?.property_name || props.homestay?.name || props.homestay?.title || 'Cambodian Homestay';
});

const displayPhoto = computed(() => {
  return props.booking?.property_image || props.homestay?.coverPhotoUrl || '';
});

const displayLocation = computed(() => {
  return props.booking?.province || props.homestay?.province || 'Cambodia';
});

const ratingLabels: Record<number, string> = {
  1: '😞 Poor — Did not meet expectations',
  2: '😐 Fair — Acceptable, but room for improvement',
  3: '🙂 Good — Comfortable rural experience',
  4: '😊 Great — Warm hospitality & great stay',
  5: '🌟 Exceptional — Unforgettable Khmer experience!',
};

// Populate existing review data when modal opens
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      errorMessage.value = '';
      if (props.existingReview) {
        selectedRating.value = Number(props.existingReview.rating) || 5;
        isRecommended.value = props.existingReview.is_recommended !== false;
        recommendation.value = props.existingReview.recommendation || '';
        comment.value = props.existingReview.comment || '';
      } else {
        selectedRating.value = 5;
        isRecommended.value = true;
        recommendation.value = '';
        comment.value = '';
      }
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (selectedRating.value < 1 || selectedRating.value > 5) {
    errorMessage.value = 'Please select a star rating from 1 to 5.';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const bookingId = props.booking?.booking_id || props.booking?.id;
    const homestayId = props.homestay?.id || props.booking?.homestay_id || props.booking?.property_id;

    if (!homestayId && !bookingId) {
      throw new Error('Missing homestay identifier.');
    }

    const saved = await propertyStore.submitReview({
      booking_id: bookingId,
      homestay_id: homestayId,
      rating: selectedRating.value,
      is_recommended: isRecommended.value,
      recommendation: recommendation.value.trim(),
      comment: comment.value.trim(),
    });

    emit('reviewSubmitted', saved);
    emit('close');
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to submit your review. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
