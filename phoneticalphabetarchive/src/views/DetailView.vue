<script setup>
import alphabets from '@/assets/alphabets.json'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()

const alphabet = computed(() => alphabets.find((a) => a.id === route.params.id))

const infoLabels = {
  image: 'Creator(s)',
  author: 'Creator(s)',
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
      <section id="showcase">
        <img
          class="showcase-img"
          :src="`/src/assets/showcase/${alphabet.id}.svg`"
          :alt="alphabet.title"
        />
      </section>

      <div class="filler"></div>

      <section id="info">
        <div class="information" v-for="(label, key) in infoLabels" :key="key">
          <div class="category">{{ label }}</div>
          <div class="text">
            <template v-if="key === 'image'">
              <img
                v-if="!authorError"
                :src="`/src/assets/authors/${alphabet.id}.webp`"
                :alt="`Author of ${alphabet.title}`"
                @error="authorError = true"
              />
              <span v-else>No picture</span>
            </template>
            <span v-else>{{ alphabet.information[key] ?? alphabet[key] }}</span>
          </div>
        </div>
      </section>

      <div class="filler"></div>

      <section id="alphabet">
        <div class="filters">
          <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
          <button :class="{ active: filter === 'consonants' }" @click="filter = 'consonants'">
            Consonants
          </button>
          <button :class="{ active: filter === 'vowels' }" @click="filter = 'vowels'">
            Vowels
          </button>
          <div class="empty"></div>
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
  border-right: 0.2rem solid var(--primary-color);
  border-left: 0.2rem solid var(--primary-color);
}

#showcase {
  width: 100%;
  padding: 4vw;
  border-bottom: 0.2rem solid var(--primary-color);
}

.showcase-img {
  width: 100%;
}

#info {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-top: 0.2rem solid var(--primary-color);
}

.category {
  width: 100%;
  border-bottom: 0.2rem solid var(--primary-color);
  font: var(--header-3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}

.text {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text img {
  height: 12rem;
}

.information {
  width: 33.333%;
  border: 0.2rem solid var(--primary-color);
  border-top: none;
  border-left: none;
  font: var(--body);
}

.information:nth-child(3n) {
  border-right: none;
}

#alphabet {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-top: 0.2rem solid var(--primary-color);
}

.filters {
  width: 100%;
  display: flex;
}

button,
.amount {
  background: none;
  width: 20%;
  border: 0.2rem solid var(--primary-color);
  border-left: none;
  border-top: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font: var(--header-3);
}

button.active {
  background-color: var(--secondary-color);
  color: white;
}

.amount {
  border-right: none;
  font-weight: 800;
}

button:hover {
  background-color: var(--secondary-color);
  color: white;
  cursor: pointer;
}

.empty {
  width: 20%;
  border-bottom: 0.2rem solid var(--primary-color);
  border-right: 0.2rem solid var(--primary-color);
}

.graphemes {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.grapheme {
  border: 0.2rem solid var(--primary-color);
  border-left: none;
  border-top: none;
  width: 16.666%;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.grapheme:nth-child(6n) {
  border-right: none;
}

.grapheme img {
  height: 4vw;
}

.grapheme p {
  font: var(--body-small);
  text-align: center;
}

.grapheme:hover {
  background-color: var(--secondary-color);
  color: white;
  cursor: pointer;
}

.grapheme:hover img {
  filter: invert(1);
}

.filler {
  width: 100%;
  height: 10rem;
}

.modal {
  position: fixed;
  width: 100%;
  inset: 0;
  background: white;
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
  border: 0.2rem solid var(--primary-color);
  border-top: none;
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
  border: 0.2rem solid var(--primary-color);
  border-left: none;
  width: 33.333%;
}

.buttons button:nth-child(3) {
  border-right: none;
}

.modal p {
  font: var(--body);
  margin-top: 5rem;
}

.modal img {
  height: 40vh;
}
</style>
