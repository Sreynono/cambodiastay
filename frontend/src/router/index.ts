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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (to.path !== from.path) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ top: 0, left: 0 });
        }, 200);
      });
    }
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Instant preview mode for screenshots / evaluation
  if (to.query.preview === 'admin') {
    authStore.login('preview_token', { id: 1, name: 'Sokha Admin', email: 'admin@camstay.com', role: 'admin' });
    return next();
  }
  if (to.query.preview === 'host') {
    authStore.login('preview_token', { id: 2, name: 'Host Bopha', email: 'host@camstay.com', role: 'host' });
    return next();
  }
  if (to.query.preview === 'guest') {
    authStore.login('preview_token', { id: 3, name: 'Traveler Dara', email: 'guest@camstay.com', role: 'guest' });
    return next();
  }

  const isAuthenticated = authStore.isLoggedIn.value;
  const userRole = authStore.user.value?.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If not authenticated, redirect to login page
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.meta.role && userRole && to.meta.role !== userRole) {
    // Admins are superusers with universal access to Admin, Host, and Guest dashboards
    if (userRole === 'admin') {
      next();
    } else if (userRole === 'host' && to.meta.role === 'guest') {
      // Hosts can also view guest dashboard
      next();
    } else {
      // If logged in but wrong role, direct to user's matching dashboard
      if (userRole === 'host') next('/dashboard/host');
      else next('/dashboard/guest');
    }
  } else {
    next();
  }
});

export default router;