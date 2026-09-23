import React from 'react';

/**
 * Fixed bottom progressive blur strip (6 stacked backdrop-filter layers).
 * Purely decorative: pointer-events none, hidden at 480–767px (see .pblur in index.css).
 */
const ProgressiveBlur: React.FC = () => (
  <div className="pblur" aria-hidden="true">
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
  </div>
);

export default ProgressiveBlur;
