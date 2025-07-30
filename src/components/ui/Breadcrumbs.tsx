// src/components/ui/Breadcrumbs.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // For routing capabilities

interface BreadcrumbItemProps {
  label: React.ReactNode; // Can be string or JSX
  to?: string; // Optional path for navigation (makes it a link)
  isCurrent?: boolean; // If this is the current, active page
  className?: string; // Additional classes for the individual item
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ label, to, isCurrent, className }) => {
  const baseStyles = 'inline-flex items-center text-sm font-medium';
  const themeStyles = isCurrent ? 'text-text' : 'text-primary hover:text-secondary'; // Current is text-color, others are primary/secondary
  const separatorStyles = 'ml-2 text-text-light'; // Separator color

  return (
    <li className={`${baseStyles} ${themeStyles} ${className || ''}`} aria-current={isCurrent ? 'page' : undefined}>
      {to && !isCurrent ? (
        <Link to={to} className="hover:underline">
          {label}
        </Link>
      ) : (
        <span>{label}</span>
      )}
      {!isCurrent && <span className={separatorStyles}>/</span>}
    </li>
  );
};

interface BreadcrumbsProps {
  children: React.ReactElement<BreadcrumbItemProps>[]; // Expects BreadcrumbItem children
  className?: string; // Class for the outer <nav> container
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