import React, { useState } from 'react';
import { Copy, Check, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].contact;

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

  const getCopyrightText = () => {
    const year = new Date().getFullYear();
    if (lang === 'de') return `© ${year} MEHMET KARABULUT. ALLE RECHTE VORBEHALTEN.`;
    if (lang === 'en') return `© ${year} MEHMET KARABULUT. ALL RIGHTS RESERVED.`;
    return `© ${year} MEHMET KARABULUT. TÜM HAKLARI SAKLIDIR.`;
  };

  return (
    <section id="contact" className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Tag */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            {t.label}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-black dark:text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{t.statusBadge}</span>
          </div>
        </div>

        {/* Minimalist Contact Grid Rows */}
        <div className="space-y-12">
          
          {/* Row 1: E-POSTA */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-black dark:text-white" />
              {t.emailLabel}
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
                title={t.copyBtn}
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Row 2: TELEFON */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-black dark:text-white" />
              {t.phoneLabel}
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
                title={t.copyBtn}
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPhone ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Row 3: KONUM & EĞİTİM */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-black dark:text-white" />
              {t.locationLabel}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white font-sans">
                {t.locationCity}
              </span>
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-black dark:text-white" />
                {t.educationStatus}
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
          {getCopyrightText()}
        </div>
      </div>
    </section>
  );
};
