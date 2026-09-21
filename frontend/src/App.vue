<script setup lang="ts">
import { RouterView } from 'vue-router'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
</script>

<template>
  <main>
    <!-- Page Content with Smooth Fade-in Transition -->
    <RouterView v-slot="{ Component, route }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
    <ConfirmModal />
  </main>
</template>

<style>
/* Page Route Transition - creates a smooth, gentle fade-in page entrance */
.page-fade-enter-active,
.fade-in-enter-active {
  transition: opacity 0.42s cubic-bezier(0.16, 1, 0.3, 1), transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-fade-leave-active,
.fade-in-leave-active {
  transition: opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-enter-from,
.fade-in-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-fade-leave-to,
.fade-in-leave-to {
  opacity: 0;
}
</style>