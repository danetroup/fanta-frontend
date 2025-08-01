import React, { useState, memo } from 'react';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';
import StatCard from '../../../components/ui/StatCard';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';

// Memoize the sections that don't need to re-render when the toggle state changes.
// This prevents the lazy-loaded icons inside StatCard from flickering.

const AvatarsSection = memo(() => (
  <Card padding="p-6">
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
  <Card padding="p-6">
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
  <Card padding="p-6">
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

/**
 * A style guide section for small, atomic UI elements like Avatars, Badges, and Stat Cards.
 */
const ElementsSection: React.FC = () => {
  const [isToggled, setIsToggled] = useState(true);

  return (
   <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold text-text">UI Elements</h2>
      <p className="text-text-light">
        These are small, atomic components that can be composed to build more complex UI patterns.
      </p>

      <AvatarsSection />
      <BadgesSection />
      <StatCardsSection />

      {/* Toggle Switches Section - This is the only part that will re-render on toggle */}
      <Card padding="p-6">
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
