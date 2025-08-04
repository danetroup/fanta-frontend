import React from 'react';
import { Link } from 'react-router-dom'; // For routing capabilities

interface BreadcrumbItemProps {
  label: React.ReactNode; // Can be string or JSX
  to?: string; // Optional path for navigation (makes it a link)
  isCurrent?: boolean; // If this is the current, active page
  className?: string; // Additional classes for the individual item
  icon?: React.ReactNode; // <-- New optional icon prop
}

/**
 * @wizard
 * @name BreadcrumbItem
 * @description Represents a single step or link within a `Breadcrumbs` navigation path.
 * @tags navigation, ui, link
 * @props
 * - name: label
 * type: React.ReactNode
 * description: The text or content displayed for this breadcrumb item.
 * - name: to
 * type: string
 * description: The URL path for this item to navigate to. If not provided, it's just text.
 * - name: isCurrent
 * type: boolean
 * description: If true, indicates this is the current page and will not be a clickable link.
 * - name: icon
 * type: React.ReactNode
 * description: An optional icon to display next to the breadcrumb label.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the individual item.
 * @category navigation
 */

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

/**
 * @wizard
 * @name Breadcrumbs
 * @description A navigation component that shows the user's current location within a hierarchy of pages.
 * @tags navigation, ui, path
 * @props
 * - name: children
 * type: React.ReactElement<BreadcrumbItemProps>[]
 * description: A collection of `BreadcrumbItem` components representing the path.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the breadcrumbs container.
 * @category navigation
 */

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