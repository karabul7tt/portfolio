import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  isCross?: boolean;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Kintaro-style starry dots & crosshair particles
    const count = 45;
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      targetAlpha: Math.random() * 0.7 + 0.2,
      isCross: i % 8 === 0, // Some are subtle plus crosshairs
    }));

    const maxDistSq = 120 * 120;
    const mouseRadiusSq = 150 * 150;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isLight = themeRef.current === 'light';

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        if (Math.abs(p.targetAlpha - p.alpha) < 0.05) {
          p.targetAlpha = Math.random() * 0.6 + 0.2;
        }

        // Draw particle (Dot or Mini Cross)
        ctx.fillStyle = isLight
          ? `rgba(0, 0, 0, ${p.alpha * 0.6})`
          : `rgba(255, 255, 255, ${p.alpha * 0.8})`;

        if (p.isCross) {
          // Draw subtle crosshair
          const arm = p.size + 1.5;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x - arm, p.y);
          ctx.lineTo(p.x + arm, p.y);
          ctx.moveTo(p.x, p.y - arm);
          ctx.lineTo(p.x, p.y + arm);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Mouse magnetic connection
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < mouseRadiusSq) {
            const alpha = (1 - Math.sqrt(dSq) / 150) * (isLight ? 0.2 : 0.28);
            ctx.strokeStyle = isLight
              ? `rgba(0, 0, 0, ${alpha})`
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // Gentle push/pull
            p.x -= dx * 0.008;
            p.y -= dy * 0.008;
          }
        }

        // Connect nearby nodes
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < maxDistSq) {
            const alpha = (1 - Math.sqrt(dSq) / 120) * (isLight ? 0.05 : 0.08);
            ctx.strokeStyle = isLight
              ? `rgba(0, 0, 0, ${alpha})`
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full opacity-70 transition-opacity duration-300"
    />
  );
};
