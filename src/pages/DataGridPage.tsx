// src/pages/DataGridPage.tsx
import React, { useState, useMemo, useCallback } from 'react';
// Correct AG Grid type imports - all with 'type' keyword
import { type ColDef, type ICellRendererParams, type IRowNode } from 'ag-grid-community'; // <--- ADD THIS IMPORT

import DataTable from '../components/data/DataTable';
import useDataFetch from '../hooks/useDataFetch';
import { mockTableData } from '../data/mockData';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

// Custom Cell Renderer Example
const ElectricCarRenderer: React.FC<ICellRendererParams> = (props) => {
  return (
    <span>{props.value ? '⚡ Electric' : '⛽ Gasoline'}</span>
  );
};

const DataGridPage: React.FC = () => {
  const { data: fetchedTableData, loading: tableLoading, error: tableError, fetchData } = useDataFetch(null, mockTableData);
  const [filterText, setFilterText] = useState<string>('');
  const [gridApi, setGridApi] = useState<any>(null); // State to hold the grid API

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridApi) {
      gridApi.setQuickFilter(filterText);
    }
  }, [filterText, gridApi]);

  const columnDefs: ColDef[] = useMemo(() => [
    {
      field: 'make',
      headerName: 'Manufacturer',
      sortable: true,
      filter: true,
      floatingFilter: true,
      checkboxSelection: true, // Example: Add checkbox selection
      headerCheckboxSelection: true, // Example: Add header checkbox for all
      minWidth: 150,
    },
    {
      field: 'model',
      headerName: 'Model Name',
      sortable: true,
      filter: true,
      floatingFilter: true,
      minWidth: 150,
    },
    {
      field: 'price',
      headerName: 'Price ($)',
      sortable: true,
      filter: 'agNumberColumnFilter', // Specific filter type
      floatingFilter: true,
      valueFormatter: p => '$' + p.value.toLocaleString(),
      minWidth: 120,
    },
    {
      field: 'electric',
      headerName: 'Type',
      sortable: true,
      filter: 'agSetColumnFilter', // Set filter for boolean
      floatingFilter: true,
      cellRenderer: ElectricCarRenderer, // Use custom renderer
      minWidth: 120,
    },
  ], []);

  // AG Grid Options - more advanced configurations
  const gridOptions = useMemo(() => ({
    rowSelection: 'multiple' as 'multiple', // Enable multiple row selection
    animateRows: true, // Animate row changes
    pagination: true, // Enable pagination
    paginationPageSize: 5, // Set page size
    suppressCellFocus: true, // Prevent cells from gaining focus (good for overall UX)
    onFirstDataRendered: (params: any) => params.api.sizeColumnsToFit(), // Auto-size columns on first load
    onGridReady: onGridReady, // Set grid API on ready
  }), [onGridReady]);

  const getSelectedRows = useCallback(() => {
    if (gridApi) {
      const selectedNodes: IRowNode[] = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      alert(`Selected Rows: ${JSON.stringify(selectedData, null, 2)}`);
    }
  }, [gridApi]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-text mb-6">Data Grid Showcase</h1>

      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Advanced AG Grid Example</h3>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Quick Filter..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyUp={onFilterTextBoxChanged}
            className="flex-1"
          />
          <Button onClick={() => fetchData()} variant="secondary">
            Reload Data
          </Button>
          <Button onClick={getSelectedRows} variant="primary">
            Get Selected Rows
          </Button>
        </div>

        {tableLoading && <p className="text-accent">Loading table data...</p>}
        {tableError && <p className="text-danger">Error: {tableError}</p>}
        {fetchedTableData && (
          <DataTable
            rowData={fetchedTableData}
            columnDefs={columnDefs}
            height="500px" // Increased height for more data
            gridOptions={gridOptions} // Pass advanced grid options
          />
        )}
      </Card>
    </div>
  );
};

export default DataGridPage;