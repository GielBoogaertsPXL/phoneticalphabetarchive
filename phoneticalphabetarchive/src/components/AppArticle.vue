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
</style>
