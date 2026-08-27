import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles, 
  MessageSquare
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { ThreeDCard } from './3d/ThreeDCard';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 mb-2 uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>Connect & Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight vercel-gradient-text">
            Let's build something remarkable.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Have a project in mind, want to consult on an architecture, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Contact info & Social links */}
          <div className="md:col-span-5 space-y-6">
            <ThreeDCard className="p-6 sm:p-7" glowColor="rgba(255, 0, 128, 0.2)" depth={12}>
              <div style={{ transform: 'translateZ(30px)' }}>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  Direct Communication
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Fastest way to reach me directly. I usually respond within a few hours.
                </p>

                {/* Email Copy Card */}
                <div 
                  onClick={handleCopyEmail}
                  className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-pink-500/40 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                >
                  <div className="overflow-hidden mr-2">
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">Email Address</span>
                    <span className="text-xs sm:text-sm font-mono text-white truncate block group-hover:text-pink-400 transition-colors">
                      {PORTFOLIO_DATA.personal.email}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 text-zinc-400 group-hover:text-white group-hover:bg-pink-500/20 transition-all shrink-0">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span>Accepting contracts & full-time roles</span>
                </div>
              </div>
            </ThreeDCard>

            {/* Social Grid */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 hover:border-white/30 hover:bg-zinc-800 transition-all flex flex-col items-center justify-center gap-2 group text-zinc-400 hover:text-white shadow-md active:scale-95"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-mono">GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 hover:border-white/30 hover:bg-zinc-800 transition-all flex flex-col items-center justify-center gap-2 group text-zinc-400 hover:text-white shadow-md active:scale-95"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-400" />
                <span className="text-[11px] font-mono">LinkedIn</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 hover:border-white/30 hover:bg-zinc-800 transition-all flex flex-col items-center justify-center gap-2 group text-zinc-400 hover:text-white shadow-md active:scale-95"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform text-sky-400" />
                <span className="text-[11px] font-mono">Twitter/X</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="md:col-span-7">
            <ThreeDCard className="p-6 sm:p-8" glowColor="rgba(0, 112, 243, 0.2)" depth={12}>
              <div style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-6">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Send a Direct Message</span>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-3 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto font-mono">
                      Thank you for reaching out. Your message has been safely received and I will reply to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project, idea, or inquiry..."
                        className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Transmitting...
                        </span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ThreeDCard>
          </div>
        </div>
      </div>
    </section>
  );
};
