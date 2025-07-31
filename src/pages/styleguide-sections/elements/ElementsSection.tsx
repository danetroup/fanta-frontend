import React from 'react';
import Card from '../../../components/ui/Card';
import Avatar from '../../../components/ui/Avatar';
import Badge from '../../../components/ui/Badge';

/**
 * A style guide section for small, atomic UI elements like Avatars and Badges.
 */
const ElementsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-text">UI Elements</h2>
      <p className="text-text-light">
        These are small, atomic components that can be composed to build more complex UI patterns.
      </p>

      {/* Avatars */}
      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Avatars</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name="Dane Troup" size="sm" />
          <Avatar name="Jane Doe" size="md" />
          <Avatar name="John Smith" size="lg" />
          <Avatar name="Fanta Frontend" src="https://github.com/danetroup.png" size="lg" />
        </div>
      </Card>

      {/* Badges */}
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
    </div>
  );
};

export default ElementsSection;
