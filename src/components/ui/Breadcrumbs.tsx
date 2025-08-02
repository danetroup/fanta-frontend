import React from 'react';
import { Link } from 'react-router-dom'; // For routing capabilities

interface BreadcrumbItemProps {
  label: React.ReactNode; // Can be string or JSX
  to?: string; // Optional path for navigation (makes it a link)
  isCurrent?: boolean; // If this is the current, active page
  className?: string; // Additional classes for the individual item
  icon?: React.ReactNode; // <-- New optional icon prop
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ label, to, isCurrent, className, icon }) => { // <-- Destructure icon
  const baseStyles = 'inline-flex items-center text-sm font-medium';
  const themeStyles = isCurrent ? 'text-text' : 'text-primary hover:text-secondary';
  const separatorStyles = 'ml-2 text-muted-foreground'; // Changed to muted-foreground for better contrast

  const content = (
    <>
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>} {/* <-- Render icon */}
      {label}
    </>
  );

  return (
    <li className={`${baseStyles} ${themeStyles} ${className || ''}`} aria-current={isCurrent ? 'page' : undefined}>
      {to && !isCurrent ? (
        <Link to={to} className="inline-flex items-center hover:underline">
          {content}
        </Link>
      ) : (
        <span className="inline-flex items-center">{content}</span>
      )}
      {!isCurrent && <span className={separatorStyles}>/</span>}
    </li>
  );
};

interface BreadcrumbsProps {
  children: React.ReactElement<BreadcrumbItemProps>[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children, className }) => {
  return (
    <nav className={`flex ${className || ''}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {children}
      </ol>
    </nav>
  );
};

export { Breadcrumbs, BreadcrumbItem };