<script setup>
import alphabets from '@/assets/alphabets.json'
</script>

<template>
  <div id="page">
    <main>
      <RouterLink
        v-for="alphabet in alphabets"
        :key="alphabet.id"
        :to="{ name: 'alphabet', params: { id: alphabet.id } }"
      >
        <img
          class="grapheme"
          :class="{ 'no-invert': alphabet.color }"
          :src="`/exemplary-graphemes/${alphabet.id}.svg`"
          :alt="alphabet.title"
        />
        <h2>{{ alphabet.title }}</h2>
        <p>{{ alphabet.year }}</p>
      </RouterLink>
    </main>
  </div>
</template>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

main {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 0.2rem solid var(--primary-color);
  border-top: none;
  border-bottom: none;
}

a {
  width: 20%;
  padding: 2rem 1.5rem;
  border: 0.2rem solid var(--primary-color);
  border-top: none;
  border-left: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

a:nth-child(5n) {
  border-right: none;
}

a:nth-child(5n + 1) {
  border-left: none;
}

a:hover {
  background-color: var(--secondary-color);
  color: white;
}

a:hover .grapheme {
  filter: invert(1);
}

a:hover .grapheme.no-invert {
  filter: none;
}

.grapheme {
  height: 10vw;
}

.grapheme.no-invert {
  width: 100%;
}

h2 {
  font: var(--body-bold);
  text-align: center;
  margin-top: 2rem;
}

p {
  font: var(--body);
}
</style>
