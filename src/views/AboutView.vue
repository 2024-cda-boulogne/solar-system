<template>
  <div id="app">
    <div ref="solarSystem" class="solar-system"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'App',
  mounted() {
    this.initSolarSystem();
  },
  methods: {
    initSolarSystem() {
      // Création de la scène
      const scene = new THREE.Scene();

      // Ajout du fond étoilé
      const loader = new THREE.TextureLoader();
      loader.load('images/stars.jpg', function (texture) {
        scene.background = texture;
      });

      // Création de la caméra
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
      camera.position.set(0, 500, 1500);  // Ajuster la position de la caméra

      // Création du renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.solarSystem.appendChild(renderer.domElement);

      // Ajout des contrôles d'orbite
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // Activer le lissage
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

      // Fonction pour créer une planète avec une texture PNG
      const createPlanet = (imagePath, size, distance, orbitDuration, orbitTilt = 0) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(imagePath, (texture) => {
          const material = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(size, size, 1); // Ajuster l'échelle des sprites

          // Ajout de l'orbite
          const orbit = new THREE.EllipseCurve(
            0, 0, // centre X, Y
            distance, distance, // rayon X, Y
            0, 2 * Math.PI, // angle de départ et de fin
            false, // sens horaire
            orbitTilt // rotation
          );

          const points = orbit.getPoints(50);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const materialOrbit = new THREE.LineBasicMaterial({ color: 0xffffff });
          const ellipse = new THREE.Line(geometry, materialOrbit);
          ellipse.rotation.x = Math.PI / 2; // Mettre l'orbite en plan horizontal
          scene.add(ellipse);

          // Animation de la planète le long de son orbite
          const animatePlanet = () => {
            const time = Date.now() * 0.0001;
            const angle = time * 2 * Math.PI / orbitDuration;
            sprite.position.set(
              distance * Math.cos(angle),
              0,
              distance * Math.sin(angle)
            );
          };

          scene.add(sprite);
          animateFunctions.push(animatePlanet);
        });
      };

      const animateFunctions = [];

      // Ajout des planètes avec des fichiers PNG et tailles ajustées
      createPlanet('images/sun.png', 400, 0, 0.1);         // Soleil
      createPlanet('images/mercury.png', 40, 150, 0.24);  // Mercure
      createPlanet('images/venus.png', 60, 220, 0.62);   // Vénus
      createPlanet('images/earth.png', 80, 300, 1);      // Terre
      createPlanet('images/moon.png', 20, 340, 0.0748);  // Lune (orbite autour de la Terre)
      createPlanet('images/mars.png', 50, 450, 1.88);    // Mars
      createPlanet('images/jupiter.png', 160, 600, 11.86); // Jupiter
      createPlanet('images/saturn.png', 140, 750, 29.46); // Saturne
      createPlanet('images/uranus.png', 100, 900, 84);    // Uranus
      createPlanet('images/neptune.png', 100, 1050, 164.8); // Neptune

      // Animation
      const animate = function () {
        requestAnimationFrame(animate);

        // Mise à jour des contrôles d'orbite
        controls.update();

        animateFunctions.forEach(fn => fn());

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
