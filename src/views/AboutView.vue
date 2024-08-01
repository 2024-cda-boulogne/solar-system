<template>
  <div id="app">
    <StarryBackground />
    <div ref="solarSystem" class="solar-system"></div>
    <h1 class="title">Ça c'est mon système solaire</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StarryBackground from "../components/StarryBackground.vue";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const solarSystem = ref(null);

onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 500, 1500);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  solarSystem.value.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  const createPlanet = (imagePath, size, distance, orbitDuration, orbitTilt = 0) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imagePath, (texture) => {
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(size, size, 1);

      const orbit = new THREE.EllipseCurve(
        0, 0,
        distance, distance,
        0, 2 * Math.PI,
        false,
        orbitTilt
      );

      const points = orbit.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const materialOrbit = new THREE.LineBasicMaterial({ color: 0xffffff });
      const ellipse = new THREE.Line(geometry, materialOrbit);
      ellipse.rotation.x = Math.PI / 2;
      scene.add(ellipse);

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

  createPlanet('images/sun.png', 400, 0, 0.1);
  createPlanet('images/mercury.png', 40, 150, 0.24);
  createPlanet('images/venus.png', 60, 220, 0.62);
  createPlanet('images/earth.png', 80, 300, 1);
  createPlanet('images/moon.png', 20, 340, 0.0748);
  createPlanet('images/mars.png', 50, 450, 1.88);
  createPlanet('images/jupiter.png', 160, 600, 11.86);
  createPlanet('images/saturn.png', 140, 750, 29.46);
  createPlanet('images/uranus.png', 100, 900, 84);
  createPlanet('images/neptune.png', 100, 1050, 164.8);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    animateFunctions.forEach(fn => fn());
    renderer.render(scene, camera);
  };

  animate();
});
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: #fff;
}

.solar-system {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #fff;
  font-size: 2rem;
  text-align: center;
}
</style>
