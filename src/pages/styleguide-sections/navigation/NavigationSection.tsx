// src/pages/styleguide-sections/navigation/NavigationSection.tsx
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Tabs, TabPanel } from '../../../components/ui/Tabs';
import { Menu, MenuItem } from '../../../components/ui/Menu';
import { Breadcrumbs, BreadcrumbItem } from '../../../components/ui/Breadcrumbs'; // <--- ADD THIS IMPORT

const NavigationSection: React.FC = () => {
  const handleMenuItemClick = (item: string) => {
    alert(`Menu Item Clicked: ${item}`);
  };

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Navigation Components</h2>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Tabs</h3>
      <Tabs defaultActiveTab="tab1">
        <TabPanel id="tab1" label="Tab One">
          <p className="text-text">Content for Tab One. This is where the first tab's information will go.</p>
          <Input type="text" placeholder="Tab 1 Input" className="mt-4" />
        </TabPanel>
        <TabPanel id="tab2" label="Tab Two">
          <p className="text-text">Content for Tab Two. This is different content.</p>
          <Button variant="primary" className="mt-4">Tab 2 Button</Button>
        </TabPanel>
        <TabPanel id="tab3" label="Tab Three">
          <p className="text-text">Content for Tab Three. Can be anything!</p>
        </TabPanel>
      </Tabs>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Menus</h3>
      <div className="flex flex-wrap items-center gap-8">
        <Menu
          trigger={<Button variant="primary">Open Menu (Right)</Button>}
          position="bottom-right"
        >
          <MenuItem onClick={() => handleMenuItemClick('Item 1')}>Menu Item 1</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Item 2')}>Menu Item 2</MenuItem>
          <MenuItem disabled>Disabled Item</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Item 3')}>Menu Item 3</MenuItem>
        </Menu>
        <Menu
          trigger={<Button variant="secondary">Open Menu (Left)</Button>}
          position="bottom-left"
        >
          <MenuItem onClick={() => handleMenuItemClick('Another 1')}>Another Item 1</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Another 2')}>Another Item 2</MenuItem>
        </Menu>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Breadcrumbs</h3>
      {/* Breadcrumbs Example */}
      <div className="space-y-4">
        <Breadcrumbs>
          <BreadcrumbItem label="Home" to="/" />
          <BreadcrumbItem label="Dashboard" to="/dashboard" />
          <BreadcrumbItem label="Current Page" isCurrent />
        </Breadcrumbs>

        <Breadcrumbs>
          <BreadcrumbItem label="Products" to="/products" />
          <BreadcrumbItem label="Category" to="/products/category" />
          <BreadcrumbItem label="Item Details" isCurrent />
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default NavigationSection;