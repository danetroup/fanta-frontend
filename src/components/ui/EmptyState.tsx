import React from 'react';
import Card from './Card';
import Icon from './Icon'; // Import the Icon component

interface EmptyStateProps {
  /** The name of the Lucide icon to display. */
  icon?: React.ComponentProps<typeof Icon>['name'];
  /** The main title for the empty state. */
  title: string;
  /** A longer description of the empty state. */
  description?: string;
  /** An optional action button. */
  actionButton?: React.ReactNode;
  /** Additional styling for the outer container. */
  className?: string;
}

/**
 * A component for displaying an empty state message. It's used when there is no
 * data to show, such as in an empty table or after a search with no results.
 */
const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, actionButton, className }) => {
  return (
    <Card className={`p-8 text-center flex flex-col items-center justify-center space-y-4 ${className || ''}`}>
      {icon && (
        <div className="text-text-light/50 mb-4">
          <Icon name={icon} size={64} strokeWidth={1.5} />
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
