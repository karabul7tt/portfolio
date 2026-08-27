import React, { useRef, useState } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  depth?: number;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 112, 243, 0.25)',
  depth = 15,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -depth;
    const rY = ((x - centerX) / centerX) * depth;

    setRotateX(rX);
    setRotateY(rY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-[26px] bg-zinc-950/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${className}`}
      >
        {/* Dynamic Specular Glare Glass Layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.18), transparent 70%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Ambient Radial Color Bloom */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] z-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 400px at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 80%)`,
            opacity: isHovered ? 0.8 : 0,
          }}
        />

        {/* Ultra-fine Cupertino Specular Border Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] z-20"
          style={{
            boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Parallax Content Container */}
        <div className="relative z-10 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
