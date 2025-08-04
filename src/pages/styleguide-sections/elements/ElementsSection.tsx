import React, { useState, memo } from 'react';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import StatCard from '../../../components/ui/StatCard';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';
import ActivityFeed from '../../../components/ui/ActivityFeed'; // <-- New import

// --- Mock Data for ActivityFeed ---
const mockActivity = [
  { 
    id: 1, 
    author: 'Olivia Rhye', 
    action: 'Upcoming deprecation of GPU machine type',
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000) // 20 hours ago
  },
  { 
    id: 2, 
    author: 'Phoenix Baker', 
    action: 'Update on GitHub Copilot consumptive billing',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // Yesterday
  },
  { 
    id: 3, 
    author: 'Lana Steiner', 
    action: 'GitHub Actions: New APIs and windows-latest migration',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
];

// Memoize the sections that don't need to re-render.
const AvatarsSection = memo(() => (
  <Card id="elements-avatars" className="scroll-mt-20" padding="p-6">
    <h3 className="text-2xl font-semibold mb-4 text-text">Avatars</h3>
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name="Dane Troup" size="sm" />
      <Avatar name="Jane Doe" size="md" />
      <Avatar name="John Smith" size="lg" />
      <Avatar name="Fanta Frontend" src="https://github.com/danetroup.png" size="lg" />
    </div>
  </Card>
));

const BadgesSection = memo(() => (
  <Card id="elements-badges" className="scroll-mt-20" padding="p-6">
    <h3 className="text-2xl font-semibold mb-4 text-text">Badges</h3>
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  </Card>
));

const StatCardsSection = memo(() => (
  <Card id="elements-stats" className="scroll-mt-20" padding="p-6">
    <h3 className="text-2xl font-semibold mb-4 text-text">Stat Cards</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Sales"
        value="$12,345"
        icon="dollar-sign"
        changeText="+5.2% since last week"
        changeDirection="positive"
        footerText="Aggregated by day"
      />
      <StatCard
        title="New Users"
        value="1,234"
        icon="users"
        changeText="-1.8% since last month"
        changeDirection="negative"
      />
      <StatCard
        title="Open Tickets"
        value="56"
        icon="inbox"
      />
    </div>
  </Card>
));

// --- New Activity Feed Section ---
const ActivityFeedSection = memo(() => (
  <Card id="elements-activity" className="scroll-mt-20" padding="p-6">
    <h3 className="text-2xl font-semibold mb-4 text-text">Activity Feed</h3>
    <p className="text-muted-foreground mb-6">
      Displays a chronological list of events or changes.
    </p>
    <div className="max-w-md">
      <ActivityFeed items={mockActivity} title="Latest Changes" />
    </div>
  </Card>
));


/**
 * A style guide section for small, atomic UI elements like Avatars, Badges, and Stat Cards.
 */
const ElementsSection: React.FC = () => {
  const [isToggled, setIsToggled] = useState(true);

  return (
   <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold text-text">UI Elements</h2>
      <p className="text-muted-foreground">
        These are small, atomic components that can be composed to build more complex UI patterns.
      </p>

      <AvatarsSection />
      <BadgesSection />
      <StatCardsSection />
      <ActivityFeedSection /> {/* <-- New section added here */}

      {/* Toggle Switches Section - This is the only part that will re-render on toggle */}
      <Card id="elements-toggle" className="scroll-mt-20" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Toggle Switches</h3>
        <div className="flex flex-col space-y-4">
          <ToggleSwitch
            label="Enable Notifications"
            checked={isToggled}
            onChange={setIsToggled}
          />
          <ToggleSwitch
            label="Marketing Emails"
            checked={false}
            onChange={() => {}}
          />
          <ToggleSwitch
            label="Disabled Toggle"
            checked={false}
            onChange={() => {}}
            disabled
          />
        </div>
      </Card>
    </div>
  );
};

export default ElementsSection;