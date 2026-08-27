import React, { useState } from 'react';
import { X, ExternalLink, Smartphone, Monitor, Tablet, RefreshCw } from 'lucide-react';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  demoUrl: string;
  githubUrl?: string;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  title,
  demoUrl,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  if (!isOpen) return null;

  const getContainerWidth = () => {
    if (isFullscreen) return 'w-full h-full max-w-none rounded-none';
    switch (device) {
      case 'mobile':
        return 'w-[390px] h-[820px] max-h-[90vh]';
      case 'tablet':
        return 'w-[768px] h-[850px] max-h-[90vh]';
      case 'desktop':
      default:
        return 'w-[95vw] max-w-6xl h-[88vh]';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 dark:bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Window */}
      <div
        className={`relative z-10 bg-white dark:bg-[#09090b] border border-black/15 dark:border-white/20 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all duration-300 ${getContainerWidth()}`}
      >
        {/* Header Bar */}
        <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-950 border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-4 shrink-0">
          
          {/* Left: Window Controls & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
                title="Kapat"
              />
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
                title="Boyutlandır"
              />
              <button
                onClick={() => setKey((k) => k + 1)}
                className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                title="Yeniden Yükle"
              />
            </div>

            <div className="h-4 w-px bg-black/15 dark:bg-white/15 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-mono text-xs sm:text-sm font-bold text-zinc-950 dark:text-white tracking-wide truncate max-w-[200px] sm:max-w-xs">
                {title}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-950/80 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hidden md:inline font-medium">
                CANLI UYGULAMA
              </span>
            </div>
          </div>

          {/* Center: Device Viewport Switcher */}
          {!isFullscreen && (
            <div className="hidden sm:flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-lg border border-black/10 dark:border-white/10 text-xs">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-black/10 dark:bg-white/20 text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
                title="Masaüstü Görünümü"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-md transition-colors ${
                  device === 'tablet' ? 'bg-black/10 dark:bg-white/20 text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
                title="Tablet Görünümü"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-black/10 dark:bg-white/20 text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
                title="Mobil Görünüm"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setKey((k) => k + 1)}
              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
              title="Yenile"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-mono text-xs font-bold transition-all shadow-md"
            >
              <span>Yeni Sekmede Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/15 dark:hover:bg-white/15 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          <iframe
            key={key}
            src={demoUrl}
            title={title}
            className="w-full h-full border-none bg-[#07090e]"
            allow="camera; microphone; accelerometer; gyroscope; fullscreen"
          />
        </div>
      </div>
    </div>
  );
};
