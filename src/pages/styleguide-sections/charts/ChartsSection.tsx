// src/pages/styleguide-sections/charts/ChartsSection.tsx
import React from 'react';
import Card from '../../../components/ui/Card'; // Re-use Card for container
import BarChart from '../../../components/charts/BarChart';
import LineChart from '../../../components/charts/LineChart';
import EmptyState from '../../../components/ui/EmptyState';
import { mockChartData } from '../../../data/mockData'; // Import mock chart data

const ChartsSection: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Charting Components</h2>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Bar Chart</h3>
      <BarChart
        title="Monthly Revenue"
        data={mockChartData}
        dataKeyX="name"
        barKeys={[
          { key: 'pv', color: '#8884d8' }, // Purple-ish
          { key: 'uv', color: '#82ca9d' }, // Green-ish
          { key: 'amt', color: '#ffc658' }, // Yellow-ish
        ]}
      />

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Line Chart</h3>
      <LineChart
        title="Monthly User Growth"
        data={mockChartData}
        dataKeyX="name"
        lineKeys={[
          { key: 'uv', color: '#FF7F50' }, // Coral
          { key: 'pv', color: '#6A5ACD' }, // SlateBlue
        ]}
      />

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Pie Chart (Future)</h3>
      <EmptyState
        title="Pie Chart Coming Soon!"
        description="This section will feature a theme-aware Recharts Pie Chart when implemented."
        icon="🥧"
      />
    </div>
  );
};

export default ChartsSection;