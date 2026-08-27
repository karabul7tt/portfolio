import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Sparkles, 
  Cpu, 
  Zap, 
  Check, 
  Copy, 
  Volume2, 
  VolumeX, 
  Disc, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const DynamicCapsule: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('tr-TR', {
          timeZone: 'Europe/Istanbul',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`bg-black/90 backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.8)] text-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden ${
          isExpanded
            ? 'w-[90vw] sm:w-[480px] rounded-[32px] p-4'
            : 'w-[280px] sm:w-[320px] rounded-full py-1.5 px-4'
        }`}
        style={{
          boxShadow: isExpanded
            ? '0 20px 45px -10px rgba(0, 112, 243, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {!isExpanded ? (
          /* Collapsed State: Sleek Pill */
          <div className="flex items-center justify-between text-xs font-mono select-none">
            {/* Live Indicator Beacon */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold text-white tracking-wide">
                {PORTFOLIO_DATA.personal.name.split(' ')[0]}
              </span>
            </div>

            {/* Middle audio wave simulation */}
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-3.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>

            {/* Time / Ping */}
            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
              <span className="text-emerald-400">14ms</span>
              <span>•</span>
              <span className="text-zinc-300">{currentTime.slice(0, 5) || '15:42'}</span>
            </div>
          </div>
        ) : (
          /* Expanded State: Interactive Glass Control Hub */
          <div className="space-y-3.5 select-none animate-fade-in text-xs">
            {/* Top Row: System Identity & Quick Close */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-black font-bold text-xs shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">{PORTFOLIO_DATA.personal.name}</h4>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    System Active • High Performance Core
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{currentTime || '15:42:00'}</span>
              </div>
            </div>

            {/* Middle Row: Now Playing & Ambient Wave Simulation */}
            <div className="p-2.5 rounded-2xl bg-zinc-900/90 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className={`p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 ${isPlayingAudio ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
                  <Disc className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-zinc-400 block">Current Stream</span>
                  <span className="font-semibold text-white truncate block text-[11px]">
                    Deep Focus • Spatial Synth Ambient
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingAudio(!isPlayingAudio);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
                title={isPlayingAudio ? 'Mute sound' : 'Play sound'}
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4 text-teal-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>
            </div>

            {/* Bottom Row: Quick Action Chips */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-zinc-300 hover:text-white transition-colors font-mono text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <a
                href="#projects"
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-600/30 to-teal-600/30 hover:from-blue-600/50 hover:to-teal-600/50 border border-blue-500/30 flex items-center justify-center gap-2 text-white transition-colors font-mono text-[11px]"
              >
                <span>Jump to Projects</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
