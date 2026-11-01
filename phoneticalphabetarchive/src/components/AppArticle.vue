<script setup>
defineProps({
  word: String,
  description: String,
  secondDescription: String,
})
</script>

<template>
  <article>
    <span>{{ word }}</span>
    <div>
      <p>{{ description }}</p>
      <p>{{ secondDescription }}</p>
    </div>
  </article>
</template>

<style scoped>
article {
  width: 100%;
  min-height: 9rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  border-radius: 0.5rem;
  padding: 1.5rem 0.5rem;
  transition: background-color 0.4s ease;
}

article:hover {
  background-color: #d3d3d3;
}

div {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

span {
  font: var(--body-bold);
}

p {
  font: var(--body);
}

@media screen and (max-width: 600px) {
  article {
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 0.5rem;
  }

  div {
    width: 100%;
  }
}
</style>
