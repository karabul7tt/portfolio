import React from 'react';

interface MarqueeProps {
  text?: string;
  className?: string;
  reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = 'ÖDÜNSÜZ MİMARİ • ÖLÇEKLENEBİLİR • YÜKSEK PERFORMANS • DİJİTAL DENEYİMLER • ',
  className = '',
  reverse = false,
}) => {
  return (
    <div className={`overflow-hidden select-none pointer-events-none py-4 ${className}`}>
      <div className={`marquee-track flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        <span className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black/[0.06] dark:text-white/[0.04] px-4 font-display transition-colors">
          {text} {text}
        </span>
        <span className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black/[0.06] dark:text-white/[0.04] px-4 font-display transition-colors">
          {text} {text}
        </span>
      </div>
    </div>
  );
};
