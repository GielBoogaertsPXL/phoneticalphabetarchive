<script setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
}
</style>
