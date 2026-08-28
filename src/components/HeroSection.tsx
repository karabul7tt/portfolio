import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface PhotoCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  positionClass: string;
  isAtaturk?: boolean;
}

// Atatürk Signature Component
const AtaturkSignature: React.FC<{ badgeText: string }> = ({ badgeText }) => (
  <div className="font-serif italic font-normal tracking-wide text-xs text-white/90 drop-shadow-md select-none border-t border-white/20 pt-1.5 mt-1.5 flex items-center justify-between">
    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">{badgeText}</span>
    <span className="text-sm font-semibold tracking-wider">K. Atatürk</span>
  </div>
);

export const HeroSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].hero;

  // Column 1 photo collection (Atatürk is ONLY here on this side)
  const col1Cards: PhotoCardItem[] = [
    {
      id: 'ataturk-1',
      title: t.cards.ataturkTitle,
      subtitle: t.cards.ataturkSubtitle,
      image: '/assets/ataturk.jpg',
      isAtaturk: true,
      positionClass: 'object-center',
    },
    {
      id: 'mehmet-real',
      title: t.cards.mehmetTitle,
      subtitle: t.cards.mehmetSubtitle,
      image: '/assets/mehmet.jpg',
      positionClass: 'object-[center_60%]',
    },
    {
      id: 'ios-1',
      title: t.cards.iosTitle,
      subtitle: t.cards.iosSubtitle,
      image: '/assets/ios-dev.jpg',
      positionClass: 'object-center',
    },
  ];

  // Column 2 photo collection (Estetik Siber with MacBook + Derin Odaklanma with Artwork)
  const col2Cards: PhotoCardItem[] = [
    {
      id: 'estetik-siber',
      title: t.cards.macbookTitle,
      subtitle: t.cards.macbookSubtitle,
      image: '/assets/macbook.jpg',
      positionClass: 'object-center',
    },
    {
      id: 'derin-odaklanma',
      title: t.cards.balanceTitle,
      subtitle: t.cards.balanceSubtitle,
      image: '/assets/art-balance.jpg',
      positionClass: 'object-center',
    },
    {
      id: 'coding-1',
      title: t.cards.codingTitle,
      subtitle: t.cards.codingSubtitle,
      image: '/assets/coding.jpg',
      positionClass: 'object-center',
    },
  ];

  // Duplicate for seamless 100% infinite vertical loop
  const col1Items = [...col1Cards, ...col1Cards];
  const col2Items = [...col2Cards, ...col2Cards];

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center pt-24 pb-16 sm:py-24 overflow-hidden bg-white dark:bg-black text-black dark:text-white transition-colors duration-250"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Pure Clean Typography & Bio */}
        <div className="lg:col-span-6 space-y-8 z-10">
          
          {/* Main Name Heading */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.92] text-black dark:text-white font-sans">
              MEHMET
              <span className="block font-black text-black dark:text-white">
                KARABULUT
              </span>
            </h1>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-xl text-zinc-700 dark:text-zinc-400 font-sans leading-relaxed max-w-xl">
            {t.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group"
            >
              <span>{t.contactBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-mono tracking-wider uppercase text-black dark:text-white border border-black/15 dark:border-white/15 transition-all"
            >
              <span>{t.servicesBtn}</span>
            </a>
          </div>

          {/* Subtext */}
          <div className="pt-2 text-xs font-mono text-zinc-500">
            {t.subtext}
          </div>
        </div>

        {/* Right Column: Clean Infinite Vertical Scrolling Photo Columns */}
        <div className="lg:col-span-6 relative h-[560px] sm:h-[650px] lg:h-[700px] overflow-hidden rounded-3xl">
          
          {/* Top & Bottom Fade Masks for Seamless Endless Flow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-20" />

          {/* Dual Infinite Scrolling Columns Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full px-2">
            
            {/* Column 1 (Continuously Scrolling Downwards) */}
            <div className="flex flex-col gap-4 sm:gap-6 animate-scroll-col-down">
              {col1Items.map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className="group relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 shadow-xl transition-all duration-500 hover:border-black/50 dark:hover:border-white/50 hover:scale-[1.02] shrink-0"
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-zinc-200 dark:bg-zinc-800">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full object-cover ${card.positionClass} photo-card group-hover:scale-105 transition-transform duration-700`}
                      loading="lazy"
                    />
                    {/* Atmospheric Dark Bottom Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <p className="font-bold text-sm sm:text-base font-sans text-white leading-snug">
                      {card.title}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-300 leading-tight">
                      {card.subtitle}
                    </p>
                    {card.isAtaturk && <AtaturkSignature badgeText={t.cards.ataturkBadge} />}
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Continuously Scrolling Upwards) */}
            <div className="flex flex-col gap-4 sm:gap-6 animate-scroll-col-up">
              {col2Items.map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className="group relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 shadow-xl transition-all duration-500 hover:border-black/50 dark:hover:border-white/50 hover:scale-[1.02] shrink-0"
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-zinc-200 dark:bg-zinc-800">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full object-cover ${card.positionClass} photo-card group-hover:scale-105 transition-transform duration-700`}
                      loading="lazy"
                    />
                    {/* Atmospheric Dark Bottom Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <p className="font-bold text-sm sm:text-base font-sans text-white leading-snug">
                      {card.title}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-300 leading-tight">
                      {card.subtitle}
                    </p>
                    {card.isAtaturk && <AtaturkSignature badgeText={t.cards.ataturkBadge} />}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Edge SCROLL Indicator with line */}
          <div className="hidden xl:flex flex-col items-center gap-3 absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase select-none z-30">
            <span className="[writing-mode:vertical-lr] tracking-[0.25em]">{t.scroll}</span>
            <div className="w-px h-16 bg-gradient-to-b from-black/40 dark:from-white/40 via-black/20 dark:via-white/20 to-transparent animate-pulse" />
          </div>

        </div>

      </div>
    </section>
  );
};
