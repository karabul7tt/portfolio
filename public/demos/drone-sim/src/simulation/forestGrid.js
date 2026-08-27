// Forest Terrain & Thermal Cellular Automaton Engine
export const CELL_TYPES = {
    DENSE_FOREST: 0,
    SPARSE_FOREST: 1,
    DRY_BRUSH: 2,
    FIREBREAK: 3,
    WATER: 4,
    BASE_STATION: 5
};

export class ForestGrid {
    constructor(width, height, cellSize = 10) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cols = Math.floor(width / cellSize);
        this.rows = Math.floor(height / cellSize);

        this.ambientTemp = 28.0; // °C
        this.humidity = 35.0; // %
        this.windSpeed = 18.0; // km/h
        this.windAngle = 45.0; // degrees (0=East, 90=South, 180=West, 270=North)

        // GPS bounding box simulation (e.g. Aegean / Mediterranean forest region)
        this.baseLat = 38.3524;
        this.baseLon = 27.1856;
        this.latSpan = 0.045;
        this.lonSpan = 0.070;

        this.cells = [];
        this.nextTemp = [];
        this.baseStationPos = { x: 80, y: height - 80 };

        this.totalForestCells = 0;
        this.burntCellsCount = 0;
        this.burningCellsCount = 0;
        this.anomalyCellsCount = 0;

        this.initGrid();
    }

    initGrid() {
        this.cells = new Array(this.cols * this.rows);
        this.nextTemp = new Float32Array(this.cols * this.rows);

        // Simple 2D pseudo-random noise generator
        const noise2D = (x, y) => {
            const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
            return n - Math.floor(n);
        };

        const smoothNoise = (x, y) => {
            const i = Math.floor(x);
            const j = Math.floor(y);
            const fx = x - i;
            const fy = y - j;

            const n00 = noise2D(i, j);
            const n10 = noise2D(i + 1, j);
            const n01 = noise2D(i, j + 1);
            const n11 = noise2D(i + 1, j + 1);

            const wx = fx * fx * (3 - 2 * fx);
            const wy = fy * fy * (3 - 2 * fy);

            const top = n00 * (1 - wx) + n10 * wx;
            const bottom = n01 * (1 - wx) + n11 * wx;
            return top * (1 - wy) + bottom * wy;
        };

        this.totalForestCells = 0;
        this.burntCellsCount = 0;
        this.burningCellsCount = 0;
        this.anomalyCellsCount = 0;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const idx = r * this.cols + c;
                const px = c * this.cellSize;
                const py = r * this.cellSize;

                // Base Station location check
                const distToBase = Math.hypot(px - this.baseStationPos.x, py - this.baseStationPos.y);
                if (distToBase < 45) {
                    this.cells[idx] = {
                        type: CELL_TYPES.BASE_STATION,
                        temp: this.ambientTemp,
                        fuel: 0,
                        maxFuel: 0,
                        state: 'NORMAL',
                        wetTimer: 0,
                        treeVariant: 0
                    };
                    continue;
                }

                // River curve
                const riverX = (this.cols * 0.55) + Math.sin(r * 0.12) * 8 + Math.sin(r * 0.04) * 12;
                if (Math.abs(c - riverX) < 2.5) {
                    this.cells[idx] = {
                        type: CELL_TYPES.WATER,
                        temp: 18.5,
                        fuel: 0,
                        maxFuel: 0,
                        state: 'NORMAL',
                        wetTimer: 0,
                        treeVariant: 0
                    };
                    continue;
                }

                // Firebreak road
                const isFirebreakRoad = (Math.abs(r - Math.floor(this.rows * 0.45)) < 1.5 && c > 10 && c < this.cols - 10) ||
                                       (Math.abs(c - Math.floor(this.cols * 0.25)) < 1.2 && r > 15);
                if (isFirebreakRoad) {
                    this.cells[idx] = {
                        type: CELL_TYPES.FIREBREAK,
                        temp: this.ambientTemp + 4.0,
                        fuel: 0,
                        maxFuel: 0,
                        state: 'NORMAL',
                        wetTimer: 0,
                        treeVariant: 0
                    };
                    continue;
                }

                // Terrain noise
                const nVal = smoothNoise(c * 0.08, r * 0.08) * 0.7 + smoothNoise(c * 0.2, r * 0.2) * 0.3;
                let type = CELL_TYPES.DENSE_FOREST;
                let fuel = 1.0;

                if (nVal > 0.65) {
                    type = CELL_TYPES.DENSE_FOREST;
                    fuel = 1.2;
                } else if (nVal > 0.35) {
                    type = CELL_TYPES.SPARSE_FOREST;
                    fuel = 0.8;
                } else {
                    type = CELL_TYPES.DRY_BRUSH;
                    fuel = 0.5;
                }

                this.totalForestCells++;
                this.cells[idx] = {
                    type: type,
                    temp: this.ambientTemp + (Math.random() * 2 - 1),
                    fuel: fuel,
                    maxFuel: fuel,
                    state: 'NORMAL', // 'NORMAL', 'ANOMALY' (60-180°C), 'BURNING' (200-800°C), 'BURNT', 'EXTINGUISHED'
                    wetTimer: 0,
                    treeVariant: Math.floor(Math.random() * 4)
                };
            }
        }
    }

    pixelToCoord(px, py) {
        const c = Math.floor(px / this.cellSize);
        const r = Math.floor(py / this.cellSize);
        return { c: Math.max(0, Math.min(this.cols - 1, c)), r: Math.max(0, Math.min(this.rows - 1, r)) };
    }

    coordToGps(c, r) {
        const u = c / this.cols;
        const v = r / this.rows;
        const lat = (this.baseLat + (1 - v) * this.latSpan).toFixed(5);
        const lon = (this.baseLon + u * this.lonSpan).toFixed(5);
        return { lat: `${lat}° N`, lon: `${lon}° E`, rawLat: parseFloat(lat), rawLon: parseFloat(lon) };
    }

    igniteAt(px, py, intensity = 'WILD') {
        const { c, r } = this.pixelToCoord(px, py);
        const radius = intensity === 'EMBER' ? 1 : intensity === 'CAMP' ? 2 : 3;
        const targetTemp = intensity === 'EMBER' ? 115 : intensity === 'CAMP' ? 280 : 620;

        for (let dr = -radius; dr <= radius; dr++) {
            for (let dc = -radius; dc <= radius; dc++) {
                const nc = c + dc;
                const nr = r + dr;
                if (nc >= 0 && nc < this.cols && nr >= 0 && nr < this.rows) {
                    const idx = nr * this.cols + nc;
                    const cell = this.cells[idx];
                    if (cell.type !== CELL_TYPES.WATER && cell.type !== CELL_TYPES.BASE_STATION && cell.fuel > 0) {
                        cell.temp = Math.max(cell.temp, targetTemp + (Math.random() * 40 - 20));
                        if (cell.temp >= 200) {
                            cell.state = 'BURNING';
                        } else if (cell.temp >= 60) {
                            cell.state = 'ANOMALY';
                        }
                    }
                }
            }
        }
    }

    applyExtinguisher(px, py, radiusPx = 36) {
        const centerCoord = this.pixelToCoord(px, py);
        const cellRadius = Math.ceil(radiusPx / this.cellSize);
        let cellsExtinguished = 0;

        for (let dr = -cellRadius; dr <= cellRadius; dr++) {
            for (let dc = -cellRadius; dc <= cellRadius; dc++) {
                const nc = centerCoord.c + dc;
                const nr = centerCoord.r + dr;
                if (nc >= 0 && nc < this.cols && nr >= 0 && nr < this.rows) {
                    const distSq = (dc * this.cellSize) ** 2 + (dr * this.cellSize) ** 2;
                    if (distSq <= radiusPx * radiusPx) {
                        const idx = nr * this.cols + nc;
                        const cell = this.cells[idx];
                        if (cell.state === 'BURNING' || cell.state === 'ANOMALY') {
                            cellsExtinguished++;
                        }
                        cell.temp = Math.min(cell.temp, 22.0);
                        cell.state = cell.fuel > 0 ? 'EXTINGUISHED' : 'BURNT';
                        cell.wetTimer = 350; // Stays fire-retardant for some time
                    }
                }
            }
        }
        return cellsExtinguished;
    }

    update(particleSystem, dt = 1) {
        const windRad = (this.windAngle * Math.PI) / 180;
        const windVx = Math.cos(windRad) * (this.windSpeed / 15);
        const windVy = Math.sin(windRad) * (this.windSpeed / 15);

        let activeBurning = 0;
        let activeAnomalies = 0;
        let burntCount = 0;

        // Copy current temperatures
        for (let i = 0; i < this.cells.length; i++) {
            this.nextTemp[i] = this.cells[i].temp;
        }

        const humidityDamping = Math.max(0.4, 1.0 - (this.humidity / 100) * 0.6);

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const idx = r * this.cols + c;
                const cell = this.cells[idx];

                if (cell.wetTimer > 0) {
                    cell.wetTimer -= dt;
                    if (cell.wetTimer <= 0 && cell.fuel > 0) {
                        cell.state = 'NORMAL';
                    }
                }

                if (cell.fuel <= 0 && cell.type !== CELL_TYPES.WATER && cell.type !== CELL_TYPES.BASE_STATION) {
                    cell.state = 'BURNT';
                    burntCount++;
                    // Ash cooling
                    this.nextTemp[idx] += (this.ambientTemp - cell.temp) * 0.08 * dt;
                    continue;
                }

                // Combustion logic
                if (cell.temp >= 200 && cell.fuel > 0 && cell.wetTimer <= 0) {
                    cell.state = 'BURNING';
                    activeBurning++;

                    // Heat output
                    const burnRate = (0.0035 + (cell.temp / 800) * 0.006) * humidityDamping * dt;
                    cell.fuel = Math.max(0, cell.fuel - burnRate);

                    // Maintain high combustion temperature
                    const peakTarget = 520 + (cell.fuel * 200);
                    this.nextTemp[idx] += (peakTarget - cell.temp) * 0.12 * dt;

                    // Particle emissions
                    const px = c * this.cellSize + this.cellSize * 0.5;
                    const py = r * this.cellSize + this.cellSize * 0.5;
                    particleSystem.addSmoke(px, py, 1.2, windVx, windVy);
                    if (Math.random() < 0.3) {
                        particleSystem.addEmbers(px, py, 2, windVx, windVy);
                    }

                    // Spread heat to 8 neighbors
                    const spreadBase = (cell.temp * 0.022 * humidityDamping);

                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dr === 0 && dc === 0) continue;
                            const nc = c + dc;
                            const nr = r + dr;
                            if (nc >= 0 && nc < this.cols && nr >= 0 && nr < this.rows) {
                                const nIdx = nr * this.cols + nc;
                                const nCell = this.cells[nIdx];
                                if (nCell.type === CELL_TYPES.WATER || nCell.type === CELL_TYPES.BASE_STATION || nCell.wetTimer > 0) continue;

                                // Wind directional multiplier
                                const dist = Math.hypot(dc, dr);
                                const dirX = dc / dist;
                                const dirY = dr / dist;
                                const windDot = (dirX * windVx + dirY * windVy);
                                const windMultiplier = Math.max(0.15, 1.0 + windDot * 1.6);

                                const heatTransfer = (spreadBase / dist) * windMultiplier * dt;
                                this.nextTemp[nIdx] += heatTransfer;
                            }
                        }
                    }
                } else if (cell.temp >= 60 && cell.fuel > 0) {
                    // Pre-fire Smoldering / Heat Anomaly
                    cell.state = 'ANOMALY';
                    activeAnomalies++;

                    // Slow smoldering fuel consumption
                    cell.fuel = Math.max(0, cell.fuel - 0.0008 * dt);
                    // Slow build up or dissipation depending on humidity
                    if (this.humidity < 40 && Math.random() < 0.008 * dt) {
                        this.nextTemp[idx] += 8.0 * dt; // slowly builds up towards blaze
                    } else {
                        this.nextTemp[idx] += (this.ambientTemp - cell.temp) * 0.015 * dt; // slow cooling
                    }

                    if (Math.random() < 0.15) {
                        const px = c * this.cellSize + this.cellSize * 0.5;
                        const py = r * this.cellSize + this.cellSize * 0.5;
                        particleSystem.addSmoke(px, py, 0.4, windVx, windVy);
                    }
                } else {
                    // Normal cooling / stabilization
                    this.nextTemp[idx] += (this.ambientTemp - cell.temp) * 0.06 * dt;
                    if (cell.state !== 'EXTINGUISHED' && cell.state !== 'BURNT') {
                        cell.state = 'NORMAL';
                    }
                }
            }
        }

        // Apply new temperatures
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].temp = Math.max(12, Math.min(850, this.nextTemp[i]));
        }

        this.burningCellsCount = activeBurning;
        this.anomalyCellsCount = activeAnomalies;
        this.burntCellsCount = burntCount;
    }

    draw(ctx, renderMode = 'TACTICAL') {
        const cs = this.cellSize;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const idx = r * this.cols + c;
                const cell = this.cells[idx];
                const x = c * cs;
                const y = r * cs;

                if (renderMode === 'THERMAL') {
                    // Full Thermal View
                    ctx.fillStyle = this.getIronbowColor(cell.temp);
                    ctx.fillRect(x, y, cs, cs);
                    continue;
                }

                // TACTICAL SAT/GIS RENDERING
                if (cell.type === CELL_TYPES.BASE_STATION) {
                    ctx.fillStyle = '#1e293b';
                    ctx.fillRect(x, y, cs, cs);
                    ctx.strokeStyle = '#38bdf8';
                    ctx.strokeRect(x + 1, y + 1, cs - 2, cs - 2);
                } else if (cell.type === CELL_TYPES.WATER) {
                    ctx.fillStyle = '#0284c7';
                    ctx.fillRect(x, y, cs, cs);
                } else if (cell.type === CELL_TYPES.FIREBREAK) {
                    ctx.fillStyle = '#57534e';
                    ctx.fillRect(x, y, cs, cs);
                } else if (cell.state === 'BURNT') {
                    ctx.fillStyle = '#1c1917'; // Ash dark gray
                    ctx.fillRect(x, y, cs, cs);
                } else if (cell.state === 'BURNING') {
                    // Active Fire Glow
                    const flicker = Math.sin(Date.now() * 0.02 + idx) * 0.15 + 0.85;
                    const rCol = 255;
                    const gCol = Math.floor(Math.min(240, 50 + (cell.temp / 800) * 190 * flicker));
                    const bCol = 0;
                    ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
                    ctx.fillRect(x, y, cs, cs);
                } else if (cell.state === 'ANOMALY') {
                    // Heat Anomaly (Smoldering ember / pre-fire glow)
                    ctx.fillStyle = '#9a3412';
                    ctx.fillRect(x, y, cs, cs);
                    // Pulsing thermal core
                    const pulse = Math.abs(Math.sin(Date.now() * 0.005 + idx * 0.1));
                    ctx.fillStyle = `rgba(249, 115, 22, ${0.4 + pulse * 0.4})`;
                    ctx.fillRect(x + 1, y + 1, cs - 2, cs - 2);
                } else if (cell.state === 'EXTINGUISHED') {
                    // Wet white-cyan foam residue
                    ctx.fillStyle = '#334155';
                    ctx.fillRect(x, y, cs, cs);
                    ctx.fillStyle = 'rgba(147, 197, 253, 0.45)';
                    ctx.fillRect(x, y, cs, cs);
                } else {
                    // Healthy Vegetation
                    if (cell.type === CELL_TYPES.DENSE_FOREST) {
                        ctx.fillStyle = cell.treeVariant === 0 ? '#14532d' : cell.treeVariant === 1 ? '#166534' : '#15803d';
                    } else if (cell.type === CELL_TYPES.SPARSE_FOREST) {
                        ctx.fillStyle = '#1e3a1e';
                    } else {
                        ctx.fillStyle = '#365314'; // Dry brush yellowish green
                    }
                    ctx.fillRect(x, y, cs, cs);
                }
            }
        }

        // Draw Base Station Helipad Icon
        ctx.save();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.baseStationPos.x, this.baseStationPos.y, 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('H', this.baseStationPos.x, this.baseStationPos.y);
        ctx.font = '9px monospace';
        ctx.fillText('GCS BASE', this.baseStationPos.x, this.baseStationPos.y + 18);
        ctx.restore();
    }

    getIronbowColor(temp) {
        // FLIR Ironbow: 20°C (Black/Dark Blue) -> 70°C (Purple/Magenta) -> 180°C (Red/Orange) -> 400°C (Yellow) -> 700°C+ (White)
        const tNorm = Math.max(0, Math.min(1, (temp - 20) / 600));
        let r = 0, g = 0, b = 0;
        if (tNorm < 0.25) {
            const f = tNorm / 0.25;
            r = Math.floor(f * 80);
            g = 0;
            b = Math.floor(f * 180 + 30);
        } else if (tNorm < 0.5) {
            const f = (tNorm - 0.25) / 0.25;
            r = Math.floor(80 + f * 175);
            g = 0;
            b = Math.floor(210 * (1 - f));
        } else if (tNorm < 0.75) {
            const f = (tNorm - 0.5) / 0.25;
            r = 255;
            g = Math.floor(f * 200);
            b = 0;
        } else {
            const f = (tNorm - 0.75) / 0.25;
            r = 255;
            g = Math.floor(200 + f * 55);
            b = Math.floor(f * 255);
        }
        return `rgb(${r},${g},${b})`;
    }
}
