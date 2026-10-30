<script setup>
import alphabets from '@/assets/alphabets.json'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()

const alphabet = computed(() => alphabets.find((a) => a.id === route.params.id))

const infoLabels = {
  author: 'Creator',
  publication: 'Publication',
  motivation: 'Motivation',
  system: 'System',
  longevity: 'Implementation',
}

const allGraphemes = import.meta.glob('/src/assets/graphemes/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const alphabetGraphemes = computed(() => {
  if (!alphabet.value) return []
  const prefix = `/src/assets/graphemes/${alphabet.value.id}/`
  return Object.entries(allGraphemes)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, url]) => ({
      url,
      name: path.split('/').pop().replace('.svg', ''),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
})

const filter = ref('all')
watch(
  () => route.params.id,
  () => {
    filter.value = 'all'
  },
)

const filteredGraphemes = computed(() => {
  if (filter.value === 'consonants')
    return alphabetGraphemes.value.filter(
      (g) =>
        g.name.includes('voiced') || g.name.includes('consonant') || g.name.includes('ejective'),
    )
  if (filter.value === 'vowels')
    return alphabetGraphemes.value.filter(
      (g) =>
        !g.name.includes('voiced') && !g.name.includes('consonant') && !g.name.includes('ejective'),
    )
  return alphabetGraphemes.value
})

const selectedGrapheme = ref(null)

const selectedIndex = computed(() =>
  filteredGraphemes.value.findIndex((g) => g.url === selectedGrapheme.value?.url),
)

const prevGrapheme = computed(
  () =>
    filteredGraphemes.value[
      (selectedIndex.value - 1 + filteredGraphemes.value.length) % filteredGraphemes.value.length
    ],
)

const nextGrapheme = computed(
  () => filteredGraphemes.value[(selectedIndex.value + 1) % filteredGraphemes.value.length],
)

const authorError = ref(false)
watch(
  () => route.params.id,
  () => {
    authorError.value = false
  },
)

console.log(Object.keys(allGraphemes).slice(0, 3))
console.log(`prefix: /src/assets/graphemes/${alphabet.value.id}/`)
</script>

<template>
  <div id="page" v-if="alphabet">
    <main>
      <header>
        <h1>{{ alphabet.title }}</h1>
        <img
          v-if="!authorError"
          :src="`/src/assets/authors/${alphabet.id}.webp`"
          :alt="`Author of ${alphabet.title}`"
          @error="authorError = true"
          class="avatar"
        />
      </header>

      <section id="info">
        <div class="information" v-for="(label, key) in infoLabels" :key="key">
          <span class="category">{{ label }}</span>
          <p class="text">{{ alphabet.information[key] ?? alphabet[key] }}</p>
        </div>
      </section>

      <section class="showcase">
        <div class="information">
          <span class="category">Languages</span>
          <div class="languages">
            <span v-for="language in alphabet.language" :key="language">{{ language }}</span>
          </div>
        </div>

        <div id="showcase">
          <img class="showcase-img" :src="`/showcase/${alphabet.id}.svg`" :alt="alphabet.title" />
          <p>
            The quick brown fox jumps over the lazy dog. <br />
            He did not have to, but he thought it was the cheeky thing to do.
          </p>
        </div>
      </section>

      <section id="alphabet">
        <div class="alphabet-header">
          <div class="filters">
            <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
            <span>/</span>
            <button :class="{ active: filter === 'consonants' }" @click="filter = 'consonants'">
              Consonants
            </button>
            <span>/</span>
            <button :class="{ active: filter === 'vowels' }" @click="filter = 'vowels'">
              Vowels
            </button>
          </div>

          <div class="amount">{{ filteredGraphemes.length }}</div>
        </div>

        <div class="graphemes">
          <div
            v-for="grapheme in filteredGraphemes"
            :key="grapheme.path"
            @click="selectedGrapheme = grapheme"
            class="grapheme"
          >
            <img :src="grapheme.url" :alt="grapheme.name" />
            <p>{{ grapheme.name }}</p>
          </div>

          <div class="modal" v-if="selectedGrapheme">
            <div class="detail">
              <div class="buttons">
                <button @click.stop="selectedGrapheme = prevGrapheme">Previous</button>
                <button @click.stop="selectedGrapheme = null">Close</button>
                <button @click.stop="selectedGrapheme = nextGrapheme">Next</button>
              </div>
              <div class="modal-content">
                <img :src="selectedGrapheme.url" :alt="selectedGrapheme.name" />
                <p>{{ selectedGrapheme.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <div v-else id="page">
    <main>
      <p class="not-found">Alphabet not found.</p>
    </main>
  </div>
</template>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

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

.avatar {
  height: 5vw;
}

#info {
  width: 100%;
  display: flex;
  gap: 1.5rem;
}

.information {
  width: 20%;
  font: var(--body);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category {
  width: 100%;
  font: var(--body-bold);
}

.languages {
  display: flex;
  flex-direction: column;
}

.showcase {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10rem;
}

.showcase p {
  font: var(--body-small);
}

#showcase {
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-right: 11vw;
}

#alphabet {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15rem;
}

.alphabet-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1rem;
}

.filters {
  width: 100%;
  display: flex;
  align-items: center;
}

button {
  padding: 0 0.25rem;
  border: none;
  background: none;
  font: var(--body);
  cursor: pointer;
}

button.active,
button:hover {
  font: var(--body-bold);
}

.amount {
  font-weight: 700;
}

.graphemes {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.grapheme {
  width: 16.666%;
  padding: 3rem 1rem;
  border-radius: 0.5rem;
  border-top: 1px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  transition: background-color 0.4s ease;
}

.grapheme img {
  height: 4vw;
}

.grapheme p {
  font: var(--body-small);
  text-align: center;
}

.grapheme:hover {
  background-color: #d3d3d3;
  cursor: pointer;
}

.modal {
  position: fixed;
  width: 100%;
  inset: 0;
  background: #ececeb;
  z-index: 100;
  padding: 1rem;
}

.detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.buttons button {
  width: 33.333%;
}

.modal p {
  font: var(--body);
  margin-top: 5rem;
}

.modal img {
  height: 40vh;
}
</style>
