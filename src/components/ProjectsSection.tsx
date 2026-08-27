import React, { useState, useRef } from 'react';
import { ArrowUpRight, Github, Sparkles, Play, ExternalLink, Apple } from 'lucide-react';
import { Marquee } from './Marquee';
import { PORTFOLIO_DATA, Project } from '../data/portfolio';
import { LiveDemoModal } from './LiveDemoModal';

const ProjectCard: React.FC<{
  project: Project;
  idx: number;
  onOpenDemo: (project: Project) => void;
}> = ({ project, idx, onOpenDemo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Pure DOM 120fps hardware-accelerated 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;

    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;

    const glare = glareRef.current;
    if (glare) {
      glare.style.background = `radial-gradient(450px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12), transparent 70%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
    const glare = glareRef.current;
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  const isSwiftProject = project.tags.includes('Swift');

  return (
    <div className="w-full">
      <div
        ref={cardRef}
        data-cursor="project"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card group relative rounded-3xl bg-zinc-50 dark:bg-[#0c0c0e] border border-black/15 dark:border-white/15 hover:border-black/40 dark:hover:border-white/40 p-6 sm:p-10 transition-[border-color,box-shadow] duration-200 shadow-md dark:shadow-[0_12px_35px_rgba(0,0,0,0.6)] overflow-hidden text-black dark:text-white"
        style={{ willChange: 'transform', transition: 'transform 0.08s ease-out' }}
      >
        {/* Instant Specular Glare */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-3xl z-30 opacity-0 transition-opacity duration-200"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <span className="text-black dark:text-white font-bold">0{idx + 1}</span>
              <span>•</span>
              <span className="uppercase tracking-wider">{project.category}</span>
              {project.metrics && project.metrics.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-black dark:text-white font-mono font-bold">
                    {project.metrics[0].label}: {project.metrics[0].value}
                  </span>
                </>
              )}
            </div>

            {/* Title with exact GitHub Repo Name */}
            <div className="flex items-center gap-3">
              {isSwiftProject && <Apple className="w-6 h-6 text-black dark:text-white shrink-0" />}
              <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white font-mono tracking-tight">
                {project.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
                    tag === 'Swift' || tag === 'iOS'
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white font-bold'
                      : 'bg-black/5 dark:bg-white/5 border-black/15 dark:border-white/15 text-black dark:text-white'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links & Live Action */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs font-mono">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white font-bold transition-colors"
              >
                <Github className="w-4 h-4 text-black dark:text-white" />
                <span>GITHUB REPO ↗</span>
              </a>

              {project.liveUrl && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDemo(project)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-bold tracking-wider uppercase transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>CANLI DEMO</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white transition-colors"
                    title="Yeni Sekmede Aç"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Visual Graphic Preview Card */}
          <div
            onClick={() => project.liveUrl && onOpenDemo(project)}
            className={`lg:col-span-5 relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 aspect-video lg:aspect-square flex items-center justify-center border border-black/15 dark:border-white/15 group-hover:border-black/40 dark:group-hover:border-white/40 transition-all ${
              project.liveUrl ? 'cursor-pointer' : ''
            }`}
          >
            <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                {isSwiftProject ? (
                  <Apple className="w-7 h-7 text-black dark:text-white" />
                ) : project.liveUrl ? (
                  <Play className="w-7 h-7 text-black dark:text-white fill-current" />
                ) : (
                  <Sparkles className="w-7 h-7 text-black dark:text-white" />
                )}
              </div>
              <span className="font-mono text-sm text-black dark:text-white font-bold tracking-wider">
                {project.title}
              </span>
              {project.liveUrl ? (
                <span className="text-[11px] font-mono text-black dark:text-white bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  CANLI ÇALIŞIYOR
                </span>
              ) : isSwiftProject ? (
                <span className="text-[11px] font-mono text-black dark:text-white bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                  SWIFT / iOS PROJESİ
                </span>
              ) : (
                <span className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  GITHUB'DA AKTİF
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('TÜMÜ');
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  const categories = ['TÜMÜ', 'iOS & Swift', 'AI & ML', 'Web & Frontend'];

  const filteredProjects =
    selectedCategory === 'TÜMÜ'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 sm:py-36 relative border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-black text-black dark:text-white transition-colors duration-250 overflow-hidden">
      {/* Background Marquee Ticker */}
      <div className="absolute top-8 inset-x-0 -z-10 opacity-30 dark:opacity-60">
        <Marquee text="SWIFT • iOS GELİŞTİRİCİ • C# • C++ • C • JAVASCRIPT • GITHUB REPOS • " />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-black dark:text-white font-sans">
                GITHUB PROJELERİM
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans max-w-2xl leading-relaxed mt-2">
                GitHub hesabımdaki (<strong className="text-black dark:text-white font-mono">github.com/karabul7tt</strong>) orijinal projelerim ve canlı demoları.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-black dark:bg-white text-white dark:text-black font-bold shadow-md scale-105'
                      : 'bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects List & Media Cards */}
        <div className="space-y-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onOpenDemo={(p) => setActiveDemoProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Live Interactive Demo Modal */}
      {activeDemoProject && activeDemoProject.liveUrl && (
        <LiveDemoModal
          isOpen={true}
          onClose={() => setActiveDemoProject(null)}
          title={activeDemoProject.title}
          demoUrl={activeDemoProject.liveUrl}
          githubUrl={activeDemoProject.githubUrl}
        />
      )}
    </section>
  );
};
