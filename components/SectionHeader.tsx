import React from 'react';
import { RevealGroup, RevealItem } from './Reveal';

interface Props {
  title: string;
  number: string;
}

const SectionHeader: React.FC<Props> = ({ title, number }) => {
  return (
    <RevealGroup as="header" className="mb-12 md:mb-16">
      <RevealItem as="span" className="eyebrow-num mb-4 block w-fit md:mb-5">
        {number}
      </RevealItem>
      <RevealItem as="h2" className="section-title w-fit text-balance">
        {title}
      </RevealItem>
    </RevealGroup>
  );
};

export default SectionHeader;
