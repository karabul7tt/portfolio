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
    let hoverType: 'none' | 'button' | 'card' = 'none';
    let isDown = false;
    let isVisible = false;
    let animId: number;

    const checkHover = (x: number, y: number) => {
      const target = document.elementFromPoint(x, y);
      if (!target) {
        hoverType = 'none';
        return;
      }

      // Check if hovering over buttons, links, controls
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        hoverType = 'button';
        return;
      }

      // Check if hovering over boxes/cards (Services, About boxes, Photo cards, Tech pills, etc.)
      if (
        target.closest(
          '.project-card, .photo-card, [data-cursor], .rounded-3xl, .rounded-2xl, .rounded-xl, .shadow-md, .shadow-lg'
        )
      ) {
        hoverType = 'card';
        return;
      }

      hoverType = 'none';
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
      // Direct high-precision tracking (0.5 lerp)
      currX += (mouseX - currX) * 0.5;
      currY += (mouseY - currY) * 0.5;

      const el = cursorRef.current;
      if (el) {
        const isLight = themeRef.current === 'light';
        
        // Scale values:
        // Default: 1.0 (14px)
        // Clicked: 0.75
        // Button/Link: 1.8 (25px)
        // Card/Box: 2.8 (40px generous smooth expanding ball)
        const scale = isDown
          ? 0.75
          : hoverType === 'card'
          ? 2.8
          : hoverType === 'button'
          ? 1.8
          : 1.0;

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
      {/* Kutuların Üzerine Gelince Büyüyen Şık Top İmleç */}
      <div
        ref={cursorRef}
        className="fixed w-3.5 h-3.5 rounded-full pointer-events-none opacity-0 will-change-transform shadow-md transition-[transform,background-color] duration-200 ease-out"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
};
