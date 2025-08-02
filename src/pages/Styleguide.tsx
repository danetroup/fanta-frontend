import React from 'react';

// Import the SideNav component
import SideNav, { type NavItem } from '../components/templates/SideNav';

// Import all the section components
import ColorsSection from './styleguide-sections/colors/ColorsSection';
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
import PageHeader from '../components/templates/PageHeader';

// The complete navigation structure for the style guide
const navItems: NavItem[] = [
  { label: 'Colors', href: '#colors', children: [
      { label: 'Themed Palette', href: '#colors-theme' },
      { label: 'Default Palette', href: '#colors-tailwind' },
  ]},
  { label: 'Layout', href: '#layout', children: [
      { label: 'Theme Info', href: '#layout-theme' },
      { label: 'Colors', href: '#layout-colors' },
      { label: 'Typography', href: '#layout-type' },
      { label: 'Icons', href: '#layout-icon' },
      { label: 'Cards', href: '#layout-card' },
      { label: 'Modals', href: '#layout-modal' },
      { label: 'Drawers', href: '#layout-drawer' },
      { label: 'Accordion', href: '#layout-accordian' },
  ]},
  { label: 'Templates', href: '#templates', children: [
      { label: 'Page Template', href: '#template-header' },
      { label: 'Responsive Layout', href: '#template-responive' },
  ]},
  { label: 'Elements', href: '#elements', children: [
      { label: 'Avatars', href: '#elements-avatars' },
      { label: 'Badges', href: '#elements-badges' },
      { label: 'Stat Cards', href: '#elements-stats' },
      { label: 'Activity Feed', href: '#elements-activity' },
      { label: 'Toggle Switches', href: '#elements-toggle' },
  ]},
  { label: 'Forms', href: '#forms', children: [
      { label: 'Buttons', href: '#form-buttons' },
      { label: 'Inputs', href: '#form-inputs' },
      { label: 'Search', href: '#form-search' },
      { label: 'Selection', href: '#form-select' },
      { label: 'Advanced', href: '#form-combo' },
      { label: 'File Upload', href: '#form-upload' },
      { label: 'Form Template', href: '#form-form' },
  ]},
  { label: 'Navigation', href: '#navigation', children: [
      { label: 'Stepper', href: '#navigation-stepper' },
      { label: 'Tabs', href: '#navigation-tabs' },
      { label: 'Menus', href: '#navigation-menus' },
      { label: 'Breadcrumbs', href: '#navigation-breadcrumbs' },
  ]},
  { label: 'Tables', href: '#tables', children: [
      { label: 'Simple Table', href: '#tables-simple' },
      { label: 'AG Grid', href: '#tables-aggrid' },
  ]},
  { label: 'Charts', href: '#charts', children: [
      { label: 'Bar Chart', href: '#charts-bar' },
      { label: 'Line Chart', href: '#charts-line' },
      { label: 'Pie Chart', href: '#charts-pie' },
  ]},
  { label: 'Feedback', href: '#feedback', children: [
      { label: 'Alerts', href: '#feedback-alerts' },
      { label: 'Tooltips', href: '#feedback-tooltip' },
      { label: 'Toasts', href: '#feedback-toast' },
      { label: 'Empty State', href: '#feedback-empty' },
  ]},
  { label: 'Utilities', href: '#utilities', children: [
      { label: 'Spacing', href: '#utilities-spacing' },
      { label: 'Flexbox', href: '#utilities-flexbox' },
      { label: 'Layout', href: '#utilities-layout' },
      { label: 'Typography', href: '#utilities-typography' },
      { label: 'Borders', href: '#utilities-borders' },
      { label: 'Shadows', href: '#utilities-shadows' },
  ]},
  { label: 'Icons', href: '#icons', children: [
      { label: 'Usage', href: '#icons-usage' },
      { label: 'Gallery', href: '#icons-gallery' },
  ]},
];

// Flatten the nav items to get all IDs for the scroll spy
const sectionIds = navItems.flatMap(item => 
  [item.href.substring(1), ...(item.children?.map(c => c.href.substring(1)) || [])]
);


const Styleguide: React.FC = () => {
  return (
    <div className="p-8"> 
      <PageHeader
        title="Style Guide & Component Showcase"
        description="An interactive playground for all UI components, patterns, and styles available in the Fanta Frontend boilerplate."
      />

      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <aside className="w-full md:w-56">
          <SideNav navItems={navItems} sectionIds={sectionIds} />
        </aside>
        
        <main className="flex-1 space-y-20">
          <section id="colors"><ColorsSection /></section>
          <section id="layout"><LayoutSection /></section>
          <section id="templates"><TemplatesSection /></section>
          <section id="elements"><ElementsSection /></section>
          <section id="forms"><FormsSection /></section>
          <section id="navigation"><NavigationSection /></section>
          <section id="tables"><TablesSection /></section>
          <section id="charts"><ChartsSection /></section>
          <section id="feedback"><FeedbackSection /></section>
          <section id="utilities"><UtilitiesSection /></section>
          <section id="icons"><IconsSection /></section>
        </main>
      </div>
    </div>
  );
};

export default Styleguide;