<template>
  <div 
    ref="containerRef" 
    class="running-text-container relative w-full min-w-0 overflow-hidden select-none"
    :class="containerClass"
  >
    <!-- Hidden measuring span to always accurately know the unconstrained text width -->
    <span 
      ref="measureRef" 
      class="absolute left-0 top-0 invisible pointer-events-none whitespace-nowrap opacity-0 -z-50 inline-block"
      style="width: max-content; max-width: none;"
      :class="textClass"
      aria-hidden="true"
    >
      {{ text }}
    </span>

    <!-- When NOT overflowing: normal static text -->
    <div 
      v-if="!isOverflowing" 
      class="whitespace-nowrap truncate w-full"
      :class="textClass"
    >
      {{ text }}
    </div>

    <!-- When OVERFLOWING: running marquee text -->
    <div 
      v-else 
      class="running-marquee-track flex whitespace-nowrap will-change-transform"
      :class="textClass"
      :style="trackStyle"
    >
      <span class="running-marquee-item shrink-0 inline-block" :style="{ paddingRight: `${gap}px` }">
        {{ text }}
      </span>
      <span class="running-marquee-item shrink-0 inline-block" :style="{ paddingRight: `${gap}px` }" aria-hidden="true">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';

const props = withDefaults(
  defineProps<{
    text: string;
    textClass?: string;
    containerClass?: string;
    gap?: number;
    speed?: number; // pixels per second
    pauseOnHover?: boolean;
    initialDelay?: number; // seconds
  }>(),
  {
    text: '',
    textClass: '',
    containerClass: '',
    gap: 36,
    speed: 35,
    pauseOnHover: true,
    initialDelay: 1.0
  }
);

const containerRef = ref<HTMLElement | null>(null);
const measureRef = ref<HTMLElement | null>(null);

const isOverflowing = ref(false);
const measuredTextWidth = ref(0);

const trackStyle = computed(() => {
  const totalShift = measuredTextWidth.value + props.gap;
  const duration = Math.max(5, Math.round((totalShift / props.speed) * 10) / 10);
  
  return {
    '--marquee-shift': `-${totalShift}px`,
    '--marquee-duration': `${duration}s`,
    '--marquee-delay': `${props.initialDelay}s`
  };
});

const calculateOverflow = () => {
  if (!containerRef.value || !measureRef.value) return;
  
  const containerW = containerRef.value.clientWidth;
  const textW = Math.ceil(measureRef.value.getBoundingClientRect().width);
  
  measuredTextWidth.value = textW;
  
  // If text width is greater than available container width, it overflows
  isOverflowing.value = containerW > 0 && textW > containerW;
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  nextTick(() => {
    calculateOverflow();

    // Check again when fonts finish loading (for custom font metrics)
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        calculateOverflow();
      });
    }
    
    if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        calculateOverflow();
      });
      resizeObserver.observe(containerRef.value);
    }

    setTimeout(() => {
      calculateOverflow();
    }, 250);
  });
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

watch(
  () => props.text,
  () => {
    nextTick(() => {
      calculateOverflow();
    });
  }
);
</script>

<style scoped>
@keyframes search-marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--marquee-shift));
  }
}

.running-marquee-track {
  display: inline-flex;
  width: max-content;
  animation: search-marquee-scroll var(--marquee-duration, 10s) linear var(--marquee-delay, 1s) infinite;
}

.running-text-container:hover .running-marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .running-marquee-track {
    animation: none !important;
  }
}
</style>
