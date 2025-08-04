import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Table from '../../../components/data/Table';
import Pagination from '../../../components/ui/Pagination';
import DataTable from '../../../components/data/DataTable';
import Badge from '../../../components/ui/Badge';
import useDataFetch from '../../../hooks/useDataFetch';
import { mockTableData, mockLargeTableData } from '../../../data/mockData';
// Import necessary AG Grid modules
import {
  type ColDef,
  type ICellRendererParams,
  type IRowNode,
  ModuleRegistry,
  ClientSideRowModelModule
} from 'ag-grid-community';

// Register the required AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
]);

const ElectricCarRenderer: React.FC<ICellRendererParams> = (props) => {
  return <span>{props.value ? '⚡ Electric' : '⛽ Gasoline'}</span>;
};

const StatusCell: React.FC<{ value: string }> = ({ value }) => {
  const variant = {
    Active: 'success' as const,
    Inactive: 'danger' as const,
    Pending: 'warning' as const,
  }[value] || 'secondary';
  return <Badge variant={variant}>{value}</Badge>;
};

const EmailCell: React.FC<{ value: string }> = ({ value }) => {
  return <a href={`mailto:${value}`} className="text-primary hover:underline">{value}</a>;
};

const TablesSection: React.FC = () => {
  // --- States for Simple Paginated Table ---
  const [simpleTablePage, setSimpleTablePage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const simpleTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email', render: (value: string) => <EmailCell value={value} /> },
    { key: 'status', label: 'Status', render: (value: string) => <StatusCell value={value} /> },
  ];
  const paginatedData = useMemo(() => {
    const start = (simpleTablePage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return mockLargeTableData.slice(start, end);
  }, [simpleTablePage]);
  const totalSimplePages = Math.ceil(mockLargeTableData.length / ITEMS_PER_PAGE);

  // --- States for AG Grid DataTable ---
  const { data: fetchedTableData, loading: tableLoading, error: tableError, fetchData } = useDataFetch(null, mockTableData);
  const [filterText, setFilterText] = useState<string>('');
  const [gridApi, setGridApi] = useState<any>(null);

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridApi) {
      gridApi.setQuickFilter(filterText);
    }
  }, [filterText, gridApi]);

  const columnDefs: ColDef[] = useMemo(() => [
    { field: 'make', headerName: 'Manufacturer', sortable: true, filter: true, floatingFilter: true, checkboxSelection: true, headerCheckboxSelection: true, minWidth: 150 },
    { field: 'model', headerName: 'Model Name', sortable: true, filter: true, floatingFilter: true, minWidth: 150 },
    { field: 'price', headerName: 'Price ($)', sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true, valueFormatter: p => '$' + p.value.toLocaleString(), minWidth: 120 },
    { field: 'electric', headerName: 'Type', sortable: true, filter: true, floatingFilter: true, cellRenderer: ElectricCarRenderer, minWidth: 120 },
  ], []);

  const defaultColDef: ColDef = useMemo(() => ({
    resizable: true,
  }), []);

  const gridOptions = useMemo(() => ({
    rowSelection: 'multiple' as 'multiple',
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    suppressCellFocus: true,
    onFirstDataRendered: (params: any) => params.api.sizeColumnsToFit(),
    onGridReady: onGridReady,
    defaultColDef: defaultColDef,
  }), [onGridReady, defaultColDef]);

  const getSelectedRows = useCallback(() => {
    if (gridApi) {
      const selectedNodes: IRowNode[] = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      alert(`Selected Rows: ${JSON.stringify(selectedData, null, 2)}`);
    }
  }, [gridApi]);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Tables & Data Grids</h2>

      <Card id="tables-simple" className="scroll-mt-20" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Simple Paginated Table</h3>
        <p className="text-text-light mb-4">
          A basic HTML table with client-side pagination. This example uses custom renderers for the email and status columns.
        </p>
        <Table headers={simpleTableHeaders} data={paginatedData} />
        <div className="mt-4 flex justify-center">
          <Pagination currentPage={simpleTablePage} totalPages={totalSimplePages} onPageChange={setSimpleTablePage} />
        </div>
      </Card>

      <Card id="tables-aggrid" className="scroll-mt-20" padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">AG Grid Data Table (Advanced)</h3>
        <p className="text-text-light mb-4">
          A powerful data grid with advanced filtering. Use the quick filter for a global search or the inputs below each header for column-specific filtering.
        </p>
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Quick Filter (searches all columns)..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyUp={onFilterTextBoxChanged}
            className="flex-1"
          />
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
            height="500px"
            gridOptions={gridOptions}
          />
        )}
      </Card>
    </div>
  );
};

export default TablesSection;
