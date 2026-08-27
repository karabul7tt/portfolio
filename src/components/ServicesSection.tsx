import React from 'react';
import { Smartphone, Monitor, Globe, Sparkles, Share2, Code2, ArrowRight, CheckCircle2, Video, Wand2 } from 'lucide-react';
import { Marquee } from './Marquee';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      number: '01',
      icon: <Smartphone className="w-6 h-6 text-black dark:text-white" />,
      title: 'Yerel iOS Uygulama Geliştirme',
      tagline: 'Swift & SwiftUI • Apple Standartları',
      description:
        'Apple ekosistemine özel, 120 FPS hızında akıcı, modern ve kullanıcı odaklı iOS uygulamaları geliştiriyorum. Apple Human Interface Guidelines standartlarına tam uyum.',
      deliverables: [
        'Swift & SwiftUI ile modern mimari (MVVM)',
        'REST API & Asenkron veri entegrasyonu',
        'Cihaz donanımı optimizasyonu (Kamera, Ses, Sensörler)',
        'App Store yayına hazırlık ve sürüm yönetimi',
      ],
      badge: 'EN ÇOK TERCİH EDİLEN',
      highlight: true,
    },
    {
      number: '02',
      icon: <Video className="w-6 h-6 text-black dark:text-white" />,
      title: 'Üretken Yapay Zeka & AI Video Prodüksiyonu',
      tagline: 'AI Video • Midjourney • Runway • Ses Sentezi • Prompt',
      description:
        'En güncel üretken yapay zeka modelleriyle sinematik videolar, tanıtım klipleri, fotogerçekçi görseller, ses sentezleme ve yaratıcı dijital içerik prodüksiyonu.',
      deliverables: [
        'Metinden ve görselden sinematik AI video üretimi (Runway, Kling, Luma, Pika)',
        'Yapay zeka ile yüksek çözünürlüklü görsel üretimi (Midjourney, DALL-E)',
        'Doğal yapay zeka seslendirme ve ses klonlama (ElevenLabs)',
        'Yazılımlara OpenAI, Claude ve Gemini LLM API entegrasyonları',
      ],
      badge: 'YAPAY ZEKA & MEDYA',
      highlight: true,
    },
    {
      number: '03',
      icon: <Monitor className="w-6 h-6 text-black dark:text-white" />,
      title: 'Masaüstü & Sistem Yazılımları',
      tagline: 'C# • C++ • C • Algoritma Optimizasyonu',
      description:
        'Performans odaklı masaüstü uygulamaları, analitik veri işleme araçları, algoritma tasarımı ve kurumsal otomasyon çözümleri.',
      deliverables: [
        'C#, C++ ve C ile yüksek performanslı yazılımlar',
        'Veri tabanı mimarisi ve mantıksal analiz',
        'Modüler, test edilebilir ve sürdürülebilir kod yapısı',
        'İş akışı ve otomasyon araçları geliştirme',
      ],
      badge: 'SİSTEM & PERFORMANS',
    },
    {
      number: '04',
      icon: <Globe className="w-6 h-6 text-black dark:text-white" />,
      title: 'Modern Web & Ön Yüz Geliştirme',
      tagline: 'JavaScript • HTML5 • CSS3 • Responsive Tasarım',
      description:
        'Minimalist, şık, hızlı yüklenen ve her cihazda kusursuz çalışan modern web siteleri, portfolyolar ve interaktif kullanıcı arayüzleri.',
      deliverables: [
        'Mobil ve masaüstü uyumlu (Responsive) tasarım',
        'Koyu / Açık tema desteği ve akıcı animasyonlar',
        'Hızlı yükleme süresi ve SEO optimizasyonu',
        'Kişisel portfolyo, tanıtım ve landing page projeleri',
      ],
      badge: 'MODERN WEB',
    },
    {
      number: '05',
      icon: <Share2 className="w-6 h-6 text-black dark:text-white" />,
      title: 'Sosyal Medya & Dijital Strateji',
      tagline: 'İçerik Tasarımı • Topluluk Yönetimi • Büyüme',
      description:
        'Kulüp ve marka hesapları için profesyonel sosyal medya yönetimi, dijital estetik kurgulama, yapay zeka destekli içerik üretimi ve etkileşim stratejisi.',
      deliverables: [
        'Teknoloji ve yazılım odaklı içerik stratejisi',
        'Yapay zeka destekli görsel ve video şablonları',
        'Topluluk yönetimi ve organik büyüme planı',
        'Etkinlik ve proje tanıtım kampanyaları',
      ],
      badge: 'DİJİTAL İLETİŞİM',
    },
    {
      number: '06',
      icon: <Code2 className="w-6 h-6 text-black dark:text-white" />,
      title: 'Temiz Kod & Mimari Danışmanlığı',
      tagline: 'SOLID • Refactoring • Hata Ayıklama',
      description:
        'Yazılım projelerinizin mimarisini inceleme, kod kalitesini artırma, performans darboğazlarını giderme ve modern standartlara uyarlama desteği.',
      deliverables: [
        'Mevcut kod tabanı analizi ve refactoring',
        'SOLID ve Temiz Mimari (Clean Architecture) rehberliği',
        'Hata ayıklama (debugging) ve bellek yönetimi optimizasyonu',
        'AI destekli geliştirme araçları (Cursor, Copilot) iş akışları',
      ],
      badge: 'MİMARİ & KALİTE',
    },
  ];

  return (
    <section
      id="services"
      className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250 overflow-hidden"
    >
      {/* Background Marquee Ticker */}
      <div className="absolute top-6 inset-x-0 -z-10 opacity-25 dark:opacity-40">
        <Marquee text="NATIVE IOS • GENERATIVE AI • AI VIDEO CREATION • SYSTEM ARCHITECTURE • WEB DESIGN • " />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              HİZMETLERİM & UZMANLIK ALANLARI
            </span>
            <span className="text-xs font-mono text-black dark:text-white font-semibold hidden sm:inline">
              ÖZEL ÇÖZÜMLER & MÜHENDİSLİK
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-black dark:text-white font-sans">
                Fikirlerinizi <strong className="font-extrabold underline decoration-1 underline-offset-8">yüksek performanslı</strong> yazılımlara ve <strong className="font-extrabold underline decoration-1 underline-offset-8">üretken yapay zeka</strong> içeriklerine dönüştürüyorum.
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl leading-relaxed mt-4">
                iOS uygulamalarından üretken AI video prodüksiyonuna, masaüstü yazılımlardan modern web projelerine kadar sunduğum kapsamlı hizmetler:
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95 group"
            >
              <span>PROJENİZİ BAŞLATIN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Services 2x3 Grid */}
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
              {/* Card Top: Number, Icon & Badge */}
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

              {/* Card Middle: Title & Description */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-sans leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom: Deliverables List */}
              <div className="border-t border-black/10 dark:border-white/10 pt-5 space-y-2.5">
                <span className="text-xs font-mono font-semibold text-zinc-500 uppercase block mb-1">
                  Kapsam & Neler Sunuyorum:
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
                  <span>Teklif Al & Danış</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-black/15 dark:border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-sans">
              Yapay zeka veya yazılım projeniz için hazır mısınız?
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              İster AI destekli video üretimi, ister iOS ve sistem yazılımları... İhtiyaçlarınıza özel stratejiyi birlikte planlayalım.
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
