<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
  <header>
    <h1>THE PHONETIC ALPHABET ARCHIVE</h1>
    <div>
      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav :class="{ open: menuOpen }">
        <RouterLink to="/" @click="menuOpen = false">Archive</RouterLink>
        <RouterLink to="/about" @click="menuOpen = false">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  height: fit-content;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  z-index: 100;
}

h1 {
  font: var(--header-1);
  position: relative;
  bottom: 0.7rem;
}

nav {
  display: none;
}

nav.open {
  display: flex;
  flex-direction: column;
  align-items: end;
}

div {
  display: flex;
  flex-direction: column;
  align-items: end;
}

a {
  text-decoration: none;
  font: var(--header-2);
}

a::after {
  height: 4px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  align-self: end;
}

.hamburger span {
  display: block;
  width: 2rem;
  height: 4px;
  transition: all 0.3s ease;
  background: black;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
  margin-bottom: 0.2rem;
}
</style>
