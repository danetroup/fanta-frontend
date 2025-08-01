import React from 'react';
import BarChart from '../../../components/charts/BarChart';
import LineChart from '../../../components/charts/LineChart';
import PieChart from '../../../components/charts/PieChart';
import ChartWithTable from '../../../components/charts/ChartWithtable'; // <-- Corrected casing
import { mockChartData, mockPieChartData } from '../../../data/mockData';

const ChartsSection: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold text-text">Charts & Data Visualization</h2>
      <p className="text-text-light">
        These components are wrappers around the Recharts library, designed to be theme-aware and easy to use. Each chart includes a menu to view its data in a table.
      </p>

      {/* Bar Chart with Table View */}
      <ChartWithTable
        title="Monthly Revenue"
        data={mockChartData}
        tableHeaders={[
          { key: 'name', label: 'Month' },
          { key: 'pv', label: 'Page Views' },
          { key: 'uv', label: 'Unique Visitors' },
        ]}
      >
        <BarChart
          data={mockChartData}
          dataKeyX="name"
          barKeys={[
            { key: 'pv', color: '#8884d8' },
            { key: 'uv', color: '#82ca9d' },
          ]}
        />
      </ChartWithTable>

      {/* Line Chart with Table View */}
      <ChartWithTable
        title="User Growth"
        data={mockChartData}
        tableHeaders={[
            { key: 'name', label: 'Month' },
            { key: 'uv', label: 'UV' },
            { key: 'pv', label: 'PV' },
        ]}
      >
        <LineChart
          data={mockChartData}
          dataKeyX="name"
          lineKeys={[
            { key: 'uv', color: '#FF7F50' },
            { key: 'pv', color: '#6A5ACD' },
          ]}
        />
      </ChartWithTable>

      {/* Pie Chart with Table View */}
      <ChartWithTable
        title="Data Distribution"
        data={mockPieChartData}
        tableHeaders={[
          { key: 'name', label: 'Group' },
          { key: 'value', label: 'Value' },
        ]}
      >
        <PieChart data={mockPieChartData} dataKey="value" nameKey="name" />
      </ChartWithTable>
    </div>
  );
};

export default ChartsSection;
