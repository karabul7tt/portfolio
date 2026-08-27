import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  Github, 
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface NavbarProps {
  onOpenCommand: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommand,
  isDark,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Tech Stack', href: '#skills' },
    { label: 'Telemetry', href: '#metrics' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/75 dark:bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Logo & Status */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="flex items-center gap-2.5 group text-white hover:opacity-90 transition-opacity"
          >
            {/* Vercel Triangle Icon */}
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 1155 1000" className="w-4 h-4 fill-current">
                <path d="m577.3 0 577.4 1000H0z" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight text-sm sm:text-base font-sans flex items-center gap-1.5">
              {PORTFOLIO_DATA.personal.name}
              <span className="text-zinc-500 font-normal hidden sm:inline">/ dev</span>
            </span>
          </a>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for projects</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Cmd+K, Social, Theme toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Command Trigger (Cmd+K) */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 hover:border-white/25 text-xs text-zinc-400 hover:text-white transition-all shadow-sm group"
            title="Search & Commands (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-blue-400 transition-colors" />
            <span className="hidden sm:inline font-sans">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 rounded border border-zinc-700 text-zinc-300">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Icon Link */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:flex"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-3 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for projects</span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
