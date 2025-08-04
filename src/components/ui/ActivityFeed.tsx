import React from 'react';
import Card from './Card'; // Assuming path to your Card component

// --- Helper Function ---
// A simple function to format dates into relative time strings.
// For a production app, a library like `date-fns` is recommended.
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

// --- Data Structure & Mock Data ---
interface ActivityItemData {
  id: number;
  author: string;
  action: string;
  timestamp: Date;
}

// Replace this with your actual data
const mockActivity: ActivityItemData[] = [
  { 
    id: 1, 
    author: 'Olivia Rhye', 
    action: 'Upcoming deprecation of GPU machine type in...',
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000) // 20 hours ago
  },
  { 
    id: 2, 
    author: 'Phoenix Baker', 
    action: 'Update on GitHub Copilot consumptive billing for...',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // Yesterday
  },
  { 
    id: 3, 
    author: 'Lana Steiner', 
    action: 'GitHub Actions: New APIs and windows-latest migrati...',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  { 
    id: 4, 
    author: 'Drew Cano', 
    action: 'Copilot Chat unlocks new repository management skills',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
];


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


// --- Main ActivityFeed Component ---
/**
 * @wizard
 * @name ActivityFeed
 * @description Displays a chronological list of recent activities or changes, typically with a timeline indicator.
 * @tags templates, patterns, feed, timeline, data-display
 * @category templates-patterns
 */
const ActivityFeed: React.FC = () => {
  return (
    <Card padding="p-6">
      <h3 className="text-l font-bold text-text mb-4">Latest changes</h3>
      <div>
        {mockActivity.map((item, index) => (
          <ActivityItem 
            key={item.id} 
            item={item} 
            isLast={index === mockActivity.length - 1}
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