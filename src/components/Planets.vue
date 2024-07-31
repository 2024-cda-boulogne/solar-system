<template>
  <div>
    <h1>Informations sur les planètes</h1>
    <ul v-if="planets.length > 0">
      <li v-for="planet in planets" :key="planet.id">
        <h2>{{ planet.englishName }} ({{ planet.name }})</h2>
        <p>Diamètre moyen : {{ planet.meanRadius }} km</p>
        <p>Masse : {{ planet.mass?.massValue }} × 10^{{ planet.mass?.massExponent }} kg</p>
        <p>Gravité : {{ planet.gravity }} m/s²</p>
        <p>Température moyenne : {{ planet.avgTemp }} K</p>
        <p>Type de corps : {{ planet.bodyType }}</p>
        <p>Découvert par : {{ planet.discoveredBy ?? 'Inconnu' }}</p>
        <p>Date de découverte : {{ planet.discoveryDate ?? 'Inconnue' }}</p>
        <p>Nom alternatif : {{ planet.alternativeName ?? 'Aucun' }}</p>
        <!-- Ajoutez d'autres champs ici selon vos besoins -->
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Moon {
  moon: string;
  rel: string;
}

interface Mass {
  massValue: number;
  massExponent: number;
}

interface Volume {
  volValue: number;
  volExponent: number;
}

interface AroundPlanet {
  planet: string;
  rel: string;
}

interface Body {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons?: Moon[];
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  mass?: Mass;
  vol?: Volume;
  density: number;
  gravity: number;
  escape: number;
  meanRadius: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimension?: string;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet?: AroundPlanet;
  discoveredBy?: string;
  discoveryDate?: string;
  alternativeName?: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: string;
  rel: string;
}

interface ApiResponse {
  bodies: Body[];
}

const planets = ref<Body[]>([]);
const error = ref<string | null>(null);

const fetchPlanets = async () => {
  try {
    const response = await axios.get<ApiResponse>('https://api.le-systeme-solaire.net/rest/bodies/');
    
    if (response.data && Array.isArray(response.data.bodies)) {
      planets.value = response.data.bodies.filter((body) => body.isPlanet);
    } else {
      error.value = 'Les données reçues ne sont pas valides.';
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = `Erreur Axios: ${err.message}`;
    } else {
      error.value = 'Une erreur est survenue lors de la récupération des données.';
    }
    console.error('Détails de l\'erreur : ', err);
  }
};

onMounted(fetchPlanets);
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
