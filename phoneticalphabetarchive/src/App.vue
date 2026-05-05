<script setup>
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AlphabetHeader from '@/components/AlphabetHeader.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <AlphabetHeader v-if="route.params.id" />
    <AppHeader v-else />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
