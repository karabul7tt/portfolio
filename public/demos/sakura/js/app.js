import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { HDPhotorealisticStargazerLily } from './flower.js';
import { HandTracker } from './handTracker.js';

// DOM Elements
const canvas = document.getElementById('threeCanvas');
const hud = document.getElementById('hud');
const growVal = document.getElementById('growVal');
const bloomVal = document.getElementById('bloomVal');
const videoEl = document.getElementById('webcamVideo');
const overlayCanvas = document.getElementById('handOverlayCanvas');

let width = window.innerWidth;
let height = window.innerHeight;

// Three.js Scene Setup (Cinematic Pure Black Studio Backdrop matching reference photo)
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.set(0, 0, 7.8);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: false,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;

// Post Processing (High-Res Volumetric Glow & Studio Depth)
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.15, 0.4, 0.88);
composer.addPass(bloomPass);

// Camera Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Studio Key Lighting matching the reference photo
const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);

// Warm Key Light (Highlighting dew drops and velvet texture)
const keyLight = new THREE.DirectionalLight(0xffedd5, 2.2);
keyLight.position.set(6, 12, 8);
scene.add(keyLight);

// Deep Violet Rim Light (Creating photographic depth separation against black background)
const rimLight = new THREE.DirectionalLight(0x701a75, 1.8);
rimLight.position.set(-8, -6, -4);
scene.add(rimLight);

const fillLight = new THREE.PointLight(0xfed7aa, 2.0, 12);
fillLight.position.set(0, 2, 4);
scene.add(fillLight);

// HD Photorealistic Stargazer Lily Instance
const hdLily = new HDPhotorealisticStargazerLily();
scene.add(hdLily.group);

// Tracking State
let isDemoActive = false;

// MediaPipe Hand Tracker
const tracker = new HandTracker(videoEl, overlayCanvas, ({ leftHand, rightHand }) => {
  if (leftHand || rightHand) {
    // Left Hand moves & rotates the 3D Stargazer Lily in space!
    if (leftHand) {
      const rotY = (leftHand.wrist.x / width - 0.5) * Math.PI * 1.6;
      const rotX = (leftHand.wrist.y / height - 0.5) * Math.PI * 0.9;
      
      hdLily.group.rotation.y += (rotY - hdLily.group.rotation.y) * 0.1;
      hdLily.group.rotation.x += (rotX - hdLily.group.rotation.x) * 0.1;

      hdLily.setGrow(leftHand.spread * 1.3);
      if (growVal) growVal.textContent = `${Math.round(leftHand.spread * 100)}%`;
    } else {
      hdLily.setGrow(0.9);
    }

    // Right Hand scrubs the velvet bloom choreography!
    if (rightHand) {
      hdLily.setBloom(rightHand.spread);
      if (bloomVal) bloomVal.textContent = `${Math.round(rightHand.spread * 100)}%`;
    }
  }
});

// Auto-start WebCam Tracker
tracker.start().catch((err) => {
  console.warn("Webcam Auto-Start:", err);
});

// Keyboard Controls (D, H, 1, 2, 3)
window.addEventListener('keydown', (e) => {
  if (e.key === 'd' || e.key === 'D') {
    isDemoActive = !isDemoActive;
  } else if (e.key === 'h' || e.key === 'H') {
    hud.classList.toggle('hidden');
    videoEl.classList.toggle('hidden');
    overlayCanvas.classList.toggle('hidden');
  } else if (e.key === '1') {
    hdLily.setGrow(0.4);
    hdLily.setBloom(0.1);
  } else if (e.key === '2') {
    hdLily.setGrow(0.8);
    hdLily.setBloom(0.5);
  } else if (e.key === '3') {
    hdLily.setGrow(1.0);
    hdLily.setBloom(1.0);
  }
});

// Window Resize
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
});

// Render Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Demo Mode Auto Scrubbing & 360° Rotation
  if (isDemoActive) {
    const growCycle = (Math.sin(Date.now() * 0.0015) + 1) / 2;
    const bloomCycle = (Math.cos(Date.now() * 0.002) + 1) / 2;
    hdLily.setGrow(0.4 + growCycle * 0.6);
    hdLily.setBloom(bloomCycle);

    hdLily.group.rotation.y += 0.005;

    if (growVal) growVal.textContent = `${Math.round((0.4 + growCycle * 0.6) * 100)}%`;
    if (bloomVal) bloomVal.textContent = `${Math.round(bloomCycle * 100)}%`;
  }

  // Update HD Lily physics & dew drop rendering
  hdLily.update();

  controls.update();
  composer.render();
}

animate();
