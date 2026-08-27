import React from 'react';
import { Zap, Layers, Heart, GraduationCap, Sparkles } from 'lucide-react';
import { Marquee } from './Marquee';

export const AboutSection: React.FC = () => {
  const principles = [
    {
      icon: <Zap className="w-5 h-5 text-black dark:text-white" />,
      title: "Performans & Akıcılık",
      desc: "Swift ve yerel teknolojilerle 120 FPS hızında, kaynakları verimli kullanan akıcı uygulamalar geliştirmeye odaklanıyorum.",
    },
    {
      icon: <Layers className="w-5 h-5 text-black dark:text-white" />,
      title: "Temiz Mimari & Modülerlik",
      desc: "Okunabilir, sürdürülebilir, test edilebilir ve SOLID prensiplerine uygun mimariler kurmayı benimsiyorum.",
    },
    {
      icon: <Heart className="w-5 h-5 text-black dark:text-white" />,
      title: "Kullanıcı Deneyimi (UX/UI)",
      desc: "Apple tasarım dili doğrultusunda sezgisel, minimalist ve estetik kullanıcı deneyimleri tasarlıyorum.",
    },
  ];

  return (
    <section id="about" className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250 overflow-hidden">
      {/* Background Marquee Ticker */}
      <div className="absolute top-6 inset-x-0 -z-10 opacity-25 dark:opacity-40">
        <Marquee text="ENGINEERING • ARCHITECTURE • PERFORMANCE • INTENTIONAL CRAFT • " />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Subtle Top Label */}
        <div>
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            HAKKIMDA & MÜHENDİSLİK VİZYONU
          </span>
        </div>

        {/* Giant Editorial Heading (Exact Kintaro Typography) */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-black dark:text-white font-sans">
          <strong className="font-extrabold underline decoration-1 underline-offset-8">iOS Geliştirme</strong> ve modern yazılım mimarilerine odaklanan bir bilgisayar mühendisliği öğrencisiyim.
        </h2>

        {/* Main Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-5 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
            <p>
              Üniversitede <strong className="text-black dark:text-white font-semibold">Bilgisayar Mühendisliği</strong> bölümünde eğitimime devam etmekteyim. Başta <strong className="text-black dark:text-white font-semibold">Swift (iOS)</strong> olmak üzere <strong className="text-black dark:text-white font-semibold">C#, C++, C, JavaScript</strong> ve modern yazılım dilleriyle projeler geliştiriyorum.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              Üniversitemde <strong className="text-black dark:text-white font-semibold">Yazılım, Yapay Zeka ve Yaratıcılık Kulübü</strong> yönetiminde aktif rol alıyorum. Yazılım geliştirmenin yanı sıra <strong className="text-black dark:text-white font-semibold">üretken yapay zeka (Generative AI)</strong>, <strong className="text-black dark:text-white font-semibold">AI ile sinematik video oluşturma</strong> (Runway, Kling, Luma, Pika), görsel modelleme (Midjourney) ve ses sentezleme (ElevenLabs) araçlarını ileri düzeyde kullanıyorum.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              Yapay zeka modellerini ve API'lerini yazılım mimarilerine entegre ederek, geleceğin akıllı ve yüksek performanslı dijital deneyimlerini inşa etmeye odaklanıyorum.
            </p>
          </div>

          {/* Right Card: Academic Highlights */}
          <div className="md:col-span-5 space-y-4 p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-black/15 dark:border-white/15 shadow-md">
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-bold tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>AKADEMİK BİLGİ</span>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-black dark:text-white font-sans">Üniversite Eğitimi (Lisans)</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Mühendislik Fakültesi</p>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">Bilgisayar Mühendisliği Bölümü</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20 text-black dark:text-white text-xs font-mono font-medium">
                2023 — 2027
              </span>
            </div>

            <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Kulüp Görevi:</span>
                <span className="text-black dark:text-white font-medium">Sosyal Medya Sorumlusu</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Odak Alanı:</span>
                <span className="text-black dark:text-white font-bold">iOS / Swift Geliştirme</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Diller:</span>
                <span className="text-black dark:text-white font-medium">İngilizce, Almanca</span>
              </div>
            </div>
          </div>
        </div>

        {/* Principles / Core Pillars */}
        <div className="space-y-6 pt-6">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            <span className="font-semibold text-black dark:text-white">YAZILIM YAKLAŞIMIM & İLKELERİM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 transition-all duration-200 space-y-3 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h4 className="text-base font-bold text-black dark:text-white font-sans">{p.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
