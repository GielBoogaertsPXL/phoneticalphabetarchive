<script setup></script>

<template>
  <footer>
    <h2>THE PHONETIC ALPHABET ARCHIVE</h2>
    <div>
      <section>
        <h3>ABOUT</h3>
        <RouterLink to="/about">The project</RouterLink>
        <RouterLink to="/about">Who am I?</RouterLink>
      </section>
      <section>
        <h3>CONTACT</h3>
        <a href="mailto:boogaertsgiel@gmail.com">Mail</a>
        <a href="https://www.instagram.com/gielboogaerts.studio/">Instagram</a>
        <a href="https://www.linkedin.com/in/giel-boogaerts-581b96224/">LinkedIn</a>
      </section>
      <section>
        <h3>LEGAL</h3>
        <a download="privacyPolicy.pdf">Privacy policy</a>
        <a download="termsOfUse.pdf">Terms of use</a>
      </section>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  height: fit-content;
  padding: 2rem 6rem 6rem 2rem;
  color: var(--white);
  display: flex;
  justify-content: space-between;
}

section {
  display: flex;
  flex-direction: column;
}

div {
  width: fit-content;
  display: flex;
  gap: 5rem;
  justify-content: flex-end;
}

h2 {
  font: var(--header-1);
  width: 25rem;
}

h3 {
  font: var(--body-bold);
  margin-bottom: 1rem;
}

a {
  color: var(--white);
  font: var(--body);
}
</style>
