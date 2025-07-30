// src/components/ui/EmptyState.tsx
import React from 'react';
import Card from './Card'; // Reuse our Card component

interface EmptyStateProps {
  icon?: React.ReactNode; // Optional icon (e.g., SVG, emoji)
  title: string;
  description?: string;
  actionButton?: React.ReactNode; // Optional button (e.g., <Button> component)
  className?: string; // Additional styling for the outer container
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, actionButton, className }) => {
  return (
    <Card className={`p-8 text-center flex flex-col items-center justify-center space-y-4 ${className || ''}`}>
      {icon && (
        <div className="text-6xl text-text-light">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-semibold text-text">
        {title}
      </h3>
      {description && (
        <p className="text-text-light max-w-md">
          {description}
        </p>
      )}
      {actionButton && (
        <div className="mt-4">
          {actionButton}
        </div>
      )}
    </Card>
  );
};

export default EmptyState;