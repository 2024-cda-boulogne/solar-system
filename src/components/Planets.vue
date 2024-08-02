<template>
  <div class="planet-details">
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const planetDetails = ref<Record<string, any> | null>(null);

const fetchPlanetDetails = async (planetName: string) => {
  try {
    console.log(`Fetching details for planet: ${planetName}`);
    const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${planetName}`);
    planetDetails.value = response.data;
    console.log(`Fetched details:`, planetDetails.value);
  } catch (err) {
    console.error('Erreur lors de la récupération des détails de la planète:', err);
  }
};

const handlePlanetClicked = (event: Event) => {
  const customEvent = event as CustomEvent;
  fetchPlanetDetails(customEvent.detail);
};

onMounted(() => {
  window.addEventListener('planet-clicked', handlePlanetClicked);
});
</script>

<style scoped>
.planet-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  overflow-y: auto;
  padding: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

h1, h2 {
  color: #fff;
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