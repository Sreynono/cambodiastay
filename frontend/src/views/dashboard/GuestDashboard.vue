<template>
  <div class="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
    <!-- Global Website Header -->
    <Header />

    <div class="flex-1 flex min-h-0 overflow-hidden">
      <!-- Mobile Drawer Overlay for < lg -->
      <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden flex">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="isSidebarOpen = false"></div>
        <aside class="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 animate-slide-in">
          <!-- Mobile Drawer Header: User Card -->
          <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-2xl bg-[#113A28] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0 overflow-hidden">
                <img v-if="currentUser?.profilePhoto" :src="currentUser.profilePhoto" class="w-full h-full object-cover" />
                <span v-else>{{ userInitials }}</span>
              </div>
              <div class="min-w-0">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 truncate sidebar-user-name">{{ currentUser?.name || 'Guest User' }}</h3>
                <span class="text-xs sm:text-[12px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-0.5 sidebar-role-badge">
                  {{ t('guestDashboard.title') }}
                </span>
              </div>
            </div>
            <button @click="isSidebarOpen = false" class="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer" aria-label="Close Sidebar">
              ✕
            </button>
          </div>

          <nav class="flex-grow p-4 space-y-1.5 overflow-y-auto">
            <button
              @click="activeTab = 'trips'; isSidebarOpen = false"
              :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn', activeTab === 'trips' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.trips') }}</span>
              <span v-if="myActiveTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'trips' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'">
                {{ myActiveTrips.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'history'; isSidebarOpen = false"
              :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn', activeTab === 'history' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.history') }}</span>
              <span v-if="pastTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'">
                {{ pastTrips.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'inbox'; isSidebarOpen = false"
              :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn', activeTab === 'inbox' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.inbox') }}</span>
              <span v-if="unreadMessagesCount > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'inbox' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'">
                {{ unreadMessagesCount }}
              </span>
            </button>

            <button
              @click="activeTab = 'wishlist'; isSidebarOpen = false"
              :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn', activeTab === 'wishlist' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.wishlist') }}</span>
              <span v-if="savedHomestays.length > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-red-50 text-red-700 border border-red-200'">
                {{ savedHomestays.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'settings'; isSidebarOpen = false"
              :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] mt-4 cursor-pointer dashboard-nav-btn', activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900']"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.settings') }}</span>
            </button>
          </nav>

          <div class="p-4 border-t border-gray-100 space-y-1">
            <RouterLink to="/explore" class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#113A28] hover:bg-gray-50 rounded-xl transition sidebar-footer-link">
              <svg class="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span class="sidebar-footer-text">{{ t('guestDashboard.discoverStays') }}</span>
            </RouterLink>
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer sidebar-footer-btn"
            >
              <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span class="sidebar-footer-text">{{ t('nav.logout') }}</span>
            </button>
          </div>
        </aside>
      </div>

      <!-- Desktop Sidebar Navigation -->
      <aside class="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col shadow-xs z-10 shrink-0">
        <!-- User Profile Card in Sidebar (Clean & Inviting) -->
        <div class="p-5 border-b border-gray-100 flex items-center gap-3.5 bg-white">
          <div class="w-11 h-11 rounded-2xl bg-[#113A28] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0 border border-emerald-900/20 overflow-hidden">
            <img v-if="currentUser?.profilePhoto" :src="currentUser.profilePhoto" class="w-full h-full object-cover" />
            <span v-else>{{ userInitials }}</span>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-sm sm:text-base font-bold text-gray-900 truncate leading-tight sidebar-user-name">{{ currentUser?.name || 'Guest User' }}</h3>
            <span class="inline-flex items-center gap-1.5 text-xs sm:text-[12px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1 sidebar-role-badge">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              {{ t('guestDashboard.title') }}
            </span>
          </div>
        </div>

        <nav class="flex-grow p-4 space-y-2 overflow-y-auto">
          <button
            @click="activeTab = 'trips'"
            :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] group cursor-pointer dashboard-nav-btn', activeTab === 'trips' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900']"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'trips' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.trips') }}</span>
            <span v-if="myActiveTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'trips' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'">
              {{ myActiveTrips.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'history'"
            :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] group cursor-pointer dashboard-nav-btn', activeTab === 'history' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900']"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'history' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.history') }}</span>
            <span v-if="pastTrips.length > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'history' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'">
              {{ pastTrips.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'inbox'"
            :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] group cursor-pointer dashboard-nav-btn', activeTab === 'inbox' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900']"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'inbox' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.inbox') }}</span>
            <span v-if="unreadMessagesCount > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'inbox' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'">
              {{ unreadMessagesCount }}
            </span>
          </button>

          <button
            @click="activeTab = 'wishlist'"
            :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] group cursor-pointer dashboard-nav-btn', activeTab === 'wishlist' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900']"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'wishlist' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.wishlist') }}</span>
            <span v-if="savedHomestays.length > 0" class="text-xs px-2 py-0.5 rounded-full font-bold" :class="activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-red-50 text-red-700 border border-red-200'">
              {{ savedHomestays.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'settings'"
            :class="['w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm sm:text-[15px] mt-4 group cursor-pointer dashboard-nav-btn', activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900']"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'settings' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="flex-1 truncate dashboard-nav-label">{{ t('guestDashboard.settings') }}</span>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-gray-100 space-y-1">
          <RouterLink to="/explore" class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#113A28] hover:bg-gray-50 rounded-xl transition sidebar-footer-link">
            <svg class="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span class="sidebar-footer-text">{{ t('guestDashboard.discoverStays') }}</span>
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer sidebar-footer-btn"
          >
            <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span class="sidebar-footer-text">{{ t('nav.logout') }}</span>
          </button>
        </div>
      </aside>

      <!-- Main Workspace Area -->
      <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        <!-- Mobile Drawer Toggle Bar (Only visible on mobile screens) -->
        <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs">
          <button
            @click="isSidebarOpen = true"
            class="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>{{ t('guestDashboard.title') }}</span>
          </button>
          <span class="text-xs font-bold text-[#113A28]">
            {{
              activeTab === 'trips' ? t('guestDashboard.trips') :
              activeTab === 'history' ? t('guestDashboard.history') :
              activeTab === 'inbox' ? t('guestDashboard.inbox') :
              activeTab === 'wishlist' ? t('guestDashboard.wishlist') :
              t('guestDashboard.settings')
            }}
          </span>
        </div>

        <!-- Scrollable Tab Content Container -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div class="max-w-6xl mx-auto space-y-8">
            <!-- Clear, Inviting Page Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200/60">
              <div>
                <span class="text-[11px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-1.5">
                  {{ t('guestDashboard.title') }}
                </span>
                <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
                  {{
                    activeTab === 'trips' ? t('guestDashboard.trips') :
                    activeTab === 'history' ? t('guestDashboard.history') :
                    activeTab === 'inbox' ? t('guestDashboard.messagesWithHost') :
                    activeTab === 'wishlist' ? t('guestDashboard.wishlist') :
                    t('dashboard.accountSettings')
                  }}
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 mt-1">
                  {{
                    activeTab === 'trips' ? (currentLang === 'km' ? 'គ្រប់គ្រង និងមើលការកក់សកម្មសម្រាប់ដំណើរកម្សាន្តរបស់អ្នក។' : 'Manage and view your upcoming Cambodian homestay reservations.') :
                    activeTab === 'history' ? (currentLang === 'km' ? 'ប្រវត្តិនៃការស្នាក់នៅ និងបទពិសោធន៍ដែលបានបញ្ចប់កន្លងមក។' : 'Your past completed and reviewed homestay stays.') :
                    activeTab === 'inbox' ? (currentLang === 'km' ? 'ការទាក់ទង និងជជែកផ្ទាល់ជាមួយម្ចាស់ផ្ទះស្នាក់ក្នុងស្រុក។' : 'Direct communication with your local homestay hosts.') :
                    activeTab === 'wishlist' ? (currentLang === 'km' ? 'ផ្ទះស្នាក់ដែលអ្នកពេញចិត្ត និងបានរក្សាទុកទូទាំងប្រទេសកម្ពុជា។' : 'Your favorite saved homestays across Cambodia.') :
                    (currentLang === 'km' ? 'កែប្រែព័ត៌មានផ្ទាល់ខ្លួន លេខទូរស័ព្ទ និងលេខសម្ងាត់របស់អ្នក។' : 'Update your personal details, phone number, and credentials.')
                  }}
                </p>
              </div>

              <div v-if="activeTab === 'trips' || activeTab === 'wishlist'">
                <RouterLink
                  to="/explore"
                  class="bg-[#113A28] hover:bg-[#0a261a] text-white px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition shadow-sm hover:shadow flex items-center gap-2 cursor-pointer w-fit"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                  <span>{{ t('guestDashboard.discoverStays') }}</span>
                </RouterLink>
              </div>
            </div>

            <!-- 1. Upcoming Trips Tab -->
            <div v-if="activeTab === 'trips'" class="space-y-6">
              <!-- Summary Metric Cards (Enhanced readability for Khmer & English) -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div @click="activeTab = 'trips'" class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-[#113A28] cursor-pointer hover:shadow-sm transition">
                  <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('guestDashboard.trips') }}</p>
                  <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight my-0.5">{{ myActiveTrips.length }}</h3>
                  <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ currentLang === 'km' ? 'ការកក់សកម្ម' : 'Active bookings' }}</p>
                </div>

                <div @click="activeTab = 'history'" class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-blue-500 cursor-pointer hover:shadow-sm transition">
                  <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('guestDashboard.history') }}</p>
                  <h3 class="text-2xl sm:text-3xl font-bold text-blue-600 leading-tight my-0.5">{{ pastTrips.length }}</h3>
                  <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ currentLang === 'km' ? 'បានបញ្ចប់' : 'Completed stays' }}</p>
                </div>

                <div @click="activeTab = 'wishlist'" class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-amber-500 cursor-pointer hover:shadow-sm transition">
                  <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('guestDashboard.wishlist') }}</p>
                  <h3 class="text-2xl sm:text-3xl font-bold text-amber-600 leading-tight my-0.5">{{ savedHomestays.length }}</h3>
                  <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ currentLang === 'km' ? 'ផ្ទះស្នាក់រក្សាទុក' : 'Saved favorites' }}</p>
                </div>

                <div class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-emerald-500 transition">
                  <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ currentLang === 'km' ? 'ចំណាយសរុប' : 'Total Spent' }}</p>
                  <h3 class="text-2xl sm:text-3xl font-bold text-emerald-800 leading-tight my-0.5">${{ totalSpent.toFixed(2) }}</h3>
                  <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ currentLang === 'km' ? 'លើផ្ទះស្នាក់ទាំងអស់' : 'All homestays' }}</p>
                </div>
              </div>

              <div v-if="myActiveTrips.length === 0" class="space-y-6">
                <!-- Warm & Inviting Empty State Card -->
                <div class="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-sm text-center relative overflow-hidden">
                  <div class="relative z-10 max-w-md mx-auto">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-3xl bg-emerald-50 text-[#113A28] flex items-center justify-center border border-emerald-100 shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {{ t('guestDashboard.noTrips') }}
                    </h3>
                    <p class="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                      {{ t('guestDashboard.noTripsSub') }}
                    </p>

                    <RouterLink
                      to="/explore"
                      class="bg-[#113A28] hover:bg-[#0a261a] text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 group cursor-pointer"
                    >
                      <span>{{ t('guestDashboard.discoverStays') }}</span>
                      <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </RouterLink>
                  </div>
                </div>

                <!-- Popular Countryside Destinations Inspiration -->
                <div class="bg-white/70 backdrop-blur-xs p-6 rounded-3xl border border-gray-200/70">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {{ currentLang === 'km' ? 'គោលដៅទេសចរណ៍ពេញនិយមក្នុងប្រទេសកម្ពុជា' : 'Popular Destinations in Cambodia' }}
                    </h4>
                    <RouterLink to="/explore" class="text-xs font-bold text-[#113A28] hover:underline">
                      {{ currentLang === 'km' ? 'មើលទាំងអស់ →' : 'View All →' }}
                    </RouterLink>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <RouterLink
                      to="/explore?province=Siem Reap"
                      class="p-3.5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-400 hover:shadow-sm transition text-left group cursor-pointer"
                    >
                      <span class="text-sm font-bold text-gray-800 group-hover:text-[#113A28] block truncate">{{ translateProvince('Siem Reap') }}</span>
                      <span class="text-[11px] text-gray-400 font-medium">{{ currentLang === 'km' ? 'ប្រាសាទបុរាណ & វប្បធម៌' : 'Heritage & Temples' }}</span>
                    </RouterLink>

                    <RouterLink
                      to="/explore?province=Kampot"
                      class="p-3.5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-400 hover:shadow-sm transition text-left group cursor-pointer"
                    >
                      <span class="text-sm font-bold text-gray-800 group-hover:text-[#113A28] block truncate">{{ translateProvince('Kampot') }}</span>
                      <span class="text-[11px] text-gray-400 font-medium">{{ currentLang === 'km' ? 'មាត់ព្រែក & ចម្ការម្រេច' : 'Riverside & Farms' }}</span>
                    </RouterLink>

                    <RouterLink
                      to="/explore?province=Mondulkiri"
                      class="p-3.5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-400 hover:shadow-sm transition text-left group cursor-pointer"
                    >
                      <span class="text-sm font-bold text-gray-800 group-hover:text-[#113A28] block truncate">{{ translateProvince('Mondulkiri') }}</span>
                      <span class="text-[11px] text-gray-400 font-medium">{{ currentLang === 'km' ? 'ព្រៃភ្នំ & ទឹកជ្រោះ' : 'Highlands & Nature' }}</span>
                    </RouterLink>

                    <RouterLink
                      to="/explore?province=Koh Kong"
                      class="p-3.5 bg-white rounded-2xl border border-gray-100 hover:border-emerald-400 hover:shadow-sm transition text-left group cursor-pointer"
                    >
                      <span class="text-sm font-bold text-gray-800 group-hover:text-[#113A28] block truncate">{{ translateProvince('Koh Kong') }}</span>
                      <span class="text-[11px] text-gray-400 font-medium">{{ currentLang === 'km' ? 'ព្រៃកោងកាង & ឆ្នេរសមុទ្រ' : 'Mangroves & Coast' }}</span>
                    </RouterLink>
                  </div>
                </div>
              </div>

          <div v-else class="space-y-4 sm:space-y-6 max-w-4xl">
            <div
              v-for="trip in myActiveTrips"
              :key="trip.id"
              class="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
            >
              <div class="flex gap-3 sm:gap-4 items-center w-full sm:w-auto">
                <img
                  v-if="trip.property_image"
                  :src="trip.property_image"
                  class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0"
                />
                <div v-else class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div class="min-w-0 flex-grow">
                  <span
                    :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1',
                      (trip.status === 'approved' || trip.status === 'confirmed') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    ]"
                  >
                    {{ (trip.status === 'approved' || trip.status === 'confirmed') ? t('guestDashboard.statusConfirmed') : t('guestDashboard.statusPending') }}
                  </span>
                  <h3 class="text-base sm:text-lg font-bold text-gray-900 truncate">{{ trip.property_name }}</h3>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ translateProvince(trip.province) }}</span>
                  </p>
                  <p class="text-xs text-gray-700 font-medium mt-1">
                    {{ trip.check_in_date }} → {{ trip.check_out_date }} ({{ trip.guests_count }} {{ t('common.guests') }})
                  </p>
                </div>
              </div>

              <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <span class="text-lg sm:text-xl font-bold text-[#113A28]">${{ trip.total_price }}</span>
                <div class="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  <button
                    type="button"
                    @click="openVoucherModal(trip)"
                    class="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#113A28] border border-emerald-200/80 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#113A28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Voucher</span>
                  </button>
                  <RouterLink
                    :to="`/homestay/${trip.property_id}`"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
                  >
                    {{ t('common.details') }}
                  </RouterLink>
                  <button
                    @click="openRateModal(trip)"
                    :class="[
                      'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
                      getBookingReview(trip.id)
                        ? 'bg-gray-100 hover:bg-gray-200 text-black border border-gray-300'
                        : 'bg-black hover:bg-gray-800 text-white shadow-sm'
                    ]"
                  >
                    <span v-if="getBookingReview(trip.id)">★ {{ getBookingReview(trip.id)?.rating }}/5 ({{ t('common.edit') }})</span>
                    <span v-else>★ {{ t('guestDashboard.rateStay') }}</span>
                  </button>
                  <button
                    v-if="trip.status === 'pending'"
                    @click="cancelTrip(trip.id)"
                    class="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    {{ t('guestDashboard.cancelStay') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Past Trips History Tab -->
        <div v-if="activeTab === 'history'">
          <div v-if="pastTrips.length === 0" class="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-2xl mx-auto mt-10">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">{{ t('guestDashboard.noHistory') }}</h3>
            <p class="text-gray-500 text-sm">{{ t('guestDashboard.noHistorySub') }}</p>
          </div>
          <div v-else class="space-y-4 max-w-4xl">
            <div
              v-for="trip in pastTrips"
              :key="trip.id"
              class="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
            >
              <div class="flex gap-4 items-center">
                <img
                  v-if="trip.property_image"
                  :src="trip.property_image"
                  class="w-20 h-20 rounded-2xl object-cover"
                />
                <div v-else class="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <span
                    :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full',
                      trip.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ trip.status === 'completed' ? t('guestDashboard.statusCompleted') : trip.status === 'cancelled' ? t('guestDashboard.statusCancelled') : trip.status }}
                  </span>
                  <h4 class="font-bold text-base text-gray-900 mt-1">{{ trip.property_name }}</h4>
                  <p class="text-xs text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ translateProvince(trip.province) }}</span>
                  </p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ trip.check_in_date }} → {{ trip.check_out_date }}</p>
                </div>
              </div>

              <div class="flex flex-col items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <span class="text-lg font-bold text-[#113A28]">${{ trip.total_price }}</span>
                <div class="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  <button
                    type="button"
                    @click="openVoucherModal(trip)"
                    class="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#113A28] border border-emerald-200/80 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-[#113A28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Voucher</span>
                  </button>
                  <RouterLink
                    :to="`/homestay/${trip.property_id}`"
                    class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
                  >
                    {{ t('common.viewStay') }}
                  </RouterLink>
                  <button
                    v-if="trip.status === 'completed' || trip.status === 'confirmed'"
                    @click="openRateModal(trip)"
                    :class="[
                      'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
                      getBookingReview(trip.id)
                        ? 'bg-gray-100 hover:bg-gray-200 text-black border border-gray-300'
                        : 'bg-black hover:bg-gray-800 text-white shadow-sm'
                    ]"
                  >
                    <span v-if="getBookingReview(trip.id)">★ {{ getBookingReview(trip.id)?.rating }}/5 ({{ t('common.edit') }})</span>
                    <span v-else>★ {{ t('guestDashboard.rateStay') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Messages Inbox Tab -->
        <div v-if="activeTab === 'inbox'" class="h-[calc(100vh-190px)] min-h-[520px]">
          <ChatInbox />
        </div>

        <!-- 4. Wishlist Tab -->
        <div v-if="activeTab === 'wishlist'">
          <div v-if="savedHomestays.length === 0" class="bg-white p-12 rounded-3xl border border-gray-100 text-center max-w-2xl mx-auto mt-10">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">{{ t('guestDashboard.emptyWishlist') }}</h3>
            <p class="text-gray-400 text-sm mb-6">{{ t('guestDashboard.emptyWishlistSub') }}</p>
            <RouterLink to="/explore" class="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-800 transition shadow inline-block">
              {{ t('guestDashboard.exploreStays') }}
            </RouterLink>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div
              v-for="stay in savedHomestays"
              :key="stay.id"
              class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 group cursor-pointer hover:shadow-md transition flex flex-col justify-between"
              @click="$router.push(`/homestay/${stay.id}`)"
            >
              <div class="relative h-48">
                <img :src="stay.coverPhotoUrl" :alt="stay.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <button
                  @click.stop="propertyStore.toggleWishlist(stay.id)"
                  class="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow text-red-500 hover:scale-110 active:scale-95 transition flex items-center justify-center cursor-pointer"
                  title="Remove from saved"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500 fill-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-center mb-2 gap-2">
                  <h4 class="font-bold text-gray-900 group-hover:text-[#113A28] transition truncate line-clamp-1 flex-1 min-w-0" :title="stay.name">{{ stay.name }}</h4>
                  <div class="flex items-center gap-1 text-xs font-bold text-gray-800 shrink-0 ml-2">
                    <span class="text-[#FFA025]">★</span> {{ stay.rating || 5.0 }}
                  </div>
                </div>
                <p class="text-xs text-gray-500 mb-3 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ translateProvince(stay.province) }}</span>
                </p>
                <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span class="text-xs text-gray-400">{{ t('common.from') || 'From' }}</span>
                  <span class="font-bold text-[#113A28] text-sm">${{ stay.price }} <span class="text-xs font-normal text-gray-500">{{ t('common.perNight') }}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Profile Settings Tab -->
        <div v-if="activeTab === 'settings'">
          <ProfileSettings />
        </div>
      </div>
      </div>
    </main>
    </div>

    <!-- Rate Homestay Modal -->
    <RateHomestayModal
      :isOpen="isRateModalOpen"
      :booking="selectedTripForRating"
      :existingReview="selectedTripForRating ? getBookingReview(selectedTripForRating.id) : null"
      @close="isRateModalOpen = false"
      @reviewSubmitted="onReviewSubmitted"
    />

    <!-- Booking Voucher Modal -->
    <BookingVoucherModal
      v-if="isVoucherModalOpen && selectedTripForVoucher"
      :isOpen="isVoucherModalOpen"
      :booking="selectedTripForVoucher"
      :homestay="selectedHomestayForVoucher"
      @close="isVoucherModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import Header from '@/components/common/Header.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePropertyStore, type Booking, type ReviewData } from '@/stores/usePropertyStore';
import { useMessageStore } from '@/stores/useMessageStore';
import ChatInbox from '@/components/chat/ChatInbox.vue';
import ProfileSettings from './shared/ProfileSettings.vue';
import RateHomestayModal from '@/components/RateHomestayModal.vue';
import BookingVoucherModal from '@/components/booking/BookingVoucherModal.vue';
import { showConfirm } from '@/composables/useConfirmDialog';
import { useI18n } from '@/composables/useI18n';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const propertyStore = usePropertyStore();
const messageStore = useMessageStore();
const { t, translateProvince, currentLang } = useI18n();

const unreadMessagesCount = messageStore.unreadCount;

const isSidebarOpen = ref(false);
const activeTab = ref<'trips' | 'history' | 'inbox' | 'wishlist' | 'settings'>('trips');
const isRateModalOpen = ref(false);
const selectedTripForRating = ref<Booking | null>(null);

const isVoucherModalOpen = ref(false);
const selectedTripForVoucher = ref<any>(null);

const selectedHomestayForVoucher = computed(() => {
  if (!selectedTripForVoucher.value) return null;
  return propertyStore.properties.value.find(
    (p) => p.id === selectedTripForVoucher.value.property_id
  );
});

const openVoucherModal = (trip: any) => {
  selectedTripForVoucher.value = trip;
  isVoucherModalOpen.value = true;
};

const currentUser = computed(() => authStore.user.value);
const currentEmail = computed(() => currentUser.value?.email?.toLowerCase());
const currentId = computed(() => currentUser.value?.id);

const userInitials = computed(() => {
  if (currentUser.value?.firstName && currentUser.value?.lastName) {
    return (currentUser.value.firstName.charAt(0) + currentUser.value.lastName.charAt(0)).toUpperCase();
  }
  if (currentUser.value?.name) {
    return currentUser.value.name.substring(0, 2).toUpperCase();
  }
  return 'G';
});

const getBookingReview = (bookingId: number): ReviewData | undefined => {
  return propertyStore.myReviews.value.find((r) => r.booking_id === bookingId);
};

const openRateModal = (trip: Booking) => {
  selectedTripForRating.value = trip;
  isRateModalOpen.value = true;
};

const onReviewSubmitted = async () => {
  await Promise.all([
    propertyStore.fetchMyReviews(),
    propertyStore.fetchMyBookings(),
    propertyStore.fetchBackendProperties(),
  ]);
};

// Real trips filtered ONLY for the current user from MySQL database
const myActiveTrips = computed(() => {
  if (!currentEmail.value && !currentId.value) return [];
  return propertyStore.bookings.value.filter((b) =>
    (b.guest_email?.toLowerCase() === currentEmail.value || b.guest_id === currentId.value) &&
    (b.status === 'pending' || b.status === 'approved' || b.status === 'confirmed')
  );
});

const pastTrips = computed(() => {
  if (!currentEmail.value && !currentId.value) return [];
  return propertyStore.bookings.value.filter((b) =>
    (b.guest_email?.toLowerCase() === currentEmail.value || b.guest_id === currentId.value) &&
    (b.status === 'completed' || b.status === 'cancelled' || b.status === 'rejected')
  );
});

const savedHomestays = computed(() =>
  propertyStore.properties.value.filter((p) => propertyStore.wishlist.value.includes(p.id))
);

const totalSpent = computed(() => {
  return [...myActiveTrips.value, ...pastTrips.value]
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);
});

const cancelTrip = async (bookingId: number) => {
  const confirmed = await showConfirm({
    title: t('dialog.cancelStayTitle'),
    message: t('dialog.cancelStayMessage'),
    type: 'danger',
    confirmText: t('dialog.cancelStayBtn'),
    cancelText: t('dialog.keepStayBtn'),
  });
  if (confirmed) {
    await propertyStore.cancelBooking(bookingId);
    await propertyStore.fetchMyBookings();
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

onMounted(async () => {
  if (!authStore.isLoggedIn.value) {
    router.push('/login');
    return;
  }
  if (route.query.tab === 'inbox') {
    activeTab.value = 'inbox';
  }
  messageStore.fetchUnreadCount();
  await Promise.all([
    propertyStore.fetchBackendProperties(),
    propertyStore.fetchMyBookings(),
    propertyStore.fetchMyReviews(),
  ]);
});
</script>