import React from 'react';

// Import all the new section components
import FeedbackSection from './styleguide-sections/feedback/FeedbackSection';
import FormsSection from './styleguide-sections/forms/FormsSection';
import NavigationSection from './styleguide-sections/navigation/NavigationSection';
import LayoutSection from './styleguide-sections/layout/LayoutSection';
import TablesSection from './styleguide-sections/tables/TablesSection';
import ChartsSection from './styleguide-sections/charts/ChartsSection';
import UtilitiesSection from './styleguide-sections/utilities/UtilitiesSection'; // <-- Import the new section
import { Tabs, TabPanel } from '../components/ui/Tabs'; // <--- Import Tabs component

// No longer need most useState, useTheme, useToast here, as they are in individual sections
// Remove other individual component imports as well if they are not used directly in this file
// (e.g., Button, Input, Card, Modal, Select, Checkbox, Radio, Tooltip, Menu, List, Drawer, FormTemplate, ComboBox, MultiSelect, DatePicker, FileUpload, EmptyState, Table, Pagination, RichTextEditor)

const Styleguide: React.FC = () => {
  return (
    <div className="p-8 space-y-8"> 
      <h1 className="text-4xl font-bold text-text mb-6">Style Guide & Component Showcase</h1>

      <Tabs defaultActiveTab="layout-section">
        <TabPanel id="layout-section" label="Layout">
          <LayoutSection />
        </TabPanel>
        <TabPanel id="forms-section" label="Forms">
          <FormsSection />
        </TabPanel>
        <TabPanel id="navigation-section" label="Navigation">
          <NavigationSection />
        </TabPanel>
        <TabPanel id="tables-section" label="Tables">
          <TablesSection />
        </TabPanel>
        <TabPanel id="charts-section" label="Charts">
          <ChartsSection />
        </TabPanel>
        <TabPanel id="feedback-section" label="Feedback">
          <FeedbackSection />
        </TabPanel>
        {/* Add the new tab for Utilities */}
        <TabPanel id="utilities-section" label="Utilities">
          <UtilitiesSection />
        </TabPanel>
        
      </Tabs>
    </div>
  );
};

export default Styleguide;
