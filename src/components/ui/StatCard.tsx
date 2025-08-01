import React from 'react';
import Card from './Card';
import Icon from './Icon';
import Badge from './Badge';

interface StatCardProps {
  /** The title of the metric (e.g., 'Sales', 'Users'). */
  title: string;
  /** The main value of the metric. */
  value: string;
  /** The icon to display in the header of the card. */
  icon: React.ComponentProps<typeof Icon>['name'];
  /** Information about the change in the metric (e.g., 'Since last week'). */
  changeText?: string;
  /** The direction of the change, used to color the badge. */
  changeDirection?: 'positive' | 'negative';
  /** A description or footer text for the card. */
  footerText?: string;
  /** Optional additional CSS classes for the container. */
  className?: string;
}

/**
 * A specialized card for displaying a key statistic or metric.
 * It includes a title, a primary value, an icon, and an optional change indicator.
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  changeText,
  changeDirection,
  footerText,
  className,
}) => {
  const badgeVariant = changeDirection === 'positive' ? 'success' : 'danger';

  return (
    <Card padding="p-4" className={`flex flex-col ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center text-text-light mb-2">
        <Icon name={icon} size={16} className="mr-2" />
        <span className="text-sm font-medium">{title}</span>
      </div>

      {/* Body */}
      <div className="flex-grow">
        <p className="text-3xl font-bold text-text">{value}</p>
        {changeText && (
          <div className="flex items-center mt-1 text-sm">
            <Badge variant={badgeVariant}>{changeDirection === 'positive' ? '↑' : '↓'}</Badge>
            <span className="ml-2 text-text-light">{changeText}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      {footerText && (
        <div className="mt-4 pt-2 border-t border-border">
          <p className="text-xs text-text-light">{footerText}</p>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
