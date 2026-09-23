import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';
import ResearchCard from './components/ResearchCard';
import ProjectCard from './components/ProjectCard';
import BentoGrid from './components/BentoGrid';
import Achievements from './components/Achievements';
import ChatWidget from './components/ChatWidget';
import { RESEARCH_EXPERIENCE, WORK_EXPERIENCE, PROJECTS, POSITIONS, PRINCIPLES, PERSONAL_INFO } from './constants';
import { Mail, Linkedin, Github, MapPin, ArrowUpRight, Download } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="bg-nothing-black min-h-screen text-nothing-white selection:bg-nothing-red selection:text-white pb-20 relative overflow-x-hidden">

      {/* Stars Background */}
      <div className="stars-container">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
      </div>

      <Nav />

      <Hero />

      {/* Experience */}
      <section id="experience" className="py-20 bg-nothing-dark border-y border-nothing-gray relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Experience" number="01" />
          <div className="space-y-12">
            {WORK_EXPERIENCE.map((exp) => (
              <div key={exp.id} className="flex flex-col md:flex-row md:items-start gap-6 border-l border-nothing-gray pl-6 md:pl-0 md:border-l-0">
                <div className="md:w-1/4 md:text-right md:pr-8 md:border-r border-nothing-gray">
                  <h4 className="font-bold text-nothing-white text-lg">
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noreferrer" className="hover:text-nothing-red transition-colors flex items-center justify-start md:justify-end gap-2 group">
                        {exp.organization}
                        <ArrowUpRight size={14} className="text-nothing-gray group-hover:text-nothing-red" />
                      </a>
                    ) : (
                      exp.organization
                    )}
                  </h4>
                  <p className="font-mono text-xs text-nothing-gray mt-1">{exp.period}</p>
                  <p className="font-mono text-xs text-nothing-light mt-1 flex items-center md:justify-end gap-1">
                    <MapPin size={10} /> {exp.location}
                  </p>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-lg md:text-xl text-nothing-red font-mono mb-3 uppercase tracking-wide">{exp.role}</h3>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-nothing-light leading-relaxed flex items-start gap-2">
                        <span className="text-nothing-red mt-2 w-1 h-1 bg-nothing-red shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section id="approach" className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader title="How I Work" number="02" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map((p, i) => (
            <div key={p.id} className="border border-nothing-gray p-6 hover:border-nothing-red transition-colors group">
              <span className="font-mono text-xs text-nothing-red">0{i + 1}</span>
              <h4 className="font-bold text-nothing-white mt-3 mb-2 group-hover:text-nothing-red transition-colors">{p.title}</h4>
              <p className="text-sm text-nothing-light leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-20 bg-nothing-dark border-y border-nothing-gray relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Leadership" number="03" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POSITIONS.map((pos) => (
              <div key={pos.id} className="border-l-2 border-nothing-red pl-5">
                <div className="flex justify-between items-baseline gap-4">
                  <h4 className="text-nothing-white font-mono text-sm md:text-base font-bold">{pos.role}</h4>
                  <span className="text-nothing-gray text-[10px] font-mono shrink-0">{pos.period}</span>
                </div>
                <p className="text-nothing-light text-xs font-mono mt-1">{pos.organization}</p>
                {pos.detail && <p className="text-sm text-nothing-light mt-2 leading-relaxed">{pos.detail}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <BentoGrid />

      {/* Projects */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-6 border-t border-nothing-gray relative z-10">
        <SectionHeader title="Things I've Built" number="05" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-20 max-w-6xl mx-auto px-6 border-t border-nothing-gray dotted-bg relative z-10">
        <SectionHeader title="Research Background" number="06" />
        <p className="text-sm text-nothing-light max-w-3xl mb-10 leading-relaxed">
          Before AI data work I trained as a physicist. The habits carried over: build the pipeline once, benchmark it honestly, and do not trust a result until it holds up across every case.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_EXPERIENCE.map((exp) => (
            <ResearchCard key={exp.id} data={exp} />
          ))}
        </div>
      </section>

      {/* Achievements */}
      <Achievements />

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          LET'S <span className="text-nothing-red">TALK</span>
        </h2>
        <p className="text-nothing-light text-sm md:text-base mb-10 max-w-xl mx-auto">
          Open to Strategic Projects, AI data operations and evaluation program roles. Happy to relocate, including to New York.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-3 bg-nothing-white text-nothing-black px-8 py-4 font-mono font-bold hover:bg-nothing-red hover:text-white transition-colors w-full md:w-auto justify-center"
          >
            <Mail size={20} />
            EMAIL ME
          </a>
          <a
            href={PERSONAL_INFO.cv}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-nothing-gray text-nothing-white px-8 py-4 font-mono font-bold hover:border-nothing-white transition-colors w-full md:w-auto justify-center"
          >
            <Download size={20} />
            CV
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-nothing-gray text-nothing-white px-8 py-4 font-mono font-bold hover:border-nothing-white transition-colors w-full md:w-auto justify-center"
          >
            <Linkedin size={20} />
            LINKEDIN
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-nothing-gray text-nothing-white px-8 py-4 font-mono font-bold hover:border-nothing-white transition-colors w-full md:w-auto justify-center"
          >
            <Github size={20} />
            GITHUB
          </a>
        </div>
        <p className="font-mono text-nothing-gray text-xs">
          BUILT WITH REACT & TAILWIND. NOTHING OS INSPIRED.
        </p>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
