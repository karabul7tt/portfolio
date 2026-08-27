import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Globe2, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Server
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { ThreeDCard } from './3d/ThreeDCard';

export const MetricsWidget: React.FC = () => {
  const [istanbulTime, setIstanbulTime] = useState<string>('');
  const [simulatedPing, setSimulatedPing] = useState<number>(14);
  const [activeEdge, setActiveEdge] = useState<string>('FRA1 (Frankfurt)');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstanbulTime(now.toLocaleTimeString('tr-TR', options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      setSimulatedPing(Math.floor(12 + Math.random() * 5));
    }, 4000);
    return () => clearInterval(pingInterval);
  }, []);

  const edgeRegions = [
    { name: 'FRA1 (Frankfurt)', ping: simulatedPing, status: 'Healthy' },
    { name: 'LHR1 (London)', ping: simulatedPing + 6, status: 'Healthy' },
    { name: 'IST1 (Istanbul)', ping: simulatedPing - 4, status: 'Optimal' },
    { name: 'IAD1 (Washington)', ping: simulatedPing + 68, status: 'Healthy' },
    { name: 'NRT1 (Tokyo)', ping: simulatedPing + 140, status: 'Healthy' },
  ];

  const activityDays = Array.from({ length: 32 }, (_, i) => {
    const intensity = (i * 7 + 13) % 5;
    return { day: i + 1, level: intensity };
  });

  return (
    <section id="metrics" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-12">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Edge Telemetry & Live Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight vercel-gradient-text">
            Real-time Performance & Vital Stats.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Live telemetry data reflecting global distribution speed, node latency, and continuous shipping cadence.
          </p>
        </div>

        {/* Top Status Bar: Cupertino Frosted Glass Pill */}
        <div className="p-4 sm:p-5 rounded-[28px] bg-zinc-950/80 backdrop-blur-2xl border border-white/20 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">All Systems Operational</span>
              <p className="text-xs text-zinc-400 font-mono">Global Edge CDN • Zero Downtime Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-2xl border border-white/10">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Istanbul (UTC+3): <strong className="text-white">{istanbulTime || '15:42:00'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/15 px-3 py-1.5 rounded-2xl border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>{simulatedPing}ms</span>
            </div>
          </div>
        </div>

        {/* 3D Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Edge Regions */}
          <ThreeDCard className="p-6 sm:p-7" glowColor="rgba(0, 112, 243, 0.25)" depth={14}>
            <div style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Globe2 className="w-4 h-4 text-blue-400" />
                  <span>Global Edge Nodes</span>
                </div>
                <span className="text-xs font-mono text-zinc-400">RTT</span>
              </div>

              <div className="space-y-2.5">
                {edgeRegions.map((region) => (
                  <div
                    key={region.name}
                    onClick={() => setActiveEdge(region.name)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all text-xs font-mono border ${
                      activeEdge === region.name
                        ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-md'
                        : 'hover:bg-white/5 border-transparent text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{region.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{region.ping}ms</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ThreeDCard>

          {/* Card 2: SLA & Quality */}
          <ThreeDCard className="p-6 sm:p-7 flex flex-col justify-between" glowColor="rgba(80, 227, 194, 0.25)" depth={14}>
            <div style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SLA & Reliability</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Verified</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">Availability Uptime</span>
                    <span className="text-emerald-400 font-bold">{PORTFOLIO_DATA.stats.uptime}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-emerald-400 rounded-full w-[99.9%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">Core Web Vitals</span>
                    <span className="text-blue-400 font-bold">100 / 100</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-blue-400 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">TypeScript Strict Safety</span>
                    <span className="text-purple-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-purple-400 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-400 flex items-center gap-2"
              style={{ transform: 'translateZ(20px)' }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Automated CI/CD validation on push</span>
            </div>
          </ThreeDCard>

          {/* Card 3: Commit Heatmap */}
          <ThreeDCard className="p-6 sm:p-7 flex flex-col justify-between" glowColor="rgba(245, 166, 35, 0.25)" depth={14}>
            <div style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Ship Velocity</span>
                </div>
                <span className="text-xs font-mono text-zinc-300 font-bold">{PORTFOLIO_DATA.stats.githubContributions}</span>
              </div>

              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Continuous daily delivery across public repositories and core architectures.
              </p>

              {/* Heatmap */}
              <div className="grid grid-cols-8 gap-1.5 p-2.5 rounded-2xl bg-zinc-950/80 border border-white/10">
                {activityDays.map((item) => {
                  let bg = 'bg-zinc-800/60';
                  if (item.level === 1) bg = 'bg-emerald-950 text-emerald-300';
                  if (item.level === 2) bg = 'bg-emerald-800';
                  if (item.level === 3) bg = 'bg-emerald-600';
                  if (item.level === 4) bg = 'bg-emerald-400';

                  return (
                    <div
                      key={item.day}
                      title={`Day ${item.day}: ${item.level * 3} commits`}
                      className={`h-5 rounded-md ${bg} transition-all hover:scale-125 hover:shadow-lg cursor-pointer`}
                    />
                  );
                })}
              </div>
            </div>

            <div
              className="flex items-center justify-between mt-5 pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-500"
              style={{ transform: 'translateZ(20px)' }}
            >
              <span>Less</span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-md bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-950" />
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-800" />
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-600" />
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-400" />
              </div>
              <span>More</span>
            </div>
          </ThreeDCard>
        </div>
      </div>
    </section>
  );
};
