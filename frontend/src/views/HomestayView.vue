<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
    <!-- Global Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 pb-24">
      <div v-if="currentStay">
        <!-- 1. Breadcrumbs & Title Section -->
        <div class="mb-6">
          <RouterLink to="/explore" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#113A28] transition-colors mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {{ t('explore.backToExplore') }}
          </RouterLink>

          <h1 class="text-3xl md:text-4xl font-serif font-bold text-[#113A28] mb-2">
            {{ currentStay.name }}
          </h1>

          <div class="flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-gray-600">
            <div class="flex items-center gap-4">
              <span class="flex items-center text-gray-900 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-black" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ currentStay.rating }} <span class="text-gray-500 font-normal ml-1 underline">({{ currentStay.reviewsCount }} {{ t('homestay.reviews') }})</span>
              </span>
              <span
                @click="isMapModalOpen = true"
                class="flex items-center gap-1 cursor-pointer hover:text-black hover:underline transition"
                title="Click to view interactive map"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ currentStay.district ? `${currentStay.district}, ${translateProvince(currentStay.province)}, Cambodia` : (currentStay.location || translateProvince(currentStay.province) + ', Cambodia') }}
              </span>

              <!-- Direct "See Map" Pill Button in Header -->
              <button
                type="button"
                @click="isMapModalOpen = true"
                class="inline-flex items-center gap-1.5 text-xs font-bold text-black bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 rounded-full transition cursor-pointer ml-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>{{ t('homestay.seeMap') }}</span>
              </button>
            </div>

            <div class="flex items-center gap-4">
              <button
                type="button"
                @click="isShareModalOpen = true"
                class="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold cursor-pointer"
                title="Share this homestay"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>{{ t('homestay.share') }}</span>
              </button>
              <button
                @click="propertyStore.toggleWishlist(currentStay.id)"
                class="flex items-center gap-1.5 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold cursor-pointer"
              >
                <svg
                  v-if="propertyStore.isWishlisted(currentStay.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ propertyStore.isWishlisted(currentStay.id) ? t('homestay.savedWishlist') : t('homestay.saveWishlist') }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. Responsive Adaptive Photo Gallery -->
        <div class="relative mb-8 sm:mb-12">
          <!-- Fallback if no photo is available -->
          <div
            v-if="allPhotos.length === 0"
            class="h-[260px] sm:h-[340px] md:h-[460px] rounded-3xl bg-gradient-to-br from-[#113A28] to-emerald-800 flex flex-col items-center justify-center text-white p-6 shadow-sm"
          >
            <div class="w-20 h-20 rounded-2xl bg-black/40 border border-white/20 flex items-center justify-center text-white mb-3 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span class="font-serif font-bold text-2xl text-emerald-100">{{ currentStay.name }}</span>
            <span class="text-xs text-emerald-300 uppercase tracking-widest mt-2">{{ currentStay.province }}, Cambodia</span>
          </div>

          <!-- 1 Photo Layout -->
          <div
            v-else-if="allPhotos.length === 1"
            @click="openLightbox(0)"
            class="h-[260px] sm:h-[340px] md:h-[460px] rounded-3xl overflow-hidden cursor-pointer shadow-sm relative group bg-gray-100"
          >
            <img
              :src="allPhotos[0]"
              alt="Homestay main view"
              class="w-full h-full object-cover group-hover:scale-102 transition duration-500"
            />
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
          </div>

          <!-- 2 Photos Layout -->
          <div
            v-else-if="allPhotos.length === 2"
            class="grid grid-cols-1 md:grid-cols-2 gap-3 h-[260px] sm:h-[340px] md:h-[460px] rounded-3xl overflow-hidden shadow-sm bg-gray-100"
          >
            <div
              v-for="(photo, idx) in allPhotos"
              :key="idx"
              @click="openLightbox(idx)"
              class="h-full relative overflow-hidden cursor-pointer group"
            >
              <img
                :src="photo"
                :alt="'Homestay photo ' + (idx + 1)"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>
          </div>

          <!-- 3 Photos Layout -->
          <div
            v-else-if="allPhotos.length === 3"
            class="grid grid-cols-1 md:grid-cols-3 gap-3 h-[260px] sm:h-[340px] md:h-[460px] rounded-3xl overflow-hidden shadow-sm"
          >
            <div
              @click="openLightbox(0)"
              class="md:col-span-2 h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[0]"
                alt="Homestay main view"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>
            <div class="grid grid-rows-2 gap-3 h-full">
              <div
                v-for="idx in [1, 2]"
                :key="idx"
                @click="openLightbox(idx)"
                class="h-full relative overflow-hidden cursor-pointer group bg-gray-100 rounded-xl md:rounded-none"
              >
                <img
                  :src="allPhotos[idx]"
                  :alt="'Homestay photo ' + (idx + 1)"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
              </div>
            </div>
          </div>

          <!-- 4 Photos Layout -->
          <div
            v-else-if="allPhotos.length === 4"
            class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[260px] sm:h-[340px] md:h-[460px] rounded-3xl overflow-hidden shadow-sm"
          >
            <!-- Large Left Photo -->
            <div
              @click="openLightbox(0)"
              class="md:col-span-2 md:row-span-2 h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[0]"
                alt="Homestay main view"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>

            <!-- Top Right Photo -->
            <div
              @click="openLightbox(1)"
              class="hidden md:block md:col-span-2 md:row-span-1 h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[1]"
                alt="Homestay photo 2"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>

            <!-- Bottom Right Photo 1 -->
            <div
              @click="openLightbox(2)"
              class="hidden md:block md:col-span-1 md:row-span-1 h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[2]"
                alt="Homestay photo 3"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>

            <!-- Bottom Right Photo 2 -->
            <div
              @click="openLightbox(3)"
              class="hidden md:block md:col-span-1 md:row-span-1 h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[3]"
                alt="Homestay photo 4"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>
          </div>

          <!-- 5 or More Photos Layout (Airbnb Style 5-photo grid) -->
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 sm:gap-3 h-[260px] sm:h-[340px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm"
          >
            <!-- Main Hero Image (Left Half) -->
            <div
              @click="openLightbox(0)"
              class="md:col-span-2 md:row-span-2 h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[0]"
                alt="Homestay main view"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>
            </div>

            <!-- Right 4 Images Grid -->
            <div
              v-for="idx in [1, 2, 3, 4]"
              :key="idx"
              @click="openLightbox(idx)"
              class="hidden md:block h-full relative overflow-hidden cursor-pointer group bg-gray-100"
            >
              <img
                :src="allPhotos[idx]"
                :alt="'Homestay photo ' + (idx + 1)"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-300"></div>

              <!-- Overlaid badge on the 5th photo if more photos exist -->
              <div
                v-if="idx === 4 && allPhotos.length > 5"
                class="absolute inset-0 bg-black/50 hover:bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition"
              >
                <span class="text-xl font-bold font-sans">+{{ allPhotos.length - 5 }}</span>
                <span class="text-[11px] uppercase tracking-wider font-semibold">{{ t('homestay.morePhotos') }}</span>
              </div>
            </div>
          </div>

          <!-- Floating "See Map" button (Bottom Left) -->
          <button
            type="button"
            @click="isMapModalOpen = true"
            class="absolute bottom-4 left-4 bg-white/95 hover:bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 border border-gray-200/80 backdrop-blur-md transition transform active:scale-95 cursor-pointer z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>{{ t('homestay.seeMap') }}</span>
          </button>

          <!-- Floating "View all photos" button (Bottom Right) -->
          <button
            v-if="allPhotos.length > 0"
            @click="openLightbox(0)"
            class="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 border border-gray-200/80 backdrop-blur-md transition transform active:scale-95 cursor-pointer z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ t('homestay.viewAllPhotos') }} ({{ allPhotos.length }})</span>
          </button>
        </div>

        <!-- 3. Layout Split: Left (Details) & Right (Booking Card) -->
        <div class="flex flex-col lg:flex-row gap-12 relative">
          <!-- LEFT COLUMN: Main Details -->
          <div class="lg:w-2/3 space-y-10">
            <!-- Host info header -->
            <div class="flex justify-between items-center pb-8 border-b border-gray-200">
              <div>
                <h2 class="text-xl md:text-2xl font-serif font-bold text-gray-900">
                  Homestay hosted by {{ currentStay.hostName || 'Cambodian Family' }}
                </h2>
                <p class="text-sm text-gray-500 mt-1">
                  Landscape: <span class="font-bold text-[#113A28]">{{ currentStay.landscape || currentStay.category }}</span> · {{ currentStay.province }}
                </p>
              </div>
              <div class="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#113A28]/20 bg-[#113A28] text-white flex items-center justify-center font-bold text-lg shadow shrink-0">
                <img
                  v-if="currentStay.hostAvatarUrl"
                  :src="currentStay.hostAvatarUrl"
                  :alt="currentStay.hostName"
                  class="w-full h-full object-cover"
                />
                <span v-else>
                  {{ (currentStay.hostName || 'Host').substring(0, 2).toUpperCase() }}
                </span>
                <span
                  class="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold border border-white shadow-sm"
                  title="Verified Host"
                >
                  ✓
                </span>
              </div>
            </div>

            <!-- Description -->
            <section>
              <h3 class="text-xl font-serif font-bold text-[#113A28] mb-3">About this homestay</h3>
              <p class="text-gray-700 leading-relaxed text-base">
                {{ currentStay.description }}
              </p>
            </section>

            <!-- Visual Video Tour Section -->
            <section v-if="currentStay.videoUrl" class="space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-serif font-bold text-[#113A28] flex items-center gap-2">
                  <span>Visual Video Tour</span>
                  <span class="text-xs bg-gray-100 text-black border border-gray-200 font-sans font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Host Walkthrough</span>
                  </span>
                </h3>
              </div>
              <div class="rounded-3xl overflow-hidden shadow-md bg-black aspect-video max-h-[420px] w-full flex items-center justify-center border border-gray-100">
                <video
                  :src="currentStay.videoUrl"
                  controls
                  playsinline
                  preload="metadata"
                  class="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>

            <!-- Nearby Places & Landmarks -->
            <section v-if="currentStay.nearPlaces && currentStay.nearPlaces.length > 0">
              <h3 class="text-xl font-serif font-bold text-[#113A28] mb-3">Nearby Places & Landmarks</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(place, idx) in currentStay.nearPlaces"
                  :key="idx"
                  class="bg-gray-100 text-gray-900 border border-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ place }}</span>
                </span>
              </div>
            </section>

            <!-- Inclusions -->
            <section v-if="currentStay.priceIncludes" class="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-100">
              <h3 class="text-sm font-bold text-emerald-950 uppercase tracking-wider mb-2">Included with your stay</h3>
              <p class="text-sm text-emerald-900">
                ✓ {{ currentStay.priceIncludes }}
              </p>
            </section>

            <!-- Experiences & Activities -->
            <section>
              <h3 class="text-xl font-serif font-bold text-[#113A28] mb-4">Farm Activities & Cultural Experiences</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="act in currentStay.experiences"
                  :key="act"
                  class="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div class="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-black shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sm font-bold text-gray-800">{{ act }}</span>
                </div>
              </div>
            </section>

            <!-- Payment Methods -->
            <section v-if="currentStay.paymentMethods?.length" class="pt-6 border-t border-gray-200">
              <h3 class="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">Accepted Payment Options</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="pay in currentStay.paymentMethods"
                  :key="pay"
                  class="bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-gray-700 shadow-sm"
                >
                  {{ pay }}
                </span>
              </div>
            </section>

            <!-- Meet Your Host & Community Trust Section -->
            <section class="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#FCFAF6] via-white to-emerald-50/30 border border-emerald-900/15 shadow-sm space-y-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
                <!-- Host profile avatar & identity -->
                <div class="flex items-center gap-4">
                  <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#113A28]/25 shadow-md bg-[#113A28] text-white flex items-center justify-center shrink-0">
                    <img
                      v-if="currentStay.hostAvatarUrl"
                      :src="currentStay.hostAvatarUrl"
                      :alt="currentStay.hostName"
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="text-xl sm:text-2xl font-serif font-bold">
                      {{ (currentStay.hostName || 'Host').substring(0, 2).toUpperCase() }}
                    </span>
                    <!-- Verified host check badge -->
                    <span
                      class="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-white shadow-sm"
                      title="Verified CamStay Host"
                    >
                      ✓
                    </span>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                        Meet Your Host, {{ currentStay.hostName || 'Local Host' }}
                      </h3>
                      <span class="inline-flex items-center gap-1.5 bg-gray-100 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Verified Host</span>
                      </span>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-500 mt-1">
                      Countryside Host in {{ currentStay.province }}, Cambodia · Welcoming travelers with authentic hospitality
                    </p>
                  </div>
                </div>

                <!-- Host Quick Contact Action -->
                <button
                  type="button"
                  @click="isContactModalOpen = true"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#113A28] hover:bg-[#0a261a] text-white text-xs font-bold transition shadow-sm cursor-pointer self-start sm:self-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Contact Host</span>
                </button>
              </div>

              <!-- Trust Stats Row -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                <div class="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Host Rating</span>
                  <div class="flex items-center gap-1 mt-1">
                    <span class="text-black font-bold">★</span>
                    <span class="text-base font-bold text-gray-900 font-sans">
                      {{ currentStay.reviewsCount > 0 ? currentStay.rating : '5.0' }}
                    </span>
                    <span class="text-[11px] text-gray-400 font-sans">({{ currentStay.reviewsCount }} {{ currentStay.reviewsCount === 1 ? 'review' : 'reviews' }})</span>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Response Rate</span>
                  <p class="text-sm font-bold text-gray-900 mt-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>100% Verified</span>
                  </p>
                </div>

                <div class="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Response Time</span>
                  <p class="text-xs sm:text-sm font-bold text-gray-900 mt-1 truncate flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{{ currentStay.hostResponseTime || 'Within an hour' }}</span>
                  </p>
                </div>

                <div class="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Languages</span>
                  <p class="text-xs sm:text-sm font-bold text-gray-900 mt-1 truncate flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span>{{ currentStay.hostLanguages || 'Khmer, English' }}</span>
                  </p>
                </div>
              </div>

              <!-- Host Story / Note -->
              <div class="bg-white/80 p-5 rounded-2xl border border-gray-100 space-y-2">
                <h4 class="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>About Host & Family Story</span>
                </h4>
                <p class="text-sm text-gray-700 leading-relaxed italic">
                  "{{ currentStay.hostBio || `Welcome to ${currentStay.name}! We love sharing the peaceful beauty, authentic food, and cultural warmth of ${currentStay.province} with our guests. From peaceful farm mornings to home-cooked Khmer dinners, we treat every traveler like family.` }}"
                </p>
              </div>

              <!-- Trust & Safety Assurance Banner -->
              <div class="flex items-center gap-3 p-3.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p class="leading-relaxed">
                  <strong>CamStay Host Guarantee:</strong> Host identity and property coordinates have been verified. For your safety, always communicate and complete reservations through CamStay.
                </p>
              </div>
            </section>

            <!-- Guest Reviews & Community Feedback -->
            <section class="pt-8 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 class="text-2xl font-serif font-bold text-[#113A28] flex items-center gap-2">
                    <span>Guest Reviews</span>
                    <span class="text-black text-xl font-bold">★</span>
                    <span class="text-gray-900 text-2xl font-sans">{{ currentStay.reviewsCount > 0 ? currentStay.rating : 'New' }}</span>
                    <span class="text-gray-400 text-sm font-sans font-normal">({{ currentStay.reviewsCount }} {{ currentStay.reviewsCount === 1 ? 'review' : 'reviews' }})</span>
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">Authentic ratings from travelers who completed their stay</p>
                </div>

                <!-- Button for guests to rate and review this stay -->
                <button
                  @click="handleOpenReviewModal"
                  class="inline-flex items-center gap-2 bg-[#113A28] hover:bg-[#0a261a] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow self-start sm:self-auto cursor-pointer"
                >
                  <span class="text-white font-bold">★</span>
                  <span>{{ myReviewForStay ? `Your Review: ${myReviewForStay.rating}/5 (Edit)` : 'Rate & Write Recommendation' }}</span>
                </button>
              </div>

              <!-- Empty Reviews State -->
              <div v-if="stayReviews.length === 0" class="bg-white p-8 rounded-3xl border border-gray-100 text-center shadow-sm">
                <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p class="font-bold text-gray-800 text-sm">No reviews yet for this homestay</p>
                <p class="text-xs text-gray-400 mt-1 mb-4">Be among the first travelers to book and share your rural experience!</p>
                <button
                  @click="handleOpenReviewModal"
                  class="inline-flex items-center gap-2 bg-[#113A28] hover:bg-[#0a261a] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow cursor-pointer"
                >
                  <span class="text-white font-bold">★</span>
                  <span>Leave First Recommendation</span>
                </button>
              </div>

              <!-- Reviews List -->
              <div v-else class="space-y-4">
                <div
                  v-for="rev in stayReviews"
                  :key="rev.id"
                  class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition hover:shadow-md"
                >
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-[#113A28] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {{ (rev.guest_name || 'G').substring(0, 2).toUpperCase() }}
                      </div>
                      <div>
                        <p class="font-bold text-sm text-gray-900">{{ rev.guest_name || 'Guest Traveler' }}</p>
                        <div class="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                          <span>{{ rev.created_at ? new Date(rev.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Verified Guest' }}</span>
                          <span v-if="rev.is_recommended !== false" class="text-black bg-gray-100 px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 border border-gray-200">
                            <svg class="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H4a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Recommends this stay
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center text-black font-bold text-sm bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      <span class="mr-1">★</span> {{ rev.rating }}.0
                    </div>
                  </div>

                  <!-- Specific Recommendation Highlight Box -->
                  <div v-if="rev.recommendation" class="mb-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-900 flex items-start gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <span class="font-bold uppercase tracking-wider text-[10px] text-gray-700 block mb-0.5">Guest Recommendation & Tips:</span>
                      <p class="font-medium text-gray-800 leading-relaxed">{{ rev.recommendation }}</p>
                    </div>
                  </div>

                  <!-- Detailed Review Comment -->
                  <p v-if="rev.comment" class="text-gray-700 text-sm leading-relaxed">
                    "{{ rev.comment }}"
                  </p>
                </div>
              </div>
            </section>
          </div>

          <!-- RIGHT COLUMN: Interactive Booking Box with Real-Time Dynamic Pricing -->
          <div id="reserve-box" class="lg:w-1/3">
            <div class="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200 sticky top-28">
              <div class="flex justify-between items-baseline mb-6">
                <div>
                  <span class="text-3xl font-serif font-bold text-[#113A28]">${{ currentStay.price }}</span>
                  <span class="text-sm text-gray-500"> {{ t('common.perNight') }}</span>
                </div>
                <div class="text-sm font-bold flex items-center">
                  <span class="text-black mr-1 font-bold">★</span>
                  {{ currentStay.rating }} <span class="text-gray-400 font-normal ml-1">· {{ currentStay.reviewsCount }} {{ t('homestay.reviews') }}</span>
                </div>
              </div>

              <!-- Booking Form Inputs -->
              <div class="border border-gray-300 rounded-2xl overflow-hidden mb-5 bg-white">
                <div class="flex border-b border-gray-300">
                  <div class="w-1/2 p-3 border-r border-gray-300 hover:bg-emerald-50/20 transition">
                    <label class="block text-[10px] font-bold text-gray-700 tracking-wider uppercase">{{ t('home.checkIn') }}</label>
                    <input
                      type="date"
                      :min="minCheckIn"
                      v-model="bookingForm.checkIn"
                      class="w-full text-xs outline-none text-gray-800 bg-transparent font-medium cursor-pointer"
                    />
                  </div>
                  <div class="w-1/2 p-3 hover:bg-emerald-50/20 transition">
                    <label class="block text-[10px] font-bold text-gray-700 tracking-wider uppercase">{{ t('home.checkOut') }}</label>
                    <input
                      type="date"
                      :min="minCheckOut"
                      v-model="bookingForm.checkOut"
                      class="w-full text-xs outline-none text-gray-800 bg-transparent font-medium cursor-pointer"
                    />
                  </div>
                </div>
                <div class="p-3 hover:bg-emerald-50/20 transition">
                  <div class="flex justify-between items-center mb-0.5">
                    <label class="block text-[10px] font-bold text-gray-700 tracking-wider uppercase">{{ t('searchModal.guestsTitle') }}</label>
                    <span class="text-[11px] text-emerald-800 font-semibold">{{ guestsCount }} {{ t('common.guests') }}</span>
                  </div>
                  <select v-model.number="bookingForm.guests" class="w-full text-xs outline-none text-gray-800 bg-transparent font-medium cursor-pointer">
                    <option :value="1">1 {{ t('common.guest') }}</option>
                    <option :value="2">2 {{ t('common.guests') }}</option>
                    <option :value="3">3 {{ t('common.guests') }}</option>
                    <option :value="4">4 {{ t('common.guests') }}</option>
                    <option :value="5">5 {{ t('common.guests') }}</option>
                    <option :value="6">6 {{ t('common.guests') }}</option>
                  </select>
                </div>
              </div>

              <!-- Coupon & Host Discount Section -->
              <div class="mb-5 pt-3 border-t border-gray-100">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-[11px] font-bold text-gray-700 tracking-wider uppercase flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <span>Coupon or Promo Code</span>
                  </label>
                  <span v-if="appliedCoupon" class="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Applied ✓
                  </span>
                </div>

                <!-- Input form when coupon not yet applied -->
                <div v-if="!appliedCoupon" class="space-y-2">
                  <div class="flex gap-2">
                    <input
                      type="text"
                      v-model="couponInput"
                      @keydown.enter.prevent="applyCoupon"
                      placeholder="e.g. CAMBODIA10, WELCOME15"
                      class="flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded-xl border border-gray-300 focus:border-[#113A28] focus:ring-1 focus:ring-[#113A28] outline-none font-medium text-gray-800 placeholder:normal-case placeholder:tracking-normal placeholder:text-gray-400 bg-white"
                    />
                    <button
                      type="button"
                      @click="applyCoupon"
                      class="bg-[#113A28] hover:bg-[#0a261a] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  <p v-if="couponError" class="text-red-500 text-[11px] font-semibold">{{ couponError }}</p>
                  <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-gray-500">
                    <span>Try code:</span>
                    <button
                      type="button"
                      @click="useCoupon('CAMBODIA10')"
                      class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold transition cursor-pointer"
                    >
                      CAMBODIA10 (-10%)
                    </button>
                    <button
                      type="button"
                      @click="useCoupon('WELCOME15')"
                      class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold transition cursor-pointer"
                    >
                      WELCOME15 (-15%)
                    </button>
                  </div>
                </div>

                <!-- Active applied coupon badge -->
                <div v-else class="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-800 font-bold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>{{ appliedCoupon.code }}</span>
                    </span>
                    <span class="text-emerald-700 text-[11px]">({{ appliedCoupon.description }})</span>
                  </div>
                  <button
                    type="button"
                    @click="removeCoupon"
                    class="text-gray-400 hover:text-red-600 font-bold text-xs p-1 transition cursor-pointer"
                    title="Remove coupon"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <button
                @click="handleReserve"
                :disabled="isReserving"
                class="w-full bg-[#113A28] hover:bg-[#0a261a] disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-base transition shadow-md cursor-pointer mb-3"
              >
                {{ isReserving ? t('homestay.reserving') : t('homestay.reserveNow') }}
              </button>
              <p class="text-center text-xs text-gray-400 mb-5">{{ t('homestay.freeCancellation') }}</p>

              <!-- Real-time Dynamic Price Breakdown -->
              <div class="space-y-3 mb-4 text-xs md:text-sm text-gray-600 pb-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <span v-if="guestsCount === 1">
                    ${{ currentStay.price }} x {{ calculatedNights }} {{ calculatedNights === 1 ? t('common.night') : t('common.nights') }}
                  </span>
                  <span v-else>
                    ${{ currentStay.price }} x {{ calculatedNights }} {{ calculatedNights === 1 ? t('common.night') : t('common.nights') }} x {{ guestsCount }} {{ t('common.guests') }}
                  </span>
                  <span class="font-semibold text-gray-800">${{ staySubtotal.toFixed(2) }}</span>
                </div>

                <!-- Host Discount line (if host provides multi-night discount or listing promotion) -->
                <div v-if="hostDiscountAmount > 0" class="flex justify-between items-center text-emerald-700 font-medium">
                  <span class="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>{{ hostDiscountLabel }}</span>
                  </span>
                  <span>-${{ hostDiscountAmount.toFixed(2) }}</span>
                </div>

                <!-- Coupon Discount line (if coupon applied) -->
                <div v-if="couponDiscountAmount > 0" class="flex justify-between items-center text-emerald-700 font-medium">
                  <span class="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Coupon discount ({{ appliedCoupon?.code }})</span>
                  </span>
                  <span>-${{ couponDiscountAmount.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Total USD automatically calculated -->
              <div class="flex justify-between items-center font-bold text-base md:text-lg text-gray-900">
                <div>
                  <span class="block text-sm md:text-base">{{ t('homestay.totalPrice') }}</span>
                  <span v-if="hostDiscountAmount > 0 || couponDiscountAmount > 0" class="text-[11px] font-semibold text-emerald-700">
                    Discounts applied
                  </span>
                </div>
                <div class="text-right">
                  <span
                    v-if="hostDiscountAmount > 0 || couponDiscountAmount > 0"
                    class="block text-xs text-gray-400 line-through font-normal"
                  >
                    ${{ staySubtotal.toFixed(2) }}
                  </span>
                  <span class="text-[#113A28] text-2xl font-serif">${{ totalPrice.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- If Homestay Not Found in DB -->
      <div v-else class="max-w-xl mx-auto text-center py-24 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
        <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gray-100 flex items-center justify-center text-black shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h2 class="text-3xl font-serif font-bold text-[#113A28] mb-3">Homestay Not Found</h2>
        <p class="text-gray-500 text-sm mb-8 leading-relaxed">
          The homestay listing you are looking for does not exist or has not been approved yet.
        </p>
        <RouterLink to="/explore" class="bg-[#113A28] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#0a261a] transition shadow-sm inline-block">
          Explore All Available Homestays
        </RouterLink>
      </div>
    </main>

    <!-- Mobile Sticky Bottom Booking Bar (visible on < lg when homestay is loaded) -->
    <div
      v-if="currentStay"
      class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between"
    >
      <div>
        <div class="flex items-baseline gap-1.5">
          <span class="text-xl font-bold font-serif text-[#113A28]">${{ totalPrice.toFixed(2) }}</span>
          <span class="text-xs text-gray-500 font-medium">total ({{ calculatedNights }}n)</span>
        </div>
        <div class="text-[11px] text-gray-500 flex items-center gap-1.5">
          <span class="text-black font-bold">★ {{ currentStay.rating }}</span>
          <span>·</span>
          <span class="truncate max-w-[140px]">{{ bookingForm.checkIn ? `${bookingForm.checkIn} → ${bookingForm.checkOut}` : 'Select dates' }}</span>
        </div>
      </div>
      <button
        @click="scrollToReserveBox"
        class="bg-[#113A28] hover:bg-[#0a261a] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition active:scale-95 cursor-pointer"
      >
        Reserve
      </button>
    </div>

    <!-- Booking Confirmation Modal -->
    <div
      v-if="showSuccessModal && currentStay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        <div class="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          ✓
        </div>
        <h3 class="text-2xl font-serif font-bold text-[#113A28] mb-2">Reservation Confirmed!</h3>
        <p class="text-sm text-gray-600 mb-4">
          Your reservation for <strong>{{ currentStay.name }}</strong> has been submitted to host <strong>{{ currentStay.hostName }}</strong>.
        </p>

        <!-- Reservation Summary Recap -->
        <div class="bg-[#FCFAF6] border border-gray-200 p-4 rounded-2xl text-left text-xs space-y-2 mb-6">
          <div class="flex justify-between">
            <span class="text-gray-500">Dates:</span>
            <span class="font-bold text-gray-800">{{ bookingForm.checkIn }} to {{ bookingForm.checkOut }} ({{ calculatedNights }} {{ calculatedNights === 1 ? 'night' : 'nights' }})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Guests:</span>
            <span class="font-bold text-gray-800">{{ guestsCount }} {{ guestsCount === 1 ? 'guest' : 'guests' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Stay Subtotal:</span>
            <span class="font-bold text-gray-800">${{ staySubtotal.toFixed(2) }}</span>
          </div>
          <div v-if="hostDiscountAmount > 0" class="flex justify-between text-emerald-700">
            <span>{{ hostDiscountLabel }}:</span>
            <span class="font-bold">-${{ hostDiscountAmount.toFixed(2) }}</span>
          </div>
          <div v-if="couponDiscountAmount > 0" class="flex justify-between text-emerald-700">
            <span>Coupon ({{ appliedCoupon?.code }}):</span>
            <span class="font-bold">-${{ couponDiscountAmount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between border-t border-gray-200 pt-2">
            <span class="text-gray-500">Total Reserved:</span>
            <span class="font-bold text-[#113A28] text-sm">${{ totalPrice.toFixed(2) }} USD</span>
          </div>
        </div>

        <div class="space-y-3">
          <RouterLink
            to="/dashboard/guest"
            class="block w-full bg-[#113A28] hover:bg-[#0a261a] text-white py-3 rounded-xl font-bold text-sm transition shadow-sm"
          >
            View in My Guest Trips →
          </RouterLink>
          <button
            @click="showSuccessModal = false"
            class="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer"
          >
            Stay on this Page
          </button>
        </div>
      </div>
    </div>

    <!-- Rate Homestay Modal -->
    <RateHomestayModal
      :isOpen="isRateModalOpen"
      :booking="myEligibleStayBooking || null"
      :homestay="currentStay || null"
      :existingReview="myReviewForStay || null"
      @close="isRateModalOpen = false"
      @reviewSubmitted="onReviewSubmitted"
    />

    <!-- On-Page Login/Signup Modal (No redirect away from homestay page) -->
    <AuthModal
      v-if="showAuthModal"
      :isOpen="showAuthModal"
      :redirectOnSuccess="false"
      :subtitle="authModalSubtitle"
      @close="showAuthModal = false"
      @success="onAuthSuccess"
    />

    <!-- Interactive Multi-Channel Share Modal -->
    <Teleport to="body">
      <div
        v-if="isShareModalOpen && currentStay"
        class="fixed inset-0 z-[160] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
        @click.self="isShareModalOpen = false"
      >
        <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative">
          <!-- Close button (clean Cancel cross with no circle) -->
          <button
            type="button"
            @click="isShareModalOpen = false"
            class="absolute top-5 right-5 text-gray-400 hover:text-black transition cursor-pointer p-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Modal Title -->
          <h3 class="text-xl font-serif font-bold text-gray-900 mb-4">
            Share this homestay
          </h3>

          <!-- Professional Social Card Preview (Facebook/Instagram Style) -->
          <div class="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs mb-5">
            <div class="relative h-44 w-full bg-gray-100 overflow-hidden">
              <img
                :src="currentStay.coverPhotoUrl"
                :alt="currentStay.name"
                class="w-full h-full object-cover"
              />
              <span class="absolute top-2.5 left-2.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
                <span>★ {{ currentStay.rating }}</span>
                <span>·</span>
                <span>${{ currentStay.price }} / night</span>
              </span>
              <span class="absolute bottom-2.5 right-2.5 bg-white/95 text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm border border-gray-100">
                {{ currentStay.province }}, Cambodia
              </span>
            </div>
            <div class="p-3.5 bg-[#FCFAF6] border-t border-gray-100">
              <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                <span>camstay.com</span>
                <span class="text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">Verified Homestay</span>
              </div>
              <h4 class="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
                {{ currentStay.name }} · {{ currentStay.province }}
              </h4>
              <p class="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                {{ currentStay.description || `Experience authentic village life and peaceful countryside hospitality in ${currentStay.province}. Book verified homestay on CamStay.` }}
              </p>
            </div>
          </div>

          <!-- Sharing Channels Grid -->
          <div class="grid grid-cols-2 gap-3 mb-5">
            <!-- 1. Telegram -->
            <a
              :href="telegramShareUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition cursor-pointer group"
            >
              <div class="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-black shrink-0 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .26z"/>
                </svg>
              </div>
              <div class="min-w-0">
                <span class="text-xs font-bold text-gray-900 block truncate">Telegram</span>
                <span class="text-[10px] text-gray-400 block truncate">Chat or group</span>
              </div>
            </a>

            <!-- 2. WhatsApp -->
            <a
              :href="whatsappShareUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition cursor-pointer group"
            >
              <div class="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-black shrink-0 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.14c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 01-1.26-4.48c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.69 8.24-8.23 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z"/>
                </svg>
              </div>
              <div class="min-w-0">
                <span class="text-xs font-bold text-gray-900 block truncate">WhatsApp</span>
                <span class="text-[10px] text-gray-400 block truncate">Direct message</span>
              </div>
            </a>

            <!-- 3. Facebook -->
            <a
              :href="facebookShareUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition cursor-pointer group"
            >
              <div class="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-black shrink-0 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </div>
              <div class="min-w-0">
                <span class="text-xs font-bold text-gray-900 block truncate">Facebook</span>
                <span class="text-[10px] text-gray-400 block truncate">Post to feed</span>
              </div>
            </a>

            <!-- 4. Device / More Options -->
            <button
              type="button"
              @click="shareViaDevice"
              class="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition cursor-pointer text-left group"
            >
              <div class="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center text-black shrink-0 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div class="min-w-0">
                <span class="text-xs font-bold text-gray-900 block truncate">More Apps</span>
                <span class="text-[10px] text-gray-400 block truncate">System share</span>
              </div>
            </button>
          </div>

          <!-- Action Buttons Bar -->
          <div class="space-y-2.5">
            <!-- Direct Link Copy Input Bar -->
            <div class="p-2 pl-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-2">
              <div class="truncate text-xs text-gray-600 font-mono select-all">
                {{ currentShareUrl }}
              </div>
              <button
                type="button"
                @click="copyShareLink"
                class="bg-[#113A28] hover:bg-[#0a261a] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <svg v-if="shareCopied" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{{ shareCopied ? 'Link Copied!' : 'Copy Link' }}</span>
              </button>
            </div>

            <!-- Copy Full Post (Description + Link) Button -->
            <button
              type="button"
              @click="copyFullSummary"
              class="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-2.5 rounded-xl font-bold text-xs transition shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{{ summaryCopied ? 'Post with Description Copied! ✓' : 'Copy Post Text with Description' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Contact Host Modal -->
    <Teleport to="body">
      <div
        v-if="isContactModalOpen && currentStay"
        class="fixed inset-0 z-[160] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
        @click.self="isContactModalOpen = false"
      >
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
          <!-- Close button (just Cancel cross with no circle) -->
          <button
            type="button"
            @click="isContactModalOpen = false"
            class="absolute top-5 right-5 text-gray-400 hover:text-black transition cursor-pointer p-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex items-center gap-4 mb-6">
            <div class="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#113A28]/20 bg-[#113A28] text-white flex items-center justify-center shrink-0 shadow">
              <img
                v-if="currentStay.hostAvatarUrl"
                :src="currentStay.hostAvatarUrl"
                :alt="currentStay.hostName"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-xl font-bold font-serif">
                {{ (currentStay.hostName || 'Host').substring(0, 2).toUpperCase() }}
              </span>
              <span class="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">
                ✓
              </span>
            </div>
            <div>
              <h3 class="text-xl font-serif font-bold text-gray-900">
                Contact {{ currentStay.hostName || 'Host' }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ currentStay.name }} · {{ currentStay.province }}
              </p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[11px] bg-gray-100 text-black font-semibold px-2.5 py-0.5 rounded-full border border-gray-200 inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Responds {{ currentStay.hostResponseTime || 'within an hour' }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Contact details cards (In-App Chat, Phone, Telegram, WhatsApp) -->
          <div class="space-y-3 mb-6">
            <!-- 0. Direct Message on CamStay (Featured In-App Chat) -->
            <div class="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-600/30 flex items-center justify-between hover:border-emerald-600/60 transition shadow-2xs">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-[#113A28] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div class="truncate">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[10px] uppercase tracking-wider font-bold text-emerald-800 block">{{ t('messages.directChat') }}</span>
                    <span class="text-[9px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.2 rounded-full">Recommended</span>
                  </div>
                  <span class="text-sm font-bold text-gray-900 truncate block">{{ t('messages.chatWithHost') }}</span>
                </div>
              </div>
              <button
                @click="startChatWithHost"
                :disabled="isStartingChat"
                class="bg-[#113A28] hover:bg-[#0a261a] disabled:bg-gray-400 text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <span v-if="!isStartingChat">{{ t('messages.directChat') }}</span>
                <span v-else>Connecting...</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <!-- 1. Direct Phone Call -->
            <div class="p-3.5 sm:p-4 rounded-2xl bg-[#FCFAF6] border border-gray-200 flex items-center justify-between hover:border-gray-300 transition">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-black shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="truncate">
                  <span class="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Direct Phone Call</span>
                  <span class="text-sm font-bold text-gray-900 truncate block">{{ hostPhoneNumber }}</span>
                </div>
              </div>
              <a
                :href="phoneCallLink"
                class="bg-[#113A28] hover:bg-[#0a261a] text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call</span>
              </a>
            </div>

            <!-- 2. Telegram -->
            <div class="p-3.5 sm:p-4 rounded-2xl bg-[#FCFAF6] border border-gray-200 flex items-center justify-between hover:border-gray-300 transition">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-black shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .26z"/>
                  </svg>
                </div>
                <div class="truncate">
                  <span class="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Telegram</span>
                  <span class="text-sm font-bold text-gray-900 truncate block">Chat directly on Telegram</span>
                </div>
              </div>
              <a
                :href="telegramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-black hover:bg-gray-800 text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <span>Telegram</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <!-- 3. WhatsApp -->
            <div class="p-3.5 sm:p-4 rounded-2xl bg-[#FCFAF6] border border-gray-200 flex items-center justify-between hover:border-gray-300 transition">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-black shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.14c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 01-1.26-4.48c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.69 8.24-8.23 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z"/>
                  </svg>
                </div>
                <div class="truncate">
                  <span class="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">WhatsApp</span>
                  <span class="text-sm font-bold text-gray-900 truncate block">Message on WhatsApp</span>
                </div>
              </div>
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <button
            @click="isContactModalOpen = false"
            class="w-full bg-[#113A28] hover:bg-[#0a261a] text-white py-3 rounded-xl font-bold text-sm transition shadow cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Teleport>

    <!-- Dedicated Interactive Map & Location Modal -->
    <Teleport to="body">
      <div
        v-if="isMapModalOpen && currentStay"
        class="fixed inset-0 z-[160] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fade-in"
        @click.self="isMapModalOpen = false"
      >
        <div class="bg-white rounded-3xl p-5 sm:p-7 max-w-4xl w-full shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
          <!-- Modal Header -->
          <div class="flex items-start justify-between pb-3.5 border-b border-gray-100 shrink-0">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-xl sm:text-2xl font-serif font-bold text-[#113A28]">
                  Where you'll be
                </h3>
                <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {{ currentStay.landscape || currentStay.category }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="font-bold text-gray-800">{{ locationDetails.district }}, {{ currentStay.province }}, Cambodia</span>
              </p>
            </div>

            <!-- Close Button (just Cancel cross with no circle) -->
            <button
              type="button"
              @click="isMapModalOpen = false"
              class="text-gray-400 hover:text-black transition cursor-pointer p-1 shrink-0"
              title="Close Map"
              aria-label="Close Map"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Scrollable Modal Content -->
          <div class="overflow-y-auto space-y-4 pt-4 pr-1">
            <!-- Map Container with Provider Toggle -->
            <div class="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 h-[220px] sm:h-[260px] w-full shrink-0">
              <!-- Map Switcher (Top Right) -->
              <div class="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-gray-200 flex gap-1 text-[11px] font-bold">
                <button
                  type="button"
                  @click="mapProvider = 'google'"
                  :class="mapProvider === 'google' ? 'bg-[#113A28] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  class="px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  Google Map
                </button>
                <button
                  type="button"
                  @click="mapProvider = 'osm'"
                  :class="mapProvider === 'osm' ? 'bg-[#113A28] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  class="px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  OpenStreetMap
                </button>
              </div>

              <!-- Live Map iframe -->
              <iframe
                :src="currentMapEmbedUrl"
                class="w-full h-full border-0"
                loading="lazy"
                allowfullscreen
                title="Homestay Map Location"
              ></iframe>

              <!-- Floating Pin Card (Bottom Left) -->
              <div class="absolute bottom-3 left-3 z-10 max-w-[85%] sm:max-w-md bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-gray-200 flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <h4 class="text-xs font-serif font-bold text-gray-900 truncate">
                    {{ currentStay.name }}
                  </h4>
                  <p class="text-[10px] text-gray-500 truncate">
                    {{ locationDetails.district }} · {{ currentStay.province }}
                  </p>
                </div>
              </div>
            </div>

            <!-- External Actions Bar -->
            <div class="flex items-center justify-between flex-wrap gap-2 pt-0.5">
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="copyLocationAddress"
                  class="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>{{ isAddressCopied ? 'Address Copied! ✓' : 'Copy Address' }}</span>
                </button>
                <button
                  type="button"
                  @click="openInGoogleMaps"
                  class="inline-flex items-center gap-1.5 bg-[#113A28] hover:bg-[#0a261a] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
              <span class="text-[11px] text-gray-400">Verified coordinates in {{ currentStay.province }}</span>
            </div>

            <!-- 2-Column Spacious Layout: Neighborhood & Getting Around (Left) | Nearby Highlights (Right) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <!-- Left Column: The Neighborhood & Getting There -->
              <div class="space-y-3.5 flex flex-col justify-between">
                <!-- 1. The Countryside Environment -->
                <div class="p-4 rounded-2xl bg-[#FCFAF6] border border-gray-200/80 shadow-xs">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 class="text-xs font-serif font-bold text-gray-900 uppercase tracking-wider">The Neighborhood</h4>
                    </div>
                    <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Fresh Country Air
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 leading-relaxed">
                    {{ locationDetails.environment }}
                  </p>
                </div>

                <!-- 2. Host Directions & Transport Badges -->
                <div class="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2.5">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                    <h4 class="text-xs font-serif font-bold text-gray-900 uppercase tracking-wider">Getting Around & Transit</h4>
                  </div>

                  <!-- Host custom directions if provided -->
                  <div
                    v-if="currentStay.addressDirections"
                    class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 leading-relaxed font-medium"
                  >
                    <span class="font-bold text-[#113A28] block text-[11px] mb-1">Host Travel Note:</span>
                    {{ currentStay.addressDirections }}
                  </div>

                  <!-- Clean transport badges (no giant redundant walls of text) -->
                  <div class="flex flex-wrap gap-2 pt-1">
                    <span
                      v-for="(t, idx) in cleanTransportTags"
                      :key="idx"
                      class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-100/90 text-gray-800 text-[11px] font-medium border border-gray-200/60 shadow-2xs"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                      </svg>
                      <span>{{ t.title }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right Column: Nearby Highlights & Distances (Full Width, No Truncation!) -->
              <div class="p-4 rounded-2xl bg-[#FCFAF6] border border-gray-200/80 shadow-xs flex flex-col">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 class="text-xs font-serif font-bold text-gray-900 uppercase tracking-wider">Nearby Highlights</h4>
                  </div>
                  <span class="text-[11px] text-gray-400 font-medium">Distance from Stay</span>
                </div>

                <div class="space-y-2 flex-grow">
                  <div
                    v-for="(h, idx) in cleanHighlights"
                    :key="idx"
                    class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 text-xs shadow-xs transition"
                  >
                    <div class="flex items-center gap-2 min-w-0 pr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="font-semibold text-gray-800 text-xs leading-snug">{{ h.name }}</span>
                    </div>
                    <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md shrink-0">
                      {{ h.dist }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Host Location Privacy & Safety Notice (Clean, Low-Profile) -->
            <div class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p class="leading-relaxed text-[11px]">
                <strong class="text-black">Location Privacy Guarantee:</strong> Exact GPS coordinates, local driver contacts, and landmark markers are sent upon booking confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Full-Screen Interactive Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col text-white select-none animate-fade-in"
        tabindex="0"
      >
        <!-- Top bar -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <h4 class="font-serif font-bold text-lg text-white truncate max-w-xs sm:max-w-md">
              {{ currentStay?.name }}
            </h4>
            <span class="text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Photo {{ activeLightboxIndex + 1 }} of {{ allPhotos.length }}
            </span>
          </div>

          <button
            @click="closeLightbox"
            class="text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition cursor-pointer"
            title="Close Lightbox (Esc)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Main photo display with arrows -->
        <div class="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          <!-- Previous Button -->
          <button
            v-if="allPhotos.length > 1"
            @click.stop="prevPhoto"
            class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition cursor-pointer backdrop-blur-sm shadow-xl"
            title="Previous (Left Arrow)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Current Large Image -->
          <div class="max-w-5xl max-h-[72vh] flex items-center justify-center">
            <img
              :src="allPhotos[activeLightboxIndex]"
              :alt="'Homestay photo ' + (activeLightboxIndex + 1)"
              class="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl transition duration-300"
            />
          </div>

          <!-- Next Button -->
          <button
            v-if="allPhotos.length > 1"
            @click.stop="nextPhoto"
            class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition cursor-pointer backdrop-blur-sm shadow-xl"
            title="Next (Right Arrow)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Bottom Thumbnail Strip -->
        <div
          v-if="allPhotos.length > 1"
          class="h-24 px-6 py-3 border-t border-white/10 flex items-center justify-center gap-3 overflow-x-auto"
        >
          <div
            v-for="(photo, idx) in allPhotos"
            :key="idx"
            @click="activeLightboxIndex = idx"
            :class="activeLightboxIndex === idx ? 'ring-2 ring-emerald-400 scale-105 opacity-100' : 'opacity-50 hover:opacity-80'"
            class="h-16 w-20 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer transition transform duration-200"
          >
            <img :src="photo" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import RateHomestayModal from '@/components/RateHomestayModal.vue';
import AuthModal from '@/components/common/AuthModal.vue';
import { usePropertyStore, type Homestay, type Booking, type ReviewData } from '@/stores/usePropertyStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMessageStore } from '@/stores/useMessageStore';
import { showAlert } from '@/composables/useConfirmDialog';
import { useI18n } from '@/composables/useI18n';

const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();
const authStore = useAuthStore();
const messageStore = useMessageStore();
const { t, translateProvince } = useI18n();

const stayId = computed(() => Number(route.params.id));

const currentStay = computed<Homestay | undefined>(() => {
  return propertyStore.properties.value.find((p) => p.id === stayId.value);
});

// Deduplicate and assemble all available photos for the gallery
const allPhotos = computed<string[]>(() => {
  if (!currentStay.value) return [];
  const list =
    currentStay.value.galleryPhotos && currentStay.value.galleryPhotos.length > 0
      ? currentStay.value.galleryPhotos
      : (currentStay.value.coverPhotoUrl ? [currentStay.value.coverPhotoUrl] : []);
  const unique = Array.from(new Set(list)).filter(Boolean);
  return unique.length > 0 ? unique : (currentStay.value.coverPhotoUrl ? [currentStay.value.coverPhotoUrl] : []);
});

// Lightbox Modal Controls
const isLightboxOpen = ref(false);
const activeLightboxIndex = ref(0);

const openLightbox = (index: number) => {
  activeLightboxIndex.value = Math.max(0, Math.min(index, allPhotos.value.length - 1));
  isLightboxOpen.value = true;
  window.addEventListener('keydown', handleKeydown);
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  window.removeEventListener('keydown', handleKeydown);
};

const prevPhoto = () => {
  if (allPhotos.value.length === 0) return;
  activeLightboxIndex.value =
    (activeLightboxIndex.value - 1 + allPhotos.value.length) % allPhotos.value.length;
};

const nextPhoto = () => {
  if (allPhotos.value.length === 0) return;
  activeLightboxIndex.value =
    (activeLightboxIndex.value + 1) % allPhotos.value.length;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
};

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// Dynamic booking dates & constraints
const today = new Date();
const inDate = today.toISOString().split('T')[0] ?? '';
const defaultOut = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] ?? '';

const bookingForm = reactive({
  checkIn: inDate,
  checkOut: defaultOut,
  guests: 1,
});

const minCheckIn = computed(() => {
  const d = new Date();
  return d.toISOString().split('T')[0] ?? '';
});

const minCheckOut = computed(() => {
  if (!bookingForm.checkIn) return minCheckIn.value;
  const d = new Date(bookingForm.checkIn);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0] ?? '';
});

// Ensure checkOut is always after checkIn
watch(() => bookingForm.checkIn, (newCheckIn) => {
  if (!newCheckIn) return;
  const start = new Date(newCheckIn);
  const end = new Date(bookingForm.checkOut);
  if (end <= start || isNaN(end.getTime())) {
    const nextDay = new Date(start);
    nextDay.setDate(nextDay.getDate() + 1);
    bookingForm.checkOut = nextDay.toISOString().split('T')[0] ?? '';
  }
});

watch(() => bookingForm.checkOut, (newCheckOut) => {
  if (!newCheckOut || !bookingForm.checkIn) return;
  const start = new Date(bookingForm.checkIn);
  const end = new Date(newCheckOut);
  if (end <= start) {
    const nextDay = new Date(start);
    nextDay.setDate(nextDay.getDate() + 1);
    bookingForm.checkOut = nextDay.toISOString().split('T')[0] ?? '';
  }
});

const calculatedNights = computed(() => {
  try {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 1;
    const start = new Date(bookingForm.checkIn).getTime();
    const end = new Date(bookingForm.checkOut).getTime();
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  } catch {
    return 1;
  }
});

const guestsCount = computed(() => Math.max(1, Number(bookingForm.guests) || 1));

const staySubtotal = computed(() => {
  if (!currentStay.value) return 0;
  return currentStay.value.price * calculatedNights.value * guestsCount.value;
});

// Host provided discounts (e.g. multi-night discount or custom listing discount)
const hostDiscountRate = computed(() => {
  if (!currentStay.value) return 0;
  if ((currentStay.value as any).discountPercentage) {
    return Number((currentStay.value as any).discountPercentage) / 100;
  }
  if (calculatedNights.value >= 7) {
    return 0.15; // 15% discount for weekly stays
  } else if (calculatedNights.value >= 3) {
    return 0.10; // 10% discount for 3+ nights
  }
  return 0;
});

const hostDiscountLabel = computed(() => {
  if (calculatedNights.value >= 7) return 'Host weekly discount (15% off)';
  if (calculatedNights.value >= 3) return 'Host multi-night discount (10% off)';
  if (hostDiscountRate.value > 0) return `Host special discount (${Math.round(hostDiscountRate.value * 100)}% off)`;
  return '';
});

const hostDiscountAmount = computed(() => {
  if (hostDiscountRate.value <= 0) return 0;
  return Number((staySubtotal.value * hostDiscountRate.value).toFixed(2));
});

// Coupon codes system
interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  CAMBODIA10: { code: 'CAMBODIA10', type: 'percentage', value: 0.10, description: '10% off' },
  WELCOME15: { code: 'WELCOME15', type: 'percentage', value: 0.15, description: '15% off' },
  RURAL2026: { code: 'RURAL2026', type: 'percentage', value: 0.20, description: '20% off' },
  ECOSTAY: { code: 'ECOSTAY', type: 'fixed', value: 5.0, description: '$5.00 off' },
  SIEMREAP: { code: 'SIEMREAP', type: 'percentage', value: 0.10, description: '10% off' },
};

const couponInput = ref('');
const appliedCoupon = ref<Coupon | null>(null);
const couponError = ref('');

const applyCoupon = () => {
  couponError.value = '';
  const trimmed = couponInput.value.trim().toUpperCase();
  if (!trimmed) {
    couponError.value = 'Please enter a coupon code.';
    return;
  }

  const found = AVAILABLE_COUPONS[trimmed];
  if (found) {
    appliedCoupon.value = found;
    couponInput.value = '';
    couponError.value = '';
  } else {
    couponError.value = `Coupon "${trimmed}" not recognized. Try CAMBODIA10 or WELCOME15.`;
  }
};

const useCoupon = (code: string) => {
  couponInput.value = code;
  applyCoupon();
};

const removeCoupon = () => {
  appliedCoupon.value = null;
  couponError.value = '';
};

const couponDiscountAmount = computed(() => {
  if (!appliedCoupon.value) return 0;
  const subtotalAfterHost = Math.max(0, staySubtotal.value - hostDiscountAmount.value);
  if (appliedCoupon.value.type === 'percentage') {
    return Number((subtotalAfterHost * appliedCoupon.value.value).toFixed(2));
  } else {
    return Math.min(subtotalAfterHost, appliedCoupon.value.value);
  }
});

const totalPrice = computed(() => {
  if (!currentStay.value) return 0;
  const raw = staySubtotal.value - hostDiscountAmount.value - couponDiscountAmount.value;
  return Math.max(0, Number(raw.toFixed(2)));
});

const isShareModalOpen = ref(false);
const shareCopied = ref(false);
const showSuccessModal = ref(false);
const isReserving = ref(false);

const summaryCopied = ref(false);

const currentShareUrl = computed(() => {
  return typeof window !== 'undefined' ? window.location.href : '';
});

const shareText = computed(() => {
  if (!currentStay.value) return 'Check out this authentic homestay on CamStay!';
  const desc = currentStay.value.description
    ? (currentStay.value.description.length > 140 ? currentStay.value.description.substring(0, 137) + '...' : currentStay.value.description)
    : 'Experience authentic countryside village living with warm Cambodian hospitality.';
  return `🏡 *${currentStay.value.name}* · ${currentStay.value.province}, Cambodia\n⭐ ${currentStay.value.rating} (${currentStay.value.reviewsCount} reviews) · $${currentStay.value.price}/night\n\n"${desc}"\n\n👉 View photos & book:`;
});

const shareFullSummary = computed(() => {
  if (!currentStay.value) return currentShareUrl.value;
  const desc = currentStay.value.description
    ? (currentStay.value.description.length > 160 ? currentStay.value.description.substring(0, 157) + '...' : currentStay.value.description)
    : 'Experience authentic countryside village living with warm Cambodian hospitality.';
  return `🏡 ${currentStay.value.name} · ${currentStay.value.province}, Cambodia\n⭐ ${currentStay.value.rating} rating · $${currentStay.value.price}/night\n\n"${desc}"\n\n📸 Photos & Booking: ${currentShareUrl.value}`;
});

const telegramShareUrl = computed(() => {
  return `https://t.me/share/url?url=${encodeURIComponent(currentShareUrl.value)}&text=${encodeURIComponent(shareText.value)}`;
});

const whatsappShareUrl = computed(() => {
  return `https://wa.me/?text=${encodeURIComponent(shareText.value + '\n' + currentShareUrl.value)}`;
});

const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl.value)}`;
});

const copyShareLink = async () => {
  try {
    await navigator.clipboard.writeText(currentShareUrl.value);
    shareCopied.value = true;
    setTimeout(() => {
      shareCopied.value = false;
    }, 2500);
  } catch {
    prompt('Copy link to homestay:', currentShareUrl.value);
  }
};

const copyFullSummary = async () => {
  try {
    await navigator.clipboard.writeText(shareFullSummary.value);
    summaryCopied.value = true;
    setTimeout(() => {
      summaryCopied.value = false;
    }, 2500);
  } catch {
    prompt('Copy homestay summary:', shareFullSummary.value);
  }
};

const shareViaDevice = async () => {
  if (typeof navigator !== 'undefined' && (navigator as any).share) {
    try {
      await (navigator as any).share({
        title: currentStay.value?.name || 'CamStay Homestay',
        text: shareText.value,
        url: currentShareUrl.value,
      });
    } catch {
      // user closed or cancelled share dialog
    }
  } else {
    copyShareLink();
  }
};

// Dynamically update document title and head Open Graph tags on stay load
watch(currentStay, (stay) => {
  if (stay && typeof document !== 'undefined') {
    const title = `${stay.name} · ${stay.province} ($${stay.price}/night) | CamStay`;
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = stay.description
      ? (stay.description.length > 170 ? stay.description.substring(0, 167) + '...' : stay.description)
      : `Experience authentic countryside living at ${stay.name} in ${stay.province}, Cambodia.`;

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    if (stay.coverPhotoUrl) {
      setMeta('property', 'og:image', stay.coverPhotoUrl);
      setMeta('name', 'twitter:image', stay.coverPhotoUrl);
    }
    setMeta('property', 'og:url', window.location.href);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }
}, { immediate: true });

const scrollToReserveBox = () => {
  const el = document.getElementById('reserve-box');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const showAuthModal = ref(false);
const authModalSubtitle = ref('');
const pendingAction = ref<'reserve' | 'review' | 'chat' | null>(null);

const onAuthSuccess = () => {
  showAuthModal.value = false;
  if (pendingAction.value === 'reserve') {
    pendingAction.value = null;
    handleReserve();
  } else if (pendingAction.value === 'review') {
    pendingAction.value = null;
    isRateModalOpen.value = true;
  } else if (pendingAction.value === 'chat') {
    pendingAction.value = null;
    startChatWithHost();
  }
};

const handleReserve = async () => {
  if (!authStore.isLoggedIn.value) {
    authModalSubtitle.value = 'Please sign in or create an account to reserve this homestay.';
    pendingAction.value = 'reserve';
    showAuthModal.value = true;
    return;
  }

  if (!currentStay.value) return;

  isReserving.value = true;

  try {
    const newBooking = await propertyStore.addBooking({
      property_id: currentStay.value.id,
      guest_id: authStore.user.value?.id,
      guest_email: authStore.user.value?.email,
      check_in_date: bookingForm.checkIn,
      check_out_date: bookingForm.checkOut,
      guests_count: guestsCount.value,
      total_price: Number(totalPrice.value.toFixed(2)),
      coupon_code: appliedCoupon.value ? appliedCoupon.value.code : undefined,
      discount_amount: Number((hostDiscountAmount.value + couponDiscountAmount.value).toFixed(2)),
    });

    if (newBooking) {
      showSuccessModal.value = true;
    }
  } catch (err: any) {
    await showAlert({
      title: 'Reservation Error',
      message: err.message || 'Failed to reserve homestay. Please try again.',
      type: 'danger',
      confirmText: 'Try Again',
    });
  } finally {
    isReserving.value = false;
  }
};

const isRateModalOpen = ref(false);
const isContactModalOpen = ref(false);
const isMapModalOpen = ref(false);
const isStartingChat = ref(false);

const startChatWithHost = async () => {
  if (!authStore.isLoggedIn.value) {
    isContactModalOpen.value = false;
    authModalSubtitle.value = 'Please sign in or create an account to message the host directly.';
    pendingAction.value = 'chat';
    showAuthModal.value = true;
    return;
  }

  const hostId = currentStay.value?.host_id;
  const stayIdNum = currentStay.value?.id;

  if (!hostId || !stayIdNum) {
    showAlert({
      title: 'Host Info Unavailable',
      message: 'Unable to start a direct message thread for this homestay listing.',
      type: 'warning',
    });
    return;
  }

  if (authStore.user.value?.id === hostId) {
    showAlert({
      title: 'Own Homestay',
      message: 'You are the host of this homestay listing.',
      type: 'info',
    });
    return;
  }

  isStartingChat.value = true;
  try {
    await messageStore.startConversation(
      hostId,
      stayIdNum,
      `Hello ${currentStay.value?.hostName || 'Host'}, I have an inquiry about ${currentStay.value?.name}.`
    );
    isContactModalOpen.value = false;

    if (authStore.user.value?.role === 'host') {
      router.push({ path: '/dashboard/host', query: { tab: 'inbox' } });
    } else {
      router.push({ path: '/dashboard/guest', query: { tab: 'inbox' } });
    }
  } catch (err) {
    console.error('Failed to start chat with host:', err);
  } finally {
    isStartingChat.value = false;
  }
};

const hostPhoneNumber = computed(() => {
  if (!currentStay.value) return '+855 12 789 456';
  return (
    currentStay.value.hostPhone ||
    (currentStay.value as any).host?.phone ||
    (currentStay.value as any).host?.phone_number ||
    '+855 12 789 456'
  );
});

const cleanIntlPhone = computed(() => {
  const raw = (hostPhoneNumber.value || '').replace(/\D/g, '');
  if (!raw) return '85512789456';
  if (raw.startsWith('0')) {
    return '855' + raw.slice(1);
  }
  if (raw.startsWith('855')) {
    return raw;
  }
  return '855' + raw;
});

const phoneCallLink = computed(() => {
  return `tel:+${cleanIntlPhone.value}`;
});

const telegramUrl = computed(() => {
  return `https://t.me/+${cleanIntlPhone.value}`;
});

const whatsappUrl = computed(() => {
  const hostName = currentStay.value?.hostName || 'Host';
  const stayName = currentStay.value?.name || 'homestay';
  const msg = encodeURIComponent(`Hello ${hostName}, I am contacting you regarding ${stayName} on CamStay.`);
  return `https://wa.me/${cleanIntlPhone.value}?text=${msg}`;
});

const handleOpenReviewModal = () => {
  if (!authStore.isLoggedIn.value) {
    authModalSubtitle.value = 'Please sign in or create an account to share your rating and review.';
    pendingAction.value = 'review';
    showAuthModal.value = true;
    return;
  }
  isRateModalOpen.value = true;
};

const stayReviews = computed(() => {
  return propertyStore.homestayReviews.value[stayId.value] || [];
});

const myEligibleStayBooking = computed<Booking | undefined>(() => {
  if (!authStore.isLoggedIn.value) return undefined;
  const currentEmail = authStore.user.value?.email?.toLowerCase();
  const currentId = authStore.user.value?.id;

  return propertyStore.bookings.value.find((b) =>
    (b.homestay_id === stayId.value || b.property_id === stayId.value) &&
    (b.guest_email?.toLowerCase() === currentEmail || b.guest_id === currentId)
  );
});

const myReviewForStay = computed<ReviewData | undefined>(() => {
  if (!authStore.isLoggedIn.value) return undefined;
  const currentId = authStore.user.value?.id;
  const inStay = stayReviews.value.find((r) => r.guest_id === currentId);
  if (inStay) return inStay;
  return propertyStore.myReviews.value.find(
    (r) => r.homestay_id === stayId.value || (myEligibleStayBooking.value && r.booking_id === (myEligibleStayBooking.value.booking_id || myEligibleStayBooking.value.id))
  );
});

const onReviewSubmitted = async () => {
  await Promise.all([
    propertyStore.fetchHomestayReviews(stayId.value),
    propertyStore.fetchBackendProperties(),
    propertyStore.fetchMyReviews(),
  ]);
};

// --- Location, Interactive Maps & Neighborhood Guide ---
interface ProvinceLocationData {
  lat: number;
  lng: number;
  district: string;
  environment: string;
  gettingAround: { icon: string; title: string; desc: string }[];
  highlights: { name: string; dist: string; icon: string }[];
}

const PROVINCE_LOCATIONS: Record<string, ProvinceLocationData> = {
  'Siem Reap': {
    lat: 13.3633,
    lng: 103.8564,
    district: 'Puok & Prasat Bakong Districts',
    environment: 'Surrounded by historic sugar palms, lotus ponds, and organic rice farms away from the busy town center.',
    gettingAround: [
      { icon: '🛺', title: 'Local Remorque / Tuk-tuk', desc: '30-40 mins from Siem Reap Old Market / Pub Street ($4 - $6)' },
      { icon: '🚲', title: 'Complimentary Bicycles', desc: 'Provided free by host for village riding and visiting local pagodas' },
      { icon: '🚗', title: 'Free Private Parking', desc: 'Spacious on-site parking for motorbikes and personal vehicles' },
      { icon: '🚐', title: 'Host Station Transfer', desc: 'Pickup from Siem Reap bus station or airport can be arranged upon request' }
    ],
    highlights: [
      { name: 'Angkor Wat Archaeological Park', dist: '18 km', icon: '🏛️' },
      { name: 'West Baray Reservoir & Lake', dist: '7 km', icon: '🌊' },
      { name: 'Puok Traditional Silk Farm', dist: '9 km', icon: '🧵' },
      { name: 'Tonle Sap Floating Village', dist: '21 km', icon: '🛶' }
    ]
  },
  'Kampot': {
    lat: 10.6104,
    lng: 104.1815,
    district: 'Tuek Chhou & Bokor Foothills',
    environment: 'Nestled between limestone mountains, lush fruit orchards, and the tranquil Kampot River.',
    gettingAround: [
      { icon: '🛵', title: 'Motorbike & Tuk-tuk', desc: '15-20 mins ride from Kampot Old Town & Durian Roundabout ($3 - $5)' },
      { icon: '🛶', title: 'Riverside Access', desc: 'Kayaks and river swimming spots right within walking distance' },
      { icon: '🚗', title: 'Secure On-Site Parking', desc: 'Free covered parking available for guests' },
      { icon: '🚲', title: 'Bicycle Touring', desc: 'Scenic flat rural roads ideal for exploring pepper farms' }
    ],
    highlights: [
      { name: 'Bokor National Park & Mountain', dist: '16 km', icon: '⛰️' },
      { name: 'Kampot River Green Loop', dist: '2.5 km', icon: '🌊' },
      { name: 'La Plantation Organic Pepper Farm', dist: '15 km', icon: '🌿' },
      { name: 'Tuek Chhou Natural Rapids', dist: '6 km', icon: '💦' }
    ]
  },
  'Mondulkiri': {
    lat: 12.4558,
    lng: 107.1881,
    district: 'Sen Monorom & Pine Forest Valley',
    environment: 'Cool highland climate, rolling green hills, pine trees, and fresh mountain breezes.',
    gettingAround: [
      { icon: '🚙', title: 'Highland Minivan / 4WD', desc: '15 mins from Sen Monorom town center; scooter or 4WD recommended' },
      { icon: '🥾', title: 'Guided Forest Trails', desc: 'Trekking paths through Bunong indigenous lands start right at the stay' },
      { icon: '🚗', title: 'Free Guest Parking', desc: 'Ample space for motorbikes and travel vehicles' },
      { icon: '🏍️', title: 'Local Scooter Hire', desc: 'Host can assist with scooter rentals in town ($8 - $10/day)' }
    ],
    highlights: [
      { name: 'Bousra Mighty Double Waterfall', dist: '28 km', icon: '🌊' },
      { name: 'Elephant Valley Sanctuary', dist: '14 km', icon: '🐘' },
      { name: 'Sea Forest Viewpoint (Samot Chhoeu)', dist: '9 km', icon: '🌲' },
      { name: 'Indigenous Bunong Community Village', dist: '6 km', icon: '🏡' }
    ]
  },
  'Battambang': {
    lat: 13.0957,
    lng: 103.2022,
    district: 'Banan & Sangkae River Valley',
    environment: 'Cambodia’s rice bowl, famous for fertile fruit orchards, wooden stilt houses, and friendly villagers.',
    gettingAround: [
      { icon: '🛺', title: 'City Tuk-tuk', desc: '20-25 mins from Battambang Colonial Central Market ($3 - $4)' },
      { icon: '🚲', title: 'Free Village Bicycles', desc: 'Explore traditional rice paper makers and fruit gardens' },
      { icon: '🚗', title: 'Free On-Site Parking', desc: 'Gated parking on property' },
      { icon: '🚂', title: 'Bamboo Train Proximity', desc: 'Quick 10-minute tuk-tuk to the historic Norry line' }
    ],
    highlights: [
      { name: 'Historic Bamboo Train (Norry)', dist: '7 km', icon: '🚂' },
      { name: 'Phnom Sampov & Bat Cave Sunset', dist: '12 km', icon: '🦇' },
      { name: 'Wat Banan Ancient Temple', dist: '15 km', icon: '🏛️' },
      { name: 'Ek Phnom Ancient Complex', dist: '11 km', icon: '🛕' }
    ]
  },
  'Kep': {
    lat: 10.4829,
    lng: 104.2949,
    district: 'Kep Coast & National Park Foothills',
    environment: 'Coastal countryside where jungle-clad hills meet the Gulf of Thailand with ocean sunsets.',
    gettingAround: [
      { icon: '🛵', title: 'Scooter & Tuk-tuk', desc: '8-10 mins ride to the famous Kep Crab Market and beach' },
      { icon: '🚲', title: 'Bicycle Friendly', desc: 'Breezy coastal roads with minimal vehicle traffic' },
      { icon: '🚤', title: 'Rabbit Island Pier', desc: '12 mins to boat pier for day trips to Koh Tonsay' },
      { icon: '🚗', title: 'Free Parking', desc: 'Private parking on premises' }
    ],
    highlights: [
      { name: 'Kep Crab Market & Seafood Stalls', dist: '2.5 km', icon: '🦀' },
      { name: 'Kep National Park Hiking Trail', dist: '1.8 km', icon: '🌳' },
      { name: 'Koh Tonsay (Rabbit Island) Pier', dist: '4 km', icon: '🏝️' },
      { name: 'Secret Lake Scenic Sunset', dist: '11 km', icon: '🌅' }
    ]
  },
  'Koh Kong': {
    lat: 11.6154,
    lng: 102.9838,
    district: 'Cardamom Mountains & Tatai River',
    environment: 'Pristine rainforest ecosystems, clear river waters, and rich mangrove sanctuaries.',
    gettingAround: [
      { icon: '🚤', title: 'Riverboat Access', desc: 'Homestay accessible by scenic river longtail boat or rural road' },
      { icon: '🚗', title: 'Private Vehicle Access', desc: 'Road access from Koh Kong town (approx. 25 mins)' },
      { icon: '🛶', title: 'River Kayaks', desc: 'Complimentary river kayaks available on site' },
      { icon: '🥾', title: 'Jungle Trekking Guide', desc: 'Guided rainforest walks available through the host' }
    ],
    highlights: [
      { name: 'Tatai River Rapids & Waterfalls', dist: '5 km', icon: '💦' },
      { name: 'Peam Krasaop Mangrove Reserve', dist: '14 km', icon: '🌿' },
      { name: 'Cardamom Rainforest Reserve', dist: '18 km', icon: '🌲' },
      { name: 'Koh Kong Island Beach', dist: '25 km', icon: '🏖️' }
    ]
  },
  'Ratanakiri': {
    lat: 13.7394,
    lng: 106.9873,
    district: 'Banlung Highland & Yeak Laom Plateau',
    environment: 'High volcanic plateaus, emerald crater lakes, rubber plantations, and cascading waterfalls.',
    gettingAround: [
      { icon: '🛵', title: 'Motorbike / Scooter', desc: '15 mins from central Banlung market via red soil roads' },
      { icon: '🚙', title: '4WD Minivan', desc: 'Host can arrange local 4WD taxi for luggage transfer' },
      { icon: '🚗', title: 'Free Parking', desc: 'Spacious on-site parking' },
      { icon: '🥾', title: 'Crater Lake Walks', desc: 'Direct trail connections to the nature reserve' }
    ],
    highlights: [
      { name: 'Yeak Laom Volcanic Crater Lake', dist: '4 km', icon: '🌋' },
      { name: 'Ka Chanh Forest Waterfall', dist: '6 km', icon: '💦' },
      { name: 'Cha Ong Jungle Waterfall', dist: '8 km', icon: '🌊' },
      { name: 'Lumphat Wildlife Sanctuary', dist: '25 km', icon: '🦜' }
    ]
  },
  'Preah Vihear': {
    lat: 13.8073,
    lng: 104.9805,
    district: 'Choam Khsant & Dangkrek Foothills',
    environment: 'Ancient cliff landscapes, rural cassava farms, and historic temples along the northern ridge.',
    gettingAround: [
      { icon: '🚙', title: 'Mountain 4WD / Minivan', desc: 'Host can arrange 4WD transport to mountain checkpoints' },
      { icon: '🛵', title: 'Local Motodop', desc: 'Easy motorbike hire for visiting neighboring countryside' },
      { icon: '🚗', title: 'Free Parking', desc: 'Ample on-site parking for all vehicles' },
      { icon: '🚲', title: 'Village Walking', desc: 'Peaceful community paths with minimal traffic' }
    ],
    highlights: [
      { name: 'Preah Vihear Mountain Temple', dist: '22 km', icon: '🛕' },
      { name: 'Koh Ker Pyramid Temple Complex', dist: '46 km', icon: '🏛️' },
      { name: 'Dangkrek Ridge Panoramic View', dist: '20 km', icon: '⛰️' }
    ]
  },
  'Kampong Cham': {
    lat: 11.9934,
    lng: 105.4635,
    district: 'Koh Pen Island & Mekong Riverside',
    environment: 'Fertile Mekong riverbanks, pomelo orchards, and seasonal hand-built bamboo bridges.',
    gettingAround: [
      { icon: '🚲', title: 'Bicycle Across Bamboo Bridge', desc: '15 mins leisurely cycle from Kampong Cham town' },
      { icon: '🛺', title: 'Local Remorque', desc: 'Tuk-tuks available from ferry crossing or bus stop' },
      { icon: '🚗', title: 'Free Parking', desc: 'Secure parking on homestay grounds' },
      { icon: '🚤', title: 'Mekong Riverboat', desc: 'Sunset riverboat trips can be booked with the host' }
    ],
    highlights: [
      { name: 'Koh Pen Seasonal Bamboo Bridge', dist: '2 km', icon: '🎋' },
      { name: 'Wat Nokor Bachey Ancient Shrine', dist: '5 km', icon: '🛕' },
      { name: 'Phnom Hanchey Mekong Cliff Pagoda', dist: '19 km', icon: '🌅' }
    ]
  },
  'Pursat': {
    lat: 12.5388,
    lng: 103.9192,
    district: 'Kravanh & Tonle Sap Foothills',
    environment: 'Bordering the massive Tonle Sap wetlands and the rolling northern Cardamom peaks.',
    gettingAround: [
      { icon: '🛺', title: 'Local Tuk-tuk', desc: '25-30 mins from Pursat Train Station ($4 - $6)' },
      { icon: '🚤', title: 'Wooden Longtail Boat', desc: 'Boat transfers to Kampong Luong floating village' },
      { icon: '🚗', title: 'Free Guest Parking', desc: 'Large gated parking area' },
      { icon: '🚲', title: 'Complimentary Bicycles', desc: 'Perfect for morning village rides' }
    ],
    highlights: [
      { name: 'Kampong Luong Floating Town', dist: '30 km', icon: '🛶' },
      { name: 'Phnom 1500 Scenic Mountain Pass', dist: '42 km', icon: '⛰️' },
      { name: 'Cardamom Foothills Riverbank', dist: '12 km', icon: '🌊' }
    ]
  }
};

const mapProvider = ref<'google' | 'osm'>('google');
const isAddressCopied = ref(false);

const locationDetails = computed<ProvinceLocationData>(() => {
  const prov = currentStay.value?.province || '';
  const baseProv: ProvinceLocationData = PROVINCE_LOCATIONS[prov] || {
    lat: 12.5657,
    lng: 104.9910,
    district: `${prov || 'Rural'} Countryside District`,
    environment: 'Peaceful Cambodian village surrounded by authentic rural landscapes, organic gardens, and friendly local neighbors.',
    gettingAround: [
      { icon: '🛺', title: 'Tuk-tuk & Minivan', desc: `Accessible by local transport from ${prov || 'the provincial'} town center` },
      { icon: '🚲', title: 'Complimentary Bicycles', desc: 'Provided free by host for village riding' },
      { icon: '🚗', title: 'Free Private Parking', desc: 'Spacious on-site parking on premises' },
      { icon: '📞', title: 'Host Assistance', desc: 'Host can assist with local transfers and directions' }
    ],
    highlights: [
      { name: 'Local Village Morning Market', dist: '1.5 km', icon: '🛍️' },
      { name: 'Community Buddhist Pagoda', dist: '2.0 km', icon: '🛕' },
      { name: 'Organic Countryside Farm Trails', dist: '500 m', icon: '🌾' },
      { name: `${prov} Provincial Center`, dist: '12 km', icon: '🏙️' }
    ]
  };

  // Prioritize host-specified district if entered
  const district = currentStay.value?.district?.trim()
    ? currentStay.value.district.trim()
    : baseProv.district;

  // Prioritize host-specified directions if entered
  const gettingAround = [...baseProv.gettingAround];
  if (currentStay.value?.addressDirections?.trim()) {
    gettingAround.unshift({
      icon: '🧭',
      title: 'Host Directions & Transport Tips',
      desc: currentStay.value.addressDirections.trim()
    });
  }

  return {
    ...baseProv,
    district,
    gettingAround
  };
});

const cleanTransportTags = computed(() => {
  const prov = currentStay.value?.province || '';
  const base = PROVINCE_LOCATIONS[prov]?.gettingAround || [
    { icon: '🛺', title: 'Local Remorque / Tuk-tuk' },
    { icon: '🚲', title: 'Complimentary Bicycles' },
    { icon: '🚗', title: 'Free Private Parking' },
  ];
  return base.map((item) => ({
    icon: item.icon,
    title: item.title,
  }));
});

const cleanHighlights = computed(() => {
  const provHighlights = locationDetails.value.highlights || [];

  if (currentStay.value?.nearPlaces && currentStay.value.nearPlaces.length > 0) {
    const list: { name: string; dist: string; icon: string }[] = [];

    for (const raw of currentStay.value.nearPlaces) {
      const str = String(raw).trim();
      if (!str) continue;

      // Extract name and distance if present in brackets or dash e.g. "Angkor Wat (18 km)" or "West Baray - 7 km"
      const match = str.match(/^(.+?)(?:\s*\((.*?)\)|\s*[-–]\s*(.*))$/);
      let name = str;
      let dist = 'Nearby';
      if (match) {
        name = (match[1] || '').trim();
        dist = (match[2] || match[3] || 'Nearby').trim();
      }

      let icon = '📍';
      const lower = name.toLowerCase();
      if (lower.includes('angkor') || lower.includes('temple') || lower.includes('pagoda') || lower.includes('wat') || lower.includes('shrine')) icon = '🏛️';
      else if (lower.includes('baray') || lower.includes('lake') || lower.includes('waterfall') || lower.includes('river') || lower.includes('rapids')) icon = '🌊';
      else if (lower.includes('farm') || lower.includes('pepper') || lower.includes('garden') || lower.includes('silk') || lower.includes('rice')) icon = '🌿';
      else if (lower.includes('market')) icon = '🛍️';
      else if (lower.includes('floating') || lower.includes('boat') || lower.includes('island') || lower.includes('pier')) icon = '🛶';
      else if (lower.includes('mountain') || lower.includes('hill') || lower.includes('pass') || lower.includes('park')) icon = '⛰️';
      else if (lower.includes('cave') || lower.includes('bat')) icon = '🦇';

      list.push({ name, dist, icon });
    }

    // Complement with province highlights if under 4, without duplicates
    for (const ph of provHighlights) {
      if (list.length >= 4) break;
      const phFirst = ph.name.toLowerCase().split(' ')[0] ?? '';
      const already = list.some((item) => {
        const itemFirst = item.name.toLowerCase().split(' ')[0] ?? '';
        return itemFirst === phFirst || item.name.toLowerCase().includes(phFirst);
      });
      if (!already) {
        list.push(ph);
      }
    }
    return list;
  }

  return provHighlights;
});

const googleMapsEmbedUrl = computed(() => {
  if (!currentStay.value) return '';
  const parts = [
    currentStay.value.name,
    currentStay.value.district,
    currentStay.value.province,
    'Cambodia'
  ].filter(Boolean);
  const query = parts.join(', ');
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=m&z=13&ie=UTF8&iwloc=&output=embed`;
});

const openStreetMapEmbedUrl = computed(() => {
  const info = locationDetails.value;
  const dLat = 0.04;
  const dLng = 0.06;
  const minLng = (info.lng - dLng).toFixed(4);
  const minLat = (info.lat - dLat).toFixed(4);
  const maxLng = (info.lng + dLng).toFixed(4);
  const maxLat = (info.lat + dLat).toFixed(4);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${info.lat}%2C${info.lng}`;
});

const currentMapEmbedUrl = computed(() => {
  return mapProvider.value === 'google' ? googleMapsEmbedUrl.value : openStreetMapEmbedUrl.value;
});

const openInGoogleMaps = () => {
  if (!currentStay.value) return;
  const parts = [
    currentStay.value.name,
    currentStay.value.district,
    currentStay.value.province,
    'Cambodia'
  ].filter(Boolean);
  const query = encodeURIComponent(parts.join(', '));
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
};

const copyLocationAddress = () => {
  if (!currentStay.value) return;
  const text = `${currentStay.value.name}, ${locationDetails.value.district}, ${currentStay.value.province}, Cambodia`;
  navigator.clipboard.writeText(text);
  isAddressCopied.value = true;
  setTimeout(() => {
    isAddressCopied.value = false;
  }, 2500);
};

const scrollToLocation = () => {
  const el = document.getElementById('location-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

onMounted(async () => {
  await Promise.all([
    propertyStore.fetchBackendProperties(),
    propertyStore.fetchHomestayReviews(stayId.value),
    propertyStore.fetchMyBookings(),
    propertyStore.fetchMyReviews(),
  ]);
});

watch(stayId, (newId) => {
  if (newId) {
    propertyStore.fetchHomestayReviews(newId);
  }
});
</script>