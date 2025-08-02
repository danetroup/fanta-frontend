import React, { useState, useCallback, useMemo } from 'react';

// TabPanel Component
interface TabPanelProps {
  id: string; // Unique ID for the panel
  label: string; // Label for the tab header
  children: React.ReactNode;
  icon?: React.ReactNode; // <-- New optional icon prop
}

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