<template>
  <div class="h-screen bg-[#F8FAFC] text-[#2C3E50] flex flex-col overflow-hidden">
    <!-- Global Website Header -->
    <Header />

    <div class="flex-1 flex min-h-0 overflow-hidden">
      <!-- Mobile Drawer for < lg -->
      <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden flex">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="isSidebarOpen = false"></div>
        <aside class="relative w-72 max-w-[85vw] bg-[#113A28] text-white h-full flex flex-col shadow-2xl z-10 animate-slide-in">
          <!-- Mobile Header: Host Profile Card -->
          <div class="p-5 border-b border-emerald-900/50 flex items-center justify-between">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center font-bold text-sm shadow-inner shrink-0 border border-emerald-400/20">
                {{ (authStore.user.value?.name || 'H').substring(0, 2).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <h3 class="text-sm sm:text-base font-bold text-white truncate sidebar-user-name">{{ authStore.user.value?.name || 'Host Member' }}</h3>
                <span class="text-xs sm:text-[12px] font-semibold text-emerald-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mt-0.5 sidebar-role-badge">
                  {{ t('hostDashboard.panelTitle') }}
                </span>
              </div>
            </div>
            <button @click="isSidebarOpen = false" class="p-2 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer" aria-label="Close sidebar">✕</button>
          </div>

          <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              @click="activeTab = 'overview'; isSidebarOpen = false"
              :class="[
                'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center gap-3 text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn',
                activeTab === 'overview' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span class="flex-1 truncate dashboard-nav-label">{{ t('hostDashboard.overview') }}</span>
            </button>

            <button
              @click="activeTab = 'properties'; isSidebarOpen = false"
              :class="[
                'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center justify-between text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn',
                activeTab === 'properties' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              <div class="flex items-center gap-3 truncate">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span class="truncate dashboard-nav-label">{{ t('hostDashboard.myProperties') }}</span>
              </div>
              <span class="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold ml-2">{{ myProperties.length }}</span>
            </button>

            <button
              @click="activeTab = 'reservations'; isSidebarOpen = false"
              :class="[
                'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center justify-between text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn',
                activeTab === 'reservations' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              <div class="flex items-center gap-3 truncate">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span class="truncate dashboard-nav-label">{{ t('hostDashboard.reservations') }}</span>
              </div>
              <span v-if="pendingBookings.length > 0" class="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                {{ pendingBookings.length }}
              </span>
            </button>

            <button
              @click="activeTab = 'inbox'; isSidebarOpen = false"
              :class="[
                'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center justify-between text-sm sm:text-[15px] cursor-pointer dashboard-nav-btn',
                activeTab === 'inbox' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              <div class="flex items-center gap-3 truncate">
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span class="truncate dashboard-nav-label">{{ t('hostDashboard.inbox') }}</span>
              </div>
              <span v-if="unreadMessagesCount > 0" class="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                {{ unreadMessagesCount }}
              </span>
            </button>
          </nav>

          <!-- Mobile Sidebar Footer -->
          <div class="p-4 border-t border-emerald-900/50 space-y-1">
            <RouterLink
              to="/explore"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-emerald-200 hover:bg-white/10 rounded-xl transition sidebar-footer-link"
            >
              <svg class="w-4 h-4 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span class="sidebar-footer-text">{{ t('dashboard.viewWebsite') }}</span>
            </RouterLink>
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-red-300 hover:bg-red-500/20 rounded-xl transition cursor-pointer sidebar-footer-btn"
            >
              <svg class="w-4 h-4 text-red-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span class="sidebar-footer-text">{{ t('nav.logout') }}</span>
            </button>
          </div>
        </aside>
      </div>

      <!-- Desktop Sidebar Navigation -->
      <aside class="hidden lg:flex w-72 bg-[#113A28] text-white flex-col shadow-xl z-10 shrink-0">
        <!-- Host Profile Card (Clean & Focused) -->
        <div class="p-5 border-b border-emerald-900/50 flex items-center gap-3.5">
          <div class="w-11 h-11 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center font-bold text-sm shadow-inner shrink-0 border border-emerald-400/20">
            {{ (authStore.user.value?.name || 'H').substring(0, 2).toUpperCase() }}
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-sm sm:text-base font-bold text-white truncate leading-tight sidebar-user-name">{{ authStore.user.value?.name || 'Host Member' }}</h3>
            <span class="inline-flex items-center gap-1.5 text-xs sm:text-[12px] font-semibold text-emerald-300 bg-white/10 px-2.5 py-1 rounded-full mt-1 sidebar-role-badge">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {{ t('hostDashboard.panelTitle') }}
            </span>
          </div>
        </div>

        <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            @click="activeTab = 'overview'"
            :class="[
              'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center gap-3 text-sm sm:text-[15px] cursor-pointer group dashboard-nav-btn',
              activeTab === 'overview' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span class="flex-1 truncate dashboard-nav-label">{{ t('hostDashboard.overview') }}</span>
          </button>

          <button
            @click="activeTab = 'properties'"
            :class="[
              'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center justify-between text-sm sm:text-[15px] cursor-pointer group dashboard-nav-btn',
              activeTab === 'properties' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span class="truncate dashboard-nav-label">{{ t('hostDashboard.myProperties') }}</span>
            </div>
            <span class="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold ml-2">{{ myProperties.length }}</span>
          </button>

          <button
            @click="activeTab = 'reservations'"
            :class="[
              'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center justify-between text-sm sm:text-[15px] cursor-pointer group dashboard-nav-btn',
              activeTab === 'reservations' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span class="truncate dashboard-nav-label">{{ t('hostDashboard.reservations') }}</span>
            </div>
            <span v-if="pendingBookings.length > 0" class="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full ml-2">
              {{ pendingBookings.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'inbox'"
            :class="[
              'w-full text-left px-3.5 py-3 rounded-2xl font-semibold transition flex items-center justify-between text-sm sm:text-[15px] cursor-pointer group dashboard-nav-btn',
              activeTab === 'inbox' ? 'bg-white/20 text-white shadow' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <svg class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span class="truncate dashboard-nav-label">{{ t('hostDashboard.inbox') }}</span>
            </div>
            <span v-if="unreadMessagesCount > 0" class="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full ml-2">
              {{ unreadMessagesCount }}
            </span>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-emerald-900/50 space-y-1">
          <RouterLink
            to="/explore"
            class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-emerald-200 hover:bg-white/10 rounded-xl transition sidebar-footer-link"
          >
            <svg class="w-4 h-4 text-emerald-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span class="sidebar-footer-text">{{ t('dashboard.viewWebsite') }}</span>
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-red-300 hover:bg-red-500/20 rounded-xl transition cursor-pointer sidebar-footer-btn"
          >
            <svg class="w-4 h-4 text-red-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span class="sidebar-footer-text">{{ t('nav.logout') }}</span>
          </button>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
        <!-- Mobile Drawer Toggle Bar (Only on mobile screens) -->
        <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs">
          <button
            @click="isSidebarOpen = true"
            class="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>{{ t('hostDashboard.panelTitle') }}</span>
          </button>
          <span class="text-xs font-bold text-[#113A28]">
            {{
              activeTab === 'overview'
                ? t('hostDashboard.overview')
                : activeTab === 'properties'
                  ? t('hostDashboard.myProperties')
                  : activeTab === 'reservations'
                    ? t('hostDashboard.reservations')
                    : t('hostDashboard.inbox')
            }}
          </span>
        </div>

        <!-- Scrollable Workspace Tab Content Area -->
        <div class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div class="max-w-6xl mx-auto space-y-8">
            <!-- Clear, Inviting Page Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200/60">
              <div>
                <span class="text-[11px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-1.5">
                  {{ t('hostDashboard.panelTitle') }}
                </span>
                <h1 class="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
                  {{
                    activeTab === 'overview'
                      ? t('hostDashboard.overviewTitle')
                      : activeTab === 'properties'
                        ? t('hostDashboard.myProperties')
                        : activeTab === 'reservations'
                          ? t('hostDashboard.reservationsTitle')
                          : t('messages.inboxTitle')
                  }}
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 mt-1">
                  {{
                    activeTab === 'overview'
                      ? t('hostDashboard.welcomeBack', { name: authStore.user.value?.name || t('hostDashboard.hostMember') })
                      : activeTab === 'properties'
                        ? t('hostDashboard.manageStaysSub')
                        : activeTab === 'reservations'
                          ? t('hostDashboard.reservationsSub')
                          : (currentLang === 'km' ? 'ទំនាក់ទំនង និងឆ្លើយតបសារផ្ទាល់ជាមួយភ្ញៀវទេសចរ។' : 'Direct communication and chat with your guests.')
                  }}
                </p>
              </div>

              <button
                v-if="activeTab !== 'reservations' && activeTab !== 'inbox'"
                @click="isModalOpen = true"
                class="bg-[#113A28] text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow hover:bg-[#0a261a] transition flex items-center gap-2 cursor-pointer w-fit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span>{{ t('hostDashboard.newStay') }}</span>
              </button>
            </div>
        <!-- 1. OVERVIEW TAB -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <!-- Summary Metric Cards (Enhanced readability for Khmer & English) -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-[#113A28] hover:shadow-sm transition">
              <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('hostDashboard.myProperties') }}</p>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight my-0.5">{{ myProperties.length }}</h3>
              <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ approvedCount }} {{ t('hostDashboard.live') }} · {{ pendingCount }} {{ t('hostDashboard.pending') }}</p>
            </div>

            <div class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-amber-500 hover:shadow-sm transition">
              <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('hostDashboard.pendingApproval') }}</p>
              <h3 class="text-2xl sm:text-3xl font-bold text-amber-600 leading-tight my-0.5">{{ pendingCount }}</h3>
              <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ t('hostDashboard.underReview') }}</p>
            </div>

            <div class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-blue-500 hover:shadow-sm transition">
              <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('guestDashboard.statusConfirmed') }}</p>
              <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight my-0.5">{{ confirmedBookings.length }}</h3>
              <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ t('hostDashboard.reservations') }}</p>
            </div>

            <div class="bg-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border border-gray-100 shadow-xs border-l-[4px] border-l-emerald-500 hover:shadow-sm transition">
              <p class="text-xs sm:text-[13px] lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 truncate stat-card-title">{{ t('hostDashboard.total') }}</p>
              <h3 class="text-2xl sm:text-3xl font-bold text-emerald-800 leading-tight my-0.5">${{ totalEarnings }}</h3>
              <p class="text-xs sm:text-[13px] text-gray-500 mt-1 truncate stat-card-sub">{{ t('hostDashboard.activeOnPlatform') }}</p>
            </div>
          </div>

          <!-- Quick Actions and Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Listings Preview -->
            <section class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold text-gray-900">{{ t('hostDashboard.myProperties') }}</h2>
                <button @click="activeTab = 'properties'" class="text-xs font-bold text-[#113A28] hover:underline cursor-pointer">
                  {{ t('common.exploreAll') }} ({{ myProperties.length }})
                </button>
              </div>

              <div v-if="myProperties.length === 0" class="text-center py-10 bg-gray-50 rounded-2xl p-6">
                <p class="text-sm font-semibold text-gray-600 mb-2">{{ t('hostDashboard.noStays') }}</p>
                <p class="text-xs text-gray-400 mb-4">{{ t('hostDashboard.noStaysSub') }}</p>
                <button
                  @click="isModalOpen = true"
                  class="bg-[#113A28] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#0a261a] transition cursor-pointer"
                >
                  + {{ t('hostDashboard.createStayBtn') }}
                </button>
              </div>

              <ul v-else class="space-y-3">
                <li
                  v-for="prop in myProperties.slice(0, 4)"
                  :key="prop.id"
                  class="flex items-center justify-between p-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition"
                >
                  <div class="flex items-center gap-3">
                    <img
                      v-if="prop.coverPhotoUrl"
                      :src="prop.coverPhotoUrl"
                      class="w-12 h-12 rounded-xl object-cover"
                    />
                    <div v-else class="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-sm text-gray-900">{{ prop.name }}</h4>
                      <p class="text-xs text-gray-500">{{ prop.landscape || prop.category }} · {{ translateProvince(prop.province) }} · ${{ prop.price }}{{ t('common.perNight') }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      @click="openEditModal(prop)"
                      class="text-xs font-bold text-emerald-800 hover:text-[#113A28] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      title="Edit this homestay"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      <span>{{ t('hostDashboard.edit') }}</span>
                    </button>
                    <span
                      :class="[
                        'text-[11px] font-bold px-2.5 py-1 rounded-full',
                        prop.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : prop.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ prop.status === 'Approved' ? `● ${t('hostDashboard.live')}` : prop.status === 'Pending' ? t('hostDashboard.underReview') : `✕ ${t('hostDashboard.rejected')}` }}
                    </span>
                  </div>
                </li>
              </ul>
            </section>

            <!-- Pending Reservations Preview -->
            <section class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold text-gray-900">{{ t('hostDashboard.reservations') }}</h2>
                <button @click="activeTab = 'reservations'" class="text-xs font-bold text-[#113A28] hover:underline cursor-pointer">
                  {{ t('common.exploreAll') }}
                </button>
              </div>

              <div v-if="pendingBookings.length === 0" class="text-center py-10 bg-gray-50 rounded-2xl text-gray-400 text-xs font-medium">
                {{ t('guestDashboard.noMessages') }}
              </div>

              <ul v-else class="space-y-3">
                <li
                  v-for="b in pendingBookings.slice(0, 3)"
                  :key="b.id"
                  class="p-3 border border-gray-100 rounded-2xl bg-gray-50/50"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <p class="font-bold text-sm text-gray-900">{{ b.property_name }}</p>
                      <p class="text-xs text-gray-500">{{ t('hostDashboard.guest') }}: {{ b.guest_name }} ({{ b.guests_count }} {{ t('common.guests') }})</p>
                      <p class="text-xs text-gray-400">{{ b.check_in_date }} → {{ b.check_out_date }}</p>
                    </div>
                    <span class="font-bold text-sm text-[#113A28]">${{ b.total_price }}</span>
                  </div>
                  <div class="flex gap-2">
                    <button
                      @click="manageBooking(b.id, 'approved')"
                      class="flex-1 bg-[#113A28] text-white py-1.5 rounded-lg text-xs font-bold hover:bg-[#0a261a] transition cursor-pointer"
                    >
                      {{ t('hostDashboard.approve') }}
                    </button>
                    <button
                      @click="manageBooking(b.id, 'rejected')"
                      class="flex-1 bg-red-50 text-red-600 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition cursor-pointer"
                    >
                      {{ t('hostDashboard.reject') }}
                    </button>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <!-- 2. MY PROPERTIES TAB -->
        <div v-else-if="activeTab === 'properties'" class="space-y-6">

          <!-- Empty state -->
          <div v-if="myProperties.length === 0" class="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ t('hostDashboard.noStays') }}</h3>
            <p class="text-xs text-gray-500 max-w-md mx-auto mb-6">
              {{ t('hostDashboard.noStaysSub') }}
            </p>
            <button
              @click="isModalOpen = true"
              class="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow hover:bg-gray-800 transition cursor-pointer"
            >
              + {{ t('hostDashboard.createStayBtn') }}
            </button>
          </div>

          <!-- Grid of Properties -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="prop in myProperties"
              :key="prop.id"
              class="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition"
            >
              <div class="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  v-if="prop.coverPhotoUrl"
                  :src="prop.coverPhotoUrl"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-[#113A28] to-emerald-800 flex flex-col items-center justify-center text-white p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mb-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="font-serif font-bold text-xs text-emerald-100 text-center">{{ prop.name }}</span>
                </div>
                <!-- Status Badge -->
                <span
                  :class="[
                    'absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm',
                    prop.status === 'Approved' ? 'bg-emerald-600 text-white' : prop.status === 'Pending' ? 'bg-amber-500 text-white' : 'bg-red-600 text-white'
                  ]"
                >
                  {{ prop.status === 'Approved' ? `✓ ${t('hostDashboard.approvedStatus')}` : prop.status === 'Pending' ? t('hostDashboard.underReview') : `✕ ${t('hostDashboard.declinedStatus')}` }}
                </span>

                <!-- Landscape Badge -->
                <span class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[#113A28] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {{ prop.landscape || prop.category }}
                </span>
              </div>

              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-base text-gray-900 mb-1">{{ prop.name }}</h3>
                  <p class="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ translateProvince(prop.province) }}</span>
                  </p>
                  
                  <!-- Nearby Places Tags -->
                  <div v-if="prop.nearPlaces && prop.nearPlaces.length > 0" class="flex flex-wrap gap-1.5 mb-3">
                    <span
                      v-for="(place, pIdx) in prop.nearPlaces.slice(0, 3)"
                      :key="pIdx"
                      class="text-[10px] font-medium bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-100"
                    >
                      near {{ place }}
                    </span>
                  </div>

                  <p class="text-xs text-gray-600 line-clamp-2 mb-4">{{ prop.description }}</p>
                </div>

                <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span class="font-bold text-sm text-[#113A28]">${{ prop.price }} <span class="text-xs font-normal text-gray-500">{{ t('common.perNight') }}</span></span>
                  
                  <div class="flex items-center gap-2.5">
                    <button
                      @click="openEditModal(prop)"
                      class="text-xs font-bold text-emerald-800 hover:text-[#113A28] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      title="Edit this homestay"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      <span>{{ t('hostDashboard.edit') }}</span>
                    </button>
                    <RouterLink
                      v-if="prop.status === 'Approved'"
                      :to="`/homestay/${prop.id}`"
                      class="text-xs font-bold text-[#113A28] hover:underline"
                    >
                      {{ t('common.viewStay') }} →
                    </RouterLink>
                    <button
                      @click="deleteProperty(prop.id, prop.name)"
                      class="text-xs font-bold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                      title="Delete this homestay"
                    >
                      {{ t('hostDashboard.delete') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. RESERVATIONS TAB -->
        <div v-else-if="activeTab === 'reservations'" class="space-y-6">

          <div v-if="myBookings.length === 0" class="bg-white p-12 text-center rounded-3xl border border-gray-200 shadow-sm">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-black">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-gray-600 font-bold text-sm">{{ t('guestDashboard.noMessages') }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ t('guestDashboard.noMessagesSub') }}</p>
          </div>

          <div v-else class="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[620px] text-left border-collapse text-sm">
                <thead class="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th class="p-4 font-bold">{{ t('hostDashboard.homestay') }} & {{ t('hostDashboard.dates') }}</th>
                    <th class="p-4 font-bold">{{ t('hostDashboard.guest') }}</th>
                    <th class="p-4 font-bold">{{ t('hostDashboard.total') }}</th>
                    <th class="p-4 font-bold">{{ t('hostDashboard.status') }}</th>
                    <th class="p-4 font-bold text-right">{{ t('hostDashboard.actions') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="b in myBookings" :key="b.id" class="hover:bg-gray-50/80 transition">
                    <td class="p-4">
                      <p class="font-bold text-gray-900">{{ b.property_name }}</p>
                      <p class="text-xs text-gray-500">{{ b.check_in_date }} → {{ b.check_out_date }}</p>
                    </td>
                    <td class="p-4">
                      <p class="font-medium text-gray-900">{{ b.guest_name || 'Guest' }}</p>
                      <p class="text-xs text-gray-500">{{ b.guests_count }} {{ t('common.guests') }} · {{ b.guest_email }}</p>
                    </td>
                    <td class="p-4 font-bold text-[#113A28]">${{ b.total_price }}</td>
                    <td class="p-4">
                      <span
                        :class="[
                          'text-xs font-bold px-2.5 py-1 rounded-full uppercase',
                          b.status === 'approved' ? 'bg-green-100 text-green-800' : b.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        ]"
                      >
                        {{ b.status === 'approved' ? t('hostDashboard.approvedStatus') : b.status === 'pending' ? t('hostDashboard.pendingStatus') : t('hostDashboard.declinedStatus') }}
                      </span>
                    </td>
                    <td class="p-4 text-right">
                      <div v-if="b.status === 'pending'" class="flex justify-end gap-2">
                        <button
                          @click="manageBooking(b.id, 'approved')"
                          class="bg-[#113A28] text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-[#0a261a] cursor-pointer"
                        >
                          {{ t('hostDashboard.approve') }}
                        </button>
                        <button
                          @click="manageBooking(b.id, 'rejected')"
                          class="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-100 cursor-pointer"
                        >
                          {{ t('hostDashboard.reject') }}
                        </button>
                      </div>
                      <span v-else class="text-xs text-gray-400 font-medium">✓</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 4. Messages / Inbox Tab -->
        <div v-else-if="activeTab === 'inbox'" class="h-[calc(100vh-210px)] min-h-[520px]">
          <ChatInbox />
        </div>
      </div>
      </div>

      <!-- New Property Modal -->
      <NewPropertyModal
        :isOpen="isModalOpen"
        @close="isModalOpen = false"
        @property-created="onPropertyCreated"
      />

      <!-- Edit Property Modal -->
      <EditPropertyModal
        :isOpen="isEditModalOpen"
        :property="selectedPropertyToEdit"
        @close="isEditModalOpen = false"
        @property-updated="onPropertyUpdated"
      />
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import Header from '@/components/common/Header.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePropertyStore, type Homestay } from '@/stores/usePropertyStore';
import { useMessageStore } from '@/stores/useMessageStore';
import ChatInbox from '@/components/chat/ChatInbox.vue';
import NewPropertyModal from '@/components/host/NewPropertyModal.vue';
import EditPropertyModal from '@/components/host/EditPropertyModal.vue';
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
const activeTab = ref<'overview' | 'properties' | 'reservations' | 'inbox'>('overview');
const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedPropertyToEdit = ref<Homestay | null>(null);

const openEditModal = (prop: Homestay) => {
  selectedPropertyToEdit.value = prop;
  isEditModalOpen.value = true;
};

const onPropertyUpdated = async () => {
  await propertyStore.fetchBackendProperties();
};

const currentHostId = computed(() => authStore.user.value?.id);
const currentHostEmail = computed(() => authStore.user.value?.email || '');

// Filter real properties belonging to this host
const myProperties = computed(() => {
  const email = currentHostEmail.value.toLowerCase();
  const id = currentHostId.value;
  return propertyStore.properties.value.filter(
    (p) => (id && p.host_id === id) || (email && p.hostEmail?.toLowerCase() === email)
  );
});

const myPropertyIds = computed(() => myProperties.value.map((p) => p.id));

const myBookings = computed(() => {
  return propertyStore.bookings.value.filter((b) => myPropertyIds.value.includes(b.property_id));
});

const pendingBookings = computed(() =>
  myBookings.value.filter((b) => b.status === 'pending')
);

const confirmedBookings = computed(() =>
  myBookings.value.filter((b) => b.status === 'approved' || b.status === 'confirmed')
);

const approvedCount = computed(() =>
  myProperties.value.filter((p) => p.status === 'Approved').length
);

const pendingCount = computed(() =>
  myProperties.value.filter((p) => p.status === 'Pending').length
);

const totalEarnings = computed(() => {
  return confirmedBookings.value
    .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0)
    .toFixed(2);
});

const manageBooking = async (bookingId: number, action: 'approved' | 'rejected') => {
  await propertyStore.updateBookingStatus(bookingId, action);
  await propertyStore.fetchHostBookings();
};

const deleteProperty = async (id: number, name: string) => {
  const confirmed = await showConfirm({
    title: t('dialog.deleteHomestayTitle'),
    message: t('dialog.deleteHomestayMessage'),
    type: 'danger',
    confirmText: t('dialog.deleteHomestayBtn'),
    cancelText: t('common.cancel'),
  });
  if (confirmed) {
    await propertyStore.deleteProperty(id);
    await propertyStore.fetchBackendProperties();
  }
};

const onPropertyCreated = async () => {
  await propertyStore.fetchBackendProperties();
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
    propertyStore.fetchHostBookings(),
  ]);
});
</script>
