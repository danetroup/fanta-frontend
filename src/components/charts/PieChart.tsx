import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts';

interface PieChartProps {
  /** The data to display in the chart. */
  data: any[];
  /** The key in the data object that corresponds to the value of each slice. */
  dataKey: string;
  /** The key in the data object that corresponds to the name of each slice. */
  nameKey: string;
  /** An optional title to display above the chart. */
  title?: string;
}

/**
 * A theme-aware Pie Chart component that wraps the Recharts library.
 * It automatically applies theme colors to the chart segments.
 */

/**
 * @wizard
 * @name PieChart
 * @description A theme-aware pie chart component powered by Recharts, for showing proportional relationships of parts to a whole.
 * @tags charts, data-visualization, rechart
 * @props
 * - name: data
 * type: any[]
 * description: The dataset for the chart. Each object in the array represents a slice of the pie.
 * - name: dataKey
 * type: string
 * description: The key from the data objects that specifies the numerical value of each slice.
 * - name: nameKey
 * type: string
 * description: The key from the data objects that specifies the name or label of each slice.
 * - name: title
 * type: string
 * description: An optional title to display above the chart.
 * @category charts
 */

const PieChart: React.FC<PieChartProps> = ({ data, dataKey, nameKey, title }) => {
  const { theme } = useTheme();

  // Define colors based on theme context for chart elements
  const legendColor = theme === 'light' ? '#314155' : '#D1D5DB'; // app-text-color equivalent
  const tooltipBg = theme === 'light' ? '#FFFFFF' : '#1F2937'; // app-card-bg-color equivalent
  const tooltipBorder = theme === 'light' ? '#E5E7EB' : '#4B5563'; // app-border-color equivalent
  const tooltipText = theme === 'light' ? '#314155' : '#D1D5DB'; // app-text-color equivalent

  // Define a color palette that works well with the themes
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

  // Custom tooltip for better styling, now using theme-aware colors
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: tooltipBg, 
          border: `1px solid ${tooltipBorder}`,
          borderRadius: '0.375rem',
          padding: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <p style={{ color: tooltipText }}>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-card border border-border rounded-lg shadow-md p-4 flex flex-col">
      {title && <h3 className="text-xl font-semibold mb-4 text-text">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span style={{ color: legendColor }}>{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
