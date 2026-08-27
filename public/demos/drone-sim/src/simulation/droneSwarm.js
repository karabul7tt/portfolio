// Drone Swarm Intelligence, Mesh Networking, and Autonomous Intervention Engine
import { soundManager } from './audioEffects.js';

export const DRONE_ROLES = {
    SCOUT: 'SCOUT',           // Gözcü İHA (Termal Alan Taraması)
    EXTINGUISHER: 'EXTINGUISHER' // Müdahale İHA (Yangın Topu Taşıyıcı)
};

export const DRONE_STATES = {
    PATROL: 'PATROL',
    INVESTIGATING: 'INVESTIGATING',
    ENGAGING: 'ENGAGING',
    RTB: 'RTB',
    RECHARGING: 'RECHARGING'
};

export class Drone {
    constructor(id, name, role, x, y, basePos) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.basePos = { ...basePos };

        this.heading = Math.random() * Math.PI * 2;
        this.altitude = role === DRONE_ROLES.SCOUT ? 85 : 45; // meters
        this.maxSpeed = role === DRONE_ROLES.SCOUT ? 2.6 : 2.0;
        this.speed = 0;
        this.fovRadius = role === DRONE_ROLES.SCOUT ? 65 : 40;

        this.battery = 100.0; // %
        this.batteryDrainRate = role === DRONE_ROLES.SCOUT ? 0.015 : 0.022;

        this.maxPayload = role === DRONE_ROLES.EXTINGUISHER ? 4 : 0;
        this.payload = this.maxPayload; // Extinguishing balls count

        this.status = DRONE_STATES.PATROL;
        this.assignedIncident = null;
        this.patrolWaypoints = [];
        this.currentWpIndex = 0;

        this.rechargeTimer = 0;
        this.dropCooldown = 0;
        this.meshLinks = []; // connected drone IDs

        this.gps = { lat: '38.3524° N', lon: '27.1856° E' };
        this.flightLog = [];
    }

    setPatrolPath(points) {
        this.patrolWaypoints = points;
        this.currentWpIndex = 0;
        if (points.length > 0) {
            this.targetX = points[0].x;
            this.targetY = points[0].y;
        }
    }

    update(forestGrid, swarm, dt = 1) {
        // Update GPS simulation
        const coord = forestGrid.pixelToCoord(this.x, this.y);
        this.gps = forestGrid.coordToGps(coord.c, coord.r);

        // Drop cooldown
        if (this.dropCooldown > 0) {
            this.dropCooldown -= dt;
        }

        // Battery Drain
        if (this.status !== DRONE_STATES.RECHARGING) {
            this.battery = Math.max(0, this.battery - this.batteryDrainRate * dt);
            if (this.battery < 18.0 && this.status !== DRONE_STATES.RTB) {
                this.status = DRONE_STATES.RTB;
                this.targetX = this.basePos.x + (Math.random() * 20 - 10);
                this.targetY = this.basePos.y + (Math.random() * 20 - 10);
                this.assignedIncident = null;
                swarm.logEvent(`[${this.name}] Düşük batarya (%${this.battery.toFixed(0)}), üsse dönüş (RTB) başladı.`);
            }
        }

        // State Machine
        switch (this.status) {
            case DRONE_STATES.RECHARGING:
                this.speed = 0;
                this.battery = Math.min(100, this.battery + 0.35 * dt);
                if (this.role === DRONE_ROLES.EXTINGUISHER) {
                    this.payload = this.maxPayload;
                }
                if (this.battery >= 99.0) {
                    this.status = DRONE_STATES.PATROL;
                    swarm.logEvent(`[${this.name}] Şarj ve mühimmat ikmali tamamlandı. Devriyeye çıkılıyor.`);
                }
                break;

            case DRONE_STATES.RTB:
                this.targetX = this.basePos.x;
                this.targetY = this.basePos.y;
                const distToBase = Math.hypot(this.targetX - this.x, this.targetY - this.y);
                if (distToBase < 12) {
                    this.status = DRONE_STATES.RECHARGING;
                    swarm.logEvent(`[${this.name}] Üsse iniş yaptı. Şarj ve bakım başlatıldı.`);
                }
                this.moveTowardsTarget(dt, swarm);
                break;

            case DRONE_STATES.PATROL:
                if (this.patrolWaypoints.length > 0) {
                    const wp = this.patrolWaypoints[this.currentWpIndex];
                    this.targetX = wp.x;
                    this.targetY = wp.y;
                    const distToWp = Math.hypot(this.targetX - this.x, this.targetY - this.y);
                    if (distToWp < 25) {
                        this.currentWpIndex = (this.currentWpIndex + 1) % this.patrolWaypoints.length;
                    }
                }
                this.moveTowardsTarget(dt, swarm);
                break;

            case DRONE_STATES.INVESTIGATING:
                if (!this.assignedIncident || this.assignedIncident.resolved) {
                    this.status = DRONE_STATES.PATROL;
                    this.assignedIncident = null;
                    break;
                }
                this.targetX = this.assignedIncident.x;
                this.targetY = this.assignedIncident.y;
                this.moveTowardsTarget(dt, swarm);
                break;

            case DRONE_STATES.ENGAGING:
                if (!this.assignedIncident || this.assignedIncident.resolved || this.payload <= 0) {
                    if (this.payload <= 0) {
                        this.status = DRONE_STATES.RTB;
                        swarm.logEvent(`[${this.name}] Söndürme mühimmatı tükendi, üsse dönülüyor.`);
                    } else {
                        this.status = DRONE_STATES.PATROL;
                    }
                    this.assignedIncident = null;
                    break;
                }

                this.targetX = this.assignedIncident.x;
                this.targetY = this.assignedIncident.y;
                const distToFire = Math.hypot(this.targetX - this.x, this.targetY - this.y);

                if (distToFire < 18 && this.dropCooldown <= 0) {
                    // Drop Extinguishing Ball
                    this.dropExtinguisher(swarm, forestGrid);
                }

                this.moveTowardsTarget(dt, swarm);
                break;
        }

        // Onboard Thermal Sensing (Edge AI scan in camera FOV)
        this.performThermalScan(forestGrid, swarm);
    }

    moveTowardsTarget(dt, swarm) {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const targetAngle = Math.atan2(dy, dx);

        // Turn smoothly
        let angleDiff = targetAngle - this.heading;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        this.heading += angleDiff * 0.12 * dt;

        // Artificial Potential Field (Collision Avoidance with peer drones)
        let repX = 0;
        let repY = 0;
        const sepDist = 28;

        for (const other of swarm.drones) {
            if (other.id === this.id) continue;
            const ox = this.x - other.x;
            const oy = this.y - other.y;
            const dist = Math.hypot(ox, oy);
            if (dist < sepDist && dist > 0.1) {
                const force = (sepDist - dist) / sepDist;
                repX += (ox / dist) * force * 1.8;
                repY += (oy / dist) * force * 1.8;
            }
        }

        this.speed = Math.min(this.maxSpeed, Math.hypot(dx, dy) * 0.05);

        this.x += (Math.cos(this.heading) * this.speed + repX) * dt;
        this.y += (Math.sin(this.heading) * this.speed + repY) * dt;
    }

    performThermalScan(forestGrid, swarm) {
        if (this.status === DRONE_STATES.RECHARGING) return;

        const { c: centerC, r: centerR } = forestGrid.pixelToCoord(this.x, this.y);
        const cellRadius = Math.ceil(this.fovRadius / forestGrid.cellSize);

        let maxTempFound = 0;
        let hotspotPixel = null;

        for (let dr = -cellRadius; dr <= cellRadius; dr++) {
            for (let dc = -cellRadius; dc <= cellRadius; dc++) {
                const c = centerC + dc;
                const r = centerR + dr;
                if (c >= 0 && c < forestGrid.cols && r >= 0 && r < forestGrid.rows) {
                    const distSq = (dc * forestGrid.cellSize) ** 2 + (dr * forestGrid.cellSize) ** 2;
                    if (distSq <= this.fovRadius * this.fovRadius) {
                        const cell = forestGrid.cells[r * forestGrid.cols + c];
                        if (cell.temp > 62.0 && cell.temp > maxTempFound) {
                            maxTempFound = cell.temp;
                            hotspotPixel = {
                                x: c * forestGrid.cellSize + forestGrid.cellSize * 0.5,
                                y: r * forestGrid.cellSize + forestGrid.cellSize * 0.5,
                                temp: cell.temp,
                                isFire: cell.temp >= 200.0,
                                c, r
                            };
                        }
                    }
                }
            }
        }

        if (hotspotPixel) {
            // Anomaly or Fire Detected!
            swarm.reportIncident(hotspotPixel, this);
        }
    }

    dropExtinguisher(swarm, forestGrid) {
        if (this.payload <= 0) return;

        this.payload--;
        this.dropCooldown = 75; // frames cooldown

        soundManager.playDropSound();

        // Spawn falling projectile
        swarm.fallingProjectiles.push({
            startX: this.x,
            startY: this.y,
            targetX: this.targetX + (Math.random() * 8 - 4),
            targetY: this.targetY + (Math.random() * 8 - 4),
            progress: 0,
            droneId: this.id
        });

        swarm.logEvent(`[${this.name}] 🎯 Yangın söndürme kapsülü bırakıldı! Hedef: (${this.gps.lat}, ${this.gps.lon}) Kalan: ${this.payload}/${this.maxPayload}`);
    }
}

export class DroneSwarm {
    constructor(forestGrid, particleSystem) {
        this.forestGrid = forestGrid;
        this.particleSystem = particleSystem;
        this.drones = [];
        this.selectedDrone = null;
        this.incidents = []; // active fire/anomaly hotspots
        this.fallingProjectiles = [];
        this.eventLogs = [];
        this.maxLogs = 30;

        this.stats = {
            firesDetected: 0,
            firesExtinguished: 0,
            capsulesDropped: 0,
            totalPatrolAreaHa: 125.4,
            avgResponseTimeSec: 4.8
        };

        this.meshMaxDist = 320; // mesh network comms range (px)
        this.initSwarm();
    }

    initSwarm() {
        this.drones = [];
        this.incidents = [];
        this.fallingProjectiles = [];

        const basePos = this.forestGrid.baseStationPos;

        // 3 Gözcü İHA (Scouts)
        const scout1 = new Drone(1, 'SCOUT-01', DRONE_ROLES.SCOUT, basePos.x + 10, basePos.y - 15, basePos);
        const scout2 = new Drone(2, 'SCOUT-02', DRONE_ROLES.SCOUT, basePos.x - 15, basePos.y + 10, basePos);
        const scout3 = new Drone(3, 'SCOUT-03', DRONE_ROLES.SCOUT, basePos.x + 20, basePos.y + 15, basePos);

        // 2 Müdahale İHA (Bombers)
        const bomber1 = new Drone(4, 'BOMBER-01', DRONE_ROLES.EXTINGUISHER, basePos.x - 20, basePos.y - 10, basePos);
        const bomber2 = new Drone(5, 'BOMBER-02', DRONE_ROLES.EXTINGUISHER, basePos.x + 5, basePos.y + 25, basePos);

        this.drones = [scout1, scout2, scout3, bomber1, bomber2];
        this.selectedDrone = scout1;

        // Set Area Coverage Patrol Paths
        this.generateVoronoiPatrolPaths();

        this.logEvent('🛰️ Sürü mesh ağı başlatıldı. 5 İHA operasyona hazır.');
    }

    generateVoronoiPatrolPaths() {
        const w = this.forestGrid.width;
        const h = this.forestGrid.height;

        // Scout 1: Northern Sector Sweep
        this.drones[0].setPatrolPath([
            { x: w * 0.2, y: h * 0.2 },
            { x: w * 0.5, y: h * 0.15 },
            { x: w * 0.8, y: h * 0.25 },
            { x: w * 0.5, y: h * 0.35 }
        ]);

        // Scout 2: Central & Eastern Sector
        this.drones[1].setPatrolPath([
            { x: w * 0.75, y: h * 0.45 },
            { x: w * 0.85, y: h * 0.75 },
            { x: w * 0.55, y: h * 0.80 },
            { x: w * 0.45, y: h * 0.50 }
        ]);

        // Scout 3: Western & Southern Sector
        this.drones[2].setPatrolPath([
            { x: w * 0.25, y: h * 0.55 },
            { x: w * 0.15, y: h * 0.80 },
            { x: w * 0.35, y: h * 0.75 },
            { x: w * 0.30, y: h * 0.40 }
        ]);

        // Bombers: Loitering standby tracks near central tactical corridor
        this.drones[3].setPatrolPath([
            { x: w * 0.4, y: h * 0.4 },
            { x: w * 0.6, y: h * 0.4 }
        ]);

        this.drones[4].setPatrolPath([
            { x: w * 0.4, y: h * 0.6 },
            { x: w * 0.6, y: h * 0.6 }
        ]);
    }

    reportIncident(hotspot, reportingDrone) {
        // Check if this hotspot is already tracked within 35px
        let existing = this.incidents.find(inc => !inc.resolved && Math.hypot(inc.x - hotspot.x, inc.y - hotspot.y) < 35);

        if (!existing) {
            const gps = this.forestGrid.coordToGps(hotspot.c, hotspot.r);
            const isFlame = hotspot.isFire;
            const newIncident = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                x: hotspot.x,
                y: hotspot.y,
                c: hotspot.c,
                r: hotspot.r,
                temp: hotspot.temp,
                isFire: isFlame,
                gps: gps,
                resolved: false,
                assignedDroneId: null,
                detectTime: Date.now()
            };

            this.incidents.push(newIncident);
            this.stats.firesDetected++;

            // Audio & Event alert
            soundManager.playAlarm();
            const alertTag = isFlame ? '🔥 KRİTİK YANGIN' : '⚠️ ANORMAL ISI ARTIŞI';
            this.logEvent(`[ALARM] ${alertTag} tespit edildi! Sıcaklık: ${hotspot.temp.toFixed(0)}°C Konum: (${gps.lat}, ${gps.lon})`);

            // Swarm Auction / Consensus Dispatch
            this.dispatchExtinguisher(newIncident);
        } else {
            // Update peak temperature
            if (hotspot.temp > existing.temp) {
                existing.temp = hotspot.temp;
                existing.isFire = hotspot.isFire;
            }
        }
    }

    dispatchExtinguisher(incident) {
        // Find best available bomber (has payload, battery > 20%, closest distance)
        const availableBombers = this.drones.filter(d =>
            d.role === DRONE_ROLES.EXTINGUISHER &&
            d.status !== DRONE_STATES.RECHARGING &&
            d.status !== DRONE_STATES.RTB &&
            d.payload > 0 &&
            d.battery > 18
        );

        if (availableBombers.length > 0) {
            // Sort by proximity
            availableBombers.sort((a, b) => {
                const distA = Math.hypot(a.x - incident.x, a.y - incident.y);
                const distB = Math.hypot(b.x - incident.x, b.y - incident.y);
                return distA - distB;
            });

            const chosen = availableBombers[0];
            chosen.status = DRONE_STATES.ENGAGING;
            chosen.assignedIncident = incident;
            incident.assignedDroneId = chosen.id;

            soundManager.playRadioChirp();
            this.logEvent(`[MESH-ROUTING] ${chosen.name} hedefe yönlendirildi. Tahmini Varış: ${(Math.hypot(chosen.x - incident.x, chosen.y - incident.y) / (chosen.maxSpeed * 30)).toFixed(1)} sn`);
        } else {
            this.logEvent(`[UYARI] Boşta müdahale İHA'sı yok! Hedef gözetim altında tutuluyor.`);
        }
    }

    update(dt = 1) {
        // Update Mesh Network Topology (P2P connections within radio range)
        for (let i = 0; i < this.drones.length; i++) {
            this.drones[i].meshLinks = [];
            for (let j = 0; j < this.drones.length; j++) {
                if (i !== j) {
                    const dist = Math.hypot(this.drones[i].x - this.drones[j].x, this.drones[i].y - this.drones[j].y);
                    if (dist <= this.meshMaxDist) {
                        this.drones[i].meshLinks.push(this.drones[j].id);
                    }
                }
            }
        }

        // Update Drones
        for (const drone of this.drones) {
            drone.update(this.forestGrid, this, dt);
        }

        // Update Projectiles (Falling Extinguisher Capsules)
        for (let i = this.fallingProjectiles.length - 1; i >= 0; i--) {
            const proj = this.fallingProjectiles[i];
            proj.progress += 0.05 * dt;

            if (proj.progress >= 1.0) {
                // Impact & Chemical dispersion!
                const hitX = proj.targetX;
                const hitY = proj.targetY;

                soundManager.playExtinguishBurst();
                this.particleSystem.addExtinguisherBurst(hitX, hitY);
                const suppressed = this.forestGrid.applyExtinguisher(hitX, hitY, 32);

                this.stats.capsulesDropped++;
                if (suppressed > 0) {
                    this.stats.firesExtinguished += suppressed;
                }

                // Resolve nearby incidents
                for (const inc of this.incidents) {
                    if (!inc.resolved && Math.hypot(inc.x - hitX, inc.y - hitY) < 38) {
                        inc.resolved = true;
                        this.logEvent(`[BAŞARILI] Yangın odağı söndürüldü ve soğutuldu. (${inc.gps.lat}, ${inc.gps.lon})`);
                    }
                }

                this.fallingProjectiles.splice(i, 1);
            }
        }

        // Clean up resolved incidents
        this.incidents = this.incidents.filter(inc => !inc.resolved);
    }

    logEvent(text) {
        const timeStr = new Date().toLocaleTimeString('tr-TR');
        this.eventLogs.unshift({ time: timeStr, text });
        if (this.eventLogs.length > this.maxLogs) {
            this.eventLogs.pop();
        }
    }

    draw(ctx, renderMode = 'TACTICAL') {
        // Draw Mesh Signal Links
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        for (let i = 0; i < this.drones.length; i++) {
            const d1 = this.drones[i];
            for (let j = i + 1; j < this.drones.length; j++) {
                const d2 = this.drones[j];
                const dist = Math.hypot(d1.x - d2.x, d1.y - d2.y);
                if (dist <= this.meshMaxDist) {
                    ctx.beginPath();
                    ctx.moveTo(d1.x, d1.y);
                    ctx.lineTo(d2.x, d2.y);
                    ctx.stroke();
                }
            }
        }
        ctx.setLineDash([]);
        ctx.restore();

        // Draw Falling Projectiles
        for (const proj of this.fallingProjectiles) {
            const curX = proj.startX + (proj.targetX - proj.startX) * proj.progress;
            const curY = proj.startY + (proj.targetY - proj.startY) * proj.progress;
            const size = (1 - proj.progress * 0.4) * 6;

            ctx.save();
            ctx.fillStyle = '#38bdf8';
            ctx.shadowColor = '#0284c7';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(curX, curY, size, 0, Math.PI * 2);
            ctx.fill();

            // Target crosshair on ground
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(proj.targetX, proj.targetY, 14 * (1 - proj.progress), 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // Draw Each Drone
        for (const drone of this.drones) {
            const isSelected = this.selectedDrone && this.selectedDrone.id === drone.id;
            this.drawSingleDrone(ctx, drone, isSelected, renderMode);
        }
    }

    drawSingleDrone(ctx, drone, isSelected, renderMode) {
        ctx.save();
        ctx.translate(drone.x, drone.y);

        // Draw Sensor FOV Cone / Footprint
        const fovColor = drone.status === DRONE_STATES.ENGAGING ? 'rgba(239, 68, 68, 0.12)' : 'rgba(56, 189, 248, 0.08)';
        const fovBorder = drone.status === DRONE_STATES.ENGAGING ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.25)';

        ctx.fillStyle = fovColor;
        ctx.strokeStyle = fovBorder;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, drone.fovRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Rotate to heading
        ctx.rotate(drone.heading);

        // Drone Body (Quad / Hexa shape)
        const isScout = drone.role === DRONE_ROLES.SCOUT;
        const bodyColor = isScout ? '#0284c7' : '#ea580c';

        // Arms
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-10, -10); ctx.lineTo(10, 10);
        ctx.moveTo(-10, 10); ctx.lineTo(10, -10);
        ctx.stroke();

        // Rotors spinning
        const rotorAngle = Date.now() * 0.03;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        [[-10, -10], [10, -10], [10, 10], [-10, 10]].forEach(([rx, ry]) => {
            ctx.beginPath();
            ctx.arc(rx, ry, 4, rotorAngle, rotorAngle + Math.PI);
            ctx.stroke();
        });

        // Center fuselage
        ctx.fillStyle = bodyColor;
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        // Nose direction arrow
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(2, -3);
        ctx.lineTo(2, 3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Draw Selection Ring & Label
        if (isSelected) {
            ctx.save();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.arc(drone.x, drone.y, 20, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // Drone Name & Battery Tag
        ctx.save();
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(drone.x - 30, drone.y - 28, 60, 14);
        ctx.strokeStyle = isSelected ? '#38bdf8' : '#334155';
        ctx.strokeRect(drone.x - 30, drone.y - 28, 60, 14);

        ctx.fillStyle = drone.battery < 25 ? '#ef4444' : '#f8fafc';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${drone.name} %${drone.battery.toFixed(0)}`, drone.x, drone.y - 18);
        ctx.restore();
    }
}
