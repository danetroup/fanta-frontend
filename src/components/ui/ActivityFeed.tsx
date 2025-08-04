import React from 'react';
import Card from './Card';

// --- Helper Function ---
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};

// --- Data Structure ---
interface ActivityItemData {
  id: number;
  author: string;
  action: string;
  timestamp: Date;
}

// --- Sub-Component for each item in the feed ---
const ActivityItem: React.FC<{ item: ActivityItemData; isLast: boolean }> = ({ item, isLast }) => {
  return (
    <div className="flex gap-4">
      {/* Vertical timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 h-3 w-3 rounded-full bg-border" />
        {!isLast && <div className="absolute top-3 left-1/2 h-full w-px bg-border -translate-x-1/2" />}
      </div>

      {/* Content */}
      <div className="flex-grow pb-8">
        <p className="text-sm text-muted-foreground">
          {formatRelativeTime(item.timestamp)} by <span className="font-medium text-text">{item.author}</span>
        </p>
        <p className="text-sm mt-1 font-semibold text-text">{item.action}</p>
      </div>
    </div>
  );
};

// --- Main ActivityFeed Component (UPDATED) ---

// Define the props the component will accept
interface ActivityFeedProps {
  items: ActivityItemData[];
  title: string;
}

/**
 * @wizard
 * @name ActivityFeed
 * @description Displays a chronological list of recent activities or changes, typically with a timeline indicator.
 * @tags templates, patterns, feed, timeline, data-display
 * @category templates-patterns
 */
// Update the component to receive and use props
const ActivityFeed: React.FC<ActivityFeedProps> = ({ items, title }) => {
  return (
    <Card padding="p-6">
      <h3 className="text-xl font-bold text-text mb-4">{title}</h3>
      <div>
        {/* Use the 'items' prop instead of the hardcoded mock data */}
        {items.map((item, index) => (
          <ActivityItem 
            key={item.id} 
            item={item} 
            isLast={index === items.length - 1}
          />
        ))}
      </div>
      <a href="#" className="text-sm font-semibold text-primary hover:underline">
        View changelog →
      </a>
    </Card>
  );
};

export default ActivityFeed;