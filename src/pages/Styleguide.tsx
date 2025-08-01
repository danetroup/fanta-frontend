import React from 'react';

// Import all the section components
import FeedbackSection from './styleguide-sections/feedback/FeedbackSection';
import FormsSection from './styleguide-sections/forms/FormsSection';
import NavigationSection from './styleguide-sections/navigation/NavigationSection';
import LayoutSection from './styleguide-sections/layout/LayoutSection';
import TablesSection from './styleguide-sections/tables/TablesSection';
import ChartsSection from './styleguide-sections/charts/ChartsSection';
import UtilitiesSection from './styleguide-sections/utilities/UtilitiesSection';
import IconsSection from './styleguide-sections/icons/IconsSection';
import TemplatesSection from './styleguide-sections/templates/TemplatesSection';
import ElementsSection from './styleguide-sections/elements/ElementsSection';
import { Tabs, TabPanel } from '../components/ui/Tabs';
import PageHeader from '../components/templates/PageHeader'; // <-- Import PageHeader

const Styleguide: React.FC = () => {
  return (
    <div className="p-8 space-y-8"> 
      <PageHeader
        title="Style Guide & Component Showcase"
        description="An interactive playground for all UI components, patterns, and styles available in the Fanta Frontend boilerplate."
      />

      <Tabs defaultActiveTab="layout-section">
        <TabPanel id="layout-section" label="Layout">
          <LayoutSection />
        </TabPanel>
        <TabPanel id="templates-section" label="Templates">
          <TemplatesSection />
        </TabPanel>
        <TabPanel id="elements-section" label="Elements">
          <ElementsSection />
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
        <TabPanel id="utilities-section" label="Utilities">
          <UtilitiesSection />
        </TabPanel>
        <TabPanel id="icons-section" label="Icons">
          <IconsSection />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Styleguide;
