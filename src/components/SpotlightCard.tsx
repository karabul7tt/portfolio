import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 112, 243, 0.15)',
  borderColor = 'rgba(255, 255, 255, 0.15)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] dark:border-white/[0.08] bg-[#0c0c0c] dark:bg-[#0c0c0c] transition-all duration-300 hover:border-white/[0.2] ${className}`}
      {...props}
    >
      {/* Radial gradient spotlight on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 rounded-xl z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle border highlight following cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl z-0 transition-opacity duration-300 opacity-100"
          style={{
            border: `1px solid ${borderColor}`,
            maskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};
