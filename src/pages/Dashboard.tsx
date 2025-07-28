// src/pages/Dashboard.tsx
import React from 'react';
import { type ColDef } from 'ag-grid-community';

import DataTable from '../components/data/DataTable';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import Card from '../components/ui/Card';
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
      <h1 className="text-4xl font-bold text-text mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5">
          <h3 className="text-xl font-semibold text-text">Total Users</h3>
          <p className="text-3xl font-bold text-primary mt-2">1,234</p>
          <p className="text-sm text-text-light mt-1">Up 10% from last month</p>
        </Card>
        <Card className="p-5">
          <h3 className="text-xl font-semibold text-text">Sales Today</h3>
          <p className="text-3xl font-bold text-secondary mt-2">$5,678</p>
          <p className="text-sm text-text-light mt-1">Up 5% from yesterday</p>
        </Card>
        <Card className="p-5">
          <h3 className="text-xl font-semibold text-text">New Orders</h3>
          <p className="text-3xl font-bold text-accent mt-2">89</p>
          <p className="text-sm text-text-light mt-1">2 new since morning</p>
        </Card>
        <Card className="p-5">
          <h3 className="text-xl font-semibold text-text">Active Projects</h3>
          <p className="text-3xl font-bold text-primary mt-2">12</p>
          <p className="text-sm text-text-light mt-1">3 nearing completion</p>
        </Card>
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