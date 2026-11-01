<script setup></script>

<template>
  <header>
    <p>
      <RouterLink :to="{ name: 'THE PHONETIC ALPHABET ARCHIVE' }" class="logo">
        The phonetic alphabet archive</RouterLink
      >
    </p>
    <nav class="nav-fade">
      <RouterLink :to="{ name: 'THE PHONETIC ALPHABET ARCHIVE' }">Archive</RouterLink>
      <RouterLink :to="{ name: 'ABOUT' }">About</RouterLink>
      <RouterLink :to="{ name: 'GLOSSARY' }">Glossary</RouterLink>
      <RouterLink :to="{ name: 'PHONETICS' }">Phonetics</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

p,
.logo {
  font: var(--body-bold);
}

.logo {
  letter-spacing: -5%;
}

a {
  font: var(--body);
}

.router-link-active,
a:hover {
  font: var(--body-bold);
}

/* Initial fade-in matching the 0.3s page transition */
.nav-fade {
  animation: fadeIn 0.3s ease 1.5s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
