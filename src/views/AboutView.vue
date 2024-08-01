<template>
  <div id="app">
    <div ref="solarSystem" class="solar-system"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const solarSystem = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!solarSystem.value) return;

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  loader.load('images/stars.jpg', (texture) => {
    scene.background = texture;
  });

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 500, 1500);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  solarSystem.value.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const planets: THREE.Sprite[] = [];
  const animateFunctions: (() => void)[] = [];

  const createPlanet = (imagePath: string, size: number, distance: number, orbitDuration: number, orbitTilt = 0, name: string) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imagePath, (texture) => {
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(size, size, 1);
      sprite.userData.name = name;
      planets.push(sprite);

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

  createPlanet('images/sun.png', 400, 0, 0.1, 0, 'Soleil');
  createPlanet('images/mercury.png', 40, 150, 0.24, 0, 'Mercure');
  createPlanet('images/venus.png', 60, 220, 0.62, 0, 'Vénus');
  createPlanet('images/earth.png', 80, 300, 1, 0, 'Terre');
  createPlanet('images/moon.png', 20, 340, 0.0748, 0, 'Lune');
  createPlanet('images/mars.png', 50, 450, 1.88, 0, 'Mars');
  createPlanet('images/jupiter.png', 160, 600, 11.86, 0, 'Jupiter');
  createPlanet('images/saturn.png', 140, 750, 29.46, 0, 'Saturne');
  createPlanet('images/uranus.png', 100, 900, 84, 0, 'Uranus');
  createPlanet('images/neptune.png', 100, 1050, 164.8, 0, 'Neptune');

  const onMouseClick = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
      const planetName = intersects[0].object.userData.name;
      console.log(`Clicked planet: ${planetName}`); // Ajout du log
      const customEvent = new CustomEvent('planet-clicked', { detail: planetName });
      window.dispatchEvent(customEvent);
    }
  };

  window.addEventListener('click', onMouseClick, false);

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
</style>
