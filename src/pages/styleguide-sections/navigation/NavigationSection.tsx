import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Stepper from '../../../components/ui/Stepper'; // <-- Import new component
import { Tabs, TabPanel } from '../../../components/ui/Tabs';
import { Menu, MenuItem } from '../../../components/ui/Menu';
import { Breadcrumbs, BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

const NavigationSection: React.FC = () => {
  const handleMenuItemClick = (item: string) => {
    alert(`Menu Item Clicked: ${item}`);
  };

  // State and data for the new Stepper component
  const stepperSteps = [
    { label: 'Account Setup', summary: 'Create your account' },
    { label: 'Personal Details', summary: 'Add your information' },
    { label: 'Verification', summary: 'Verify your email' },
    { label: 'Done', summary: 'You are all set!' },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Navigation Components</h2>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Stepper</h3>
        <p className="text-text-light mb-6">
          Guide users through a multi-step process with the Stepper component.
        </p>
        <Stepper steps={stepperSteps} currentStep={currentStep} />
        <div className="flex justify-center mt-6 gap-4">
            <Button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0}>Previous</Button>
            <Button onClick={() => setCurrentStep(s => Math.min(stepperSteps.length - 1, s + 1))} disabled={currentStep === stepperSteps.length - 1}>Next</Button>
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Tabs</h3>
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
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Menus</h3>
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
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Breadcrumbs</h3>
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
      </Card>
    </div>
  );
};

export default NavigationSection;
