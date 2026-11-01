<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 1500)
})
</script>

<template>
  <div id="app">
    <AppHeader />
    <transition name="fade">
      <div v-if="isLoaded" class="page-content">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
        <AppFooter />
      </div>
    </transition>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
}

.page-content {
  display: flex;
  flex-direction: column;
}

/* Same fade transition used for initial load and page switching */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
