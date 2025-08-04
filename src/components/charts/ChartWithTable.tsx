import React, { useState } from 'react';
import Card from '../ui/Card';
import Drawer from '../ui/Drawer';
import Table from '../data/Table';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Menu, MenuItem } from '../ui/Menu';

// Define the shape of the header objects for the table
interface TableHeader {
  key: string;
  label: string;
}

interface ChartWithTableProps {
  /** The title of the chart. */
  title: string;
  /** The chart component to be displayed. */
  children: React.ReactNode;
  /** The data used by the chart, which will be displayed in the table. */
  data: any[];
  /** The header configuration for the data table. */
  tableHeaders: TableHeader[];
}

/**
 * A wrapper component that displays a chart and provides a menu option
 * to view the chart's underlying data in a table within a drawer.
 */

/**
 * @wizard
 * @name ChartWithTable
 * @description A wrapper component that combines a chart with an option to view its underlying data in a table within a drawer.
 * @tags templates, charts, data-display, pattern, dashboard
 * @props
 * - name: title
 * type: string
 * description: The main title for the chart and the associated data view.
 * - name: children
 * type: React.ReactNode
 * description: The chart component itself (e.g., `<BarChart />` or `<LineChart />`).
 * - name: data
 * type: any[]
 * description: The raw data used by the chart, which will also populate the table in the drawer.
 * - name: tableHeaders
 * type: TableHeader[]
 * description: The header configuration for the data table displayed in the drawer.
 * @category templates-patterns
 */

const ChartWithTable: React.FC<ChartWithTableProps> = ({ title, children, data, tableHeaders }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card padding="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-text">{title}</h3>
        <Menu
          trigger={
            <Button variant="ghost" size="sm" iconBefore={<Icon name="more-horizontal" />} />
          }
          position="bottom-right"
        >
          <MenuItem onClick={() => setIsDrawerOpen(true)}>
            <Icon name="table" size={16} className="mr-2" />
            View as table
          </MenuItem>
          <MenuItem>
            <Icon name="download" size={16} className="mr-2" />
            Download as CSV
          </MenuItem>
        </Menu>
      </div>

      {/* The chart itself is passed in as a child */}
      <div className="h-80">
        {children}
      </div>

      {/* The drawer that contains the data table */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        position="right"
        size="600px"
        title={`Data for: ${title}`}
      >
        <div className="p-4">
          <Table headers={tableHeaders} data={data} />
        </div>
      </Drawer>
    </Card>
  );
};

export default ChartWithTable;
