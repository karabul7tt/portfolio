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

    const checkHover = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y);
      isHovered = !!target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="project"]');
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
      checkHover(mouseX, mouseY);
    };

    const onScroll = () => {
      if (mouseX >= 0 && mouseY >= 0) {
        checkHover(mouseX, mouseY);
      }
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
      // 0.55 direct smooth tracking without delay
      currX += (mouseX - currX) * 0.55;
      currY += (mouseY - currY) * 0.55;

      const el = cursorRef.current;
      if (el) {
        const isLight = themeRef.current === 'light';
        // Always maintains the elegant solid ball shape
        const scale = isDown ? 0.75 : isHovered ? 1.6 : 1.0;

        el.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = isVisible ? '1' : '0';
        el.style.backgroundColor = isLight ? '#000000' : '#ffffff';
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block overflow-hidden">
      {/* Sabit ve Düzgün Top Şeklinde Özel İmleç */}
      <div
        ref={cursorRef}
        className="fixed w-3.5 h-3.5 rounded-full pointer-events-none opacity-0 will-change-transform shadow-sm transition-[transform,background-color] duration-150 ease-out"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
};
