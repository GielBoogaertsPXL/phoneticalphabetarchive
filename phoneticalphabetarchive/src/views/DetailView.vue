<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import alphabets from '@/assets/alphabets.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const alphabet = computed(() => alphabets.find((a) => a.id === route.params.id))

const currentIndex = computed(() => alphabets.findIndex((a) => a.id === route.params.id))

const prevAlphabet = computed(() =>
  currentIndex.value > 0 ? alphabets[currentIndex.value - 1] : null,
)

const nextAlphabet = computed(() =>
  currentIndex.value < alphabets.length - 1 ? alphabets[currentIndex.value + 1] : null,
)

const infoLabels = {
  language: 'Language(s)',
  number: 'Number of characters',
  author: 'Creator',
  publication: 'Publication',
  motivation: 'Motivation',
  system: 'System',
  longevity: 'Longevity',
}
</script>

<template>
  <div id="page" v-if="alphabet">
    <AppHeader :style="{ color: 'var(--darkgreen)' }" />

    <main>
      <div class="back">
        <RouterLink :to="{ name: 'home' }">← All alphabets</RouterLink>
      </div>

      <div class="detail">
        <!-- Left: large glyph -->
        <div class="glyph-column">
          <div class="glyph-wrap">
            <svg
              class="grapheme"
              :viewBox="alphabet.viewBox"
              :style="alphabet.color ? { fill: alphabet.color } : {}"
            >
              <g :id="alphabet.id">
                <path :d="alphabet.path" />
              </g>
            </svg>
          </div>
        </div>

        <!-- Right: info -->
        <div class="info-column">
          <span class="year">{{ alphabet.year }}</span>
          <h1>{{ alphabet.title }}</h1>

          <div class="divider" />

          <dl v-if="alphabet.information" class="info-list">
            <template v-for="(label, key) in infoLabels" :key="key">
              <template v-if="alphabet.information[key]">
                <dt>{{ label }}</dt>
                <dd>{{ alphabet.information[key] }}</dd>
              </template>
            </template>
          </dl>

          <p v-else class="no-info">No further information available for this alphabet.</p>
        </div>
      </div>

      <!-- Prev / Next navigation -->
      <nav class="pagination">
        <RouterLink
          v-if="prevAlphabet"
          :to="{ name: 'alphabet', params: { id: prevAlphabet.id } }"
          class="nav-link prev"
        >
          <svg class="nav-glyph" :viewBox="prevAlphabet.viewBox">
            <path :d="prevAlphabet.path" />
          </svg>
          <span class="nav-meta">
            <span class="nav-dir">← Previous</span>
            <span class="nav-title">{{ prevAlphabet.title }}</span>
          </span>
        </RouterLink>

        <div v-else class="nav-link placeholder" />

        <RouterLink
          v-if="nextAlphabet"
          :to="{ name: 'alphabet', params: { id: nextAlphabet.id } }"
          class="nav-link next"
        >
          <span class="nav-meta align-right">
            <span class="nav-dir">Next →</span>
            <span class="nav-title">{{ nextAlphabet.title }}</span>
          </span>
          <svg class="nav-glyph" :viewBox="nextAlphabet.viewBox">
            <path :d="nextAlphabet.path" />
          </svg>
        </RouterLink>

        <div v-else class="nav-link placeholder" />
      </nav>
    </main>

    <AppFooter :style="{ backgroundColor: 'var(--darkgreen)' }" />
  </div>

  <div v-else id="page">
    <AppHeader :style="{ color: 'var(--darkgreen)' }" />
    <main>
      <p class="not-found">Alphabet not found.</p>
    </main>
    <AppFooter :style="{ backgroundColor: 'var(--darkgreen)' }" />
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
  padding: 6rem 2rem 10rem;
  display: flex;
  flex-direction: column;
}

/* Back link */
.back {
  margin-bottom: 4rem;
}

.back a {
  font: var(--body);
  color: var(--darkgreen);
  text-decoration: none;
  letter-spacing: 0.03em;
}

.back a:hover {
  opacity: 1;
}

/* Main detail layout */
.detail {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 6rem;
  align-items: start;
}

/* Glyph */
.glyph-column {
  position: sticky;
  top: 4rem;
}

.glyph-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  aspect-ratio: 1;
}

.grapheme {
  fill: var(--darkgreen);
  max-width: 100%;
  max-height: 32vw;
  width: auto;
  height: auto;
}

/* Info column */
.info-column {
  padding-top: 0.5rem;
  padding-right: 5rem;
}

.year {
  display: block;
  font: var(--body);
  color: var(--darkgreen);
  font: var(--header-3);
  margin-bottom: 1rem;
  margin-left: 0.2rem;
}

h1 {
  font: var(--body-bold);
  color: var(--darkgreen);
  font: var(--header-1);
}

/* Info list */
.info-list {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0;
}

.info-list dt {
  font: var(--body-bold);
  color: var(--darkgreen);
  font: var(--body-bold);
  text-transform: uppercase;
  padding: 1.5rem 2rem 1.5rem 0;
  border-top: 1px solid color-mix(in srgb, var(--darkgreen) 12%, transparent);
  align-self: start;
}

.info-list dd {
  font: var(--body);
  color: var(--darkgreen);
  font: var(--body);
  padding: 1.5rem 0;
  border-top: 1px solid color-mix(in srgb, var(--darkgreen) 12%, transparent);
}

.no-info {
  font: var(--body);
  color: var(--darkgreen);
  font-style: italic;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8rem;
  padding-top: 3rem;
  border-top: 1px solid color-mix(in srgb, var(--darkgreen) 15%, transparent);
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
  padding: 1rem;
  margin: -1rem;
  flex: 1;
}

.nav-link.next {
  justify-content: flex-end;
}

.nav-link.placeholder {
  pointer-events: none;
}

.nav-glyph {
  fill: var(--darkgreen);
  width: auto;
  height: 3rem;
  flex-shrink: 0;
}

.nav-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.nav-meta.align-right {
  text-align: right;
}

.nav-dir {
  font: var(--body);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--darkgreen);
}

.nav-title {
  font: var(--body-bold);
  color: var(--darkgreen);
  font-size: 0.9rem;
}

.not-found {
  font: var(--body);
  color: var(--darkgreen);
  opacity: 0.5;
  padding: 4rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .glyph-column {
    position: static;
  }

  .glyph-wrap {
    aspect-ratio: auto;
    padding: 3rem;
  }

  .grapheme {
    max-height: 40vw;
  }

  .info-list {
    grid-template-columns: 1fr;
  }

  .info-list dt {
    padding-bottom: 0.25rem;
    border-top: 1px solid color-mix(in srgb, var(--darkgreen) 12%, transparent);
  }

  .info-list dd {
    padding-top: 0;
    border-top: none;
  }

  .pagination {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-link.next {
    justify-content: flex-start;
  }
}
</style>
