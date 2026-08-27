import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  GitBranch, 
  Sparkles,
  TrendingUp,
  Box
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolio';
import { ThreeDCard } from './3d/ThreeDCard';
import { Project3DCanvas } from './3d/Project3DCanvas';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = ['All', 'Full-Stack', 'AI & ML', 'Frontend'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-2 uppercase tracking-wider">
              <Box className="w-4 h-4" />
              <span>3D Spatial Visuals & Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight vercel-gradient-text">
              Engineered with depth.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Hover and tilt each card to experience real-time 3D parallax geometry, WebGL particle shaders, and live deployment telemetry.
            </p>
          </div>

          {/* Cupertino-Style Glass Segmented Control Filter */}
          <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/15 overflow-x-auto shadow-inner">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="h-full"
              >
                <ThreeDCard
                  glowColor={project.primaryColor}
                  depth={18}
                  className="p-6 flex flex-col justify-between h-full group transition-all"
                >
                  {/* Layer 1: 3D Interactive WebGL Visualizer Preview Box */}
                  <div
                    className="w-full h-44 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden mb-5 flex items-center justify-center transition-transform duration-300"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {/* Glowing background gradient */}
                    <div
                      className="absolute inset-0 opacity-25 blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${project.primaryColor} 0%, transparent 70%)`,
                      }}
                    />

                    {/* 3D WebGL Canvas */}
                    <Project3DCanvas
                      type={project.threeDType}
                      primaryColor={project.primaryColor}
                      secondaryColor={project.secondaryColor}
                      isHovered={isHovered}
                    />

                    {/* Overlay Badges on 3D Box */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>{project.deploymentStatus}</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-400">
                      <GitBranch className="w-3 h-3 text-blue-400" />
                      <span>main</span>
                    </div>

                    <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono text-zinc-300 backdrop-blur-sm border border-white/10">
                      3D WebGL
                    </div>
                  </div>

                  {/* Layer 2: Content Floating at Depth */}
                  <div style={{ transform: 'translateZ(40px)' }}>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {project.title}
                    </h3>

                    {project.liveUrl && (
                      <p className="text-xs font-mono text-zinc-500 mt-1 truncate">
                        {project.liveUrl.replace('https://', '')}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics Badges */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3.5 pt-3 border-t border-white/10">
                        {project.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-zinc-300"
                          >
                            <TrendingUp className="w-3 h-3 text-blue-400" />
                            <span className="text-zinc-500">{m.label}:</span>
                            <span className="font-semibold text-white">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Layer 3: Tags & Actions Floating at Highest Depth */}
                  <div
                    className="mt-6 pt-4 border-t border-white/10 space-y-3"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-zinc-900/90 text-zinc-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 transition-all hover:scale-105 shadow-md"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                        </a>
                      )}
                    </div>
                  </div>
                </ThreeDCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
