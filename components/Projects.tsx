import React from 'react';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { Reveal } from './Reveal';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative section-y gutter">
      <div className="container-x">
        <SectionHeader title="Things I've Built" number="05" />
        {/* Each card reveals on its own so long stacks on mobile animate as they arrive. */}
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} as="li" kind="card" delay={(i % 3) * 0.09}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
