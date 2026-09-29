<template>
  <div
    v-if="isOpen && (booking || homestay)"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="rate-modal-title"
    @keydown.esc="$emit('close')"
  >
    <div
      class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 relative animate-fade-in my-8"
      @click.stop
    >
      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        aria-label="Close review dialog"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <div class="flex items-center gap-3.5 mb-5 pb-4 border-b border-gray-100 pr-6">
        <img
          v-if="displayPhoto"
          :src="displayPhoto"
          :alt="displayName"
          class="w-12 h-12 rounded-xl object-cover shadow-xs shrink-0"
        />
        <div v-else class="w-12 h-12 rounded-xl bg-[#113A28] flex items-center justify-center text-white shadow-xs shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <h3 id="rate-modal-title" class="text-base sm:text-lg font-bold text-gray-900 truncate">
            {{ isEditing ? 'Edit Review' : 'Rate Your Stay' }}
          </h3>
          <p class="text-xs text-gray-500 truncate mt-0.5">
            {{ displayName }} · {{ displayLocation }}
          </p>
        </div>
      </div>

      <!-- Star Rating Picker -->
      <div class="mb-5 text-center">
        <div class="flex justify-center items-center gap-2 mb-1">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            class="p-1 text-3xl transition-transform hover:scale-115 focus:outline-none cursor-pointer"
            :class="(hoverRating || selectedRating) >= star ? 'text-amber-400' : 'text-gray-200'"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
            @click="selectedRating = star"
            :aria-label="`Rate ${star} out of 5 stars`"
          >
            ★
          </button>
        </div>
        <p class="text-xs font-semibold h-4 text-gray-700">
          {{ ratingLabels[hoverRating || selectedRating] || 'Tap a star to rate' }}
        </p>
      </div>

      <!-- Recommendation Toggle (Simple & Compact) -->
      <div class="flex items-center justify-between py-2 px-3 mb-4 rounded-xl bg-gray-50/80 border border-gray-100">
        <span class="text-xs font-medium text-gray-700">Recommend to other guests?</span>
        <div class="inline-flex rounded-lg p-0.5 bg-gray-200/70">
          <button
            type="button"
            @click="isRecommended = true"
            :class="isRecommended ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'"
            class="px-3 py-1 text-xs rounded-md transition cursor-pointer flex items-center gap-1"
          >
            <span>👍 Yes</span>
          </button>
          <button
            type="button"
            @click="isRecommended = false"
            :class="!isRecommended ? 'bg-white text-gray-900 shadow-xs font-semibold' : 'text-gray-500 hover:text-gray-900'"
            class="px-3 py-1 text-xs rounded-md transition cursor-pointer flex items-center gap-1"
          >
            <span>👎 No</span>
          </button>
        </div>
      </div>

      <!-- Review Comment Textarea -->
      <div class="mb-3.5">
        <label for="review-comment" class="block text-xs font-medium text-gray-700 mb-1 flex items-center justify-between">
          <span>Your Review</span>
          <span class="text-gray-400 font-normal text-[11px]">{{ comment.length }}/600</span>
        </label>
        <textarea
          id="review-comment"
          v-model="comment"
          rows="3"
          maxlength="600"
          placeholder="Share your experience (cleanliness, hospitality, activities...)"
          class="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-3 outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition bg-gray-50/40 placeholder-gray-400 resize-none"
        ></textarea>
      </div>

      <!-- Specific Recommendation Input (Clean & Optional) -->
      <div class="mb-5">
        <label for="review-recommendation" class="block text-xs font-medium text-gray-700 mb-1">
          Tip for travelers <span class="text-gray-400 font-normal text-[11px]">(optional)</span>
        </label>
        <input
          id="review-recommendation"
          v-model="recommendation"
          type="text"
          maxlength="200"
          placeholder="e.g. Best local food to try, sunset bicycle ride..."
          class="w-full text-xs sm:text-sm border border-gray-200 rounded-xl px-3.5 py-2 outline-none focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] transition bg-gray-50/40 placeholder-gray-400"
        />
      </div>

      <!-- Error Alert -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
        {{ errorMessage }}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2.5 pt-1">
        <button
          type="button"
          @click="$emit('close')"
          class="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium text-xs transition cursor-pointer"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleSubmit"
          class="flex-1 py-2.5 px-4 bg-[#113A28] hover:bg-[#0a261a] text-white rounded-xl font-semibold text-xs transition shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          :disabled="isSubmitting || selectedRating === 0"
        >
          <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>{{ isSubmitting ? 'Submitting...' : isEditing ? 'Update Review' : 'Submit Review' }}</span>
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
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
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
