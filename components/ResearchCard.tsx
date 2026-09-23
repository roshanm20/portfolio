import React from 'react';
import { MapPin } from 'lucide-react';
import { Experience } from '../types';

const ResearchCard: React.FC<{ data: Experience }> = ({ data }) => {
  return (
    <div className="surface-card surface-card--hover flex h-full flex-col p-7 md:p-9">
      {/* Date chip sits above the title so the title can use the full width. */}
      <span className="chip self-start tabular-nums">{data.period.split('–')[0]}</span>
      <h3 className="mt-5 text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.025em] text-balance text-ink md:text-[1.75rem]">
        {data.role}
      </h3>
      <p className="mt-2 text-[0.9375rem] font-medium text-navy">{data.organization}</p>

      {data.advisors && (
        <p className="mt-4 text-[0.875rem] text-subtle">
          Advisors: <span className="text-muted">{data.advisors}</span>
        </p>
      )}

      <ul className="mt-7 mb-8 flex-grow space-y-3">
        {data.description.map((item, i) => (
          <li key={i} className="relative pl-6 text-[0.9375rem] leading-[1.6] text-muted md:text-base">
            <span aria-hidden="true" className="absolute left-0 top-[0.8em] h-px w-3 bg-navy/60" />
            {item}
          </li>
        ))}
      </ul>

      {data.skills && (
        <ul className="mt-auto flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <li key={skill} className="chip">
              {skill}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center border-t border-line pt-5">
        <span className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-subtle">
          <MapPin size={13} aria-hidden="true" />
          {data.location}
        </span>
      </div>
    </div>
  );
};

export default ResearchCard;
