import React from 'react';
import { type ColDef } from 'ag-grid-community';

import DataTable from '../components/data/DataTable';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import Card from '../components/ui/Card';
import PageHeader from '../components/templates/PageHeader'; // <-- Import PageHeader
import StatCard from '../components/ui/StatCard';         // <-- Import StatCard
import { mockTableData, mockChartData } from '../data/mockData';
import useDataFetch from '../hooks/useDataFetch';

const Dashboard: React.FC = () => {
  // Use useDataFetch for table data
  const { data: fetchedTableData, loading: tableLoading, error: tableError } = useDataFetch(null, mockTableData);

  const columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price', valueFormatter: p => '$' + p.value.toLocaleString() },
    { field: 'electric', cellRenderer: (params: any) => params.value ? '⚡' : '' }
  ];

  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Dashboard Overview"
        description="A summary of key metrics and recent activity."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="1,234"
          icon="users"
          changeText="+10% from last month"
          changeDirection="positive"
        />
        <StatCard
          title="Sales Today"
          value="$5,678"
          icon="dollar-sign"
          changeText="+5% from yesterday"
          changeDirection="positive"
        />
        <StatCard
          title="New Orders"
          value="89"
          icon="shopping-cart"
          changeText="-2 since last hour"
          changeDirection="negative"
        />
        <StatCard
          title="Active Projects"
          value="12"
          icon="briefcase"
          footerText="3 nearing completion"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Monthly Revenue"
          data={mockChartData}
          dataKeyX="name"
          barKeys={[
            { key: 'pv', color: '#8884d8' },
            { key: 'uv', color: '#82ca9d' },
          ]}
        />
        <LineChart
          title="Monthly User Growth"
          data={mockChartData}
          dataKeyX="name"
          lineKeys={[
            { key: 'uv', color: '#FF7F50' },
            { key: 'pv', color: '#6A5ACD' },
          ]}
        />
      </div>

      {/* Data Table Section */}
      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Recent Data Table</h3>
        {tableLoading && <p className="text-accent">Loading table data...</p>}
        {tableError && <p className="text-danger">Error: {tableError}</p>}
        {fetchedTableData && (
          <DataTable
            rowData={fetchedTableData}
            columnDefs={columnDefs}
            height="400px" // Adjusted height for dashboard
          />
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
