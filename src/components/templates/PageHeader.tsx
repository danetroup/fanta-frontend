import React from 'react';

interface PageHeaderProps {
  /** The main title of the page. */
  title: string;
  /** A brief description or subtitle displayed below the title. */
  description?: string;
  /** A slot for action buttons or other controls, typically aligned to the right. */
  actions?: React.ReactNode;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A component for displaying the main header of a page.
 * It includes a title, an optional description, and a slot for action buttons.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions, className }) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-b border-border ${className || ''}`}>
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-text">{title}</h1>
        {description && <p className="mt-1 text-text-light">{description}</p>}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
};

export default PageHeader;
