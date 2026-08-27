import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let isHovered = false;
    let isDown = false;
    let isVisible = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;

      const target = e.target as HTMLElement | null;
      // Triggers big solid circle growth on ALL rectangular elements: cards, buttons, links, inputs, pills, boxes, images
      isHovered = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, .project-card, .photo-card, [data-cursor], .rounded-3xl, .rounded-2xl, .rounded-xl, tr, header'
      );
    };

    const onMouseDown = () => {
      isDown = true;
    };
    const onMouseUp = () => {
      isDown = false;
    };
    const onMouseLeave = () => {
      isVisible = false;
    };
    const onMouseEnter = () => {
      isVisible = true;
    };

    const render = () => {
      // 0.45 crisp lerp: instant responsive tracking with 0 latency
      currX += (mouseX - currX) * 0.45;
      currY += (mouseY - currY) * 0.45;

      const el = cursorRef.current;
      if (el) {
        const isLight = themeRef.current === 'light';
        const scale = isDown ? 0.75 : isHovered ? 3.5 : 1.0;

        el.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%) scale(${scale})`;
        
        // %100 düz ve opak (asla saydamlaşmaz)
        el.style.opacity = isVisible ? '1' : '0';

        // Açık Temada: Saf Siyah (#000000), Koyu Temada: Saf Beyaz (#ffffff)
        el.style.backgroundColor = isLight ? '#000000' : '#ffffff';
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block overflow-hidden">
      {/* İçi Tamamen Dolu, Düz Beyaz (Koyu Tema) / Düz Siyah (Açık Tema) Daire */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full pointer-events-none opacity-0 will-change-transform transition-transform duration-150 ease-out shadow-sm"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
};
