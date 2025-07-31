import React from 'react';

interface BadgeProps {
  /** The content to display inside the badge. */
  children: React.ReactNode;
  /** The color scheme of the badge. */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A component for displaying status indicators or labels.
 * It comes with several pre-defined color variants.
 */
const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  const variantClasses = {
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    success: 'bg-green-500/20 text-green-700 dark:text-green-400',
    danger: 'bg-red-500/20 text-red-700 dark:text-red-500',
    warning: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className || ''}`}
    >
      {children}
    </span>
  );
};

export default Badge;
