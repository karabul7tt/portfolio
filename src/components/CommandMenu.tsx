import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Terminal, 
  FolderGit2, 
  Briefcase, 
  Cpu, 
  Mail, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  Sun, 
  Moon, 
  ArrowRight, 
  X,
  ExternalLink,
  Check
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onToggleTheme,
  isDark,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCli = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigationItems = [
    { id: 'hero', title: 'Home / Hero', icon: Terminal, action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'projects', title: 'Projects & Work', icon: FolderGit2, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'experience', title: 'Experience & Career', icon: Briefcase, action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'skills', title: 'Tech Stack & Skills', icon: Cpu, action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'metrics', title: 'System Metrics & Telemetry', icon: Terminal, action: () => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'contact', title: 'Contact Me', icon: Mail, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const quickActions = [
    { id: 'copy-email', title: 'Copy Email Address', icon: copied ? Check : Copy, action: copyEmail, detail: PORTFOLIO_DATA.personal.email },
    { id: 'copy-cli', title: 'Copy CLI Command', icon: Terminal, action: copyCli, detail: PORTFOLIO_DATA.personal.cliCommand },
    { id: 'toggle-theme', title: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, icon: isDark ? Sun : Moon, action: onToggleTheme },
  ];

  const externalLinks = [
    { id: 'github', title: 'Open GitHub Profile', icon: Github, href: PORTFOLIO_DATA.personal.github },
    { id: 'linkedin', title: 'Open LinkedIn Profile', icon: Linkedin, href: PORTFOLIO_DATA.personal.linkedin },
    { id: 'twitter', title: 'Open X (Twitter)', icon: Twitter, href: PORTFOLIO_DATA.personal.twitter },
  ];

  const filteredNav = navigationItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  const filteredActions = quickActions.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  const filteredLinks = externalLinks.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  const allFiltered = [...filteredNav, ...filteredActions, ...filteredLinks];

  const handleSelect = (index: number) => {
    const item = allFiltered[index];
    if (!item) return;
    if ('action' in item && item.action) {
      item.action();
    } else if ('href' in item && item.href) {
      window.open(item.href, '_blank');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#0d0d0d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-zinc-950/60">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
          />
          <button 
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {filteredNav.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Navigation
              </div>
              <div className="mt-1 space-y-1">
                {filteredNav.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-white/[0.05] group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredActions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Actions
              </div>
              <div className="mt-1 space-y-1">
                {filteredActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        if (item.id === 'toggle-theme') onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-white/[0.05] group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.detail && (
                        <span className="text-xs font-mono text-zinc-500 truncate max-w-[140px]">
                          {item.detail}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredLinks.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Links & Profiles
              </div>
              <div className="mt-1 space-y-1">
                {filteredLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-white/[0.05] group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {allFiltered.length === 0 && (
            <div className="py-8 text-center text-zinc-500 text-sm">
              No results found for "<span className="text-zinc-300">{query}</span>"
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span>Navigation <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">↑↓</kbd></span>
            <span>Select <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">↵</kbd></span>
          </div>
          <span>Close <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
};
