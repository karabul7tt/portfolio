import React from 'react';
import { ArrowUp, Terminal, Github, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-black py-12 text-zinc-400 font-sans text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand & Status */}
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-black">
              <svg viewBox="0 0 1155 1000" className="w-3.5 h-3.5 fill-current">
                <path d="m577.3 0 577.4 1000H0z" />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-white text-sm">{PORTFOLIO_DATA.personal.name}</span>
              <p className="text-zinc-500 font-mono text-[11px]">Deployed with precision on Vercel Edge</p>
            </div>
          </div>

          {/* Center shortcuts hint */}
          <div className="hidden lg:flex items-center gap-4 font-mono text-[11px] text-zinc-500">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">⌘K</kbd> anywhere for commands</span>
          </div>

          {/* Right: Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white transition-all text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px] font-mono">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with React, Three.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
