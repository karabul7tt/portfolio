/**
 * MediaPipe Hands WebCam Tracking & Gesture Engine
 */
export class HandTracker {
  constructor(videoElement, overlayCanvas, onResultsCallback) {
    this.video = videoElement;
    this.canvas = overlayCanvas;
    this.ctx = this.canvas.getContext('2d');
    this.callback = onResultsCallback;
    this.camera = null;
    this.hands = null;
    this.isActive = false;
  }

  async start() {
    if (this.isActive) return;

    this.hands = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6
    });

    this.hands.onResults((results) => this.handleResults(results));

    this.camera = new window.Camera(this.video, {
      onFrame: async () => {
        await this.hands.send({ image: this.video });
      },
      width: 640,
      height: 480
    });

    await this.camera.start();
    this.isActive = true;
  }

  stop() {
    if (this.camera) this.camera.stop();
    this.isActive = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleResults(results) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      this.callback({ leftHand: null, rightHand: null });
      return;
    }

    let leftHand = null;
    let rightHand = null;

    for (let i = 0; i < results.multiHandLandmarks.length; i++) {
      const landmarks = results.multiHandLandmarks[i];
      const handedness = results.multiHandedness[i].label; // "Left" or "Right"

      // Draw hand skeletal overlay on mini video window
      this.drawHandOverlay(landmarks);

      const wrist = landmarks[0];
      const indexTip = landmarks[8];
      const thumbTip = landmarks[4];

      // Calculate pinch / finger spread distance (0 to 1)
      const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
      const spreadRatio = Math.min(1, Math.max(0, (pinchDist - 0.05) / 0.25));

      const handData = {
        wrist: { x: (1 - wrist.x) * window.innerWidth, y: wrist.y * window.innerHeight },
        indexTip: { x: (1 - indexTip.x) * window.innerWidth, y: indexTip.y * window.innerHeight },
        spread: spreadRatio
      };

      if (handedness === 'Left') {
        leftHand = handData;
      } else {
        rightHand = handData;
      }
    }

    this.callback({ leftHand, rightHand });
  }

  drawHandOverlay(landmarks) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.ctx.save();
    this.ctx.strokeStyle = '#f472b6';
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = '#ffffff';

    // Draw finger tips
    const tips = [4, 8, 12, 16, 20];
    tips.forEach((idx) => {
      const lm = landmarks[idx];
      const x = (1 - lm.x) * w;
      const y = lm.y * h;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.restore();
  }
}
