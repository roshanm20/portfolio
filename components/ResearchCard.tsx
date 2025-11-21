import React from 'react';
import { Experience } from '../types';

const ResearchCard: React.FC<{ data: Experience }> = ({ data }) => {
  return (
    <div className="group relative border border-nothing-gray bg-nothing-dark hover:border-nothing-white transition-colors duration-300 p-6 md:p-8 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-nothing-white group-hover:text-nothing-red transition-colors">
            {data.role}
          </h3>
          <p className="text-nothing-light font-mono text-sm mt-1">{data.organization}</p>
        </div>
        <span className="font-mono text-xs text-nothing-gray border border-nothing-gray px-2 py-1">
          {data.period.split('–')[0]}
        </span>
      </div>
      
      {data.advisors && (
        <p className="font-mono text-xs text-nothing-gray mb-4">
          Advisors: <span className="text-nothing-light">{data.advisors}</span>
        </p>
      )}

      <ul className="flex-grow space-y-2 mb-6">
        {data.description.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-nothing-light leading-relaxed">
            <span className="mt-1.5 w-1 h-1 bg-nothing-red shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      
      {data.skills && (
        <div className="mt-auto pt-4 border-t border-nothing-gray/30">
            <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                    <span key={skill} className="text-[10px] font-mono uppercase border border-nothing-gray/50 px-2 py-0.5 text-nothing-gray group-hover:border-nothing-red/50 group-hover:text-nothing-light transition-colors">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
      )}

      <div className="pt-4 mt-4 flex justify-between items-center">
        <span className="font-mono text-xs text-nothing-gray uppercase">{data.location}</span>
        <div className="w-2 h-2 bg-nothing-gray group-hover:bg-nothing-red transition-colors" />
      </div>
    </div>
  );
};

export default ResearchCard;