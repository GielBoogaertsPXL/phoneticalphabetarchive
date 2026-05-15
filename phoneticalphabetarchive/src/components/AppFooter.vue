<script setup></script>

<template>
  <footer>
    <div class="filler"></div>
    <div class="title">THE PHONETIC ALPHABET ARCHIVE</div>
    <div class="information">
      <div class="side"></div>
      <div class="copyright">©2026 — gielboogaertsstudio</div>
      <div class="privacy">Privacy</div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0.2rem solid var(--primary-color);
  margin-top: -0.19rem;
}

.title {
  width: 100%;
  padding: 1rem;
  border-bottom: 0.2rem solid var(--primary-color);
  font: var(--header-2);
  font-weight: 400;
}

.information {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.information div {
  padding: 1rem;
  font: var(--header-3);
  font-weight: 700;
  text-align: center;
}

.side {
  width: 25%;
}

.privacy {
  width: 25%;
}

.privacy:hover {
  background: var(--secondary-color);
  color: white;
  cursor: pointer;
}

.copyright {
  width: 50%;
  border-right: 0.2rem solid var(--primary-color);
  border-left: 0.2rem solid var(--primary-color);
}

.filler {
  width: 100%;
  height: 10rem;
  border-bottom: 0.2rem solid var(--primary-color);
}

@media screen and (max-width: 850px) {
  .side {
    display: none;
  }

  .information {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .information div {
    padding: 1rem 0;
  }

  .copyright {
    border-left: none;
    width: 60%;
  }

  .privacy {
    width: 40%;
  }
}
</style>
