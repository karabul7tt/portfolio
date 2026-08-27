// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Web Audio API Synthesizer
let audioCtx = null;
let soundEnabled = true;
const pentatonicScale = [174.61, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46];

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freqOffset = 0, type = 'flower') {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === 'flower') {
      const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + freqOffset, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    } else { // Leaf rustle sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 80, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    }

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.25);
  } catch (e) {
    console.warn("Audio Context Error:", e);
  }
}

// Global Objects
const flowers = [];
const leaves = [];
const particles = [];
const stems = [];

// Flower Class
class Flower {
  constructor(x, y, type = 'magic') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.maxRadius = Math.random() * 28 + 22;
    this.radius = 0;
    this.growthRate = Math.random() * 0.04 + 0.03;
    this.petalCount = Math.floor(Math.random() * 3) + 5;
    this.angleOffset = Math.random() * Math.PI * 2;
    this.bloomProgress = 0;
    this.hue = Math.random() * 360;

    playTone(0, 'flower');
    for (let i = 0; i < 10; i++) {
      particles.push(new PollenParticle(this.x, this.y, this.hue));
    }
  }

  update() {
    if (this.bloomProgress < 1) {
      this.bloomProgress += this.growthRate;
      if (this.bloomProgress > 1) this.bloomProgress = 1;
    }
    this.radius = this.maxRadius * easeOutBack(this.bloomProgress);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angleOffset);

    const r = Math.max(0, this.radius);

    if (this.type === 'magic') {
      this.drawMagicFlower(ctx, r);
    } else if (this.type === 'sakura') {
      this.drawSakuraFlower(ctx, r);
    } else if (this.type === 'rose') {
      this.drawRoseFlower(ctx, r);
    } else if (this.type === 'sunflower') {
      this.drawSunflower(ctx, r);
    } else if (this.type === 'lotus') {
      this.drawLotusFlower(ctx, r);
    }

    ctx.restore();
  }

  drawMagicFlower(ctx, r) {
    for (let i = 0; i < this.petalCount; i++) {
      const angle = (i * Math.PI * 2) / this.petalCount;
      ctx.save();
      ctx.rotate(angle);
      
      const gradient = ctx.createRadialGradient(0, 0, 2, r, 0, r);
      gradient.addColorStop(0, `hsla(${(this.hue + i * 25) % 360}, 100%, 75%, 0.95)`);
      gradient.addColorStop(0.7, `hsla(${(this.hue + i * 25 + 40) % 360}, 90%, 60%, 0.8)`);
      gradient.addColorStop(1, `hsla(${(this.hue + i * 25 + 80) % 360}, 100%, 50%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r * 0.5, -r * 0.45, r, 0);
      ctx.quadraticCurveTo(r * 0.5, r * 0.45, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
    ctx.shadowBlur = 15;
    ctx.fill();
  }

  drawSakuraFlower(ctx, r) {
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      ctx.save();
      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, 'rgba(255, 245, 248, 0.95)');
      grad.addColorStop(0.6, 'rgba(255, 182, 193, 0.9)');
      grad.addColorStop(1, 'rgba(244, 114, 182, 0.8)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(r * 0.4, -r * 0.5, r * 1.1, -r * 0.3, r, 0);
      ctx.bezierCurveTo(r * 1.1, r * 0.3, r * 0.4, r * 0.5, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    ctx.fillStyle = '#db2777';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawRoseFlower(ctx, r) {
    const layers = 4;
    for (let l = layers; l > 0; l--) {
      const layerR = (r * l) / layers;
      const count = 5 + l;
      for (let i = 0; i < count; i++) {
        const angle = (i * Math.PI * 2) / count + (l * 0.3);
        ctx.save();
        ctx.rotate(angle);
        ctx.fillStyle = `hsl(${340 + l * 6}, 90%, ${32 + l * 9}%)`;
        ctx.beginPath();
        ctx.arc(layerR * 0.5, 0, layerR * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  drawSunflower(ctx, r) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      ctx.save();
      ctx.rotate(angle);
      ctx.fillStyle = i % 2 === 0 ? '#facc15' : '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(r * 0.6, 0, r * 0.5, r * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  drawLotusFlower(ctx, r) {
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      ctx.save();
      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.8, '#ec4899');
      grad.addColorStop(1, '#a855f7');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r * 0.5, -r * 0.6, r, 0);
      ctx.quadraticCurveTo(r * 0.5, r * 0.6, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Leaf Class (Spawned when hand is closed / fist / pressing)
class Leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.maxSize = Math.random() * 24 + 18;
    this.size = 0;
    this.growthRate = Math.random() * 0.05 + 0.04;
    this.angle = (Math.random() - 0.5) * Math.PI * 2;
    this.progress = 0;
    this.greenHue = 120 + Math.random() * 30; // Emerald to Lush Green

    playTone(0, 'leaf');
  }

  update() {
    if (this.progress < 1) {
      this.progress += this.growthRate;
      if (this.progress > 1) this.progress = 1;
    }
    this.size = this.maxSize * easeOutBack(this.progress);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    const s = Math.max(0, this.size);

    // Leaf Body
    const grad = ctx.createLinearGradient(0, 0, s, 0);
    grad.addColorStop(0, `hsl(${this.greenHue}, 80%, 45%)`);
    grad.addColorStop(0.7, `hsl(${this.greenHue - 15}, 85%, 35%)`);
    grad.addColorStop(1, `hsl(${this.greenHue - 25}, 90%, 25%)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.5, s, 0);
    ctx.quadraticCurveTo(s * 0.5, s * 0.5, 0, 0);
    ctx.fill();

    // Leaf Veins
    ctx.strokeStyle = `hsla(${this.greenHue}, 60%, 75%, 0.6)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(s * 0.9, 0);
    ctx.stroke();

    ctx.restore();
  }
}

// Organic Stem Trail
class StemTrail {
  constructor(startX, startY, targetX, targetY) {
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.controlX = (startX + targetX) / 2 + (Math.random() - 0.5) * 40;
    this.controlY = (startY + targetY) / 2 + (Math.random() - 0.5) * 40;
    this.progress = 0;
  }

  update() {
    if (this.progress < 1) {
      this.progress += 0.08;
      if (this.progress > 1) this.progress = 1;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);

    const t = this.progress;
    const cx = (1 - t) * (1 - t) * this.startX + 2 * (1 - t) * t * this.controlX + t * t * this.targetX;
    const cy = (1 - t) * (1 - t) * this.startY + 2 * (1 - t) * t * this.controlY + t * t * this.targetY;

    ctx.quadraticCurveTo(this.controlX, this.controlY, cx, cy);
    ctx.stroke();
    ctx.restore();
  }
}

// Pollen Particles
class PollenParticle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3 - 1;
    this.radius = Math.random() * 3 + 1;
    this.hue = hue;
    this.alpha = 1;
    this.life = Math.random() * 50 + 35;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1 / this.life;
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 75%)`;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 75%)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// UI Controls
let selectedFlowerType = 'magic';
document.getElementById('flowerType').addEventListener('change', (e) => {
  selectedFlowerType = e.target.value;
});

const soundBtn = document.getElementById('soundToggle');
soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundBtn.classList.toggle('active', soundEnabled);
  soundBtn.textContent = soundEnabled ? '🔔 Ses Açık' : '🔕 Ses Kapalı';
});

document.getElementById('clearBtn').addEventListener('click', () => {
  flowers.length = 0;
  leaves.length = 0;
  particles.length = 0;
  stems.length = 0;
});

// Item Spawner
let lastX = null, lastY = null;

function spawnItem(x, y, mode = 'flower') {
  if (lastX !== null && lastY !== null) {
    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist < 25) return;
    stems.push(new StemTrail(lastX, lastY, x, y));
  }

  if (mode === 'flower') {
    flowers.push(new Flower(x, y, selectedFlowerType));
  } else {
    leaves.push(new Leaf(x, y));
    // Spawn secondary small leaf next to it
    leaves.push(new Leaf(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20));
  }

  lastX = x;
  lastY = y;
}

function resetTrail() {
  lastX = null;
  lastY = null;
}

// Touch & Mouse Handling
let isMouseDown = false;

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  initAudio();
  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i];
    spawnItem(touch.clientX, touch.clientY, 'flower');
  }
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  // Dragging generates leaves!
  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i];
    spawnItem(touch.clientX, touch.clientY, 'leaf');
  }
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  resetTrail();
}, { passive: false });

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  initAudio();
  spawnItem(e.clientX, e.clientY, 'flower');
});

canvas.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    spawnItem(e.clientX, e.clientY, 'leaf');
  }
});

window.addEventListener('mouseup', () => {
  isMouseDown = false;
  resetTrail();
});

// Webcam & Gesture Recognition Logic
const webcamBtn = document.getElementById('webcamToggle');
const videoElement = document.getElementById('webcam');
let camera = null;
let hands = null;
let isWebcamActive = false;

let detectedState = 'NONE'; // 'FLOWER', 'LEAF', or 'NONE'
let smoothedHandPos = { x: 0, y: 0 };

webcamBtn.addEventListener('click', async () => {
  if (!isWebcamActive) {
    try {
      webcamBtn.textContent = '⏳ Kamera Başlatılıyor...';
      hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
      });

      hands.onResults(onHandResults);

      camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 640,
        height: 480
      });

      await camera.start();
      isWebcamActive = true;
      webcamBtn.classList.add('active');
      webcamBtn.textContent = '📷 Kamera Aktif (Kapat)';
    } catch (err) {
      alert("Kamera erişimi sağlanamadı veya izin verilmedi.");
      webcamBtn.textContent = '📷 Kamerayla El Takibi';
      console.error(err);
    }
  } else {
    if (camera) camera.stop();
    isWebcamActive = false;
    detectedState = 'NONE';
    webcamBtn.classList.remove('active');
    webcamBtn.textContent = '📷 Kamerayla El Takibi';
  }
});

/**
 * Robust Gesture Classification:
 * OPEN HAND -> All 4 fingers (index, middle, ring, pinky) extended far from wrist.
 * CLOSED FIST -> All 4 fingers curled close to palm base / wrist.
 */
function analyzeHandGesture(landmarks) {
  const wrist = landmarks[0];
  const fingerTips = [8, 12, 16, 20];
  const fingerMCPs = [5, 9, 13, 17]; // Knuckles

  let extendedFingers = 0;

  for (let i = 0; i < 4; i++) {
    const tip = landmarks[fingerTips[i]];
    const mcp = landmarks[fingerMCPs[i]];

    const distTipWrist = Math.hypot(tip.x - wrist.x, tip.y - wrist.y, tip.z - wrist.z);
    const distMcpWrist = Math.hypot(mcp.x - wrist.x, mcp.y - wrist.y, mcp.z - wrist.z);

    if (distTipWrist > distMcpWrist * 1.35) {
      extendedFingers++;
    }
  }

  if (extendedFingers >= 3) {
    return 'OPEN_HAND'; // El Açık -> Çiçek
  } else if (extendedFingers <= 1) {
    return 'CLOSED_FIST'; // El Kapalı / Basılma -> Yaprak
  }
  return 'TRANSITION';
}

let spawnTimer = 0;

function onHandResults(results) {
  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
    detectedState = 'NONE';
    return;
  }

  const landmarks = results.multiHandLandmarks[0];
  const gesture = analyzeHandGesture(landmarks);

  // Palm center coordinates (wrist & middle knuckle midpoint)
  const palmX = (1 - (landmarks[0].x + landmarks[9].x) / 2) * width;
  const palmY = ((landmarks[0].y + landmarks[9].y) / 2) * height;

  // Position smoothing (Exponential Moving Average to remove jitter)
  smoothedHandPos.x += (palmX - smoothedHandPos.x) * 0.4;
  smoothedHandPos.y += (palmY - smoothedHandPos.y) * 0.4;

  const targetX = smoothedHandPos.x;
  const targetY = smoothedHandPos.y;

  spawnTimer++;

  if (gesture === 'OPEN_HAND') {
    detectedState = 'FLOWER';
    if (spawnTimer % 4 === 0) {
      spawnItem(targetX + (Math.random() - 0.5) * 30, targetY + (Math.random() - 0.5) * 30, 'flower');
    }
  } else if (gesture === 'CLOSED_FIST') {
    detectedState = 'LEAF';
    if (spawnTimer % 3 === 0) {
      spawnItem(targetX + (Math.random() - 0.5) * 40, targetY + (Math.random() - 0.5) * 40, 'leaf');
    }
  }
}

// HUD Overlay for Current Hand Gesture
function drawHUD(ctx) {
  if (!isWebcamActive) return;

  ctx.save();
  ctx.font = 'bold 18px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';

  if (detectedState === 'FLOWER') {
    ctx.fillStyle = '#f472b6';
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 10;
    ctx.fillText('✋ EL AÇIK: ÇİÇEK AÇIYOR 🌸', width / 2, height - 40);
  } else if (detectedState === 'LEAF') {
    ctx.fillStyle = '#4ade80';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 10;
    ctx.fillText('✊ EL KAPALI (BASMA): YAPRAK OLUŞUYOR 🍃', width / 2, height - 40);
  } else {
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('🔍 El Aranıyor... (Elinizi kameraya gösterin)', width / 2, height - 40);
  }

  // Draw hand position indicator dot
  if (detectedState !== 'NONE') {
    ctx.fillStyle = detectedState === 'FLOWER' ? '#ec4899' : '#22c55e';
    ctx.beginPath();
    ctx.arc(smoothedHandPos.x, smoothedHandPos.y, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// Render Loop
function render() {
  ctx.fillStyle = 'rgba(8, 9, 26, 0.25)';
  ctx.fillRect(0, 0, width, height);

  // Stems
  for (let i = stems.length - 1; i >= 0; i--) {
    stems[i].update();
    stems[i].draw(ctx);
  }

  // Leaves
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].update();
    leaves[i].draw(ctx);
  }

  // Flowers
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update();
    flowers[i].draw(ctx);
  }

  // Pollen
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw(ctx);
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  // Limits
  if (flowers.length > 250) flowers.shift();
  if (leaves.length > 250) leaves.shift();

  // Draw HUD
  drawHUD(ctx);

  requestAnimationFrame(render);
}

render();
