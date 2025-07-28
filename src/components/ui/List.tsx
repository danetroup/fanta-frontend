// src/components/ui/List.tsx
import React from 'react';

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  // Add any specific props if needed
}

const ListItem: React.FC<ListItemProps> = ({ children, className, ...props }) => {
  const baseStyles = 'mb-1 last:mb-0';
  const themeStyles = 'text-text';
  return (
    <li className={`${baseStyles} ${themeStyles} ${className || ''}`} {...props}>
      {children}
    </li>
  );
};

interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  type?: 'ul' | 'ol'; // 'ul' for unordered, 'ol' for ordered
  children: React.ReactNode;
}

const List: React.FC<ListProps> = ({ type = 'ul', children, className, ...props }) => {
  const baseStyles = 'space-y-1'; // Tailwind class for spacing between list items
  const themeStyles = 'text-text'; // General text color, ListItem handles its own
  const listTag = type === 'ol' ? 'ol' : 'ul';

  return React.createElement(
    listTag,
    { className: `${baseStyles} ${themeStyles} ${className || ''}`, ...props },
    children
  );
};

interface DefinitionTermProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const DefinitionTerm: React.FC<DefinitionTermProps> = ({ children, className, ...props }) => {
  const baseStyles = 'font-semibold text-text';
  return (
    <dt className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </dt>
  );
};

interface DefinitionDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const DefinitionDescription: React.FC<DefinitionDescriptionProps> = ({ children, className, ...props }) => {
  const baseStyles = 'ml-4 text-text'; // Indent description
  return (
    <dd className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </dd>
  );
};

interface DefinitionListProps extends React.HTMLAttributes<HTMLDListElement> {
  children: React.ReactNode;
}

const DefinitionList: React.FC<DefinitionListProps> = ({ children, className, ...props }) => {
  const baseStyles = 'space-y-2'; // Spacing between term/description pairs
  return (
    <dl className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </dl>
  );
};


export { List, ListItem, DefinitionList, DefinitionTerm, DefinitionDescription };