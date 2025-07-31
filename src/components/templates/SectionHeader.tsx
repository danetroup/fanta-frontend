import React from 'react';

interface SectionHeaderProps {
  /** The title of the content section. */
  title: string;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A simple header for a section of content within a page.
 * It provides a consistent visual style for section titles.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className }) => {
  return (
    <div className={`pb-2 border-b border-border ${className || ''}`}>
      <h2 className="text-xl font-semibold text-text">{title}</h2>
    </div>
  );
};

export default SectionHeader;
