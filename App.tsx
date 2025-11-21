import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';
import ResearchCard from './components/ResearchCard';
import ProjectCard from './components/ProjectCard';
import BentoGrid from './components/BentoGrid';
import Achievements from './components/Achievements';
import IntroAnimation from './components/IntroAnimation';
import ChatWidget from './components/ChatWidget';
import { RESEARCH_EXPERIENCE, WORK_EXPERIENCE, PROJECTS, WORKSHOPS, POSITIONS, PERSONAL_INFO } from './constants';
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Lock scroll during intro
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showIntro]);

  return (
    <div className="bg-nothing-black min-h-screen text-nothing-white selection:bg-nothing-red selection:text-white pb-20 relative overflow-x-hidden">
      
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* Stars Background */}
      <div className="stars-container">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
      </div>

      <Nav />
      
      <Hero />

      <BentoGrid />

      {/* Research Section - Priority 1 */}
      <section id="research" className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader title="Research Experience" number="01" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_EXPERIENCE.map((exp) => (
            <ResearchCard key={exp.id} data={exp} />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-6 border-t border-nothing-gray dotted-bg relative z-10">
        <SectionHeader title="AI x Astronomy" number="02" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 bg-nothing-dark border-y border-nothing-gray relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Entrepreneurship & Teaching" number="03" />
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
                  <h3 className="text-xl text-nothing-red font-mono mb-3 uppercase tracking-wide">{exp.role}</h3>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-nothing-light flex items-start gap-2">
                        <span className="text-nothing-red mt-1.5 w-1 h-1 bg-nothing-red shrink-0" /> 
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
      
      {/* Workshops & Conferences */}
      <section className="py-20 max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader title="Conferences & Workshops" number="04" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKSHOPS.map((ws) => (
            <div key={ws.id} className="border border-nothing-gray p-6 hover:bg-nothing-gray/10 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-nothing-white group-hover:text-nothing-red transition-colors">{ws.title}</h4>
                 <span className="text-xs font-mono text-nothing-gray border border-nothing-gray px-2 py-0.5">{ws.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-nothing-light mb-3">
                <MapPin size={12} /> {ws.location}
                {ws.role && <span className="text-nothing-red">• {ws.role}</span>}
              </div>
              {ws.details && (
                <ul className="mt-3 space-y-1">
                  {ws.details.map((d, i) => (
                    <li key={i} className="text-xs text-nothing-gray flex items-start gap-2">
                       <span className="text-nothing-gray">-</span> {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Positions & Leadership */}
      <section className="py-20 bg-nothing-dark border-y border-nothing-gray relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title="Leadership & Service" number="05" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {POSITIONS.map((pos) => (
               <div key={pos.id} className="flex flex-col gap-1">
                 <h4 className="text-nothing-white font-mono text-sm font-bold">{pos.role}</h4>
                 <p className="text-nothing-light text-xs">{pos.organization}</p>
                 <p className="text-nothing-gray text-[10px] font-mono">{pos.period}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Achievement Section with Scrolling Animation */}
      <Achievements />

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
          LET'S <span className="text-nothing-red">CONNECT</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-3 bg-nothing-white text-nothing-black px-8 py-4 font-mono font-bold hover:bg-nothing-red hover:text-white transition-colors w-full md:w-auto justify-center"
          >
            <Mail size={20} />
            EMAIL ME
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
          DESIGNED WITH REACT & TAILWIND. NOTHING OS INSPIRED.
        </p>
      </footer>

      {/* Chatbot Widget */}
      {!showIntro && <ChatWidget />}
    </div>
  );
};

export default App;