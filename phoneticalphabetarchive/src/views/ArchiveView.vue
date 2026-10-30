<script setup>
import { computed, ref } from 'vue'
import alphabets from '@/assets/alphabets.json'

const view = ref('list') // 'list' | 'grid'
const search = ref('')
const filterKey = ref(null) // 'language' | 'type' | null
const filterValue = ref(null)
const orderKey = ref(null) // 'year' | 'title' | 'number' | null
const orderDir = ref('asc') // 'asc' | 'desc'

// Always returns an array, whatever the field looks like in the JSON
function getValues(alphabet, key) {
  const value = alphabet[key] ?? alphabet.information?.[key]
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value : [value]
}

// Clicking a filter category shows its options; clicking it again closes it
function toggleFilterKey(key) {
  if (filterKey.value === key) {
    filterKey.value = null
  } else {
    filterKey.value = key
  }
  filterValue.value = null
}

// Clicking the selected option again clears it
function toggleFilterValue(value) {
  filterValue.value = filterValue.value === value ? null : value
}

// Click cycle: ascending -> descending -> off
function toggleOrder(key) {
  if (orderKey.value !== key) {
    orderKey.value = key
    orderDir.value = 'asc'
  } else if (orderDir.value === 'asc') {
    orderDir.value = 'desc'
  } else {
    orderKey.value = null
    orderDir.value = 'asc'
  }
}

// Stagger delay only applies during the enter animation
function setDelay(el) {
  el.style.transitionDelay = `${el.dataset.index * 30}ms`
}

function clearDelay(el) {
  el.style.transitionDelay = ''
}

const filterOptions = computed(() => {
  if (!filterKey.value) return []
  const all = alphabets.flatMap((a) => getValues(a, filterKey.value))
  return [...new Set(all)].sort((a, b) => String(a).localeCompare(String(b)))
})

const visibleAlphabets = computed(() => {
  const query = search.value.trim().toLowerCase()

  let result = alphabets.filter((a) => {
    if (query) {
      const haystack = [a.title, a.creator, ...getValues(a, 'language')].join(' ').toLowerCase()
      if (!haystack.includes(query)) return false
    }
    if (filterKey.value && filterValue.value) {
      if (!getValues(a, filterKey.value).includes(filterValue.value)) return false
    }
    return true
  })

  if (orderKey.value) {
    const key = orderKey.value
    const direction = orderDir.value === 'asc' ? 1 : -1
    result = [...result].sort((a, b) => {
      if (key === 'title') {
        return String(a.title).localeCompare(String(b.title)) * direction
      }
      return ((parseInt(a[key]) || 0) - (parseInt(b[key]) || 0)) * direction
    })
  }

  return result
})
</script>

<template>
  <div id="page">
    <main>
      <section class="modifiers">
        <div class="search">
          <label for="search">
            Search
            <input type="text" name="search" id="search" v-model="search" />
          </label>
        </div>

        <div class="view">
          <button :class="{ active: view === 'list' }" @click="view = 'list'">List</button>
          <span>/</span>
          <button :class="{ active: view === 'grid' }" @click="view = 'grid'">Grid</button>
        </div>

        <div class="filters">
          <span>Filter by</span>
          <button
            :class="{ active: filterKey === 'language' }"
            @click="toggleFilterKey('language')"
          >
            Language
          </button>
          <span>/</span>
          <button :class="{ active: filterKey === 'type' }" @click="toggleFilterKey('type')">
            Type
          </button>
        </div>

        <div class="order">
          <span>Order by</span>
          <button :class="{ active: orderKey === 'year' }" @click="toggleOrder('year')">
            Year
            <template v-if="orderKey === 'year'">{{ orderDir === 'asc' ? '↑' : '↓' }}</template>
          </button>
          <span>/</span>
          <button :class="{ active: orderKey === 'title' }" @click="toggleOrder('title')">
            Name
            <template v-if="orderKey === 'title'">{{ orderDir === 'asc' ? '↑' : '↓' }}</template>
          </button>
          <span>/</span>
          <button :class="{ active: orderKey === 'number' }" @click="toggleOrder('number')">
            Characters
            <template v-if="orderKey === 'number'">{{ orderDir === 'asc' ? '↑' : '↓' }}</template>
          </button>
        </div>

        <!-- Expanding container -->
        <Transition name="expand">
          <div class="options-wrap" v-if="filterOptions.length">
            <!-- Staggered buttons -->
            <TransitionGroup
              tag="div"
              name="option"
              class="options"
              @before-enter="setDelay"
              @after-enter="clearDelay"
            >
              <button
                v-for="(option, index) in filterOptions"
                :key="option"
                :data-index="index"
                :class="{ active: filterValue === option }"
                @click="toggleFilterValue(option)"
              >
                {{ option }}
              </button>
            </TransitionGroup>
          </div>
        </Transition>
      </section>

      <section :class="view">
        <RouterLink
          v-for="alphabet in visibleAlphabets"
          :key="alphabet.id"
          :to="{ name: 'alphabet', params: { id: alphabet.id } }"
        >
          <div class="left">
            <div class="image">
              <img
                class="grapheme"
                :class="{ 'no-invert': alphabet.color }"
                :src="`/exemplary-graphemes/${alphabet.id}.svg`"
                :alt="alphabet.title"
                :data-id="alphabet.id"
              />
            </div>
            <div class="details">
              <div class="languages">
                <span v-for="creator in alphabet.creator" :key="creator">{{ creator }}</span>
              </div>
              <div class="languages">
                <span v-for="language in alphabet.language" :key="language">{{ language }}</span>
              </div>
              <span>{{ alphabet.number }}</span>
            </div>
          </div>
          <div class="information">
            <h2>{{ alphabet.title }}</h2>
            <p>{{ alphabet.year }}</p>
          </div>
        </RouterLink>

        <p v-if="!visibleAlphabets.length" class="empty">No alphabets found.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
#page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 4rem - 112px);
}

main {
  margin-top: 15rem;
  width: 100%;
  padding: 0 2rem;
  flex: 1;
}

.modifiers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  font: var(--body);
}

.search {
  width: 100%;
}

.search input {
  background: none;
  border: none;
  border-bottom: 1px solid black;
  padding-top: 0.2rem;
  font: var(--body);
}

.search input:focus {
  outline: none;
}

/* ---------- filter options + animation ---------- */
.options-wrap {
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  overflow: hidden;
  min-height: 0;
}

/* Container: height grows from 0 and fades in */
.expand-enter-active,
.expand-leave-active {
  transition:
    grid-template-rows 0.4s ease,
    opacity 0.4s ease;
}

.expand-enter-from,
.expand-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

/* Buttons: slide up one after another (delay is set by setDelay in the script) */
.option-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.option-enter-from {
  opacity: 0;
  transform: translateY(0.5rem);
}

button {
  padding: 0 0.25rem;
  border: none;
  background: none;
  font: var(--body);
  cursor: pointer;
}

.options button {
  font: var(--body-small);
}

.options button:hover {
  font: var(--body-small);
  font-weight: 500;
}

button:nth-child(1) {
  padding-left: 0;
}

button:hover,
button.active {
  font: var(--body-bold);
}

/* ---------- shared ---------- */
.list,
.grid {
  width: 100%;
}

a {
  border-top: 1px solid var(--primary-color);
  padding: 1.5rem 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.4s ease;
}

a:hover {
  background-color: #d3d3d3;
}

.image {
  display: flex;
  align-items: center;
}

.grapheme {
  height: 5rem;
}

.grapheme[data-id='colorbet'] {
  width: 5rem;
  height: auto;
}

.languages {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

h2 {
  font: var(--body-bold);
}

.list p,
.list span,
.grid p,
.grid span {
  font: var(--body-small);
}

/* ---------- list view ---------- */
.list {
  display: flex;
  flex-direction: column;
}

.list a {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.list .left {
  display: flex;
  gap: 4rem;
}

.list .image {
  width: 8vw;
  height: 5rem;
}

.list .details {
  display: flex;
  gap: 2rem;
}

.list .details > span,
.list .details > div {
  width: 8rem;
}

.list .information {
  display: flex;
  flex-direction: column;
  text-align: right;
}

/* ---------- grid view ---------- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}

.grid a {
  display: flex;
  justify-content: space-between;
  padding: 3rem 1.5rem;
}

.grid .image {
  height: 6rem;
}

.grid .grapheme {
  height: 6rem;
}

.grid .grapheme[data-id='colorbet'] {
  width: 8rem;
  height: auto;
}

.grid .details {
  display: none;
}

.grid .information {
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100%;
}

.grid .information h2 {
  font: var(--body-small);
  font-weight: 500;
}

.empty {
  grid-column: 1 / -1;
}

@media screen and (max-width: 810px) {
  .list .details {
    display: none;
  }
}
</style>
