import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Github, 
  ExternalLink,
  ChevronRight,
  Code2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { VercelCube } from './3d/VercelCube';
import { InteractiveTerminal } from './InteractiveTerminal';

export const Hero: React.FC = () => {
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* Background Subtle Vercel Radial Grids and Beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Tagline Badge */}
        <div className="flex justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 transition-colors shadow-inner backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-300">
              Vercel Design System • 3D WebGL Powered
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </div>
        </div>

        {/* Hero Main Grid: Text & 3D Cube */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-sans">
              Develop. Preview. <br />
              <span className="vercel-cyan-gradient">Ship Excellence.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-sans leading-relaxed">
              Hi, I'm <strong className="text-white font-semibold">{PORTFOLIO_DATA.personal.name}</strong>. {PORTFOLIO_DATA.personal.tagline}
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-zinc-400 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold">{PORTFOLIO_DATA.stats.projectsShipped}</span> Projects Shipped
              </div>
              <span className="text-zinc-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-semibold">{PORTFOLIO_DATA.stats.uptime}</span> Uptime
              </div>
              <span className="text-zinc-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-400 font-semibold">{PORTFOLIO_DATA.stats.edgeLatency}</span> Edge Latency
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/90 text-white font-medium text-sm border border-white/15 hover:border-white/30 hover:bg-zinc-800 transition-all"
              >
                <span>Get in Touch</span>
              </a>

              {/* Copy CLI pill button */}
              <button
                onClick={handleCopyCli}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white text-xs font-mono transition-all group"
                title="Copy Terminal Command"
              >
                <TerminalIcon className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>{PORTFOLIO_DATA.personal.cliCommand}</span>
                {copiedCli ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Moving Vercel Cube */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[420px]">
              <VercelCube />
            </div>
          </div>
        </div>

        {/* Interactive Terminal Section in Hero */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Interactive Developer Console</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-600 hidden sm:inline">
              Try running commands live
            </span>
          </div>
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
};
