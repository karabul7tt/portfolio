import React, { useState } from 'react';
import { Copy, Check, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = PORTFOLIO_DATA.personal.email;
  const phone = PORTFOLIO_DATA.personal.phone;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const socialLinks = [
    { label: 'INSTAGRAM ↗', href: PORTFOLIO_DATA.personal.instagram },
    { label: 'GITHUB ↗', href: PORTFOLIO_DATA.personal.github },
    { label: 'LINKEDIN ↗', href: PORTFOLIO_DATA.personal.linkedin },
  ];

  return (
    <section id="contact" className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Tag */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            İLETİŞİM & BAĞLANTI
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-black dark:text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>STAJ & PROJELERE AÇIK</span>
          </div>
        </div>

        {/* Minimalist Contact Grid Rows */}
        <div className="space-y-12">
          
          {/* Row 1: E-POSTA */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-black dark:text-white" />
              E-POSTA ADRESİ
            </span>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white hover:opacity-80 transition-opacity font-sans text-left break-all"
                title="E-posta göndermek için tıklayın"
              >
                {email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/15 dark:border-white/15 text-black dark:text-white transition-all text-xs font-mono flex items-center gap-1.5 shrink-0"
                title="E-postayı kopyala"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'KOPYALANDI' : 'KOPYALA'}</span>
              </button>
            </div>
          </div>

          {/* Row 2: TELEFON */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-black dark:text-white" />
              TELEFON / DOĞRUDAN HAT
            </span>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="text-2xl sm:text-4xl font-bold tracking-tight text-black dark:text-white hover:opacity-80 transition-opacity font-mono"
                title="Aramak için tıklayın"
              >
                {phone}
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/15 dark:border-white/15 text-black dark:text-white transition-all text-xs font-mono flex items-center gap-1.5 shrink-0"
                title="Numarayı kopyala"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPhone ? 'KOPYALANDI' : 'KOPYALA'}</span>
              </button>
            </div>
          </div>

          {/* Row 3: KONUM & ÜNİVERSİTE */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-black dark:text-white" />
              KONUM & EĞİTİM
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white font-sans">
                İstanbul, Türkiye
              </span>
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-black dark:text-white" />
                Bilgisayar Mühendisliği (2023 - 2027)
              </span>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="border-t border-black/10 dark:border-white/10" />
        </div>

        {/* Social Pill Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 text-xs font-mono tracking-widest uppercase text-black dark:text-white shadow-sm hover:scale-105 active:scale-95 font-semibold"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Copyright Footer */}
        <div className="pt-16 text-center text-xs font-mono text-zinc-500 dark:text-zinc-600 tracking-wider">
          © {new Date().getFullYear()} MEHMET KARABULUT. TÜM HAKLARI SAKLIDIR.
        </div>
      </div>
    </section>
  );
};
