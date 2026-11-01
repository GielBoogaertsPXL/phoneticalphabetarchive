<script setup></script>

<template>
  <main>
    <header>
      <h1 v-reveal>About the archive</h1>
    </header>
    <section id="info">
      <div class="information">
        <p v-reveal>
          My name is Giel Boogaerts. The archive stems from my master project about phonetical
          alphabets,
          <a href="https://gielboogaerts.com/work/eopa">The Encyclopedia of Phonetic Alphabets↗</a>.
        </p>
        <p v-reveal="100">
          This website is a digital application of those books so all this information is available
          to everyone who is interested. It includes the entire collected archive of alphabets, each
          with contextual information and the individual graphemes.
        </p>
        <p v-reveal="200">
          There is always room for more alphabets so I’m open to new additions. Just reach out and
          we’ll see how we can integrate it.
        </p>
      </div>
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

p {
  font: var(--body);
}

a {
  font-weight: bold;
}

#info {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
}

.information {
  font: var(--body);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 3rem;
    line-height: 3.1rem;
  }
}
</style>
