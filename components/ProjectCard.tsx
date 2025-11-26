import React from 'react';
import { Project } from '../types';
import { Github, ArrowUpRight } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative border border-nothing-gray bg-nothing-dark/50 overflow-hidden flex flex-col h-full hover:border-nothing-red transition-colors duration-300">
      {/* Dot Grid Background on Hover */}
      <div className="absolute inset-0 bg-dot-pattern bg-dot-size opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

      <div className="p-6 flex flex-col h-full z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-nothing-white text-lg font-mono group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] border border-nothing-gray px-1.5 py-0.5 text-nothing-gray">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-nothing-light mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        <div className="space-y-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] uppercase font-mono tracking-wider bg-nothing-gray/20 text-nothing-light px-2 py-1">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between flex-1 border-t border-nothing-gray pt-4 group/btn"
              >
                <span className="flex items-center gap-2 text-xs font-mono text-nothing-gray group-hover/btn:text-nothing-white transition-colors">
                  <Github size={14} />
                  VIEW SOURCE
                </span>
                <ArrowUpRight size={14} className="text-nothing-gray group-hover/btn:text-nothing-red transition-colors transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
              </a>
            )}
            {(project.demoLink !== undefined) && (
              <a
                href={project.demoLink || "#"}
                target={project.demoLink ? "_blank" : undefined}
                rel={project.demoLink ? "noreferrer" : undefined}
                className={`flex items-center justify-between flex-1 border-t border-nothing-gray pt-4 group/btn ${!project.demoLink ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={!project.demoLink ? (e) => e.preventDefault() : undefined}
              >
                <span className="flex items-center gap-2 text-xs font-mono text-nothing-gray group-hover/btn:text-nothing-white transition-colors">
                  <ArrowUpRight size={14} />
                  TRY IT
                </span>
                <ArrowUpRight size={14} className="text-nothing-gray group-hover/btn:text-nothing-red transition-colors transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;