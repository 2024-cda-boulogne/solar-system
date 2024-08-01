<template>
  <div id="app">
    <div ref="solarSystem" class="solar-system"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'AboutView',
  mounted() {
    this.initSolarSystem();
  },
  methods: {
    initSolarSystem() {
      const scene = new THREE.Scene();
      const loader = new THREE.TextureLoader();
      loader.load('images/stars.jpg', (texture) => {
        scene.background = texture;
      });

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
      camera.position.set(0, 500, 1500);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.solarSystem.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const planets = [];

      const createPlanet = (imagePath, size, distance, orbitDuration, orbitTilt = 0, name) => {
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

      const animateFunctions = [];

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

      const onMouseClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(planets);

        if (intersects.length > 0) {
          this.$emit('planet-clicked', intersects[0].object.userData.name);
        }
      };

      window.addEventListener('click', onMouseClick, false);

      const animate = function () {
        requestAnimationFrame(animate);
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
