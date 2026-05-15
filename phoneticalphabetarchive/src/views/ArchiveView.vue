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
  overflow-wrap: break-word;
  width: 100%;
}

p {
  font: var(--body);
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 850px) {
  a {
    width: 25%;
    border-right: 0.2rem solid var(--primary-color);
  }

  a:nth-child(4n) {
    border-right: none;
  }

  a:nth-child(5n) {
    border-right: 0.2rem solid var(--primary-color);
  }

  a:nth-child(6n):not(a:nth-child(4n)) {
    border-right: 0.2rem solid var(--primary-color);
  }

  a img {
    height: 8vw;
  }
}

@media screen and (max-width: 750px) {
  a {
    width: 33.333%;
    border-right: 0.2rem solid var(--primary-color);
    padding: 2rem 1rem;
  }

  a:nth-child(3n) {
    border-right: none;
  }

  a:nth-child(4n):not(a:nth-child(3n)) {
    border-right: 0.2rem solid var(--primary-color);
  }

  a:nth-child(6n):not(a:nth-child(4n)) {
    border-right: none;
  }
}

@media screen and (max-width: 500px) {
  a {
    padding: 2rem 0.2rem;
  }

  h2 {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }

  p {
    font-size: 0.8rem;
  }
}
</style>
