<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import alphabets from '@/assets/alphabets.json'

const route = useRoute()
const alphabet = computed(() => alphabets.find((a) => a.id === route.params.id))

const currentIndex = computed(() => alphabets.findIndex((a) => a.id === route.params.id))

const prevAlphabet = computed(() =>
  currentIndex.value > 0 ? alphabets[currentIndex.value - 1] : null,
)

const nextAlphabet = computed(() =>
  currentIndex.value < alphabets.length - 1 ? alphabets[currentIndex.value + 1] : null,
)
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'THE PHONETIC ALPHABET ARCHIVE' }" class="home"
        >← Back to archive</RouterLink
      >
    </nav>
    <div class="title">
      <h1>{{ alphabet.title }}</h1>
    </div>
    <nav>
      <RouterLink v-if="prevAlphabet" :to="{ name: 'alphabet', params: { id: prevAlphabet.id } }">
        <span class="nav-meta">
          <span class="nav-dir">← Previous</span>
        </span>
      </RouterLink>
      <a href="#showcase">Showcase</a>
      <a href="#info">Info</a>
      <a href="#alphabet">Alphabet</a>
      <RouterLink v-if="nextAlphabet" :to="{ name: 'alphabet', params: { id: nextAlphabet.id } }">
        <span class="nav-meta align-right">
          <span class="nav-dir">Next →</span>
        </span>
      </RouterLink>
    </nav>
    <div class="filler"></div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0.2rem solid var(--primary-color);
}

.title {
  width: 100%;
  padding: 6rem 8rem;
  text-align: center;
  font: var(--header-1);
}

nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

a {
  width: 20%;
  border: 0.2rem solid var(--primary-color);
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font: var(--header-2);
  animation: smooth;
}

a:nth-child(5) {
  border-right: none;
}

a:hover {
  background: var(--secondary-color);
  color: white;
}

.home {
  width: 100%;
  justify-content: flex-start;
  border-top: none;
  border-right: none;
}

.filler {
  width: 100%;
  height: 10rem;
}
</style>
