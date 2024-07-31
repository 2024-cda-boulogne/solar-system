<template>
    <div ref="container" class="starry-background"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: 'StarryBackground',
    mounted() {
      this.initThreeJS();
      window.addEventListener('resize', this.onWindowResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
      initThreeJS() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.container.appendChild(this.renderer.domElement);
  
        // Starfield creation
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
          const x = (Math.random() - 0.5) * 2000;
          const y = (Math.random() - 0.5) * 2000;
          const z = (Math.random() - 0.5) * 2000;
          starVertices.push(x, y, z);
        }
  
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
  
        // Camera position
        this.camera.position.z = 5;
  
        // Animation loop
        this.animate();
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.scene.rotation.y += 0.0005;
        this.renderer.render(this.scene, this.camera);
      },
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  };
  </script>
  
  <style scoped>
  .starry-background {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  </style>
  