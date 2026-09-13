<script setup lang="ts">
import { RouterView } from 'vue-router'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
</script>

<template>
  <main>
    <RouterView />
    <ConfirmModal />
  </main>
</template>

<style scoped>

</style>