import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, Sparkles, Play, Code, FileText, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const InteractiveTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cli' | 'json' | 'log'>('cli');
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: 'whoami',
      output: (
        <div className="text-zinc-300 space-y-1">
          <p className="text-white font-semibold">{PORTFOLIO_DATA.personal.name}</p>
          <p className="text-zinc-400">{PORTFOLIO_DATA.personal.role} • {PORTFOLIO_DATA.personal.location}</p>
          <p className="text-blue-400 font-mono text-xs">Status: {PORTFOLIO_DATA.personal.status}</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="text-xs space-y-1 text-zinc-400">
            <p className="text-white font-medium">Kullanılabilir komutlar:</p>
            <p><span className="text-teal-400 font-mono">whoami</span> — Biyografi ve mevcut odak</p>
            <p><span className="text-teal-400 font-mono">skills</span> — Temel teknoloji yığını ve araçlar</p>
            <p><span className="text-teal-400 font-mono">projects</span> — Öne çıkan projeler</p>
            <p><span className="text-teal-400 font-mono">stats</span> — Telemetri ve performans verileri</p>
            <p><span className="text-teal-400 font-mono">contact</span> — İletişim bilgileri</p>
            <p><span className="text-teal-400 font-mono">clear</span> — Terminal geçmişini temizle</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-zinc-300 space-y-1 text-xs">
            <p className="text-white font-semibold">{PORTFOLIO_DATA.personal.name}</p>
            <p className="text-zinc-400">{PORTFOLIO_DATA.personal.role}</p>
            <p className="text-zinc-400">{PORTFOLIO_DATA.personal.bio}</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs space-y-1 text-zinc-300">
            <p className="text-white font-medium">Temel Yetkinlikler:</p>
            <div className="grid grid-cols-2 gap-2 mt-1 font-mono text-[11px]">
              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                <span className="text-blue-400">Frontend:</span> React, Next.js, TS, Tailwind, Three.js
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                <span className="text-emerald-400">Backend:</span> Node.js, Python, PostgreSQL, Redis
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                <span className="text-purple-400">Bulut:</span> Vercel, Docker, CI/CD, Edge
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                <span className="text-amber-400">AI:</span> LLM'ler, LangChain, Ajanlar
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs space-y-1.5">
            <p className="text-white font-medium">Öne Çıkan Dağıtımlar:</p>
            {PORTFOLIO_DATA.projects.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span className="text-cyan-400">{p.title}</span>
                <span className="text-emerald-400">● Yayında</span>
              </div>
            ))}
            <p className="text-zinc-500 text-[10px]">Canlı demoları incelemek için #projects bölümüne kaydırın.</p>
          </div>
        );
        break;

      case 'stats':
        outputNode = (
          <div className="text-xs space-y-1 font-mono text-zinc-300">
            <p>● Çalışma Süresi: <span className="text-emerald-400">{PORTFOLIO_DATA.stats.uptime}</span></p>
            <p>● Uç Nokta Gecikmesi: <span className="text-blue-400">{PORTFOLIO_DATA.stats.edgeLatency}</span></p>
            <p>● GitHub Katkıları: <span className="text-purple-400">{PORTFOLIO_DATA.stats.githubContributions}</span></p>
            <p>● Kod Kalite Skoru: <span className="text-teal-400">{PORTFOLIO_DATA.stats.codeQualityScore}</span></p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1 text-zinc-300">
            <p>E-posta: <span className="text-blue-400">{PORTFOLIO_DATA.personal.email}</span></p>
            <p>GitHub: <span className="text-zinc-400">{PORTFOLIO_DATA.personal.github}</span></p>
            <p>LinkedIn: <span className="text-zinc-400">{PORTFOLIO_DATA.personal.linkedin}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'npx mehmet-portfolio':
      case 'npx mehmet-karabulut':
      case 'npm i':
      case 'build':
        outputNode = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-emerald-400">✓ Üretim derlemesi 0.42 saniyede tamamlandı</p>
            <p className="text-zinc-400">Hazır: <span className="text-white underline">https://mehmetkarabulut.dev</span></p>
            <p className="text-blue-400">32 küresel edge bölgesine başarıyla dağıtıldı.</p>
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-xs text-rose-400 font-mono">
            zsh: komut bulunamadı: {trimmed}. Komut listesi için <span className="text-white underline cursor-pointer" onClick={() => handleCommand('help')}>'help'</span> yazabilirsiniz.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
    setInputVal('');
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonSnippet = JSON.stringify(
    {
      name: PORTFOLIO_DATA.personal.name,
      role: PORTFOLIO_DATA.personal.role,
      location: PORTFOLIO_DATA.personal.location,
      status: PORTFOLIO_DATA.personal.status,
      technologies: ["Next.js", "TypeScript", "Tailwind", "Three.js", "Python", "Docker"],
      readyForDeploy: true
    },
    null,
    2
  );

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/15 rounded-2xl overflow-hidden shadow-2xl transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-white/10">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]/80 border border-[#1aab29]" />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-zinc-900/90 p-0.5 rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'cli' ? 'bg-white/15 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            CLI
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'json' ? 'bg-white/15 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            mehmet.json
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'log' ? 'bg-white/15 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            build.log
          </button>
        </div>

        {/* Copy command button */}
        <button
          onClick={handleCopyCommand}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
          title="Copy CLI command"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="font-mono text-[11px] hidden sm:inline">{PORTFOLIO_DATA.personal.cliCommand}</span>
        </button>
      </div>

      {/* Terminal Body */}
      <div 
        className="p-4 h-[260px] overflow-y-auto font-mono text-xs text-zinc-200 bg-[#09090b]/90 scroll-smooth"
        onClick={() => inputRef.current?.focus()}
      >
        {activeTab === 'cli' && (
          <div className="space-y-3">
            {/* Helper quick pills */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5 text-[11px]">
              <span className="text-zinc-500">Quick run:</span>
              {['whoami', 'skills', 'projects', 'stats', 'contact', 'clear'].map((btnCmd) => (
                <button
                  key={btnCmd}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommand(btnCmd);
                  }}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/5 transition-colors"
                >
                  {btnCmd}
                </button>
              ))}
            </div>

            {/* Past History */}
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-teal-400">mehmet@vercel</span>
                  <span className="text-zinc-600">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-zinc-500">$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
                <div className="pl-4 border-l border-white/10 py-0.5">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Active input line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
              }}
              className="flex items-center gap-2 pt-1"
            >
              <span className="text-teal-400">mehmet@vercel</span>
              <span className="text-zinc-600">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-zinc-500">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help' or command..."
                className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none font-mono text-xs"
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        )}

        {activeTab === 'json' && (
          <pre className="text-emerald-400/90 text-xs font-mono whitespace-pre-wrap leading-relaxed animate-fade-in">
            {jsonSnippet}
          </pre>
        )}

        {activeTab === 'log' && (
          <div className="space-y-1 text-xs font-mono text-zinc-400 animate-fade-in">
            <p className="text-zinc-500">[15:42:01.092] Vercel CLI 39.0.0 — Production Deployment</p>
            <p className="text-zinc-400">[15:42:01.214] Initializing Node.js Runtime (v22.x)...</p>
            <p className="text-zinc-400">[15:42:01.450] Running TypeScript compilation (tsc)...</p>
            <p className="text-blue-400">[15:42:01.780] Building optimized client assets with Vite...</p>
            <p className="text-zinc-400">[15:42:02.100] Rendering 3D WebGL geometries & shaders...</p>
            <p className="text-emerald-400 font-semibold">[15:42:02.320] ✓ Deployment ready on Edge network (14ms response time)</p>
            <p className="text-zinc-500 flex items-center gap-1.5 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Status: 200 OK • All Edge Nodes Synced
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
