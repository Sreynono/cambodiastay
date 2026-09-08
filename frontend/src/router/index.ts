import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

// Views
import HomeView from '@/views/HomeView.vue';
import ExploreView from '@/views/ExploreView.vue';
import AboutView from '@/views/AboutView.vue';
import ForHostView from '@/views/ForHostView.vue';
import HostApplicationView from '@/views/HostApplicationView.vue';
import HomestayView from '@/views/HomestayView.vue';
import LoginView from '@/views/LoginView.vue';
import GuestDashboard from '@/views/dashboard/GuestDashboard.vue';
import HostDashboard from '@/views/dashboard/HostDashboard.vue';
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/explore',
    name: 'explore',
    component: ExploreView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/for-host',
    name: 'for-host',
    component: ForHostView,
  },
  {
    path: '/host-application',
    name: 'host-application',
    component: HostApplicationView,
  },
  {
    path: '/host/apply',
    redirect: '/host-application',
  },
  {
    path: '/homestay/:id',
    name: 'homestay-details',
    component: HomestayView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard/guest',
    name: 'guest-dashboard',
    component: GuestDashboard,
    meta: { requiresAuth: true, role: 'guest' },
  },
  {
    path: '/dashboard/host',
    name: 'host-dashboard',
    component: HostDashboard,
    meta: { requiresAuth: true, role: 'host' },
  },
  {
    path: '/host/dashboard',
    redirect: '/dashboard/host',
  },
  {
    path: '/dashboard/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isLoggedIn.value;
  const userRole = authStore.user.value?.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If not authenticated, redirect to login page
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.meta.role && userRole && to.meta.role !== userRole) {
    // If logged in but wrong role, direct to user's matching dashboard
    if (userRole === 'admin') next('/dashboard/admin');
    else if (userRole === 'host') next('/dashboard/host');
    else next('/dashboard/guest');
  } else {
    next();
  }
});

export default router;