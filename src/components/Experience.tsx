import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Experience as ExperienceType } from '../data/portfolio';
import { ThreeDCard } from './3d/ThreeDCard';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-14">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-purple-400 mb-2 uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Career History & Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight vercel-gradient-text">
            Experience in 3D perspective.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            A proven record of architecting distributed cloud systems, building high-speed frontends, and leading engineering delivery.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/15 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp: ExperienceType, index: number) => (
            <div key={index} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-3 w-4 h-4 rounded-full bg-black border-2 border-purple-500 group-hover:scale-150 group-hover:border-blue-400 transition-all shadow-[0_0_15px_rgba(121,40,202,0.8)] z-20" />

              <ThreeDCard
                className="p-6 sm:p-8"
                glowColor="rgba(121, 40, 202, 0.25)"
                depth={12}
              >
                {/* Header: Role & Period */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mt-0.5">
                      <span>{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 text-xs font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-zinc-300 self-start sm:self-auto backdrop-blur-md">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-sm text-zinc-400 leading-relaxed mt-3"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {exp.description}
                </p>

                {/* Key Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div
                    className="mt-4 space-y-2 border-t border-white/10 pt-4"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                      Engineering Highlights
                    </h4>
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                <div
                  className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/10"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  {(exp.technologies || exp.techStack || []).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-zinc-900/90 text-zinc-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ThreeDCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
