<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 1. Define events so this modal can tell its parent to close
const emit = defineEmits(['close'])

const router = useRouter()

// 2. State to hold the user's search inputs
const searchQuery = ref({
  location: '',
  dates: '',
  guests: ''
})

const popularDestinations = ['Siem Reap', 'Kampot', 'Battambang', 'Mondulkiri']

// 3. Function to auto-fill location when a pill is clicked
const selectDestination = (destination: string) => {
  searchQuery.value.location = destination
}

// 4. Function to handle the actual search
const executeSearch = () => {
  console.log('Sending search data:', searchQuery.value)
  
  // Close the modal
  emit('close')
  
  // Navigate to your explore/search page and pass the data in the URL!
  // Example: http://localhost:5173/explore?location=Kampot&guests=2
  router.push({
    path: '/explore', // Note: Make sure you have an ExploreView route set up!
    query: {
      location: searchQuery.value.location,
      dates: searchQuery.value.dates,
      guests: searchQuery.value.guests
    }
  })
}
</script>

<template>
  <!-- Background Overlay (Clicking it closes the modal) -->
  <div 
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
    @click.self="emit('close')"
  >
    <!-- Modal Container -->
    <div class="bg-white rounded-3xl p-8 w-full max-w-3xl shadow-2xl mx-4 animate-fade-in-up">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#1a3a2a] font-serif">Find your perfect stay</h2>
        <button 
          @click="emit('close')" 
          class="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      <!-- Search Inputs Container -->
      <div class="flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden mb-8">
        
        <!-- Location Input -->
        <div class="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 focus-within:bg-gray-50 transition-colors">
          <label class="block text-[10px] font-bold text-[#1a3a2a] tracking-wider uppercase mb-1">Location</label>
          <input 
            type="text" 
            v-model="searchQuery.location" 
            placeholder="Where to go?" 
            class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400" 
          />
        </div>

        <!-- Dates Input -->
        <div class="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-200 focus-within:bg-gray-50 transition-colors">
          <label class="block text-[10px] font-bold text-[#1a3a2a] tracking-wider uppercase mb-1">Dates</label>
          <input 
            type="text" 
            v-model="searchQuery.dates" 
            placeholder="Add dates" 
            class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400" 
          />
        </div>

        <!-- Guests Input & Submit Button -->
        <div class="flex-1 p-4 flex justify-between items-center focus-within:bg-gray-50 transition-colors">
          <div class="w-full">
            <label class="block text-[10px] font-bold text-[#1a3a2a] tracking-wider uppercase mb-1">Guests</label>
            <input 
              type="text" 
              v-model="searchQuery.guests" 
              placeholder="Add guests" 
              class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400" 
            />
          </div>
          <button 
            @click="executeSearch"
            class="bg-[#1a3a2a] hover:bg-[#2c533e] text-white font-bold py-3 px-6 rounded-xl transition-colors ml-4"
          >
            Search
          </button>
        </div>
      </div>

      <!-- Popular Destinations -->
      <div>
        <h3 class="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">Popular Rural Destinations</h3>
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="dest in popularDestinations" 
            :key="dest"
            @click="selectDestination(dest)"
            class="border border-gray-200 hover:border-[#1a3a2a] text-gray-600 hover:text-[#1a3a2a] bg-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            {{ dest }}
          </button>
        </div>
      </div>

    </div>
  </div>
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