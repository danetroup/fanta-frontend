// src/components/ui/Tabs.tsx
import React, { useState, useCallback, useMemo } from 'react';

// TabPanel Component
interface TabPanelProps {
  id: string; // Unique ID for the panel
  label: string; // Label for the tab header
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div role="tabpanel" className="p-4 bg-card rounded-b-lg">{children}</div>;
};

// Tabs Component
interface TabsProps {
  children: React.ReactElement<TabPanelProps>[]; // Expects TabPanel children
  defaultActiveTab?: string; // ID of the tab to be active by default
  className?: string; // Class for the outer tabs container
}

const Tabs: React.FC<TabsProps> = ({ children, defaultActiveTab, className }) => {
  // Determine initial active tab
  const initialActiveTab = useMemo(() => {
    if (defaultActiveTab) {
      return defaultActiveTab;
    }
    // Fallback to the first tab if no defaultActiveTab is provided
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
            className={`px-4 py-2 text-text text-lg font-medium border-b-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              activeTab === tab.props.id
                ? 'border-primary' // Active tab border
                : 'border-transparent hover:border-text-light' // Inactive tab hover
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {children.map((tab) => (
        <React.Fragment key={tab.props.id}>
          {activeTab === tab.props.id && tab}
        </React.Fragment>
      ))}
    </div>
  );
};

export { Tabs, TabPanel };