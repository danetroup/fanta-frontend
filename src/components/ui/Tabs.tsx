import React, { useState, useCallback, useMemo } from 'react';

// TabPanel Component
interface TabPanelProps {
  id: string; // Unique ID for the panel
  label: string; // Label for the tab header
  children: React.ReactNode;
  icon?: React.ReactNode; // <-- New optional icon prop
}

/**
 * @wizard
 * @name TabPanel
 * @description Represents a single tab and its associated content panel within a `Tabs` component.
 * @tags navigation, ui, content
 * @props
 * - name: id
 * type: string
 * description: A unique identifier for this tab panel, used to link it to its header.
 * - name: label
 * type: string
 * description: The text label displayed on the tab header.
 * - name: children
 * type: React.ReactNode
 * description: The content to be displayed when this tab is active.
 * - name: icon
 * type: React.ReactNode
 * description: An optional icon to display next to the tab label in the header.
 * @category navigation
 */

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  // The TabPanel itself doesn't render the icon; it just holds the data for the parent Tabs component.
  return <div role="tabpanel" className="p-4 bg-card rounded-b-lg border border-t-0 border-border">{children}</div>;
};

// Tabs Component
interface TabsProps {
  children: React.ReactElement<TabPanelProps>[];
  defaultActiveTab?: string;
  className?: string;
}

/**
 * @wizard
 * @name Tabs
 * @description A navigation component that allows users to switch between different content panels within the same area.
 * @tags navigation, ui, content-switcher
 * @props
 * - name: children
 * type: React.ReactElement<TabPanelProps>[]
 * description: A collection of `TabPanel` components that define the tabs and their content.
 * - name: defaultActiveTab
 * type: string
 * description: The `id` of the tab that should be active by default when the component mounts.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the tabs container.
 * @category navigation
 */

const Tabs: React.FC<TabsProps> = ({ children, defaultActiveTab, className }) => {
  const initialActiveTab = useMemo(() => {
    if (defaultActiveTab) {
      return defaultActiveTab;
    }
    return children.length > 0 ? children[0].props.id : '';
  }, [children, defaultActiveTab]);

  const [activeTab, setActiveTab] = useState<string>(initialActiveTab);

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex border-b border-border mb-px" role="tablist">
        {children.map((tab) => (
          <button
            key={tab.props.id}
            id={`tab-${tab.props.id}`}
            role="tab"
            aria-controls={tab.props.id}
            aria-selected={activeTab === tab.props.id}
            onClick={() => handleTabClick(tab.props.id)}
            // Added `inline-flex` and `items-center` for icon alignment
            className={`inline-flex items-center px-4 py-2 text-text text-lg font-medium border-b-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              activeTab === tab.props.id
                ? 'border-primary'
                : 'border-transparent hover:border-border'
            }`}
          >
            {/* Render icon if it exists */}
            {tab.props.icon && <span className="mr-2 h-5 w-5">{tab.props.icon}</span>}
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {children.find((tab) => tab.props.id === activeTab)}
    </div>
  );
};

export { Tabs, TabPanel };