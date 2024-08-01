<template>
  <div>
    <h1>Informations sur les planètes</h1>
    <div v-if="planetDetails">
      <h2>{{ planetDetails.englishName }} ({{ planetDetails.name }})</h2>
      <p>Diamètre moyen : {{ planetDetails.meanRadius }} km</p>
      <p>Masse : {{ planetDetails.mass?.massValue }} × 10^{{ planetDetails.mass?.massExponent }} kg</p>
      <p>Gravité : {{ planetDetails.gravity }} m/s²</p>
      <p>Température moyenne : {{ planetDetails.avgTemp }} K</p>
      <p>Type de corps : {{ planetDetails.bodyType }}</p>
      <p>Découvert par : {{ planetDetails.discoveredBy ?? 'Inconnu' }}</p>
      <p>Date de découverte : {{ planetDetails.discoveryDate ?? 'Inconnue' }}</p>
      <p>Nom alternatif : {{ planetDetails.alternativeName ?? 'Aucun' }}</p>

      <div v-if="planetDetails.moons && planetDetails.moons.length > 0">
        <h3>Lunes :</h3>
        <ul>
          <li v-for="moon in planetDetails.moons" :key="moon.moon">{{ moon.moon }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Aucune lune connue</p>
      </div>
    </div>
    <p v-else>Aucune planète sélectionnée.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  planetDetails: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
h1, h2 {
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

p {
  margin: 0;
  padding: 2px 0;
}
</style>
