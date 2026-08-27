import React, { useState } from 'react';
import { 
  Sliders, 
  BatteryCharging, 
  Cpu, 
  Flame, 
  Coffee, 
  Wifi, 
  Code2, 
  ShieldCheck, 
  Volume2, 
  Moon, 
  Layers,
  Sparkles
} from 'lucide-react';
import { ThreeDCard } from './3d/ThreeDCard';

export const SystemControlWidgets: React.FC = () => {
  const [focusMode, setFocusMode] = useState<'deep' | 'ship' | 'architect'>('deep');
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [coffeeLevel, setCoffeeLevel] = useState(92);

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center sm:text-left mb-10">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-purple-400 mb-2 uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>System Control Hub & Spatial Widgets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight vercel-gradient-text">
            Unified Engine & Core State.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Interactive modular control panels designed with tactile glass physics and real-time state manipulation.
          </p>
        </div>

        {/* 3D Glass Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Widget 1: Focus Engine Selector */}
          <ThreeDCard
            glowColor="rgba(121, 40, 202, 0.25)"
            depth={12}
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
                  <Flame className="w-4 h-4 text-purple-400" />
                  <span>Focus Mode</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                {[
                  { id: 'deep', label: 'Deep Code', desc: 'Zero Distraction' },
                  { id: 'ship', label: 'Ship Mode', desc: 'High Velocity' },
                  { id: 'architect', label: 'Architecture', desc: 'System Design' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setFocusMode(mode.id as any)}
                    className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      focusMode === mode.id
                        ? 'bg-purple-500/20 border-purple-500/40 text-white shadow-lg'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs block">{mode.label}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{mode.desc}</span>
                    </div>
                    {focusMode === mode.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Status</span>
              <span className="text-purple-300 font-semibold uppercase">{focusMode} Active</span>
            </div>
          </ThreeDCard>

          {/* Widget 2: Energy & Fuel Gauge */}
          <ThreeDCard
            glowColor="rgba(245, 166, 35, 0.25)"
            depth={12}
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Energy & Fuel</span>
                </div>
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Circular Dial Visual */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-zinc-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-amber-400 transition-all duration-500 ease-out"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 * (1 - coffeeLevel / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-extrabold text-white font-mono">{coffeeLevel}%</span>
                    <span className="text-[9px] text-zinc-400 uppercase font-mono">Espresso</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => setCoffeeLevel((prev) => Math.min(100, prev + 5))}
                className="w-full py-1.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-mono transition-all text-center"
              >
                + Refill Fuel
              </button>
            </div>
          </ThreeDCard>

          {/* Widget 3: Silicon Core & Memory Stack */}
          <ThreeDCard
            glowColor="rgba(80, 227, 194, 0.25)"
            depth={12}
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
                  <Cpu className="w-4 h-4 text-teal-400" />
                  <span>Memory Stack</span>
                </div>
                <span className="text-[11px] font-mono text-teal-400 font-semibold">128 GB/s</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Frontend Core (Next/React)</span>
                    <span className="text-white">40%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full w-[40%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Backend & Cloud (Node/Edge)</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>AI / Neural Acceleration</span>
                    <span className="text-white">25%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-400 rounded-full w-[25%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Architecture</span>
              <span className="text-teal-300 font-semibold">Unified Silicon</span>
            </div>
          </ThreeDCard>

          {/* Widget 4: Spatial Connectivity & Security */}
          <ThreeDCard
            glowColor="rgba(0, 112, 243, 0.25)"
            depth={12}
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span>Connectivity</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">Wi-Fi 7</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono">Bandwidth:</span>
                  <span className="text-white font-bold font-mono">10 Gbps Edge</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono">Security:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> End-to-End
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono">SSL / TLS:</span>
                  <span className="text-blue-400 font-semibold font-mono">TLS 1.3 Strict</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Haptic Feedback</span>
              <button
                onClick={() => setHapticsEnabled(!hapticsEnabled)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                  hapticsEnabled
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-white/10 text-zinc-500'
                }`}
              >
                {hapticsEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </ThreeDCard>
        </div>
      </div>
    </section>
  );
};
