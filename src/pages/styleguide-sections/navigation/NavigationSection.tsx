import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Stepper from '../../../components/ui/Stepper';
import { Tabs, TabPanel } from '../../../components/ui/Tabs';
import { Menu, MenuItem, MenuDivider } from '../../../components/ui/Menu';
import { Breadcrumbs, BreadcrumbItem } from '../../../components/ui/Breadcrumbs';
// Import additional icons for the new samples
import { 
    Edit, Copy, Archive, Trash2, UserPlus, Settings, 
    Home, Folder, FileText, LayoutDashboard, Users, HelpCircle 
} from 'lucide-react';

const NavigationSection: React.FC = () => {
  const handleMenuItemClick = (item: string) => {
    alert(`Menu Item Clicked: ${item}`);
  };

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
      <h1 className="text-red-200">Does this turn red?</h1>

      <Card id="navigation-stepper" padding="p-6">
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

      <Card id="navigation-tabs" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Tabs with Icons</h3>
        {/* --- Updated Tabs Example --- */}
        <Tabs defaultActiveTab="tab1">
          <TabPanel id="tab1" label="Dashboard" icon={<LayoutDashboard size={16} />}>
            <p className="text-text">Content for the Dashboard. This is where the first tab's information will go.</p>
            <Input type="text" placeholder="Dashboard Input" className="mt-4" />
          </TabPanel>
          <TabPanel id="tab2" label="Users" icon={<Users size={16} />}>
            <p className="text-text">Content for User Management.</p>
            <Button variant="primary" className="mt-4">Add User</Button>
          </TabPanel>
          <TabPanel id="tab3" label="Settings" icon={<Settings size={16} />}>
            <p className="text-text">Content for Application Settings.</p>
          </TabPanel>
        </Tabs>
      </Card>

      <Card id="navigation-menus" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Menus</h3>
        <div className="flex flex-wrap items-center gap-8">
          <Menu
            trigger={<Button variant="primary">Menu with Icons</Button>}
            position="bottom-right"
          >
            <MenuItem icon={<Edit size={16} />} onClick={() => handleMenuItemClick('Edit')}>
              Edit Profile
            </MenuItem>
            <MenuItem icon={<Copy size={16} />} onClick={() => handleMenuItemClick('Duplicate')}>
              Duplicate
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Archive size={16} />} onClick={() => handleMenuItemClick('Archive')}>
              Archive
            </MenuItem>
            <MenuItem icon={<Trash2 size={16} />} onClick={() => handleMenuItemClick('Delete')}>
              Delete
            </MenuItem>
          </Menu>
          
          {/* --- Updated Second Menu Example --- */}
          <Menu
            trigger={<Button variant="secondary">Simple Menu</Button>}
            position="bottom-left"
          >
            <MenuItem icon={<Settings size={16}/>} onClick={() => handleMenuItemClick('Account Settings')}>Account Settings</MenuItem>
            <MenuItem icon={<UserPlus size={16}/>} onClick={() => handleMenuItemClick('Invite Team')}>Invite Team</MenuItem>
            <MenuDivider />
            <MenuItem icon={<HelpCircle size={16}/>} onClick={() => handleMenuItemClick('Support')}>Support</MenuItem>
          </Menu>
        </div>
      </Card>

      <Card id="navigation-breadcrumbs" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Breadcrumbs with Icons</h3>
        <div className="space-y-4">
          {/* --- Updated Breadcrumbs Example --- */}
          <Breadcrumbs>
            <BreadcrumbItem icon={<Home size={14} />} label="Home" to="/" />
            <BreadcrumbItem icon={<Folder size={14} />} label="Dashboard" to="/dashboard" />
            <BreadcrumbItem icon={<FileText size={14} />} label="Current Page" isCurrent />
          </Breadcrumbs>
        </div>
      </Card>
    </div>
  );
};

export default NavigationSection;