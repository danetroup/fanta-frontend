// src/data/mockActivity.ts
export interface ActivityItemData {
  id: number;
  author: string;
  action: string;
  timestamp: Date;
}

export const mockActivityFeed: ActivityItemData[] = [
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
  // ... expand
];