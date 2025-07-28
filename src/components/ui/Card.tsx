// src/components/ui/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any specific props here if needed later
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  const baseStyles = 'rounded-lg shadow-md';
  const themeStyles = 'bg-card border border-border';

  return (
    <div
      className={`${baseStyles} ${themeStyles} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;