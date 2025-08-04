import React from 'react';
import Icon from './Icon';

interface AlertProps {
  /** The title of the alert message. */
  title: string;
  /** The main content/description of the alert. */
  children?: React.ReactNode;
  /** The color scheme and icon of the alert. */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Optional additional CSS classes. */
  className?: string;
}

const variantConfig = {
  info: {
    icon: 'info' as const,
    classes: 'bg-primary/10 border-primary/50 text-primary',
  },
  success: {
    icon: 'check-circle' as const,
    classes: 'bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400',
  },
  warning: {
    icon: 'alert-triangle' as const,
    classes: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-700 dark:text-yellow-400',
  },
  danger: {
    icon: 'x-circle' as const,
    classes: 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-500',
  },
};

/**
 * A component for displaying static, in-page alert messages.
 * It's ideal for showing important information like success states, warnings, or errors.
 */
/**
 * @wizard
 * @name Alert
 * @description Displays static, in-page messages to convey important information like success, warnings, or errors.
 * @tags feedback, message, notification, ui
 * @props
 * - name: title
 * type: string
 * description: The main heading or concise summary of the alert message.
 * - name: children
 * type: React.ReactNode
 * description: Optional additional content or a longer description for the alert.
 * - name: variant
 * type: 'info' | 'success' | 'warning' | 'danger'
 * description: Defines the color scheme, icon, and semantic meaning of the alert.
 * default: 'info'
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the alert container.
 * @category feedback
 */
const Alert: React.FC<AlertProps> = ({ title, children, variant = 'info', className }) => {
  const config = variantConfig[variant];

  return (
    <div className={`flex items-start gap-4 p-4 border-l-4 rounded-r-lg ${config.classes} ${className || ''}`} role="alert">
      <div className="flex-shrink-0">
        <Icon name={config.icon} size={20} />
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold">{title}</h4>
        {children && <div className="text-sm mt-1">{children}</div>}
      </div>
    </div>
  );
};

export default Alert;
