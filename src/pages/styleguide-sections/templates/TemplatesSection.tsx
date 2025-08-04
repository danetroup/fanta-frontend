import React from 'react';

// UI Components
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/ui/Icon';

// Template Components
import PageHeader from '../../../components/templates/PageHeader';
import SectionHeader from '../../../components/templates/SectionHeader';
import ActionBar from '../../../components/templates/ActionBar';

/**
 * A style guide section dedicated to showcasing full-page layout templates
 * and common structural patterns.
 */
const TemplatesSection: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold text-text">Page & Layout Templates</h2>
      <p className="text-text-light">
        Combine these high-level components to quickly build consistent and professional page layouts. These templates demonstrate common patterns for forms, detail pages, and more.
      </p>

      {/* Page Layout Example */}
      <Card id="template-header" className="scroll-mt-20" padding="p-0">
        <div className="p-6">
          <PageHeader
            title="Standard Page Template"
            description="A standard page layout with a header, content sections, and an action bar."
            actions={
              <Button variant="primary" iconBefore={<Icon name="plus" size={16} />}>
                Add New Item
              </Button>
            }
          />
        </div>
        <div className="p-6 space-y-4">
          <SectionHeader title="User Details" />
          <p className="text-text-light">This is the main content area for a section. You can place forms, tables, or any other content here.</p>
          <Input type="text" placeholder="Example Input" />
        </div>
        <div className="p-6 space-y-4">
          <SectionHeader title="Billing Information" />
          <p className="text-text-light">Another content section to demonstrate structure.</p>
          <Input type="text" placeholder="Credit Card Number" />
        </div>
        <ActionBar>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" iconBefore={<Icon name="save" size={16} />}>
            Save Changes
          </Button>
        </ActionBar>
      </Card>

      {/* NEW Responsive Layout Example */}
      <Card id="template-responive" className="scroll-mt-20" padding="p-0">
        <div className="p-6">
            <PageHeader
                title="Responsive Two-Column Template"
                description="This layout features a sidebar that stacks on mobile screens. Try resizing your browser!"
            />
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area (takes up 2/3 of the width on large screens) */}
                <main className="lg:col-span-2 space-y-6">
                    <SectionHeader title="Main Content" />
                    <Card padding="p-4">
                        <p className="text-text">This is the primary content area. On large screens, it takes up two-thirds of the available space.</p>
                    </Card>
                    <Card padding="p-4">
                        <p className="text-text">You can place multiple content cards here.</p>
                    </Card>
                </main>

                {/* Sidebar (takes up 1/3 of the width on large screens) */}
                <aside className="space-y-6">
                    <SectionHeader title="Sidebar" />
                    <Card padding="p-4">
                        <h4 className="font-semibold text-text mb-2">Metadata</h4>
                        <p className="text-text-light text-sm">This sidebar stacks on top of the main content on screens smaller than the 'lg' breakpoint (1024px).</p>
                    </Card>
                    <Card padding="p-4">
                        <h4 className="font-semibold text-text mb-2">Actions</h4>
                        <Button variant="outline" fullWidth>Export Data</Button>
                    </Card>
                </aside>
            </div>
        </div>
      </Card>

    </div>
  );
};

export default TemplatesSection;
