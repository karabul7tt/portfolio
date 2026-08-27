// Synthetic Radiometric Thermal Vision & Edge AI Object Detection Engine
export const THERMAL_PALETTES = {
    IRONBOW: 'IRONBOW',
    WHITE_HOT: 'WHITE_HOT',
    RAINBOW: 'RAINBOW',
    BLACK_HOT: 'BLACK_HOT'
};

export class ThermalVisionRenderer {
    constructor() {
        this.palette = THERMAL_PALETTES.IRONBOW;
    }

    setPalette(paletteName) {
        if (THERMAL_PALETTES[paletteName]) {
            this.palette = paletteName;
        }
    }

    getPixelColor(temp, minT = 15, maxT = 650) {
        const norm = Math.max(0, Math.min(1, (temp - minT) / (maxT - minT)));

        if (this.palette === THERMAL_PALETTES.WHITE_HOT) {
            const v = Math.floor(norm * 255);
            return `rgb(${v},${v},${v})`;
        } else if (this.palette === THERMAL_PALETTES.BLACK_HOT) {
            const v = Math.floor((1 - norm) * 255);
            return `rgb(${v},${v},${v})`;
        } else if (this.palette === THERMAL_PALETTES.RAINBOW) {
            // Spectral Blue -> Cyan -> Green -> Yellow -> Red -> White
            let r = 0, g = 0, b = 0;
            if (norm < 0.2) {
                b = 255;
                g = Math.floor((norm / 0.2) * 255);
            } else if (norm < 0.4) {
                g = 255;
                b = Math.floor((1 - (norm - 0.2) / 0.2) * 255);
            } else if (norm < 0.6) {
                g = 255;
                r = Math.floor(((norm - 0.4) / 0.2) * 255);
            } else if (norm < 0.8) {
                r = 255;
                g = Math.floor((1 - (norm - 0.6) / 0.2) * 255);
            } else {
                r = 255;
                g = Math.floor(((norm - 0.8) / 0.2) * 255);
                b = Math.floor(((norm - 0.8) / 0.2) * 255);
            }
            return `rgb(${r},${g},${b})`;
        } else {
            // Default IRONBOW
            if (norm < 0.25) {
                const f = norm / 0.25;
                return `rgb(${Math.floor(f * 70)},0,${Math.floor(f * 180 + 30)})`;
            } else if (norm < 0.5) {
                const f = (norm - 0.25) / 0.25;
                return `rgb(${Math.floor(70 + f * 185)},0,${Math.floor(210 * (1 - f))})`;
            } else if (norm < 0.75) {
                const f = (norm - 0.5) / 0.25;
                return `rgb(255,${Math.floor(f * 220)},0)`;
            } else {
                const f = (norm - 0.75) / 0.25;
                return `rgb(255,${Math.floor(220 + f * 35)},${Math.floor(f * 255)})`;
            }
        }
    }

    renderDroneCameraView(hudCanvas, drone, forestGrid) {
        const ctx = hudCanvas.getContext('2d');
        const w = hudCanvas.width;
        const h = hudCanvas.height;

        ctx.fillStyle = '#05070a';
        ctx.fillRect(0, 0, w, h);

        if (!drone) {
            ctx.fillStyle = '#64748b';
            ctx.font = '13px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('NO DRONE FEED SELECTED', w / 2, h / 2);
            return;
        }

        // Camera FOV bounds in world coordinates
        const fovRadius = drone.fovRadius;
        const camX = drone.x - fovRadius;
        const camY = drone.y - fovRadius;
        const camW = fovRadius * 2;
        const camH = fovRadius * 2;

        const startCoord = forestGrid.pixelToCoord(camX, camY);
        const endCoord = forestGrid.pixelToCoord(camX + camW, camY + camH);

        // Edge AI detection tracking
        let detections = [];
        let maxSceneTemp = 24.0;
        let minSceneTemp = 18.0;

        const cellRenderW = w / (endCoord.c - startCoord.c + 1);
        const cellRenderH = h / (endCoord.r - startCoord.r + 1);

        for (let r = startCoord.r; r <= endCoord.r; r++) {
            for (let c = startCoord.c; c <= endCoord.c; c++) {
                if (r < 0 || r >= forestGrid.rows || c < 0 || c >= forestGrid.cols) continue;
                const idx = r * forestGrid.cols + c;
                const cell = forestGrid.cells[idx];

                if (cell.temp > maxSceneTemp) maxSceneTemp = cell.temp;
                if (cell.temp < minSceneTemp) minSceneTemp = cell.temp;

                // Screen coordinates in HUD
                const sx = (c - startCoord.c) * cellRenderW;
                const sy = (r - startCoord.r) * cellRenderH;

                ctx.fillStyle = this.getPixelColor(cell.temp, 20, 650);
                ctx.fillRect(sx, sy, cellRenderW + 0.5, cellRenderH + 0.5);

                // Thermal Edge AI detection check (Threshold > 65°C)
                if (cell.temp >= 65.0) {
                    const isFire = cell.temp >= 200.0;
                    detections.push({
                        c, r,
                        sx: sx + cellRenderW * 0.5,
                        sy: sy + cellRenderH * 0.5,
                        temp: cell.temp,
                        isFire,
                        confidence: (Math.min(99.4, 88.0 + (cell.temp / 10))).toFixed(1)
                    });
                }
            }
        }

        // Draw HUD Tactical Elements & Crosshairs
        this.drawHudOverlay(ctx, w, h, drone, detections, maxSceneTemp);
    }

    drawHudOverlay(ctx, w, h, drone, detections, maxSceneTemp) {
        ctx.save();

        // Corner Brackets
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2;
        const cornerSize = 18;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(10, 10 + cornerSize);
        ctx.lineTo(10, 10);
        ctx.lineTo(10 + cornerSize, 10);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(w - 10 - cornerSize, 10);
        ctx.lineTo(w - 10, 10);
        ctx.lineTo(w - 10, 10 + cornerSize);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(10, h - 10 - cornerSize);
        ctx.lineTo(10, h - 10);
        ctx.lineTo(10 + cornerSize, h - 10);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(w - 10 - cornerSize, h - 10);
        ctx.lineTo(w - 10, h - 10);
        ctx.lineTo(w - 10, h - 10 - cornerSize);
        ctx.stroke();

        // Center Reticle
        const cx = w / 2;
        const cy = h / 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 15, cy);
        ctx.lineTo(cx - 5, cy);
        ctx.moveTo(cx + 5, cy);
        ctx.lineTo(cx + 15, cy);
        ctx.moveTo(cx, cy - 15);
        ctx.lineTo(cx, cy - 5);
        ctx.moveTo(cx, cy + 5);
        ctx.lineTo(cx, cy + 15);
        ctx.stroke();

        // Scanlines effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        for (let y = 0; y < h; y += 4) {
            ctx.fillRect(0, y, w, 1.5);
        }

        // Edge AI Bounding Boxes for detected hotspots
        if (detections.length > 0) {
            // Cluster or highlight peak anomaly
            const highestDetection = detections.reduce((prev, curr) => curr.temp > prev.temp ? curr : prev, detections[0]);

            const boxW = 44;
            const boxH = 44;
            const bx = highestDetection.sx - boxW / 2;
            const by = highestDetection.sy - boxH / 2;

            const isFlame = highestDetection.isFire;
            const strokeColor = isFlame ? '#ef4444' : '#f97316';

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(bx, by, boxW, boxH);

            // Bounding box brackets
            ctx.fillStyle = strokeColor;
            ctx.fillRect(bx - 2, by - 2, 6, 6);
            ctx.fillRect(bx + boxW - 4, by - 2, 6, 6);
            ctx.fillRect(bx - 2, by + boxH - 4, 6, 6);
            ctx.fillRect(bx + boxW - 4, by + boxH - 4, 6, 6);

            // AI Label Tag
            const label = isFlame ? `[YOLO] FIRE: ${highestDetection.temp.toFixed(0)}°C` : `[YOLO] ANOMALY: ${highestDetection.temp.toFixed(0)}°C`;
            const conf = `${highestDetection.confidence}% CONF`;

            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.fillRect(bx, by - 26, 150, 24);
            ctx.strokeStyle = strokeColor;
            ctx.strokeRect(bx, by - 26, 150, 24);

            ctx.fillStyle = strokeColor;
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(label, bx + 4, by - 14);
            ctx.fillStyle = '#38bdf8';
            ctx.font = '9px monospace';
            ctx.fillText(conf, bx + 4, by - 4);
        }

        // Top Telemetry Header
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.fillRect(12, 12, w - 24, 26);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.strokeRect(12, 12, w - 24, 26);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`CAM: [${drone.name}] SENSOR: LWIR RADIOMETRIC`, 20, 29);

        ctx.fillStyle = maxSceneTemp > 60 ? '#f97316' : '#22c55e';
        ctx.textAlign = 'right';
        ctx.fillText(`MAX TEMP: ${maxSceneTemp.toFixed(1)}°C | PALETTE: ${this.palette}`, w - 20, 29);

        // Bottom HUD Bar
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.fillRect(12, h - 38, w - 24, 26);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.strokeRect(12, h - 38, w - 24, 26);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`ALT: ${drone.altitude}m | SPD: ${drone.speed.toFixed(1)} m/s | PITCH: -90° (NADIR)`, 20, h - 22);

        ctx.textAlign = 'right';
        ctx.fillStyle = drone.status === 'ENGAGING' ? '#f43f5e' : '#38bdf8';
        ctx.fillText(`STATE: ${drone.status} | GPS: ${drone.gps.lat}, ${drone.gps.lon}`, w - 20, h - 22);

        ctx.restore();
    }
}
