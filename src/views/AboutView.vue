<template>
  <div id="app">
    <div ref="solarSystem" class="solar-system"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'App',
  mounted() {
    this.initSolarSystem();
  },
  methods: {
    initSolarSystem() {
      // Création de la scène
      const scene = new THREE.Scene();

      // Création de la caméra
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 300;

      // Création du renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.solarSystem.appendChild(renderer.domElement);

      // Création des planètes (fichiers PNG)
      const createPlanet = (imagePath, size, position) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imagePath, (texture) => {
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(size * 0.01, size * 0.01, 1); // Ajuster l'échelle des sprites
          sprite.position.set(...position);
          scene.add(sprite);
        });
      };

      // Ajout des planètes avec des fichiers PNG
      createPlanet('images/sun.png', 8092, [0, 0, 0]);    // Soleil
      createPlanet('images/mercury.png', 1024, [70, 0, 0]); // Mercure
      createPlanet('images/venus.png', 1538, [100, 0, 0]);  // Vénus
      createPlanet('images/earth.png', 2048, [130, 0, 0]);  // Terre
      createPlanet('images/moon.png', 768, [140, 0, 0]);    // Lune
      createPlanet('images/mars.png', 1024, [190, 0, 0]);   // Mars
      createPlanet('images/jupiter.png', 3072, [250, 0, 0]); // Jupiter
      createPlanet('images/saturn.png', 2560, [320, 0, 0]); // Saturne
      createPlanet('images/uranus.png', 2048, [380, 0, 0]); // Uranus
      createPlanet('images/neptune.png', 2048, [440, 0, 0]); // Neptune

      // Animation
      const animate = function () {
        requestAnimationFrame(animate);

        // Rotation de la caméra autour du soleil
        camera.position.x = 300 * Math.sin(Date.now() * 0.001);
        camera.position.z = 300 * Math.cos(Date.now() * 0.001);
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.solar-system {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
