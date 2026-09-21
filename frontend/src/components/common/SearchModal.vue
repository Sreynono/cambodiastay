<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import RunningInput from './RunningInput.vue'

const { t, translateProvince } = useI18n()

// 1. Define events so this modal can tell its parent to close
const emit = defineEmits(['close'])

const router = useRouter()

// 2. State to hold the user's search inputs
const searchQuery = ref({
  location: '',
  checkIn: '',
  checkOut: '',
  guests: ''
})

const popularDestinations = [
  'Siem Reap',
  'Kampot',
  'Battambang',
  'Mondulkiri',
  'Kep',
  'Preah Vihear',
  'Kampong Cham',
  'Pursat'
]

// 3. Function to auto-fill location when a pill is clicked
const selectDestination = (destination: string) => {
  searchQuery.value.location = destination
}

// 4. Function to handle the actual search
const executeSearch = () => {
  // Close the modal
  emit('close')
  
  // Navigate to explore and pass the place/location query
  router.push({
    path: '/explore',
    query: {
      location: searchQuery.value.location,
      checkIn: searchQuery.value.checkIn,
      checkOut: searchQuery.value.checkOut,
      guests: searchQuery.value.guests
    }
  })
}
</script>

<template>
  <Teleport to="body">
    <!-- Background Overlay (Clicking it closes the modal) -->
    <div 
      class="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      @click.self="emit('close')"
    >
      <!-- Modal Container -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-3xl shadow-2xl mx-4 my-auto relative animate-fade-in-up">
        
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-[#113A28] font-serif">{{ t('searchModal.title') }}</h2>
            <p class="text-xs text-gray-500 mt-1">{{ t('searchModal.subtitle') }}</p>
          </div>
          <button 
            @click="emit('close')" 
            class="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Search Inputs Container (Airbnb 4-Column Layout) -->
        <div class="flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden mb-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <!-- 1. Where -->
          <div class="flex-[1.3] p-3.5 focus-within:bg-gray-50 transition-colors min-w-0">
            <label class="block text-[10px] font-bold text-[#113A28] tracking-wider uppercase mb-1">
              {{ t('home.where') }}
            </label>
            <RunningInput 
              type="text" 
              v-model="searchQuery.location" 
              :placeholder="t('searchModal.destinationPlaceholder')" 
              inputClass="text-gray-800 placeholder-gray-400 text-sm font-semibold" 
              placeholderClass="text-gray-400 text-sm font-semibold"
              @keydown.enter="executeSearch"
            />
          </div>

          <!-- 2. Check in -->
          <div class="flex-1 p-3.5 focus-within:bg-gray-50 transition-colors">
            <label class="block text-[10px] font-bold text-[#113A28] tracking-wider uppercase mb-1">{{ t('home.checkIn') }}</label>
            <input 
              type="date" 
              v-model="searchQuery.checkIn" 
              class="w-full bg-transparent outline-none text-gray-800 text-sm font-medium" 
            />
          </div>

          <!-- 3. Check out -->
          <div class="flex-1 p-3.5 focus-within:bg-gray-50 transition-colors">
            <label class="block text-[10px] font-bold text-[#113A28] tracking-wider uppercase mb-1">{{ t('home.checkOut') }}</label>
            <input 
              type="date" 
              v-model="searchQuery.checkOut" 
              class="w-full bg-transparent outline-none text-gray-800 text-sm font-medium" 
            />
          </div>

          <!-- 4. Who & Search -->
          <div class="flex-1 p-3.5 flex justify-between items-center focus-within:bg-gray-50 transition-colors min-w-0">
            <div class="w-full min-w-0 pr-2">
              <label class="block text-[10px] font-bold text-[#113A28] tracking-wider uppercase mb-1">{{ t('home.who') }}</label>
              <RunningInput 
                type="number" 
                min="1"
                max="20"
                v-model="searchQuery.guests" 
                :placeholder="'2 ' + t('common.guests')" 
                inputClass="text-gray-800 placeholder-gray-400 text-sm font-medium" 
                placeholderClass="text-gray-400 text-sm font-medium"
                @keydown.enter="executeSearch"
              />
            </div>
            <button 
              @click="executeSearch"
              class="bg-[#113A28] hover:bg-[#0a261a] text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md shrink-0 text-xs sm:text-sm cursor-pointer"
            >
              {{ t('home.searchBtn') }}
            </button>
          </div>
        </div>

        <!-- Popular Landscapes & Places -->
        <div>
          <h3 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">{{ t('searchModal.popularProvinces') }}</h3>
          <div class="flex flex-wrap gap-2.5">
            <button 
              v-for="dest in popularDestinations" 
              :key="dest"
              @click="selectDestination(dest)"
              class="border border-gray-200 hover:border-[#1a3a2a] text-gray-700 hover:text-[#1a3a2a] bg-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              {{ translateProvince(dest) }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>