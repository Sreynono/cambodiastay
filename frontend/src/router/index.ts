import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ExploreView from '../views/ExploreView.vue'
import ForHostView from '../views/ForHostView.vue'
import AboutView from '../views/AboutView.vue'
import HostApplicationView from '../views/HostApplicationView.vue'
import HomestayView from '../views/HomestayView.vue'
import GuestDashboard from '@/views/dashboard/GuestDashboard.vue'
import HostDashboard from '@/views/dashboard/HostDashboard.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import HomestayDetailView from '@/views/HomestayDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
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
      path: '/for-host',
      name: 'for-host',
      component: ForHostView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/host-application',
      name: 'host-application',
      component: HostApplicationView,
    },
    {
      path: '/homestay/:id',
      name: 'homestay',
      component: HomestayView,
    },
    {
      path: '/homestay/:id',
      name: 'homestay-details',
      component: HomestayDetailView,
    },
    {
      path: '/dashboard/guest',
      name: 'guest-dashboard',
      component: GuestDashboard,
    },
    {
      path: '/dashboard/host',
      name: 'host-dashboard',
      component: HostDashboard,
    },
    {
      path: '/dashboard/admin',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
  ],
})

export default router
