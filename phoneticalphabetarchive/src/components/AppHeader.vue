<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header>
    <div class="title">
      <h1>{{ route.name }}</h1>
    </div>
    <nav>
      <RouterLink :to="{ name: 'THE PHONETIC ALPHABET ARCHIVE' }">Archive</RouterLink>
      <RouterLink :to="{ name: 'ABOUT' }">About</RouterLink>
      <RouterLink :to="{ name: 'CONTACT' }">Contact</RouterLink>
      <RouterLink :to="{ name: 'GLOSSARY' }">Glossary</RouterLink>
      <RouterLink :to="{ name: 'PHONETICS' }">Phonetics</RouterLink>
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
  padding: 0.5rem;
  font: var(--header-2);
}

a:nth-child(5) {
  border-right: none;
}

a:hover {
  background: var(--secondary-color);
  color: white;
}

.router-link-active {
  background: var(--secondary-color);
  color: white;
}

.filler {
  width: 100%;
  height: 10rem;
}

@media screen and (max-width: 1000px) {
  .title {
    padding: 4rem 1rem;
  }
}

@media screen and (max-width: 750px) {
  nav {
    flex-direction: column;
  }

  a {
    width: 100%;
    border-right: none;
    border-bottom: none;
  }

  a:nth-last-child(1) {
    border-bottom: 0.2rem solid var(--primary-color);
  }
}
</style>
