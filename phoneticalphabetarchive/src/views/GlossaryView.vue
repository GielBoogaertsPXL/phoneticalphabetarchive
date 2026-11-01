<script setup>
import glossary from '@/assets/glossary.json'
import AppArticle from '@/components/AppArticle.vue'
</script>

<template>
  <main>
    <header>
      <h1 v-reveal>Glossary</h1>
    </header>
    <section class="glossary">
      <AppArticle
        v-for="item in glossary"
        v-reveal
        :key="item.word"
        :word="item.word"
        :description="item.explanation">
      </AppArticle>
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10rem 2rem 0;
}

header {
  display: flex;
  gap: 2rem;
  margin-bottom: 8rem;
}

h1 {
  font-size: 5vw;
  line-height: 6vw;
  letter-spacing: -7%;
}

.glossary {
  margin-top: 10rem;
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 3rem;
    line-height: 3.1rem;
  }
}
</style>
