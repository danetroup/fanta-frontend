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
/**
 * @wizard
 * @name StatCard
 * @description A specialized card for prominently displaying a key statistic or metric, including an icon and optional trend indicator.
 * @tags templates, data-display, metrics, dashboard, ui
 * @props
 * - name: title
 * type: string
 * description: The label or title for the displayed metric (e.g., 'Total Sales', 'New Users').
 * - name: value
 * type: string
 * description: The main numerical or formatted value of the statistic.
 * - name: icon
 * type: React.ComponentProps<typeof Icon>['name']
 * description: The name of a Lucide icon to visually represent the metric.
 * - name: changeText
 * type: string
 * description: Text describing the change in the metric (e.g., '10% since last month').
 * - name: changeDirection
 * type: 'positive' | 'negative'
 * description: The direction of change, which determines the color of the associated badge.
 * - name: footerText
 * type: string
 * description: Optional additional text displayed at the bottom of the card, often for context.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the card container.
 * @category templates-patterns
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
