import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useLanguage();

  const t = TRANSLATIONS[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { num: '01', title: t.home, href: '#hero' },
    { num: '02', title: t.about, href: '#about' },
    { num: '03', title: t.services, href: '#services' },
    { num: '04', title: t.skills, href: '#skills' },
    { num: '05', title: t.contact, href: '#contact' },
  ];

  const languages: { code: Language; label: string; name: string }[] = [
    { code: 'tr', label: 'TR', name: 'Türkçe' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'py-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Name */}
          <a
            href="#hero"
            onClick={() => setMenuOpen(false)}
            className="text-lg sm:text-xl font-extrabold tracking-tighter uppercase font-sans text-black dark:text-white hover:opacity-80 transition-opacity"
          >
            KARABULUT
          </a>

          {/* Right Header Actions: Language Selector + Theme Toggle + Unified Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Language Selector Pill (TR | EN | DE) */}
            <div className="flex items-center p-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/15 text-[11px] font-mono">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-full transition-all duration-150 ${
                    lang === item.code
                      ? 'bg-black dark:bg-white text-white dark:text-black font-bold shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  }`}
                  title={item.name}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle Button - Pure Universal Icon */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/15 dark:border-white/15 text-black dark:text-white transition-all flex items-center justify-center shadow-sm hover:scale-105 active:scale-95"
              aria-label="Tema Değiştir / Toggle Theme"
              title={theme === 'dark' ? t.lightTheme : t.darkTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-white" />
              ) : (
                <Moon className="w-4 h-4 text-black" />
              )}
            </button>

            {/* Single Unified Hamburger / Close Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-black dark:text-white hover:opacity-80 transition-opacity group flex items-center gap-2"
              aria-label={menuOpen ? t.close : t.menu}
            >
              <span className="text-xs font-mono tracking-widest text-zinc-600 dark:text-zinc-400 hidden sm:inline">
                {menuOpen ? t.close : t.menu}
              </span>
              <div className="space-y-1.5 w-6">
                <span className={`block h-0.5 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : 'w-6'}`} />
                <span className={`block h-0.5 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4 ml-auto'}`} />
                <span className={`block h-0.5 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : 'w-6'}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-16 pt-24 sm:pt-28 animate-fade-in text-black dark:text-white">
          {/* Top Row inside Menu */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
              {t.navigation}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="max-w-4xl mx-auto w-full my-auto space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.num}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-6 text-3xl sm:text-6xl font-black tracking-tight text-zinc-500 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-all duration-300"
              >
                <span className="font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {link.num}
                </span>
                <span className="group-hover:translate-x-3 transition-transform duration-300">
                  {link.title}
                </span>
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ml-auto" />
              </a>
            ))}
          </div>

          {/* Footer Info inside Menu */}
          <div className="max-w-7xl mx-auto w-full pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-black dark:hover:text-white transition-colors">
              {PORTFOLIO_DATA.personal.email}
            </a>
            <div className="flex flex-wrap items-center gap-6">
              <a href={PORTFOLIO_DATA.personal.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">INSTAGRAM ↗</a>
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">GITHUB ↗</a>
              <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">LINKEDIN ↗</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
