import { createRouter, createWebHistory } from 'vue-router'
import ArchiveView from '@/views/ArchiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'THE PHONETIC ALPHABET ARCHIVE',
      component: ArchiveView,
    },
    {
      path: '/about',
      name: 'ABOUT',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'CONTACT',
      component: () => import('@/views/ContactView.vue'),
    },
    {
      path: '/glossary',
      name: 'GLOSSARY',
      component: () => import('@/views/GlossaryView.vue'),
    },
    {
      path: '/phonetics',
      name: 'PHONETICS',
      component: () => import('@/views/PhoneticsView.vue'),
    },
    {
      path: '/alphabet/:id',
      name: 'alphabet',
      component: () => import('@/views/DetailView.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'instant' }
  },
})

export default router
