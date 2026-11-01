<script setup>
import AppArticle from '@/components/AppArticle.vue'
</script>

<template>
  <main>
    <header>
      <h1>Introduction into phonetics</h1>
    </header>
    <section id="info">
      <div class="information">
        <p>
          Speech sounds can be divided into two main groups: <span>vowels</span> and
          <span>consonants</span>. The difference lies in how air moves through the vocal tract
          during speech. Vowels are produced with a relatively open passage, while consonants
          involve a narrowing or closure that changes the airflow. Each group has its own
          characteristics and can be classified according to the movements and positions of the
          speech organs.
        </p>
      </div>
    </section>
    <section class="explanation">
      <h1>Consonants</h1>
      <AppArticle
        word="Voicing"
        description="Voicing describes the vibration of the vocal folds, located in the larynx. When air passes
          through the larynx and causes the vocal folds to vibrate, the resulting sound is voiced.
          When the vocal folds do not vibrate, the sound is voiceless. This difference can be felt
          by placing a hand against the throat while producing the sounds /z/ and /s/."
        second-description="Many consonants form voiced and voiceless pairs. The sounds /b/ and /p/, for example, are
          produced with the lips in the same position, but differ in voicing. Voicing is therefore
          one of the properties used to distinguish and classify consonant sounds."
      ></AppArticle>
      <AppArticle
        word="Place of articulation"
        description="The place of articulation describes where in the vocal tract a consonant is formed. It refers to the location where the airflow is blocked, restricted or redirected by the movement of the tongue, lips or other speech organs. The terminology often derives from the anatomical names of these locations.
        An alveolar consonant is formed when the tongue touches or approaches the alveolar ridge, the raised area immediately behind the upper front teeth. The word alveolar comes from alveolus, Latin for a small cavity or socket, referring to the tooth sockets in the jaw. Sounds such as /t/, /d/, /s/ and /n/ are alveolar in many languages."
        second-description="Other places include bilabial, formed with both lips; labiodental, formed with the lower lip and upper teeth; dental, formed at or near the teeth; palatal, formed near the hard palate; and velar, formed near the soft palate at the back of the mouth. These terms provide a vocabulary for describing the physical location of a sound."
      ></AppArticle>
      <AppArticle
        word="Manner of articulation"
        description="The manner of articulation describes how a consonant is produced, particularly how the airflow is affected. A plosive, also called a stop, is formed by completely blocking the airflow before releasing it, as in /p/ or /t/. A fricative is produced by forcing air through a narrow passage, creating friction, as in /f/ or /s/. A nasal is formed by lowering the soft palate so air can pass through the nose, as in /m/ or /n/."
        second-description="An affricate begins with a complete closure and releases into a fricative, as in the initial sound of church. An approximant is produced when the speech organs approach one another without creating the strong friction of a fricative, as in /w/ or /j/ in English yes. The names describe the physical action involved in producing each sound."
      ></AppArticle>
      <AppArticle
        word="Airstream mechanisms"
        description="Speech sounds also differ according to how the airflow is generated. Most consonants in English are pulmonic: they are produced using air pushed out from the lungs. The word pulmonic derives from the Latin pulmo, meaning lung.
        Non-pulmonic consonants use a different mechanism. Clicks, found in languages such as Xhosa, are produced by creating a pocket of air in the mouth and releasing it, rather than relying solely on air pushed out from the lungs. Other non-pulmonic sounds include implosives and ejectives, which use movements of the larynx to create different airflow conditions."
        second-description="Some sounds involve two articulatory actions at once. These are described as co-articulated when two places of articulation are involved simultaneously. The prefix co- comes from Latin and means together. Such sounds demonstrate that speech production can involve more than one location or movement at the same time."
      ></AppArticle>
    </section>

    <section class="explanation">
      <h1>Vowels</h1>
      <AppArticle
        word="Monophthongs & diphthongs"
        description="A monophthong is a vowel whose sound quality remains relatively stable throughout its duration. The term comes from the Greek monos, meaning one, and phthongos, meaning sound or voice. The vowel in bed, in many English accents, is an example of a monophthong.
        A diphthong is a vowel sound that moves from one vowel quality towards another within the same syllable. Its name combines the Greek di, meaning two, with phthongos, meaning sound or voice. The vowel in boy, in many English accents, is a diphthong because the tongue position changes as the sound is produced."
        second-description="The distinction lies in movement: a monophthong maintains a relatively steady vowel quality, while a diphthong involves a change in vowel quality. The precise examples vary between languages and accents, since the same written word may contain different vowel sounds depending on how it is spoken."
      ></AppArticle>
      <AppArticle
        word="Tongue height"
        description="It refers to how high the tongue is raised inside the mouth. Vowels are described as close (high) when the tongue is raised near the roof of the mouth, near-close when it is slightly lower, close-mid when it is midway between close and mid, midwhen it occupies an intermediate height, open-mid when it is midway between mid and open, near-open when it is close to the lowest position, and open (low) when the tongue is lowered towards the floor of the mouth."
      ></AppArticle>
      <AppArticle
        word="Part of the tongue"
        description="Which part of the tongue is raised. Front vowels are produced with the highest point of the tongue towards the front of the mouth; near-front vowels are positioned slightly further back; central vowels are produced with the highest point near the centre; near-back vowels are slightly forward of the back position; and back vowels are produced with the highest point towards the back of the mouth."
      ></AppArticle>
      <AppArticle
        word="Shape of the lips"
        description="It describes the shape of the lips during vowel production. Rounded vowels are produced with the lips rounded or sometimes protruded, while unrounded vowels are produced without rounding, with the lips either neutral or spread. These characteristics work together to distinguish vowel sounds and describe their articulation systematically."
      ></AppArticle>
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

span {
  font: var(--body-bold);
}

#info {
  width: 100%;
  display: flex;
  gap: 1.5rem;
}

.information {
  width: 35%;
  font: var(--body);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.explanation {
  margin-top: 10rem;
}

.explanation h1 {
  margin-bottom: 2rem;
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 3rem;
    line-height: 3.1rem;
  }

  .information {
    width: 100%;
  }
}
</style>
