<template>
  <div class="h-screen bg-[#F8F7F2] flex flex-col overflow-hidden">
    <!-- Global Website Header -->
    <Header />

    <div class="flex-1 flex min-h-0 overflow-hidden">
      <!-- Mobile Drawer for < lg -->
      <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden flex">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="isSidebarOpen = false"></div>
        <aside class="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 animate-slide-in">
          <!-- Mobile Header: Admin Profile Card -->
          <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-2xl bg-[#113A28] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                {{ adminInitials }}
              </div>
              <div class="min-w-0">
                <h3 class="text-sm font-bold text-gray-900 truncate">{{ currentAdminName }}</h3>
                <span class="inline-flex items-center gap-1.5 text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mt-0.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  {{ t('adminDashboard.portalTitle') }}
                </span>
              </div>
            </div>
            <button @click="isSidebarOpen = false" class="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition cursor-pointer" aria-label="Close sidebar">✕</button>
          </div>

          <nav class="flex-grow p-4 space-y-2 overflow-y-auto">
            <button
              @click="activeTab = 'overview'; isSidebarOpen = false"
              :class="[
                'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm cursor-pointer',
                activeTab === 'overview' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span class="flex-1 truncate">{{ t('adminDashboard.overview') }}</span>
            </button>

            <button
              @click="activeTab = 'properties'; isSidebarOpen = false"
              :class="[
                'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm cursor-pointer',
                activeTab === 'properties' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <div class="flex items-center gap-3 truncate">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="truncate">{{ t('adminDashboard.propertyApprovals') }}</span>
              </div>
              <span
                v-if="pendingProperties.length > 0"
                class="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2"
              >
                {{ pendingProperties.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'users'; isSidebarOpen = false"
              :class="[
                'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm cursor-pointer',
                activeTab === 'users' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <div class="flex items-center gap-3 truncate">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span class="truncate">Manage Users</span>
              </div>
              <span
                v-if="liveUsers.length > 0"
                class="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full ml-2"
              >
                {{ liveUsers.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'bookings'; isSidebarOpen = false"
              :class="[
                'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm cursor-pointer',
                activeTab === 'bookings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <div class="flex items-center gap-3 truncate">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                <span class="truncate">{{ t('adminDashboard.liveBookings') }}</span>
              </div>
              <span
                v-if="liveBookings.length > 0"
                class="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full ml-2"
              >
                {{ liveBookings.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'support'; isSidebarOpen = false"
              :class="[
                'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm cursor-pointer',
                activeTab === 'support' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span class="flex-1 truncate">{{ t('adminDashboard.supportTickets') }}</span>
            </button>

            <button
              @click="activeTab = 'settings'; isSidebarOpen = false"
              :class="[
                'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm mt-4 cursor-pointer',
                activeTab === 'settings' ? 'bg-[#113A28] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span class="flex-1 truncate">{{ t('adminDashboard.adminProfile') }}</span>
            </button>
          </nav>

          <div class="p-4 border-t border-gray-100 space-y-1">
            <RouterLink
              to="/explore"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
            >
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span>{{ t('dashboard.viewWebsite') }}</span>
            </RouterLink>
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
            >
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>{{ t('nav.logout') }}</span>
            </button>
          </div>
        </aside>
      </div>

      <!-- Desktop Sidebar Navigation -->
      <aside class="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col shadow-xs z-10 shrink-0">
        <!-- Admin Profile Card in Sidebar -->
        <div class="p-5 border-b border-gray-100 flex items-center gap-3.5 bg-white">
          <div class="w-11 h-11 rounded-2xl bg-[#113A28] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            {{ adminInitials }}
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-gray-900 truncate leading-tight">{{ currentAdminName }}</h3>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              {{ t('adminDashboard.portalTitle') }}
            </span>
          </div>
        </div>

        <nav class="flex-grow p-4 space-y-2 overflow-y-auto">
          <button
            @click="activeTab = 'overview'"
            :class="[
              'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm group cursor-pointer',
              activeTab === 'overview'
                ? 'bg-[#113A28] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            ]"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'overview' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span class="flex-1 truncate">{{ t('adminDashboard.overview') }}</span>
          </button>

          <button
            @click="activeTab = 'properties'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm group cursor-pointer',
              activeTab === 'properties'
                ? 'bg-[#113A28] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'properties' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="truncate">{{ t('adminDashboard.propertyApprovals') }}</span>
            </div>
            <span
              v-if="pendingProperties.length > 0"
              class="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2"
            >
              {{ pendingProperties.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'users'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm group cursor-pointer',
              activeTab === 'users'
                ? 'bg-[#113A28] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'users' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span class="truncate">Manage Users</span>
            </div>
            <span
              v-if="liveUsers.length > 0"
              class="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full ml-2"
            >
              {{ liveUsers.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'bookings'"
            :class="[
              'w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm group cursor-pointer',
              activeTab === 'bookings'
                ? 'bg-[#113A28] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'bookings' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
              <span class="truncate">{{ t('adminDashboard.liveBookings') }}</span>
            </div>
            <span
              v-if="liveBookings.length > 0"
              class="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full ml-2"
            >
              {{ liveBookings.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'support'"
            :class="[
              'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm group cursor-pointer',
              activeTab === 'support'
                ? 'bg-[#113A28] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            ]"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'support' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span class="flex-1 truncate">{{ t('adminDashboard.supportTickets') }}</span>
          </button>

          <button
            @click="activeTab = 'settings'"
            :class="[
              'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-semibold transition-all text-left text-sm mt-4 group cursor-pointer',
              activeTab === 'settings'
                ? 'bg-[#113A28] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
            ]"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeTab === 'settings' ? 'text-white' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span class="flex-1 truncate">{{ t('adminDashboard.adminProfile') }}</span>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-gray-100 space-y-1">
          <RouterLink
            to="/explore"
            class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-gray-700 hover:text-[#113A28] hover:bg-gray-50 rounded-xl transition"
          >
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span>{{ t('dashboard.viewWebsite') }}</span>
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>{{ t('nav.logout') }}</span>
          </button>
        </div>
      </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8F7F2]">
      <!-- Mobile Drawer Toggle Bar (Only visible on mobile screens) -->
      <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          @click="isSidebarOpen = true"
          class="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>{{ t('adminDashboard.portalTitle') }}</span>
        </button>
        <span class="text-xs font-bold text-[#113A28]">
          {{
            activeTab === 'overview'
              ? t('adminDashboard.overview')
              : activeTab === 'properties'
                ? t('adminDashboard.propertyApprovals')
                : activeTab === 'users'
                  ? 'Manage Users'
                  : activeTab === 'bookings'
                    ? t('adminDashboard.liveBookings')
                    : activeTab === 'support'
                      ? t('adminDashboard.supportTickets')
                      : t('adminDashboard.adminProfile')
          }}
        </span>
      </div>

      <!-- Toast Feedback Banner -->
      <div
        v-if="toastMessage"
        class="fixed top-20 right-4 sm:right-8 z-50 bg-[#113A28] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-emerald-700 text-xs sm:text-sm animate-bounce max-w-[90vw]"
      >
        <span>✓</span>
        <span class="font-medium truncate">{{ toastMessage }}</span>
      </div>

      <!-- Dynamic Tab Content Area -->
      <div class="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <div class="max-w-6xl mx-auto space-y-8">
          <!-- Clear, Inviting Page Header -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200/60">
            <div>
              <span class="text-[11px] font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-1.5">
                {{ t('adminDashboard.portalTitle') }}
              </span>
              <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
                {{
                  activeTab === 'overview'
                    ? 'Platform Overview'
                    : activeTab === 'users'
                      ? 'User Moderation'
                      : activeTab === 'properties'
                        ? t('adminDashboard.propertyApprovals')
                        : activeTab === 'bookings'
                          ? t('adminDashboard.liveBookings')
                          : activeTab === 'support'
                            ? t('adminDashboard.supportTickets')
                            : t('adminDashboard.adminProfile')
                }}
              </h1>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Live Database Connected • Port 3000
              </p>
            </div>

            <button
              @click="refreshAllData"
              :disabled="isLoading"
              class="px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold rounded-2xl border border-gray-200 transition shadow-xs flex items-center gap-2 cursor-pointer w-fit"
              title="Refresh data from server"
            >
              <span :class="{ 'animate-spin': isLoading }">↻</span>
              <span>Refresh Live Data</span>
            </button>
          </div>
        <!-- 1. Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <!-- Stat Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-500 cursor-pointer hover:shadow transition"
              @click="activeTab = 'properties'; propertyFilter = 'pending'"
            >
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Pending Reviews
              </p>
              <h3 class="text-3xl font-bold text-amber-600">{{ pendingProperties.length }}</h3>
              <p class="text-xs text-gray-400 mt-1">Require admin approval</p>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-emerald-500 cursor-pointer hover:shadow transition"
              @click="activeTab = 'properties'; propertyFilter = 'approved'"
            >
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Live Approved Stays
              </p>
              <h3 class="text-3xl font-bold text-emerald-700">{{ approvedProperties.length }}</h3>
              <p class="text-xs text-gray-400 mt-1">Visible to travelers</p>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-500 cursor-pointer hover:shadow transition"
              @click="activeTab = 'users'"
            >
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Registered Users
              </p>
              <h3 class="text-3xl font-bold text-blue-600">{{ liveUsers.length }}</h3>
              <p class="text-xs text-gray-400 mt-1">Active MySQL accounts</p>
            </div>

            <div
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#113A28] cursor-pointer hover:shadow transition"
              @click="activeTab = 'bookings'"
            >
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Total Bookings
              </p>
              <h3 class="text-3xl font-bold text-[#113A28]">{{ liveBookings.length }}</h3>
              <p class="text-xs text-gray-400 mt-1">Recorded in database</p>
            </div>
          </div>

          <!-- Quick Navigation Banner -->
          <div
            v-if="pendingProperties.length > 0"
            class="bg-[#113A28] text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm"
          >
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-300">Listing Moderation Queue</span>
              <h3 class="text-2xl font-serif font-bold mt-1 mb-2">
                {{ pendingProperties.length }} Homestay{{ pendingProperties.length === 1 ? '' : 's' }} Awaiting Review
              </h3>
              <p class="text-emerald-200 text-xs max-w-xl leading-relaxed">
                Hosts submit properties with place tags, pricing, and landscape information. Review each application to verify authentic Cambodian hospitality before approving it to the public website.
              </p>
            </div>
            <button
              @click="activeTab = 'properties'; propertyFilter = 'pending'"
              class="bg-white text-[#113A28] hover:bg-emerald-50 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow shrink-0"
            >
              Review Properties →
            </button>
          </div>

          <div
            v-else
            class="bg-white border border-emerald-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm"
          >
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Listing Status: All Clear</span>
              <h3 class="text-2xl font-serif font-bold text-gray-900 mt-1 mb-2">
                All Homestay Applications Reviewed
              </h3>
              <p class="text-gray-500 text-xs max-w-xl leading-relaxed">
                There are no pending submissions awaiting review right now. All active host properties have been moderated and published to travelers.
              </p>
            </div>
            <button
              @click="activeTab = 'properties'; propertyFilter = 'approved'"
              class="bg-[#113A28] text-white hover:bg-emerald-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow shrink-0"
            >
              View Live Properties
            </button>
          </div>

          <!-- Quick Recent Tables Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Recent Properties -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-bold text-gray-900 text-base">Recent Homestays</h4>
                <button
                  @click="activeTab = 'properties'"
                  class="text-xs font-bold text-[#113A28] hover:underline"
                >
                  View All ({{ properties.length }}) →
                </button>
              </div>

              <div v-if="properties.length === 0" class="text-center py-8 text-gray-400 text-xs">
                No homestays registered yet.
              </div>
              <div v-else class="space-y-3">
                <div
                  v-for="prop in properties.slice(0, 4)"
                  :key="prop.id"
                  class="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                >
                  <div class="flex items-center gap-3">
                    <img
                      v-if="prop.coverPhotoUrl"
                      :src="prop.coverPhotoUrl"
                      class="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <div v-else class="w-12 h-12 rounded-lg bg-black flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h5 class="text-sm font-bold text-gray-900 leading-tight">{{ prop.name }}</h5>
                      <p class="text-xs text-gray-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{{ prop.province }} • ${{ prop.price }}/night</span>
                      </p>
                    </div>
                  </div>
                  <span
                    :class="[
                      'text-[11px] font-bold px-2.5 py-1 rounded-full',
                      prop.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : prop.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ prop.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Recent Bookings -->
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-bold text-gray-900 text-base">Recent Bookings</h4>
                <button
                  @click="activeTab = 'bookings'"
                  class="text-xs font-bold text-[#113A28] hover:underline"
                >
                  View All ({{ liveBookings.length }}) →
                </button>
              </div>

              <div v-if="liveBookings.length === 0" class="text-center py-8 text-gray-400 text-xs">
                No platform bookings recorded yet.
              </div>
              <div v-else class="space-y-3">
                <div
                  v-for="booking in liveBookings.slice(0, 4)"
                  :key="booking.id"
                  class="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                >
                  <div>
                    <h5 class="text-sm font-bold text-gray-900 leading-tight">{{ booking.property_name }}</h5>
                    <p class="text-xs text-gray-500">Guest: {{ booking.guest_name || booking.guest_email }}</p>
                    <p class="text-[11px] text-gray-400">{{ booking.check_in_date }} → {{ booking.check_out_date }}</p>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-bold text-[#113A28] block">${{ booking.total_price }}</span>
                    <span
                      :class="[
                        'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-1',
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : booking.status === 'confirmed' || booking.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      ]"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Property Approvals Tab -->
        <div v-if="activeTab === 'properties'" class="space-y-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Homestay Listing Moderation</h3>
              <p class="text-xs text-gray-500 mt-0.5">Live listings synced with backend MySQL database.</p>
            </div>

            <!-- Server Sync Control -->
            <div class="flex items-center gap-2">
              <button
                @click="refreshProperties"
                :disabled="isLoading"
                class="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5"
                title="Fetch latest properties from database"
              >
                <span :class="{ 'animate-spin': isLoading }">↻</span> Refresh Listings
              </button>
            </div>
          </div>

          <!-- Filter Sub-Tabs -->
          <div class="flex border-b border-gray-200 gap-6 text-sm font-bold">
            <button
              @click="propertyFilter = 'pending'"
              :class="[
                'pb-3 border-b-2 transition flex items-center gap-2',
                propertyFilter === 'pending' ? 'border-[#113A28] text-[#113A28]' : 'border-transparent text-gray-400 hover:text-gray-600'
              ]"
            >
              <span>Pending Reviews</span>
              <span class="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">{{ pendingProperties.length }}</span>
            </button>
            <button
              @click="propertyFilter = 'approved'"
              :class="[
                'pb-3 border-b-2 transition flex items-center gap-2',
                propertyFilter === 'approved' ? 'border-[#113A28] text-[#113A28]' : 'border-transparent text-gray-400 hover:text-gray-600'
              ]"
            >
              <span>Live Approved Stays</span>
              <span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">{{ approvedProperties.length }}</span>
            </button>
            <button
              @click="propertyFilter = 'all'"
              :class="[
                'pb-3 border-b-2 transition flex items-center gap-2',
                propertyFilter === 'all' ? 'border-[#113A28] text-[#113A28]' : 'border-transparent text-gray-400 hover:text-gray-600'
              ]"
            >
              <span>All Properties</span>
              <span class="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">{{ properties.length }}</span>
            </button>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredPropertyList.length === 0"
            class="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-200"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-black shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h4 class="font-bold text-gray-800 text-base mb-1">
              {{ propertyFilter === 'pending' ? 'No pending applications right now!' : 'No properties in this category.' }}
            </h4>
            <p class="text-xs text-gray-500 max-w-sm mx-auto mb-4">
              {{ propertyFilter === 'pending' ? 'All host listing submissions have been reviewed and approved.' : 'There are currently no homestays in this filter category.' }}
            </p>
          </div>

          <!-- Property Cards Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="prop in filteredPropertyList"
              :key="prop.id"
              class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div class="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    v-if="prop.coverPhotoUrl"
                    :src="prop.coverPhotoUrl"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-black flex flex-col items-center justify-center text-white p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mb-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="font-serif font-bold text-xs text-white">{{ prop.name }}</span>
                  </div>
                  <!-- Status Tag -->
                  <span
                    :class="[
                      'absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm',
                      prop.status === 'Approved' ? 'bg-emerald-600 text-white' : prop.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-red-600 text-white'
                    ]"
                  >
                    {{ prop.status === 'Approved' ? '✓ Live' : prop.status === 'Pending' ? 'Review Needed' : '✕ Rejected' }}
                  </span>

                  <!-- Landscape Tag -->
                  <span class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[#113A28] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {{ prop.landscape || prop.category }}
                  </span>
                </div>

                <div class="p-5">
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="font-bold text-base text-gray-900 leading-tight">{{ prop.name }}</h4>
                    <span class="text-sm font-bold text-[#113A28] whitespace-nowrap">${{ prop.price }}/night</span>
                  </div>

                  <p class="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ prop.province }}, Cambodia</span>
                  </p>

                  <div class="bg-gray-50 rounded-xl p-2.5 mb-3 text-xs space-y-1">
                    <p class="text-gray-700"><strong>Host:</strong> {{ prop.hostName || 'Host Member' }}</p>
                    <p class="text-gray-500 truncate"><strong>Email:</strong> {{ prop.hostEmail || 'host@camstay.com' }}</p>
                  </div>

                  <!-- Nearby Places -->
                  <div v-if="prop.nearPlaces && prop.nearPlaces.length > 0" class="flex flex-wrap gap-1 mb-3">
                    <span
                      v-for="(place, pIdx) in prop.nearPlaces"
                      :key="pIdx"
                      class="text-[10px] font-medium bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-100"
                    >
                      near {{ place }}
                    </span>
                  </div>

                  <p class="text-xs text-gray-600 line-clamp-2">{{ prop.description || 'Authentic rural Cambodian homestay experience.' }}</p>
                </div>
              </div>

              <!-- Admin Action Buttons -->
              <div class="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                <button
                  v-if="prop.status !== 'Approved'"
                  @click="approve(prop.id, prop.name)"
                  class="flex-1 bg-[#113A28] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#0a261a] transition shadow-sm"
                >
                  ✓ Approve & Publish
                </button>
                <button
                  v-if="prop.status === 'Approved'"
                  @click="revoke(prop.id, prop.name)"
                  class="flex-1 bg-amber-50 text-amber-700 text-xs font-bold py-2.5 rounded-xl hover:bg-amber-100 transition"
                >
                  Revoke Live
                </button>
                <button
                  v-if="prop.status === 'Pending'"
                  @click="reject(prop.id, prop.name)"
                  class="bg-red-50 text-red-600 text-xs font-bold py-2.5 px-3 rounded-xl hover:bg-red-100 transition"
                >
                  Reject
                </button>
                <button
                  @click="removeProperty(prop.id, prop.name)"
                  class="text-gray-500 hover:text-black text-xs font-bold py-2.5 px-3 hover:bg-gray-200 rounded-xl transition"
                  title="Delete Listing"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. User Moderation Tab -->
        <div v-if="activeTab === 'users'" class="space-y-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">User Moderation & Access Control</h3>
              <p class="text-xs text-gray-500 mt-0.5">Manage live registered accounts and roles stored in MySQL.</p>
            </div>
            <button
              @click="fetchLiveUsers"
              :disabled="isLoading"
              class="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5"
            >
              <span :class="{ 'animate-spin': isLoading }">↻</span> Refresh Users
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <!-- Search Bar -->
            <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center gap-4">
              <div class="relative w-full max-w-md">
                <span class="absolute inset-y-0 left-3 flex items-center text-black text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  v-model="userSearchQuery"
                  placeholder="Search users by name, email, or role..."
                  class="pl-8 pr-4 py-2 w-full rounded-xl border border-gray-200 outline-none focus:border-[#113A28] text-xs bg-white"
                />
              </div>
              <span class="text-xs font-semibold text-gray-500">
                Total: {{ filteredUsers.length }} User{{ filteredUsers.length === 1 ? '' : 's' }}
              </span>
            </div>

            <!-- Users Table -->
            <div class="overflow-x-auto">
              <table class="w-full min-w-[650px] text-left border-collapse text-sm">
                <thead>
                  <tr class="text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
                    <th class="p-4 font-bold border-b border-gray-100">User Profile</th>
                    <th class="p-4 font-bold border-b border-gray-100">Role</th>
                    <th class="p-4 font-bold border-b border-gray-100">Status</th>
                    <th class="p-4 font-bold border-b border-gray-100">Registered</th>
                    <th class="p-4 font-bold border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-if="filteredUsers.length === 0">
                    <td colspan="5" class="p-8 text-center text-gray-400 text-xs">
                      No users matching your search criteria.
                    </td>
                  </tr>
                  <tr
                    v-for="user in filteredUsers"
                    :key="user.id || user.user_id"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-emerald-100 text-[#113A28] font-bold text-xs flex items-center justify-center">
                          {{ getUserInitials(user) }}
                        </div>
                        <div>
                          <p class="font-bold text-gray-900 leading-tight">
                            {{ user.full_name || user.name || 'Registered User' }}
                            <span class="text-[10px] text-gray-400 font-normal ml-1">#{{ user.id || user.user_id }}</span>
                          </p>
                          <p class="text-xs text-gray-500">{{ user.email }}</p>
                          <p v-if="user.phone || user.phone_number" class="text-[10px] text-gray-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{{ user.phone || user.phone_number }}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Role Changer -->
                    <td class="p-4">
                      <select
                        :value="user.role"
                        @change="(e: any) => changeUserRole(Number(user.id || user.user_id || 0), e.target.value, user.email)"
                        class="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 outline-none focus:border-[#113A28] bg-white cursor-pointer"
                        :class="[
                          user.role === 'admin' ? 'text-purple-700 font-bold' : user.role === 'host' ? 'text-blue-700 font-bold' : 'text-gray-700'
                        ]"
                      >
                        <option value="guest">Guest</option>
                        <option value="host">Host</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td class="p-4">
                      <span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span> Active
                      </span>
                    </td>

                    <td class="p-4 text-xs text-gray-500">
                      {{ formatDate(user.created_at) }}
                    </td>

                    <td class="p-4 text-right space-x-2">
                      <button
                        v-if="!isSelfAdmin(user)"
                        @click="deleteUserAccount(Number(user.id || user.user_id || 0), user.full_name || user.name || user.email)"
                        class="text-gray-700 hover:text-black hover:bg-gray-100 px-2.5 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1 border border-gray-200"
                        title="Delete User"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                      <span v-else class="text-[11px] font-bold text-gray-400 px-2 py-1 bg-gray-100 rounded-lg">
                        Current Admin
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 4. Platform Bookings Moderation Tab -->
        <div v-if="activeTab === 'bookings'" class="space-y-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">All Platform Reservations</h3>
              <p class="text-xs text-gray-500 mt-0.5">Real-time reservations recorded across all homestays.</p>
            </div>
            <button
              @click="fetchLiveBookings"
              :disabled="isLoading"
              class="bg-white border border-gray-300 text-gray-700 px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5"
            >
              <span :class="{ 'animate-spin': isLoading }">↻</span> Refresh Bookings
            </button>
          </div>

          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <!-- Search and Filter Bar -->
            <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center gap-4">
              <div class="relative w-full max-w-md">
                <span class="absolute inset-y-0 left-3 flex items-center text-black text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  v-model="bookingSearchQuery"
                  placeholder="Search bookings by homestay, guest, or status..."
                  class="pl-8 pr-4 py-2 w-full rounded-xl border border-gray-200 outline-none focus:border-[#113A28] text-xs bg-white"
                />
              </div>
              <span class="text-xs font-semibold text-gray-500">
                Total: {{ filteredBookings.length }} Reservation{{ filteredBookings.length === 1 ? '' : 's' }}
              </span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full min-w-[700px] text-left border-collapse text-sm">
                <thead>
                  <tr class="text-gray-500 text-xs uppercase tracking-wider bg-gray-50">
                    <th class="p-4 font-bold border-b border-gray-100">Homestay</th>
                    <th class="p-4 font-bold border-b border-gray-100">Guest</th>
                    <th class="p-4 font-bold border-b border-gray-100">Dates</th>
                    <th class="p-4 font-bold border-b border-gray-100">Total Price</th>
                    <th class="p-4 font-bold border-b border-gray-100">Status</th>
                    <th class="p-4 font-bold border-b border-gray-100 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-if="filteredBookings.length === 0">
                    <td colspan="6" class="p-8 text-center text-gray-400 text-xs">
                      No reservations matching your search criteria.
                    </td>
                  </tr>
                  <tr
                    v-for="booking in filteredBookings"
                    :key="booking.id || booking.booking_id"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="p-4">
                      <p class="font-bold text-gray-900 leading-tight">{{ booking.property_name }}</p>
                      <p class="text-xs text-gray-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{{ booking.province || 'Cambodia' }}</span>
                      </p>
                    </td>

                    <td class="p-4">
                      <p class="font-bold text-gray-800 text-xs">{{ booking.guest_name || 'Traveler' }}</p>
                      <p class="text-xs text-gray-500">{{ booking.guest_email }}</p>
                    </td>

                    <td class="p-4 text-xs text-gray-600">
                      <p class="font-medium">{{ booking.check_in_date }}</p>
                      <p class="text-gray-400">to {{ booking.check_out_date }}</p>
                    </td>

                    <td class="p-4 font-bold text-[#113A28] text-sm">
                      ${{ booking.total_price }}
                    </td>

                    <td class="p-4">
                      <span
                        :class="[
                          'text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block',
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : booking.status === 'confirmed' || booking.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        ]"
                      >
                        {{ booking.status }}
                      </span>
                    </td>

                    <td class="p-4 text-right space-x-2">
                      <button
                        v-if="booking.status === 'pending'"
                        @click="moderateBooking(Number(booking.id || booking.booking_id || 0), 'approved')"
                        class="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-bold transition"
                      >
                        ✓ Confirm
                      </button>
                      <button
                        v-if="booking.status !== 'cancelled' && booking.status !== 'completed'"
                        @click="moderateBooking(Number(booking.id || booking.booking_id || 0), 'cancelled')"
                        class="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-xs font-bold transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 5. Support Tickets Tab -->
        <div v-if="activeTab === 'support'">
          <div class="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-lg mx-auto">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-black shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a3 3 0 003 3h1a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1zm18 0a3 3 0 01-3 3h-1a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1z" />
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 text-lg mb-2">No Active Support Tickets</h4>
            <p class="text-gray-500 text-xs leading-relaxed">
              All traveler and homestay host communications are currently up to date. Direct support tickets submitted through the platform helpdesk will appear here for admin review.
            </p>
          </div>
        </div>

        <!-- 6. Admin Profile Settings Tab -->
        <div v-if="activeTab === 'settings'">
          <ProfileSettings />
        </div>
      </div>
      </div>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Header from '@/components/common/Header.vue'
import { usePropertyStore, type Homestay } from '@/stores/usePropertyStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { getAdminToken } from '@/utils/adminAuth'
import { API_BASE_URL } from '@/config/api'
import ProfileSettings from './shared/ProfileSettings.vue'
import { showConfirm, showAlert } from '@/composables/useConfirmDialog'
import { useI18n } from '@/composables/useI18n'

const { t, translateProvince } = useI18n()

interface LiveUser {
  id: number;
  user_id?: number;
  name?: string;
  full_name?: string;
  email: string;
  role: 'guest' | 'host' | 'admin' | string;
  status?: string;
  phone?: string;
  phone_number?: string;
  created_at?: string;
}

interface LiveBooking {
  id: number;
  booking_id?: number;
  property_id: number;
  homestay_id?: number;
  property_name: string;
  property_image?: string;
  province?: string;
  guest_id: number;
  guest_name?: string;
  guest_email?: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: 'pending' | 'approved' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
}

const router = useRouter()
const authStore = useAuthStore()
const propertyStore = usePropertyStore()

const { properties, updatePropertyStatus, deleteProperty, fetchBackendProperties } = propertyStore

const activeTab = ref<'overview' | 'properties' | 'users' | 'bookings' | 'support' | 'settings'>('overview')
const isSidebarOpen = ref(false)
const propertyFilter = ref<'pending' | 'approved' | 'all'>('pending')
const isLoading = ref(false)
const toastMessage = ref('')

const liveUsers = ref<LiveUser[]>([])
const userSearchQuery = ref('')

const liveBookings = ref<LiveBooking[]>([])
const bookingSearchQuery = ref('')

const showToast = (msg: string) => {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}

const currentAdminName = computed(() => {
  return authStore.user.value?.name || 'Super Admin'
})

const adminInitials = computed(() => {
  const name = currentAdminName.value
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase() || 'AD'
})

const pendingProperties = computed(() => {
  return properties.value.filter((p) => p.status === 'Pending')
})

const approvedProperties = computed(() => {
  return properties.value.filter((p) => p.status === 'Approved')
})

const filteredPropertyList = computed(() => {
  if (propertyFilter.value === 'pending') return pendingProperties.value
  if (propertyFilter.value === 'approved') return approvedProperties.value
  return properties.value
})

const filteredUsers = computed(() => {
  const q = userSearchQuery.value.trim().toLowerCase()
  if (!q) return liveUsers.value
  return liveUsers.value.filter((u) => {
    const name = (u.full_name || u.name || '').toLowerCase()
    const email = (u.email || '').toLowerCase()
    const role = (u.role || '').toLowerCase()
    const id = String(u.id || u.user_id || '')
    return name.includes(q) || email.includes(q) || role.includes(q) || id.includes(q)
  })
})

const filteredBookings = computed(() => {
  const q = bookingSearchQuery.value.trim().toLowerCase()
  if (!q) return liveBookings.value
  return liveBookings.value.filter((b) => {
    const propName = (b.property_name || '').toLowerCase()
    const guest = (b.guest_name || b.guest_email || '').toLowerCase()
    const status = (b.status || '').toLowerCase()
    return propName.includes(q) || guest.includes(q) || status.includes(q)
  })
})

const getUserInitials = (user: LiveUser) => {
  const name = user.full_name || user.name || user.email || 'User'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'Active'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateStr
  }
}

const isSelfAdmin = (user: LiveUser) => {
  const currentEmail = (authStore.user.value?.email || 'admin@camstay.com').toLowerCase()
  return (user.email || '').toLowerCase() === currentEmail
}

// Fetch live users from backend
const fetchLiveUsers = async () => {
  try {
    isLoading.value = true
    const token = await getAdminToken()
    if (!token) return

    const res = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) {
        liveUsers.value = data
      }
    }
  } catch (err) {
    console.error('Failed to fetch live users:', err)
  } finally {
    isLoading.value = false
  }
}

// Fetch live bookings from backend
const fetchLiveBookings = async () => {
  try {
    const token = await getAdminToken()
    if (!token) return

    const res = await fetch(`${API_BASE_URL}/bookings/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) {
        liveBookings.value = data
      }
    }
  } catch (err) {
    console.error('Failed to fetch live bookings:', err)
  }
}

const refreshProperties = async () => {
  isLoading.value = true
  await fetchBackendProperties()
  isLoading.value = false
  showToast('Homestay list updated from database!')
}

const refreshAllData = async () => {
  isLoading.value = true
  await Promise.all([
    fetchBackendProperties(),
    fetchLiveUsers(),
    fetchLiveBookings()
  ])
  isLoading.value = false
  showToast('All platform data refreshed from database!')
}

// Property Actions
const approve = async (id: number, name: string) => {
  await updatePropertyStatus(id, 'Approved')
  await fetchBackendProperties()
  showToast(`"${name}" has been approved and published to travelers!`)
}

const reject = async (id: number, name: string) => {
  await updatePropertyStatus(id, 'Rejected')
  await fetchBackendProperties()
  showToast(`"${name}" application has been rejected.`)
}

const revoke = async (id: number, name: string) => {
  await updatePropertyStatus(id, 'Pending')
  await fetchBackendProperties()
  showToast(`"${name}" live approval has been revoked.`)
}

const removeProperty = async (id: number, name: string) => {
  const confirmed = await showConfirm({
    title: 'Delete Homestay',
    message: `Are you sure you want to permanently delete "${name}" from the database?`,
    type: 'danger',
    confirmText: 'Delete Permanently',
    cancelText: 'Cancel',
  })
  if (confirmed) {
    await deleteProperty(id)
    await fetchBackendProperties()
    showToast(`"${name}" has been deleted.`)
  }
}

// User Actions
const changeUserRole = async (userId: number, newRole: string, email: string) => {
  try {
    const token = await getAdminToken()
    if (!token) return

    const res = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole })
    })

    if (res.ok) {
      const target = liveUsers.value.find((u) => (u.id || u.user_id) === userId)
      if (target) {
        target.role = newRole
      }
      showToast(`User ${email} role changed to ${newRole.toUpperCase()}!`)
    } else {
      await showAlert({
        title: 'Role Update Failed',
        message: 'Failed to update user role on backend.',
        type: 'danger',
      })
    }
  } catch (err) {
    console.error('Error changing user role:', err)
  }
}

const deleteUserAccount = async (userId: number, name: string) => {
  const confirmed = await showConfirm({
    title: 'Delete User Account',
    message: `Are you sure you want to permanently delete user account "${name}"? This action cannot be undone.`,
    type: 'danger',
    confirmText: 'Delete User',
    cancelText: 'Cancel',
  })
  if (!confirmed) {
    return
  }

  try {
    const token = await getAdminToken()
    if (!token) return

    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) {
      liveUsers.value = liveUsers.value.filter((u) => (u.id || u.user_id) !== userId)
      showToast(`User account "${name}" has been deleted.`)
    } else {
      await showAlert({
        title: 'Delete Failed',
        message: 'Failed to delete user on backend.',
        type: 'danger',
      })
    }
  } catch (err) {
    console.error('Error deleting user:', err)
  }
}

// Booking Actions
const moderateBooking = async (bookingId: number, action: 'approved' | 'cancelled') => {
  try {
    const token = await getAdminToken()
    if (!token) return

    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/manage`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ action })
    })

    if (res.ok) {
      await fetchLiveBookings()
      showToast(`Reservation #${bookingId} marked as ${action}!`)
    } else {
      await showAlert({
        title: 'Update Failed',
        message: 'Failed to update booking status.',
        type: 'danger',
      })
    }
  } catch (err) {
    console.error('Error updating booking status:', err)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(async () => {
  await refreshAllData()
})
</script>
