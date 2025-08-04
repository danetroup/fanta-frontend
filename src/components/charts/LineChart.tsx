// src/components/charts/LineChart.tsx
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts'; // Import useTheme to get theme colors

interface LineChartProps {
  data: any[];
  dataKeyX: string; // The key for the X-axis (e.g., 'name')
  lineKeys: { key: string; color: string }[]; // Array of objects with dataKey and its color (e.g., [{key: 'uv', color: '#8884d8'}])
  title?: string;
}

/**
 * @wizard
 * @name LineChart
 * @description A theme-aware line chart component powered by Recharts, for visualizing trends over time or categories.
 * @tags charts, data-visualization, rechart
 * @props
 * - name: data
 * type: any[]
 * description: The dataset for the chart. Each object in the array represents a point on the chart.
 * - name: dataKeyX
 * type: string
 * description: The key from your data objects to be used for the X-axis (e.g., 'month', 'category').
 * - name: lineKeys
 * type: { key: string; color: string }[]
 * description: An array of objects, each specifying a data key for a line and its color (e.g., `[{ key: 'sales', color: '#8884d8' }]`).
 * - name: title
 * type: string
 * description: An optional title to display above the chart.
 * @category charts
 */

const LineChart: React.FC<LineChartProps> = ({ data, dataKeyX, lineKeys, title }) => {
  const { theme } = useTheme();

  // Define colors based on theme context for chart elements
  const axisColor = theme === 'light' ? '#314155' : '#D1D5DB'; // app-text-color equivalent
  const gridColor = theme === 'light' ? '#E5E7EB' : '#4B5563'; // app-border-color equivalent
  const tooltipBg = theme === 'light' ? '#FFFFFF' : '#1F2937'; // app-card-bg-color equivalent
  const tooltipText = theme === 'light' ? '#314155' : '#D1D5DB'; // app-text-color equivalent

  return (
    <div className="w-full h-80 bg-card border border-border rounded-lg shadow-md p-4 flex flex-col">
      {title && <h3 className="text-xl font-semibold mb-4 text-text">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={dataKeyX} stroke={axisColor} tick={{ fill: axisColor }} />
          <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
          <Tooltip
            contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor }}
            itemStyle={{ color: tooltipText }}
            labelStyle={{ color: tooltipText }}
          />
          <Legend />
          {lineKeys.map((line, index) => (
            <Line
              key={index}
              type="monotone" // Smooth curve
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;