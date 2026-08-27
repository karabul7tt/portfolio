import React from 'react';
import { Smartphone, Monitor, Globe, ArrowRight, CheckCircle2, Video, Code2, Sparkles } from 'lucide-react';
import { Marquee } from './Marquee';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      number: '01',
      icon: <Smartphone className="w-6 h-6 text-black dark:text-white" />,
      title: 'iOS Uygulama Geliştirme',
      tagline: 'Swift & SwiftUI',
      description:
        'iPhone ve iPad için Swift ve SwiftUI kullanarak hızlı, sade ve kullanıcı dostu yerel mobil uygulamalar geliştiriyorum.',
      deliverables: [
        'Swift & SwiftUI ile modern arayüz ve mimari',
        'API ve veri tabanı entegrasyonu',
        'Cihaz özellikleri (Kamera, bildirimler, ses, sensörler)',
        'App Store yayına hazırlık desteği',
      ],
      badge: 'ANA UZMANLIK',
      highlight: true,
    },
    {
      number: '02',
      icon: <Video className="w-6 h-6 text-black dark:text-white" />,
      title: 'Yapay Zeka & AI Video Üretimi',
      tagline: 'AI Video • Görsel • Ses • Prompt',
      description:
        'Yapay zeka araçlarını kullanarak tanıtım videoları, konsept görseller, seslendirme ve yaratıcı medya içerikleri hazırlıyorum.',
      deliverables: [
        'AI ile sinematik video üretimi (Runway, Kling, Luma)',
        'Yapay zeka ile görsel oluşturma (Midjourney, DALL-E)',
        'Doğal seslendirme ve ses sentezi (ElevenLabs)',
        'Yazılım projelerine AI API entegrasyonu (OpenAI, Claude, Gemini)',
      ],
      badge: 'YAPAY ZEKA',
      highlight: true,
    },
    {
      number: '03',
      icon: <Monitor className="w-6 h-6 text-black dark:text-white" />,
      title: 'Masaüstü & Sistem Programlama',
      tagline: 'C# • C++ • C',
      description:
        'C#, C++ ve C dilleriyle performans odaklı masaüstü yazılımları, temel algoritmalar ve işlevsel araçlar geliştiriyorum.',
      deliverables: [
        'C#, C++ ve C ile masaüstü uygulamaları',
        'Veri tabanı ve temel algoritma tasarımı',
        'Modüler ve anlaşılır kod yapısı',
        'Otomasyon ve veri işleme çözümleri',
      ],
      badge: 'SİSTEM & YAZILIM',
    },
    {
      number: '04',
      icon: <Globe className="w-6 h-6 text-black dark:text-white" />,
      title: 'Web & Arayüz Geliştirme',
      tagline: 'JavaScript • HTML5 • CSS3',
      description:
        'Sade, hızlı açılan, mobil uyumlu ve modern web sayfaları ve tanıtım arayüzleri geliştiriyorum.',
      deliverables: [
        'Mobil ve masaüstü uyumlu responsive tasarım',
        'Açık / Koyu tema desteği ve sade animasyonlar',
        'Hızlı ve temiz kodlanmış sayfalar',
        'Kişisel portfolyo ve tanıtım siteleri',
      ],
      badge: 'WEB',
    },
    {
      number: '05',
      icon: <Sparkles className="w-6 h-6 text-black dark:text-white" />,
      title: 'Sosyal Medya & İçerik Yönetimi',
      tagline: 'Görsel Tasarım • Topluluk • İletişim',
      description:
        'Kulüp ve marka hesapları için içerik üretimi, görsel tasarım ve dijital iletişim yönetimi yapıyorum.',
      deliverables: [
        'Teknoloji ve yazılım içerikleri hazırlama',
        'Görsel şablonlar ve tanıtım postları',
        'Etkinlik duyuruları ve topluluk iletişimi',
        'Sosyal medya hesap yönetimi',
      ],
      badge: 'DİJİTAL MEDYA',
    },
    {
      number: '06',
      icon: <Code2 className="w-6 h-6 text-black dark:text-white" />,
      title: 'Kod İnceleme & Düzenleme',
      tagline: 'Refactoring • Hata Ayıklama',
      description:
        'Mevcut projelerdeki kodları inceleme, sadeleştirme, hataları giderme ve daha okunabilir hale getirme desteği veriyorum.',
      deliverables: [
        'Kod tabanı incelemesi ve sadeleştirme',
        'Hata ayıklama (debugging)',
        'Daha temiz ve modüler yapı oluşturma',
        'Git & GitHub sürüm takibi desteği',
      ],
      badge: 'DANIŞMANLIK',
    },
  ];

  return (
    <section
      id="services"
      className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250 overflow-hidden"
    >
      {/* Background Marquee Ticker */}
      <div className="absolute top-6 inset-x-0 -z-10 opacity-25 dark:opacity-40">
        <Marquee text="IOS DEVELOPER • GENERATIVE AI • AI VIDEO CREATION • SOFTWARE • WEB • " />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              HİZMETLERİM & ÇALIŞMA ALANLARIM
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-black dark:text-white font-sans">
                Yazılım ve yapay zeka alanında <strong className="font-extrabold underline decoration-1 underline-offset-8">çözümler</strong> üretiyorum.
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl leading-relaxed mt-4">
                iOS uygulamalarından AI video üretimine, masaüstü yazılımlardan web sayfalarına kadar yaptığım çalışmalar:
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95 group"
            >
              <span>İLETİŞİME GEÇ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.number}
              data-cursor="project"
              className={`project-card group relative rounded-3xl p-7 sm:p-9 transition-all duration-300 flex flex-col justify-between space-y-6 ${
                service.highlight
                  ? 'bg-zinc-50 dark:bg-[#0f0f12] border-2 border-black/30 dark:border-white/30 shadow-lg dark:shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
                  : 'bg-zinc-50 dark:bg-zinc-900/80 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {service.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-500 block">
                      {service.number}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                      {service.tagline}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20 text-black dark:text-white font-medium uppercase shrink-0">
                  {service.badge}
                </span>
              </div>

              {/* Card Middle */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-sans leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom */}
              <div className="border-t border-black/10 dark:border-white/10 pt-5 space-y-2.5">
                <span className="text-xs font-mono font-semibold text-zinc-500 uppercase block mb-1">
                  Neler Sunuyorum:
                </span>
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white hover:underline underline-offset-4 group/btn"
                >
                  <span>Görüşelim</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-sans">
              Bir proje veya çalışma fikriniz mi var?
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              İster mobil uygulama, ister yapay zeka veya web... Detayları konuşmak için dilediğiniz zaman iletişime geçebilirsiniz.
            </p>
          </div>

          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95"
          >
            İLETİŞİME GEÇİN →
          </a>
        </div>

      </div>
    </section>
  );
};
