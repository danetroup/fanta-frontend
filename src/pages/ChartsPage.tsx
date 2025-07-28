// src/pages/ChartsPage.tsx
import React from 'react';

import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import Card from '../components/ui/Card';
import { mockChartData } from '../data/mockData';

const ChartsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-text mb-6">Charts Showcase</h1>

      {/* Bar Chart Section */}
      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Sales Performance (Bar Chart)</h3>
        <BarChart
          title="Product Sales Overview"
          data={mockChartData}
          dataKeyX="name"
          barKeys={[
            { key: 'pv', color: '#8884d8' }, // Purple-ish
            { key: 'uv', color: '#82ca9d' }, // Green-ish
            { key: 'amt', color: '#ffc658' }, // Yellow-ish
          ]}
        />
      </Card>

      {/* Line Chart Section */}
      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Website Traffic Trends (Line Chart)</h3>
        <LineChart
          title="Unique Visitors vs. Page Views"
          data={mockChartData}
          dataKeyX="name"
          lineKeys={[
            { key: 'uv', color: '#FF7F50' }, // Coral
            { key: 'pv', color: '#6A5ACD' }, // SlateBlue
          ]}
        />
      </Card>

      {/* You could add more chart types here (e.g., Pie Chart, Area Chart) */}
    </div>
  );
};

export default ChartsPage;