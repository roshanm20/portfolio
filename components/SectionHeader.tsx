import React from 'react';

interface Props {
  title: string;
  number: string;
}

const SectionHeader: React.FC<Props> = ({ title, number }) => {
  return (
    <div className="flex items-baseline gap-4 mb-12 border-b border-nothing-gray pb-4">
      <span className="text-nothing-red font-mono text-sm tracking-widest">({number})</span>
      <h2 className="text-3xl md:text-4xl font-mono uppercase tracking-tight text-nothing-white">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;