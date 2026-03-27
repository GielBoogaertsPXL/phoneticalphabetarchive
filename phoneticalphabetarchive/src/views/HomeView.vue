<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import alphabets from '@/assets/alphabets.json'
</script>

<template>
  <div id="page">
    <AppHeader :style="{ color: 'var(--darkgreen)' }" />
    <main>
      <article v-for="alphabet in alphabets" :key="alphabet.id">
        <RouterLink :to="{ name: 'alphabet', params: { id: alphabet.id } }">
          <svg class="grapheme" :viewBox="alphabet.viewBox">
            <g :id="alphabet.id">
              <path :d="alphabet.path" />
            </g>
          </svg>
        </RouterLink>
        <h2>{{ alphabet.title }}</h2>
        <p>{{ alphabet.year }}</p>
      </article>
    </main>
    <AppFooter :style="{ backgroundColor: 'var(--darkgreen)' }" />
  </div>
</template>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

main {
  padding: 10rem 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
}

article {
  width: calc(20% - 1.6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.grapheme {
  fill: var(--darkgreen);
  height: 10vw;
}

.grapheme:hover {
  transform: scale(1.05);
}

h2 {
  font: var(--body-bold);
  color: var(--darkgreen);
  text-align: center;
  margin-top: 2rem;
}

p {
  font: var(--body);
  color: var(--darkgreen);
  margin-top: 0.5rem;
}
</style>
