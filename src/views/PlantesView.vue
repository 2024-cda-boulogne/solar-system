<template>
    <div>
      <AboutView @planet-clicked="fetchPlanetDetails"></AboutView>
      <Planets :planetDetails="selectedPlanet"></Planets>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import AboutView from '@/views/AboutView.vue'; 
  import Planets from '../components/Planets.vue';
  
  const selectedPlanet = ref<Record<string, any> | undefined>(undefined);
  
  const fetchPlanetDetails = async (planetName: string) => {
    try {
      const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${planetName}`);
      selectedPlanet.value = response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération des détails de la planète:', err);
    }
  };
  </script>
  