import React from 'react';
import { Smartphone, Monitor, Globe, ArrowRight, CheckCircle2, Video, Code2, Sparkles } from 'lucide-react';
import { Marquee } from './Marquee';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const ServicesSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].services;

  const getServiceIcon = (number: string) => {
    switch (number) {
      case '01':
        return <Smartphone className="w-6 h-6 text-black dark:text-white" />;
      case '02':
        return <Video className="w-6 h-6 text-black dark:text-white" />;
      case '03':
        return <Monitor className="w-6 h-6 text-black dark:text-white" />;
      case '04':
        return <Globe className="w-6 h-6 text-black dark:text-white" />;
      case '05':
        return <Sparkles className="w-6 h-6 text-black dark:text-white" />;
      case '06':
      default:
        return <Code2 className="w-6 h-6 text-black dark:text-white" />;
    }
  };

  const getDelayClass = (idx: number) => {
    switch (idx % 2) {
      case 0:
        return 'reveal-delay-1';
      case 1:
        return 'reveal-delay-2';
      default:
        return '';
    }
  };

  return (
    <section
      id="services"
      className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250 overflow-hidden"
    >
      {/* Background Marquee Ticker */}
      <div className="absolute top-6 inset-x-0 -z-10 opacity-25 dark:opacity-40">
        <Marquee text="IOS DEVELOPER • GENERATIVE AI • AI VIDEO CREATION • SOFTWARE • WEB • " />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between reveal">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              {t.label}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="reveal reveal-delay-1">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-black dark:text-white font-sans">
                {t.heading} <strong className="font-extrabold underline decoration-1 underline-offset-8">{t.headingHighlight}</strong> {t.headingEnd}
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl leading-relaxed mt-4">
                {t.subheading}
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95 group reveal reveal-delay-2"
            >
              <span>{t.contactBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Services Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {t.list.map((service, idx) => (
            <div
              key={service.number}
              data-cursor="project"
              className={`project-card group relative rounded-3xl p-7 sm:p-9 transition-all duration-300 flex flex-col justify-between space-y-6 reveal-scale ${getDelayClass(idx)} ${
                service.highlight
                  ? 'bg-zinc-50 dark:bg-[#0f0f12] border-2 border-black/30 dark:border-white/30 shadow-lg dark:shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
                  : 'bg-zinc-50 dark:bg-zinc-900/80 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {getServiceIcon(service.number)}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-500 block">
                      {service.number}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                      {service.tagline}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20 text-black dark:text-white font-medium uppercase shrink-0">
                  {service.badge}
                </span>
              </div>

              {/* Card Middle */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-sans leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom */}
              <div className="border-t border-black/10 dark:border-white/10 pt-5 space-y-2.5">
                <span className="text-xs font-mono font-semibold text-zinc-500 uppercase block mb-1">
                  {t.scopeTitle}
                </span>
                {service.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white hover:underline underline-offset-4 group/btn"
                >
                  <span>{t.talkBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-center md:text-left reveal-scale">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-sans">
              {t.ctaHeading}
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              {t.ctaSubheading}
            </p>
          </div>

          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95"
          >
            {t.ctaBtn}
          </a>
        </div>

      </div>
    </section>
  );
};
