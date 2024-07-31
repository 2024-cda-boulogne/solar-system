<template>
    <div>
      <h1>Informations sur les planètes</h1>
      <ul v-if="planets.length > 0">
        <li v-for="planet in planets" :key="planet.id">
          {{ planet.name }} - Diamètre : {{ planet.meanRadius }} km
        </li>
      </ul>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Déclaration des types
interface Body {
  id: string;
  name: string;
  meanRadius: number;
  isPlanet: boolean;
}

interface ApiResponse {
  bodies: Body[];
}

// Déclaration des variables réactives
const planets = ref<Body[]>([]);
const error = ref<string | null>(null);

// Fonction de récupération des données
const fetchPlanets = async () => {
  try {
    const response = await axios.get<ApiResponse>('https://api.le-systeme-solaire.net/rest/bodies/');
    // Typage du filtre
    planets.value = response.data.bodies.filter((body) => body.isPlanet);
  } catch (err) {
    error.value = 'Erreur lors de la récupération des données.';
    console.error('Détails de l\'erreur : ', err);
  }
};

// Appel de la fonction lors du montage du composant
onMounted(fetchPlanets);

  </script>
  
  <style scoped>
  /* Styles spécifiques au composant */
  h1 {
    color: #333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
  }
  </style>
  