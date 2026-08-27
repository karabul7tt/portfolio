import { ForestGrid } from '../simulation/forestGrid.js';
import { ParticleSystem } from '../simulation/particles.js';
import { DroneSwarm, DRONE_ROLES, DRONE_STATES } from '../simulation/droneSwarm.js';
import { ThermalVisionRenderer, THERMAL_PALETTES } from '../simulation/thermalVision.js';
import { soundManager } from '../simulation/audioEffects.js';

class SimulatorApp {
    constructor() {
        this.mainCanvas = document.getElementById('mainCanvas');
        this.mainCtx = this.mainCanvas.getContext('2d');

        this.hudCanvas = document.getElementById('hudCanvas');

        this.simSpeed = 1.0;
        this.isPaused = false;
        this.mapViewMode = 'TACTICAL'; // 'TACTICAL' or 'THERMAL'
        this.clickTool = 'IGNITE_EMBER'; // 'IGNITE_EMBER', 'IGNITE_WILD', 'MANUAL_EXTINGUISH', 'INFO'

        this.init();
    }

    init() {
        // Setup Canvas Dimensions
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Instantiate Engines
        this.particles = new ParticleSystem();
        this.forestGrid = new ForestGrid(this.mainCanvas.width, this.mainCanvas.height, 12);
        this.swarm = new DroneSwarm(this.forestGrid, this.particles);
        this.thermalRenderer = new ThermalVisionRenderer();

        // Bind UI Events
        this.bindEvents();

        // Start Loop
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    resizeCanvas() {
        const container = this.mainCanvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.mainCanvas.width = Math.floor(rect.width);
        this.mainCanvas.height = Math.floor(rect.height);

        // Keep HUD fixed high-res 16:9 ratio
        this.hudCanvas.width = 440;
        this.hudCanvas.height = 260;

        if (this.forestGrid) {
            this.forestGrid.width = this.mainCanvas.width;
            this.forestGrid.height = this.mainCanvas.height;
            this.forestGrid.cols = Math.floor(this.mainCanvas.width / this.forestGrid.cellSize);
            this.forestGrid.rows = Math.floor(this.mainCanvas.height / this.forestGrid.cellSize);
            this.forestGrid.initGrid();
            this.swarm.generateVoronoiPatrolPaths();
        }
    }

    bindEvents() {
        // Canvas Interaction (Click to ignite or extinguish)
        this.mainCanvas.addEventListener('mousedown', (e) => {
            soundManager.init();
            const rect = this.mainCanvas.getBoundingClientRect();
            const px = e.clientX - rect.left;
            const py = e.clientY - rect.top;

            // Check if clicked near a drone to select it
            let clickedDrone = this.swarm.drones.find(d => Math.hypot(d.x - px, d.y - py) < 25);
            if (clickedDrone) {
                this.swarm.selectedDrone = clickedDrone;
                soundManager.playUiClick();
                this.updateDroneListUI();
                return;
            }

            if (this.clickTool === 'IGNITE_EMBER') {
                this.forestGrid.igniteAt(px, py, 'EMBER');
                this.swarm.logEvent(`[MANUEL] Haritada köz / ısı anomalisi oluşturuldu. (${px.toFixed(0)}, ${py.toFixed(0)})`);
            } else if (this.clickTool === 'IGNITE_WILD') {
                this.forestGrid.igniteAt(px, py, 'WILD');
                this.swarm.logEvent(`[MANUEL] Haritada alevli orman yangını başlatıldı!`);
            } else if (this.clickTool === 'MANUAL_EXTINGUISH') {
                soundManager.playExtinguishBurst();
                this.particles.addExtinguisherBurst(px, py);
                this.forestGrid.applyExtinguisher(px, py, 45);
            }
        });

        // Click Tool Buttons
        document.getElementById('toolEmber').onclick = () => this.setClickTool('IGNITE_EMBER');
        document.getElementById('toolWildfire').onclick = () => this.setClickTool('IGNITE_WILD');
        document.getElementById('toolExtinguish').onclick = () => this.setClickTool('MANUAL_EXTINGUISH');

        // Random Fire Trigger Button
        document.getElementById('btnRandomFire').onclick = () => {
            soundManager.init();
            const rx = Math.random() * (this.mainCanvas.width - 160) + 80;
            const ry = Math.random() * (this.mainCanvas.height - 160) + 80;
            const isWild = Math.random() > 0.4;
            this.forestGrid.igniteAt(rx, ry, isWild ? 'WILD' : 'EMBER');
            this.swarm.logEvent(`⚡ Rastgele ${isWild ? 'yangın' : 'ısı anomalisi'} başladı!`);
        };

        // Weather Controls
        const windSpeedSlider = document.getElementById('windSpeedSlider');
        const windSpeedVal = document.getElementById('windSpeedVal');
        windSpeedSlider.oninput = (e) => {
            const v = parseFloat(e.target.value);
            this.forestGrid.windSpeed = v;
            windSpeedVal.textContent = `${v.toFixed(0)} km/h`;
            this.updateWindCompass();
        };

        const windDirSlider = document.getElementById('windDirSlider');
        const windDirVal = document.getElementById('windDirVal');
        windDirSlider.oninput = (e) => {
            const v = parseFloat(e.target.value);
            this.forestGrid.windAngle = v;
            windDirVal.textContent = `${v.toFixed(0)}°`;
            this.updateWindCompass();
        };

        const tempSlider = document.getElementById('tempSlider');
        const tempVal = document.getElementById('tempVal');
        tempSlider.oninput = (e) => {
            const v = parseFloat(e.target.value);
            this.forestGrid.ambientTemp = v;
            tempVal.textContent = `${v.toFixed(0)}°C`;
        };

        const humiditySlider = document.getElementById('humiditySlider');
        const humidityVal = document.getElementById('humidityVal');
        humiditySlider.oninput = (e) => {
            const v = parseFloat(e.target.value);
            this.forestGrid.humidity = v;
            humidityVal.textContent = `%${v.toFixed(0)}`;
        };

        // Thermal Palette Buttons
        ['IRONBOW', 'WHITE_HOT', 'RAINBOW', 'BLACK_HOT'].forEach(pal => {
            const btn = document.getElementById(`pal_${pal}`);
            if (btn) {
                btn.onclick = () => {
                    this.thermalRenderer.setPalette(pal);
                    soundManager.playUiClick();
                    document.querySelectorAll('.pal-btn').forEach(b => b.classList.remove('bg-sky-600', 'text-white'));
                    btn.classList.add('bg-sky-600', 'text-white');
                };
            }
        });

        // Map View Mode Toggle (Tactical vs Full Thermal Satellite)
        document.getElementById('btnToggleMapView').onclick = () => {
            soundManager.playUiClick();
            this.mapViewMode = this.mapViewMode === 'TACTICAL' ? 'THERMAL' : 'TACTICAL';
            const btn = document.getElementById('btnToggleMapView');
            btn.textContent = this.mapViewMode === 'TACTICAL' ? '🗺️ Termal Harita Moduna Geç' : '🛰️ Taktik Harita Moduna Geç';
        };

        // Swarm Action Commands
        document.getElementById('btnSwarmPatrol').onclick = () => {
            soundManager.playRadioChirp();
            this.swarm.drones.forEach(d => {
                if (d.status !== DRONE_STATES.RECHARGING) d.status = DRONE_STATES.PATROL;
            });
            this.swarm.generateVoronoiPatrolPaths();
            this.swarm.logEvent('[KOMUT] Tüm sürü Voronoi devriye moduna geçirildi.');
        };

        document.getElementById('btnSwarmRTB').onclick = () => {
            soundManager.playRadioChirp();
            this.swarm.drones.forEach(d => {
                if (d.status !== DRONE_STATES.RECHARGING) d.status = DRONE_STATES.RTB;
            });
            this.swarm.logEvent('[KOMUT] Tüm filoya acil ÜSSE DÖNÜŞ (RTB) emri verildi.');
        };

        // Audio Mute Toggle
        const btnMute = document.getElementById('btnMute');
        btnMute.onclick = () => {
            const isMuted = soundManager.toggleMute();
            btnMute.textContent = isMuted ? '🔇 Ses: Kapalı' : '🔊 Ses: Açık';
            btnMute.classList.toggle('text-rose-400', isMuted);
        };

        // Speed Controls
        document.getElementById('btnSpeed1x').onclick = () => { this.simSpeed = 1.0; this.isPaused = false; this.updateSpeedUI('1x'); };
        document.getElementById('btnSpeed2x').onclick = () => { this.simSpeed = 2.0; this.isPaused = false; this.updateSpeedUI('2x'); };
        document.getElementById('btnPause').onclick = () => { this.isPaused = !this.isPaused; this.updateSpeedUI(this.isPaused ? 'pause' : '1x'); };

        // Reset Map
        document.getElementById('btnReset').onclick = () => {
            soundManager.playUiClick();
            this.forestGrid.initGrid();
            this.particles.clear();
            this.swarm.initSwarm();
            this.swarm.logEvent('🔄 Simülasyon haritası ve sürü sıfırlandı.');
        };
        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.key === '1') this.setClickTool('IGNITE_EMBER');
            else if (e.key === '2') this.setClickTool('IGNITE_WILD');
            else if (e.key === '3') this.setClickTool('MANUAL_EXTINGUISH');
            else if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                this.isPaused = !this.isPaused;
                this.updateSpeedUI(this.isPaused ? 'pause' : `${this.simSpeed}x`);
            } else if (e.key.toLowerCase() === 'r') {
                document.getElementById('btnRandomFire').click();
            } else if (e.key.toLowerCase() === 't') {
                document.getElementById('btnToggleMapView').click();
            }
        });
    }

    setClickTool(tool) {
        soundManager.playUiClick();
        this.clickTool = tool;
        document.querySelectorAll('.tool-btn').forEach(b => {
            b.classList.remove('border-sky-400', 'bg-sky-950/60', 'text-sky-300');
            b.classList.add('border-slate-800', 'text-slate-400');
        });
        const activeBtnMap = {
            'IGNITE_EMBER': 'toolEmber',
            'IGNITE_WILD': 'toolWildfire',
            'MANUAL_EXTINGUISH': 'toolExtinguish'
        };
        const activeBtn = document.getElementById(activeBtnMap[tool]);
        if (activeBtn) {
            activeBtn.classList.add('border-sky-400', 'bg-sky-950/60', 'text-sky-300');
        }
    }

    updateSpeedUI(speed) {
        soundManager.playUiClick();
        const map = {
            '1x': 'btnSpeed1x',
            '2x': 'btnSpeed2x',
            'pause': 'btnPause'
        };
        ['btnSpeed1x', 'btnSpeed2x', 'btnPause'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('bg-sky-600', 'text-white');
                el.classList.add('bg-slate-800', 'text-slate-300');
            }
        });
        const activeEl = document.getElementById(map[speed]);
        if (activeEl) {
            activeEl.classList.remove('bg-slate-800', 'text-slate-300');
            activeEl.classList.add('bg-sky-600', 'text-white');
        }
    }

    updateWindCompass() {
        const compass = document.getElementById('windCompassArrow');
        if (compass) {
            compass.style.transform = `rotate(${this.forestGrid.windAngle}deg)`;
        }
    }

    gameLoop(timestamp) {
        const dt = Math.min(2.0, (timestamp - this.lastTime) / 16.66) * (this.isPaused ? 0 : this.simSpeed);
        this.lastTime = timestamp;

        if (dt > 0) {
            this.forestGrid.update(this.particles, dt);
            this.particles.update(dt);
            this.swarm.update(dt);
        }

        // Draw Simulation Map
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.forestGrid.draw(this.mainCtx, this.mapViewMode);
        this.particles.draw(this.mainCtx);
        this.swarm.draw(this.mainCtx, this.mapViewMode);

        // Draw Selected Drone Camera View in HUD Canvas
        this.thermalRenderer.renderDroneCameraView(this.hudCanvas, this.swarm.selectedDrone, this.forestGrid);

        // Update UI Panels
        this.updateStatsUI();
        this.updateDroneListUI();
        this.updateLogsUI();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    updateStatsUI() {
        document.getElementById('statBurning').textContent = this.forestGrid.burningCellsCount;
        document.getElementById('statAnomalies').textContent = this.forestGrid.anomalyCellsCount;
        document.getElementById('statExtinguished').textContent = this.swarm.stats.firesExtinguished;
        document.getElementById('statCapsules').textContent = this.swarm.stats.capsulesDropped;
        document.getElementById('statBurnt').textContent = `${((this.forestGrid.burntCellsCount / Math.max(1, this.forestGrid.totalForestCells)) * 100).toFixed(1)}%`;

        // Alert Banner Indicator
        const alertBanner = document.getElementById('alertBanner');
        if (this.forestGrid.burningCellsCount > 0) {
            alertBanner.className = 'flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-500/80 rounded text-red-300 animate-alert text-xs font-bold';
            alertBanner.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> KRİTİK YANGIN TESPİTİ (${this.forestGrid.burningCellsCount} HÜCRE)`;
        } else if (this.forestGrid.anomalyCellsCount > 0) {
            alertBanner.className = 'flex items-center gap-2 px-3 py-1 bg-orange-950/80 border border-orange-500/80 rounded text-orange-300 animate-pulse text-xs font-bold';
            alertBanner.innerHTML = `<span class="w-2 h-2 rounded-full bg-orange-400"></span> TERMAL ANOMALİ ALARMI (+${this.forestGrid.anomalyCellsCount} KÖZ)`;
        } else {
            alertBanner.className = 'flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700/60 rounded text-emerald-400 text-xs';
            alertBanner.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> ALAN GÜVENLİ (DEVRİYE AKTİF)`;
        }
    }

    updateDroneListUI() {
        const listEl = document.getElementById('droneCardsList');
        if (!listEl) return;

        let html = '';
        this.swarm.drones.forEach(d => {
            const isSelected = this.swarm.selectedDrone && this.swarm.selectedDrone.id === d.id;
            const isScout = d.role === DRONE_ROLES.SCOUT;
            const stateColors = {
                'PATROL': 'text-sky-400 border-sky-500/40 bg-sky-950/40',
                'INVESTIGATING': 'text-amber-400 border-amber-500/40 bg-amber-950/40',
                'ENGAGING': 'text-rose-400 border-rose-500/40 bg-rose-950/40',
                'RTB': 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40',
                'RECHARGING': 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
            };

            const roleBadge = isScout ? '🔍 GÖZCÜ' : '💣 MÜDAHALE';
            const payloadInfo = !isScout ? `<span class="text-xs text-slate-300">Top: <b class="text-sky-300">${d.payload}/${d.maxPayload}</b></span>` : '<span class="text-xs text-sky-400">LWIR FLIR</span>';

            html += `
                <div class="drone-card p-2 rounded border cursor-pointer transition-all ${isSelected ? 'border-sky-400 bg-sky-950/40 shadow-lg shadow-sky-950' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}" data-id="${d.id}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-xs ${isSelected ? 'text-sky-300' : 'text-slate-200'}">${d.name}</span>
                            <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${roleBadge}</span>
                        </div>
                        <span class="text-[10px] px-1.5 py-0.5 rounded border ${stateColors[d.status] || 'text-slate-400'} font-semibold">${d.status}</span>
                    </div>

                    <div class="mt-2 flex items-center justify-between text-xs">
                        <div class="flex items-center gap-1.5">
                            <span class="text-slate-400">Batarya:</span>
                            <div class="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full ${d.battery < 25 ? 'bg-rose-500' : 'bg-emerald-400'}" style="width: ${d.battery}%"></div>
                            </div>
                            <span class="text-[10px] font-mono ${d.battery < 25 ? 'text-rose-400' : 'text-slate-300'}">%${d.battery.toFixed(0)}</span>
                        </div>
                        ${payloadInfo}
                    </div>

                    <div class="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>İrtifa: ${d.altitude}m</span>
                        <span>Mesh: ${d.meshLinks.length} Bağlantı</span>
                    </div>
                </div>
            `;
        });

        listEl.innerHTML = html;

        // Attach click listeners to cards
        listEl.querySelectorAll('.drone-card').forEach(card => {
            card.onclick = () => {
                const id = parseInt(card.getAttribute('data-id'));
                const found = this.swarm.drones.find(d => d.id === id);
                if (found) {
                    this.swarm.selectedDrone = found;
                    soundManager.playUiClick();
                    this.updateDroneListUI();
                }
            };
        });
    }

    updateLogsUI() {
        const logContainer = document.getElementById('incidentLogsList');
        if (!logContainer) return;

        let html = '';
        this.swarm.eventLogs.forEach(log => {
            const isAlarm = log.text.includes('ALARM') || log.text.includes('KRİTİK') || log.text.includes('ANORMAL');
            const isSuccess = log.text.includes('BAŞARILI') || log.text.includes('kapsülü bırakıldı');
            const colorClass = isAlarm ? 'text-rose-300 font-semibold' : isSuccess ? 'text-emerald-300' : 'text-slate-300';

            html += `
                <div class="py-1 border-b border-slate-800/60 flex items-start gap-2 text-xs">
                    <span class="text-slate-500 font-mono shrink-0">${log.time}</span>
                    <span class="${colorClass}">${log.text}</span>
                </div>
            `;
        });

        logContainer.innerHTML = html;
    }
}

// Instantiate simulator once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.app = new SimulatorApp();
});
