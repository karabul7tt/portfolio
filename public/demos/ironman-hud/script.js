// Canvas setup
const canvas = document.getElementById('magicCanvas');
const ctx = canvas.getContext('2d');
const statusAlert = document.getElementById('statusAlert');
const suitMeter = document.getElementById('suitMeter');
const suitSelect = document.getElementById('suitType');

let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Sound Synth
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playWindowSound() {
  if (!soundEnabled) return;
  initAudio();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

// Global Hand Tracking State
let hand1 = null; // { x, y }
let hand2 = null; // { x, y }
let isDemoActive = false;
let demoProgress = 0;
let currentSuit = 'spiderman';

suitSelect.addEventListener('change', (e) => {
  currentSuit = e.target.value;
  suitMeter.textContent = currentSuit === 'spiderman' ? 'SUIT: MILES MORALES SPIDER-MAN 🕷️' : 'SUIT: IRON MAN MARK 85 🤖';
});

// MediaPipe Setup
const webcamBtn = document.getElementById('webcamBtn');
const videoElement = document.getElementById('webcam');
let camera = null;
let hands = null;
let isWebcamActive = false;

webcamBtn.addEventListener('click', async () => {
  if (!isWebcamActive) {
    try {
      webcamBtn.textContent = '⏳ Kamera Başlatılıyor...';
      hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.55,
        minTrackingConfidence: 0.55
      });

      hands.onResults(onHandResults);

      camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 1280,
        height: 720
      });

      await camera.start();
      isWebcamActive = true;
      webcamBtn.classList.add('active');
      webcamBtn.textContent = '📷 Kamera Aktif (Kapat)';
    } catch (err) {
      alert("Kamera erişimi sağlanamadı veya izin verilmedi.");
      webcamBtn.textContent = '📷 Kamerayı Başlat';
      console.error(err);
    }
  } else {
    if (camera) camera.stop();
    isWebcamActive = false;
    webcamBtn.classList.remove('active');
    webcamBtn.textContent = '📷 Kamerayı Başlat';
    statusAlert.textContent = 'SİSTEM BEKLEMEDE';
    hand1 = null; hand2 = null;
  }
});

function onHandResults(results) {
  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
    hand1 = null; hand2 = null;
    statusAlert.textContent = 'İKİ ELİNİZİ KAMERAYA GÖSTERİN...';
    return;
  }

  const h1L = results.multiHandLandmarks[0];
  const x1 = (1 - (h1L[0].x + h1L[9].x) / 2) * width;
  const y1 = ((h1L[0].y + h1L[9].y) / 2) * height;
  hand1 = { x: x1, y: y1 };

  if (results.multiHandLandmarks.length > 1) {
    const h2L = results.multiHandLandmarks[1];
    const x2 = (1 - (h2L[0].x + h2L[9].x) / 2) * width;
    const y2 = ((h2L[0].y + h2L[9].y) / 2) * height;
    hand2 = { x: x2, y: y2 };
  } else {
    hand2 = null;
  }

  if (hand1 && hand2) {
    statusAlert.textContent = '✨ KOSTÜM PENCERESİ AÇIK (ELLERİNİZLE KONTROL EDİN)';
    statusAlert.style.borderColor = currentSuit === 'spiderman' ? '#ef4444' : '#f59e0b';
    statusAlert.style.color = '#ffffff';
  } else {
    statusAlert.textContent = 'DİĞER ELİNİZİ DE GÖSTERİN...';
  }
}

/**
 * Core Magic Reveal Window Engine:
 * Renders a strict rectangular reveal box bounded between Hand 1 (x1) and Hand 2 (x2).
 */
function renderMagicWindow(ctx, h1, h2) {
  // If only 1 hand or demo, create smooth synthetic hand anchors
  let xLeft, xRight, yCenter;

  if (h1 && h2) {
    xLeft = Math.min(h1.x, h2.x);
    xRight = Math.max(h1.x, h2.x);
    yCenter = (h1.y + h2.y) / 2;
  } else if (h1) {
    xLeft = h1.x - 180;
    xRight = h1.x + 180;
    yCenter = h1.y;
  } else {
    const spread = 200 + Math.sin(demoProgress) * 150;
    xLeft = width / 2 - spread;
    xRight = width / 2 + spread;
    yCenter = height * 0.52;
  }

  const boxWidth = Math.max(10, xRight - xLeft);
  const boxHeight = Math.min(260, Math.max(180, boxWidth * 0.65));
  const yTop = yCenter - boxHeight / 2;

  // 1. Draw Glowing Glass Portal Border Lines at Left & Right Hand anchors
  ctx.save();
  ctx.strokeStyle = currentSuit === 'spiderman' ? '#ef4444' : '#38bdf8';
  ctx.lineWidth = 4;
  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 20;

  // Left Hand Border Bar
  ctx.beginPath();
  ctx.moveTo(xLeft, yTop - 15);
  ctx.lineTo(xLeft, yTop + boxHeight + 15);
  ctx.stroke();

  // Right Hand Border Bar
  ctx.beginPath();
  ctx.moveTo(xRight, yTop - 15);
  ctx.lineTo(xRight, yTop + boxHeight + 15);
  ctx.stroke();

  // Hand Grip Handle Dots
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(xLeft, yCenter, 8, 0, Math.PI * 2);
  ctx.arc(xRight, yCenter, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (boxWidth < 20) return; // Closed box

  // 2. Set Up Clipping Path for the Magic Reveal Window between Hands
  ctx.save();
  ctx.beginPath();
  ctx.rect(xLeft, yTop, boxWidth, boxHeight);
  ctx.clip(); // Restrict all drawing STRICTLY between the 2 hands!

  // 3. Render Selected Superhero Suit Inside the Magic Reveal Window
  if (currentSuit === 'spiderman') {
    drawMilesMoralesSuit(ctx, xLeft, yTop, boxWidth, boxHeight);
  } else {
    drawIronManSuit(ctx, xLeft, yTop, boxWidth, boxHeight);
  }

  // 4. Glass Reflection Overlay & Diagonal Glare Across the Box
  const glassGrad = ctx.createLinearGradient(xLeft, yTop, xRight, yTop + boxHeight);
  glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
  glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.04)');
  glassGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
  glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

  ctx.fillStyle = glassGrad;
  ctx.fillRect(xLeft, yTop, boxWidth, boxHeight);

  // Diagonal Light Streak
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(xLeft + boxWidth * 0.2, yTop);
  ctx.lineTo(xLeft + boxWidth * 0.4, yTop + boxHeight);
  ctx.stroke();

  ctx.restore(); // End Clipping Mask

  // 5. Outer Frame Box Border
  ctx.save();
  ctx.strokeStyle = currentSuit === 'spiderman' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(56, 189, 248, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(xLeft, yTop, boxWidth, boxHeight);
  ctx.restore();
}

/**
 * Miles Morales Spider-Man Suit Renderer (Red Spider Chest Logo on Charcoal Suit)
 */
function drawMilesMoralesSuit(ctx, xLeft, yTop, boxWidth, boxHeight) {
  const midX = xLeft + boxWidth / 2;
  const midY = yTop + boxHeight / 2;

  // Dark Charcoal / Black Suit Background
  const suitGrad = ctx.createLinearGradient(xLeft, yTop, xLeft + boxWidth, yTop + boxHeight);
  suitGrad.addColorStop(0, '#111827');
  suitGrad.addColorStop(0.5, '#030712');
  suitGrad.addColorStop(1, '#1f2937');

  ctx.fillStyle = suitGrad;
  ctx.fillRect(xLeft, yTop, boxWidth, boxHeight);

  // Hexagonal Webbing Pattern Texture
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  const hexSize = 24;
  for (let x = xLeft; x < xLeft + boxWidth; x += hexSize) {
    ctx.beginPath();
    ctx.moveTo(x, yTop);
    ctx.lineTo(x, yTop + boxHeight);
    ctx.stroke();
  }
  for (let y = yTop; y < yTop + boxHeight; y += hexSize) {
    ctx.beginPath();
    ctx.moveTo(xLeft, y);
    ctx.lineTo(xLeft + boxWidth, y);
    ctx.stroke();
  }
  ctx.restore();

  // Red Shoulder Accent Stripes
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(xLeft, yTop);
  ctx.lineTo(xLeft + boxWidth * 0.25, yTop);
  ctx.lineTo(xLeft, yTop + boxHeight * 0.4);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(xLeft + boxWidth, yTop);
  ctx.lineTo(xLeft + boxWidth * 0.75, yTop);
  ctx.lineTo(xLeft + boxWidth, yTop + boxHeight * 0.4);
  ctx.closePath();
  ctx.fill();

  // ICONIC MILES MORALES RED SPIDER CHEST LOGO (Vector Render)
  ctx.save();
  ctx.translate(midX, midY);
  const scale = Math.min(boxWidth, boxHeight) * 0.0038;
  ctx.scale(scale, scale);

  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 18;

  // Spider Body (Head & Abdomen)
  ctx.beginPath();
  ctx.ellipse(0, -15, 12, 16, 0, 0, Math.PI * 2); // Head
  ctx.ellipse(0, 18, 16, 26, 0, 0, Math.PI * 2); // Abdomen
  ctx.fill();

  // Spider Legs (Top 4 Legs)
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Upper Left Leg 1
  ctx.beginPath();
  ctx.moveTo(-8, -12);
  ctx.lineTo(-45, -55);
  ctx.lineTo(-75, -25);
  ctx.stroke();

  // Upper Left Leg 2
  ctx.beginPath();
  ctx.moveTo(-10, -2);
  ctx.lineTo(-55, -35);
  ctx.lineTo(-85, 0);
  ctx.stroke();

  // Upper Right Leg 1
  ctx.beginPath();
  ctx.moveTo(8, -12);
  ctx.lineTo(45, -55);
  ctx.lineTo(75, -25);
  ctx.stroke();

  // Upper Right Leg 2
  ctx.beginPath();
  ctx.moveTo(10, -2);
  ctx.lineTo(55, -35);
  ctx.lineTo(85, 0);
  ctx.stroke();

  // Bottom 4 Legs
  // Lower Left Leg 3
  ctx.beginPath();
  ctx.moveTo(-12, 10);
  ctx.lineTo(-50, 30);
  ctx.lineTo(-70, 75);
  ctx.stroke();

  // Lower Left Leg 4
  ctx.beginPath();
  ctx.moveTo(-10, 25);
  ctx.lineTo(-40, 50);
  ctx.lineTo(-55, 95);
  ctx.stroke();

  // Lower Right Leg 3
  ctx.beginPath();
  ctx.moveTo(12, 10);
  ctx.lineTo(50, 30);
  ctx.lineTo(70, 75);
  ctx.stroke();

  // Lower Right Leg 4
  ctx.beginPath();
  ctx.moveTo(10, 25);
  ctx.lineTo(40, 50);
  ctx.lineTo(55, 95);
  ctx.stroke();

  ctx.restore();
}

/**
 * Iron Man Mark 85 Suit Renderer
 */
function drawIronManSuit(ctx, xLeft, yTop, boxWidth, boxHeight) {
  const midX = xLeft + boxWidth / 2;
  const midY = yTop + boxHeight / 2;

  // Red & Gold Metallic Armor Gradient Background
  const armorGrad = ctx.createLinearGradient(xLeft, yTop, xLeft + boxWidth, yTop + boxHeight);
  armorGrad.addColorStop(0, '#991b1b');
  armorGrad.addColorStop(0.5, '#dc2626');
  armorGrad.addColorStop(1, '#7f1d1d');

  ctx.fillStyle = armorGrad;
  ctx.fillRect(xLeft, yTop, boxWidth, boxHeight);

  // Gold Collar Inlays
  ctx.fillStyle = '#eab308';
  ctx.fillRect(xLeft, yTop, boxWidth * 0.25, boxHeight * 0.25);
  ctx.fillRect(xLeft + boxWidth * 0.75, yTop, boxWidth * 0.25, boxHeight * 0.25);

  // Glowing Triangular Arc Reactor Core
  ctx.save();
  ctx.translate(midX, midY);

  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 30;

  const rSize = Math.min(boxWidth, boxHeight) * 0.28;
  ctx.beginPath();
  ctx.moveTo(0, -rSize);
  ctx.lineTo(rSize * 0.86, rSize * 0.6);
  ctx.lineTo(-rSize * 0.86, rSize * 0.6);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();
}

// Audio Toggle & Demo Buttons
const audioBtn = document.getElementById('audioToggle');
audioBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  audioBtn.classList.toggle('active', soundEnabled);
  audioBtn.textContent = soundEnabled ? '🔔 Ses Açık' : '🔕 Ses Kapalı';
});

const demoBtn = document.getElementById('demoBtn');
demoBtn.addEventListener('click', () => {
  isDemoActive = !isDemoActive;
  demoBtn.classList.toggle('active', isDemoActive);
  demoBtn.textContent = isDemoActive ? '⚡ Demo Aktif (Kapat)' : '⚡ Otomatik Demo (Pencere)';
});

// Main Render Loop
function render() {
  ctx.clearRect(0, 0, width, height);

  if (isDemoActive) {
    demoProgress += 0.03;
  }

  // Render Magic Window reveal between two hands!
  if (isWebcamActive || isDemoActive) {
    renderMagicWindow(ctx, hand1, hand2);
  } else {
    // Idle Preview Window in Center
    renderMagicWindow(ctx, null, null);
  }

  requestAnimationFrame(render);
}

render();
