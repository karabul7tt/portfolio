import React, { useState } from 'react';
import { Cpu, Code2, Server, Cloud, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolio';
import { ThreeDCard } from './3d/ThreeDCard';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Frontend & Spatial UI':
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case 'Backend & Systems Architecture':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Cloud & Edge Deployment':
        return <Cloud className="w-4 h-4 text-purple-400" />;
      case 'AI & Neural Computing':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      default:
        return <Cpu className="w-4 h-4 text-zinc-400" />;
    }
  };

  const categories = ['All', ...PORTFOLIO_DATA.skills.map((c) => c.name)];

  const displayedSkills = activeCategory === 'All'
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter((c) => c.name === activeCategory);

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-12">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-teal-400 mb-2 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Architecture & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight vercel-gradient-text">
            Engineered with modern tools.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            A comprehensive, high-velocity technology stack optimized for low latency, type safety, and spatial user experiences.
          </p>
        </div>

        {/* Categories Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-black font-bold shadow-lg scale-105'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedSkills.map((category: SkillCategory) => (
            <ThreeDCard
              key={category.name}
              className="p-6 sm:p-8"
              glowColor="rgba(80, 227, 194, 0.2)"
              depth={14}
            >
              {/* Category Title with Icon */}
              <div
                className="flex items-center justify-between pb-4 mb-5 border-b border-white/10"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-inner">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {category.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {category.skills.length} modules
                </span>
              </div>

              {/* Skills List with Level Bars */}
              <div
                className="space-y-4"
                style={{ transform: 'translateZ(20px)' }}
              >
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 group/skill">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-300 group-hover/skill:text-white transition-colors flex items-center gap-2 font-medium">
                        {skill.highlight && (
                          <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(80,227,194,0.8)]" />
                        )}
                        {skill.name}
                      </span>
                      <span className="text-zinc-400 font-mono text-[11px]">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar with glowing gradient fill */}
                    <div className="w-full h-2 bg-zinc-900/90 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(80,227,194,0.4)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
};
