import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Modal from '../../../components/ui/Modal';
import Drawer from '../../../components/ui/Drawer';
import Icon from '../../../components/ui/Icon'; // <-- Import the new Icon component
import { Accordion, AccordionItem } from '../../../components/ui/Accordion';
import { useTheme, type ThemeName } from '../../../contexts';

const LayoutSection: React.FC = () => {
  const { theme, availableThemes, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Drawer states specific to this section
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Layout & Structure Components</h2>
      <p className="text-text-light mb-6">
        This section showcases high-level components used for structuring pages and content, such as Cards, Modals, and Drawers. For low-level layout helper classes (like flexbox, grid, or positioning), see the "Utilities" tab.
      </p>

      {/* Theme Info */}
      <Card id="layout-theme"  padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Current Theme Info</h3>
        <p className="text-lg text-text">
          Active Theme: <span className="font-bold text-primary">{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span>
        </p>
        <p className="text-lg text-text mt-2">
          Available Themes: {availableThemes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <label htmlFor="layout-theme-select" className="text-text">Switch Theme:</label>
          <Select
            id="layout-theme-select"
            options={availableThemes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) + ' Mode' }))}
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            className="w-36"
          />
        </div>
      </Card>

      {/* Colors */}
      <Card id="layout-colors" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Colors</h3>
        <p className="text-muted-foreground mb-6">
          These colors are defined in the theme and can be applied using utility classes like{' '}
          <code className="bg-background border border-border text-text px-1 rounded">bg-*</code>,{' '}
          <code className="bg-background border border-border text-text px-1 rounded">text-*</code>, and{' '}
          <code className="bg-background border border-border text-text px-1 rounded">border-*</code>.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* --- Updated to use foreground colors --- */}
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-primary text-primary-foreground"><span>Primary</span><code className="text-xs opacity-75 mt-1">bg-primary</code></div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-secondary text-secondary-foreground"><span>Secondary</span><code className="text-xs opacity-75 mt-1">bg-secondary</code></div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-accent text-accent-foreground"><span>Accent</span><code className="text-xs opacity-75 mt-1">bg-accent</code></div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-background text-text border border-border"><span>Background</span><code className="text-xs opacity-75 mt-1">bg-background</code></div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md bg-card text-text border border-border"><span>Card</span><code className="text-xs opacity-75 mt-1">bg-card</code></div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-border text-text"><span>Border</span><code className="text-xs opacity-75 mt-1">border-border</code></div>
        </div>
      </Card>

      {/* Typography */}
      <Card id="layout-type" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Typography</h3>
         <p className="text-text-light mb-6">
          The typographic scale is controlled by font-size (<code className="bg-primary/10 text-primary px-1 rounded">text-*</code>) and font-weight (<code className="bg-primary/10 text-primary px-1 rounded">font-*</code>) utility classes.
        </p>
        <div className="space-y-4">
            <div className="flex items-baseline justify-between"><h1 className="text-5xl font-extrabold text-text">Heading 1</h1><code className="text-sm text-text-light">.text-5xl .font-extrabold</code></div>
            <div className="flex items-baseline justify-between"><h2 className="text-4xl font-bold text-text">Heading 2</h2><code className="text-sm text-text-light">.text-4xl .font-bold</code></div>
            <div className="flex items-baseline justify-between"><h3 className="text-3xl font-semibold text-text">Heading 3</h3><code className="text-sm text-text-light">.text-3xl .font-semibold</code></div>
            <div className="flex items-baseline justify-between"><h4 className="text-2xl font-medium text-text">Heading 4</h4><code className="text-sm text-text-light">.text-2xl .font-medium</code></div>
            <div className="flex items-baseline justify-between"><h5 className="text-xl font-normal text-text">Heading 5</h5><code className="text-sm text-text-light">.text-xl .font-normal</code></div>
            <div className="flex items-baseline justify-between"><h6 className="text-lg font-light text-text">Heading 6</h6><code className="text-sm text-text-light">.text-lg .font-light</code></div>
            <div className="flex items-baseline justify-between"><p className="text-base text-text">Paragraph text</p><code className="text-sm text-text-light">.text-base</code></div>
            <div className="flex items-baseline justify-between"><p className="text-sm text-text-light">Small text for captions</p><code className="text-sm text-text-light">.text-sm .text-text-light</code></div>
        </div>
      </Card>

      {/* Icon Section */}
      <Card id="layout-icon" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Icons</h3>
        <p className="text-text-light mb-6">
          Use the `Icon` component to render any icon from the Lucide library. See the "Icons" tab or the{' '}
          <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            official Lucide website
          </a>{' '}
          for a full gallery.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon name="home" />
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="user" size={24} className="text-primary" />
            <span>Sized & Colored</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="settings" size={32} strokeWidth={1.5} />
            <span>Custom Stroke</span>
          </div>
          <Button variant="primary" iconBefore={<Icon name="plus" size={16} />}>
            Icon in Button
          </Button>
        </div>
      </Card>

      {/* Card Examples */}
      <Card id="layout-card" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Cards</h3>
        <p className="text-text mb-6">
          The Card component is highly flexible. Use props to override default theme styles for background, border, padding, and shadow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding="p-4"><h4 className="font-semibold text-lg mb-2 text-text">Default Card</h4><p className="text-text-light">This card uses theme defaults with `p-4` padding.</p></Card>
          <Card padding="p-6" shadow="shadow-xl"><h4 className="font-semibold text-lg mb-2 text-text">Padding & Shadow</h4><p className="text-text-light">This card has `p-6` padding and a large `shadow-xl`.</p></Card>
          <Card background="bg-primary/10" border="border-2 border-primary/50" padding="p-4"><h4 className="font-semibold text-lg mb-2 text-primary">Primary Background</h4><p className="text-primary/80">Uses a custom background and a thicker, colored border.</p></Card>
          <Card padding="p-4" shadow="shadow-md" border=""><h4 className="font-semibold text-lg mb-2 text-text">Card without Border</h4><p className="text-text-light">The border was removed by passing an empty string to the `border` prop.</p></Card>
          <Card background="bg-accent/10" border="border-accent" padding="p-4" shadow="shadow-lg"><h4 className="font-semibold text-lg mb-2 text-accent">Accent Card</h4><p className="text-accent/90">This card uses accent colors for its background and border.</p></Card>
          <Card padding="p-4"><h4 className="font-semibold text-lg mb-2 text-text">Nested Card</h4><p className="text-text-light mb-2">A standard card containing another.</p><Card padding="p-3" background="bg-background"><p className="text-text text-sm">This inner card uses the main background color.</p></Card></Card>
        </div>
      </Card>

      {/* Modals */}
      <Card id="layout-modal" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Modals</h3>
        <Button onClick={() => setIsModalOpen(true)} variant="accent">Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Layout Test Modal"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button variant="primary">Confirm</Button>
            </>
          }
        >
          <p className="text-text">This is a modal instance from the layout section.</p>
          <Input type="text" placeholder="Modal Input Field" className="mt-4" />
        </Modal>
      </Card>

      {/* Drawers */}
      <Card id="layout-drawer" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Drawers</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => setIsRightDrawerOpen(true)} variant="primary">Open Right Drawer</Button>
          <Button onClick={() => setIsLeftDrawerOpen(true)} variant="secondary">Open Left Drawer</Button>
          <Button onClick={() => setIsTopDrawerOpen(true)} variant="accent">Open Top Drawer</Button>
          <Button onClick={() => setIsBottomDrawerOpen(true)} variant="danger">Open Bottom Drawer</Button>
        </div>
        <Drawer isOpen={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)} position="right" size="600px" title="Right-Side Drawer"><p className="text-text">This drawer slides in from the right.</p><Input type="text" placeholder="Drawer input" className="mt-4" /><Button variant="primary" className="mt-4">Action</Button></Drawer>
        <Drawer isOpen={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)} position="left" size="50%" title="Left-Side Drawer (25%)"><p className="text-text">This drawer slides in from the left and has a responsive width.</p><p className="text-text mt-2">Try resizing your browser!</p></Drawer>
        <Drawer isOpen={isTopDrawerOpen} onClose={() => setIsTopDrawerOpen(false)} position="top" size="400px" title="Top Drawer"><p className="text-text">This short drawer slides down from the top.</p></Drawer>
        <Drawer isOpen={isBottomDrawerOpen} onClose={() => setIsBottomDrawerOpen(false)} position="bottom" size="50%" title="Bottom Drawer (50%)"><p className="text-text">This drawer slides up from the bottom.</p><div className="h-20 bg-primary/20 mt-4 rounded p-2 text-sm text-primary">Scrollable content example.</div></Drawer>
      </Card>

      {/* Accordion */}
      <Card id="layout-accordian" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Accordion/Collapsible Panels</h3>
        <Accordion singleOpen>
          <AccordionItem id="item1" header="Section 1: What is this boilerplate?"><p className="text-text">This is a React and Tailwind CSS boilerplate designed for rapid prototyping. It comes with a comprehensive set of pre-built, theme-aware UI components.</p></AccordionItem>
          <AccordionItem id="item2" header="Section 2: How do I use it?"><p className="text-text">Simply clone the repository, install dependencies, and run `npm run dev`. Explore the Style Guide for component examples.</p></AccordionItem>
          <AccordionItem id="item3" header="Section 3: Theming"><p className="text-text">Theming is handled via CSS variables and Tailwind CSS. You can easily switch between light, dark, and custom themes using the dropdown in the header.</p></AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default LayoutSection;
