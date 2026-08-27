import React, { useState } from 'react';
import { 
  Terminal, 
  FolderGit2, 
  Briefcase, 
  Cpu, 
  Activity, 
  Mail, 
  Command, 
  Sun, 
  Moon,
  Github
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface FloatingDockProps {
  onOpenCommand: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  onOpenCommand,
  isDark,
  onToggleTheme,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dockItems = [
    { id: 'hero', label: 'Terminal / Home', icon: Terminal, href: '#hero', color: 'text-blue-400' },
    { id: 'projects', label: '3D Projects', icon: FolderGit2, href: '#projects', color: 'text-teal-400' },
    { id: 'experience', label: 'Career Timeline', icon: Briefcase, href: '#experience', color: 'text-purple-400' },
    { id: 'skills', label: 'System Stack', icon: Cpu, href: '#skills', color: 'text-emerald-400' },
    { id: 'metrics', label: 'Live Telemetry', icon: Activity, href: '#metrics', color: 'text-amber-400' },
    { id: 'contact', label: 'Direct Dispatch', icon: Mail, href: '#contact', color: 'text-pink-400' },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      <div 
        className="flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 rounded-[28px] bg-black/80 dark:bg-black/85 backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-white/35"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)',
        }}
      >
        {/* Navigation Items */}
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          let scaleClass = 'scale-100';
          if (isHovered) scaleClass = 'scale-125 -translate-y-2';
          else if (isNeighbor) scaleClass = 'scale-110 -translate-y-1';

          return (
            <a
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`relative p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all duration-200 ease-out flex items-center justify-center ${scaleClass} active:scale-95 shadow-sm`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />

              {/* Tooltip Badge */}
              {isHovered && (
                <div className="absolute -top-10 px-2.5 py-1 rounded-xl bg-zinc-900/95 border border-white/20 text-[11px] font-sans text-white whitespace-nowrap shadow-xl animate-fade-in pointer-events-none">
                  {item.label}
                </div>
              )}
            </a>
          );
        })}

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-white/20 mx-1" />

        {/* ⌘K Command Palette Trigger */}
        <button
          onClick={onOpenCommand}
          onMouseEnter={() => setHoveredIdx(99)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`relative p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 hover:border-blue-500/40 text-blue-400 hover:text-blue-300 transition-all duration-200 ease-out flex items-center justify-center ${
            hoveredIdx === 99 ? 'scale-125 -translate-y-2' : 'scale-100'
          } active:scale-95 shadow-sm`}
          title="Command Palette (⌘K)"
        >
          <Command className="w-4 h-4 sm:w-5 sm:h-5" />
          {hoveredIdx === 99 && (
            <div className="absolute -top-10 px-2.5 py-1 rounded-xl bg-zinc-900/95 border border-white/20 text-[11px] font-sans text-white whitespace-nowrap shadow-xl animate-fade-in pointer-events-none">
              Command Palette (⌘K)
            </div>
          )}
        </button>

        {/* GitHub Link */}
        <a
          href={PORTFOLIO_DATA.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredIdx(100)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`relative p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all duration-200 ease-out flex items-center justify-center ${
            hoveredIdx === 100 ? 'scale-125 -translate-y-2' : 'scale-100'
          } active:scale-95 shadow-sm hidden sm:flex`}
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          {hoveredIdx === 100 && (
            <div className="absolute -top-10 px-2.5 py-1 rounded-xl bg-zinc-900/95 border border-white/20 text-[11px] font-sans text-white whitespace-nowrap shadow-xl animate-fade-in pointer-events-none">
              GitHub Repos
            </div>
          )}
        </a>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          onMouseEnter={() => setHoveredIdx(101)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`relative p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 hover:border-amber-500/40 text-amber-400 hover:text-amber-300 transition-all duration-200 ease-out flex items-center justify-center ${
            hoveredIdx === 101 ? 'scale-125 -translate-y-2' : 'scale-100'
          } active:scale-95 shadow-sm`}
          title={isDark ? 'Switch to Light' : 'Switch to Dark'}
        >
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
          {hoveredIdx === 101 && (
            <div className="absolute -top-10 px-2.5 py-1 rounded-xl bg-zinc-900/95 border border-white/20 text-[11px] font-sans text-white whitespace-nowrap shadow-xl animate-fade-in pointer-events-none">
              {isDark ? 'Light Theme' : 'Dark Theme'}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
