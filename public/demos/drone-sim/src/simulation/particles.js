// Particle System for Forest Fire Smoke, Embers, and Extinguisher Foam
export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addSmoke(x, y, intensity = 1.0, windVx = 0, windVy = 0) {
        if (Math.random() > 0.4 * intensity) return;
        this.particles.push({
            type: 'smoke',
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            vx: windVx * 0.4 + (Math.random() - 0.5) * 0.4,
            vy: windVy * 0.4 - Math.random() * 0.8 - 0.3, // rises
            size: Math.random() * 6 + 4,
            maxSize: Math.random() * 18 + 12,
            life: 1.0,
            decay: Math.random() * 0.015 + 0.01,
            color: `rgba(${180 + Math.random() * 50}, ${180 + Math.random() * 50}, ${180 + Math.random() * 50}, `
        });
    }

    addEmbers(x, y, count = 2, windVx = 0, windVy = 0) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                type: 'ember',
                x: x + (Math.random() - 0.5) * 6,
                y: y + (Math.random() - 0.5) * 6,
                vx: windVx * 0.6 + (Math.random() - 0.5) * 1.5,
                vy: windVy * 0.6 - Math.random() * 1.5 - 0.5,
                size: Math.random() * 2.5 + 1,
                life: 1.0,
                decay: Math.random() * 0.04 + 0.02,
                hue: Math.random() * 30 + 15 // 15-45 (orange-yellow)
            });
        }
    }

    addExtinguisherBurst(x, y) {
        // Chemical foam & powder dispersion blast
        const particleCount = 45;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3.5 + 0.8;
            this.particles.push({
                type: 'foam',
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 8 + 5,
                maxSize: Math.random() * 22 + 14,
                life: 1.0,
                decay: Math.random() * 0.025 + 0.015,
                color: Math.random() > 0.3 ? 'rgba(235, 245, 255,' : 'rgba(190, 225, 255,'
            });
        }
    }

    update(dt = 1) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= p.decay * dt;

            if (p.type === 'smoke' || p.type === 'foam') {
                p.size += (p.maxSize - p.size) * 0.05 * dt;
            }

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        for (const p of this.particles) {
            ctx.save();
            if (p.type === 'smoke') {
                const alpha = Math.max(0, p.life * 0.35);
                ctx.fillStyle = `${p.color}${alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'ember') {
                const alpha = Math.max(0, p.life);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;
                ctx.shadowColor = 'rgba(255, 100, 0, 0.8)';
                ctx.shadowBlur = 4;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'foam') {
                const alpha = Math.max(0, p.life * 0.8);
                ctx.fillStyle = `${p.color}${alpha})`;
                ctx.shadowColor = 'rgba(100, 200, 255, 0.5)';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    clear() {
        this.particles = [];
    }
}
