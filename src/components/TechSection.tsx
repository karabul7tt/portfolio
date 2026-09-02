import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

const TechPill: React.FC<{ name: string; highlight?: boolean }> = ({ name, highlight }) => {
  return (
    <div
      className={`px-4 py-2.5 rounded-xl transition-all duration-200 cursor-default select-none shadow-sm hover:scale-105 ${
        highlight
          ? 'bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white font-bold'
          : 'bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 text-black dark:text-white'
      }`}
    >
      <span className="text-sm sm:text-base font-sans">
        {name}
      </span>
    </div>
  );
};

export const TechSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].tech;

  return (
    <section id="skills" className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="mb-4 reveal">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            {t.label}
          </span>
        </div>

        {/* Categories Stack */}
        <div className="space-y-16">
          {t.sections.map((sec, idx) => (
            <div key={sec.number} className={`space-y-6 reveal ${idx > 0 ? `reveal-delay-${Math.min(idx, 3)}` : ''}`}>
              {/* Category Header with number */}
              <div className="flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
                <span className="text-black dark:text-white font-bold">{sec.number}</span>
                <span className="font-semibold tracking-[0.2em] text-black dark:text-white">{sec.title}</span>
              </div>

              {/* Items Flow Grid */}
              <div className="flex flex-wrap gap-3 sm:gap-4 items-center pt-1">
                {sec.items.map((item) => (
                  <TechPill key={item.name} name={item.name} highlight={item.highlight} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
