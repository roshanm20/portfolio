import React from 'react';
import { Project } from '../types';
import { Github, ArrowUpRight } from 'lucide-react';

const STEPS = ['navy-card--1', 'navy-card--2', 'navy-card--3'];

interface Props {
  project: Project;
  /** Position in the list, used for the numbered eyebrow and the navy step. */
  index?: number;
}

const arrowIcon = (
  <ArrowUpRight
    size={15}
    aria-hidden="true"
    className="transition-transform duration-300 ease-out-cubic group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
  />
);

const ProjectCard: React.FC<Props> = ({ project, index = 0 }) => {
  // Primary destination: the live demo when there is one, otherwise the source.
  const primaryHref = project.demoLink || project.link;
  const demoIsPrimary = Boolean(project.demoLink);

  const sourceButton = project.link && (
    <a
      key="source"
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={`${demoIsPrimary ? 'btn-ghost-paper' : 'btn-paper'} group/btn flex-1 sm:flex-none`}
    >
      <Github size={16} aria-hidden="true" />
      View Source
      {arrowIcon}
    </a>
  );

  const demoButton = project.demoLink !== undefined && (
    <a
      key="demo"
      href={project.demoLink || '#'}
      target={project.demoLink ? '_blank' : undefined}
      rel={project.demoLink ? 'noreferrer' : undefined}
      aria-disabled={!project.demoLink ? true : undefined}
      className={`${demoIsPrimary ? 'btn-paper' : 'btn-ghost-paper'} group/btn flex-1 sm:flex-none ${
        !project.demoLink ? 'cursor-not-allowed opacity-50' : ''
      }`}
      onClick={!project.demoLink ? (e) => e.preventDefault() : undefined}
    >
      Try It
      {arrowIcon}
    </a>
  );

  return (
    <div className={`navy-card ${STEPS[index % STEPS.length]} flex h-full flex-col p-7 md:p-8`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="eyebrow-num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="chip chip--on-navy tabular-nums">{project.year}</span>
        </div>
        {primaryHref && (
          <a
            href={primaryHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
            className="round-arrow"
          >
            <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        )}
      </div>

      <h3 className="mt-14 text-[1.875rem] font-semibold leading-[1] tracking-[-0.035em] text-paper md:mt-20 md:text-[2.25rem]">
        {project.title}
      </h3>

      <p className="mt-4 mb-8 flex-grow text-[0.9375rem] leading-[1.55] text-paper/75">{project.description}</p>

      <div className="mt-auto space-y-6">
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="chip chip--on-navy">
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2.5 border-t border-paper/10 pt-6">
          {/* Primary (filled paper) first, secondary (outline) second, on every card. */}
          {demoIsPrimary ? [demoButton, sourceButton] : [sourceButton, demoButton]}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
