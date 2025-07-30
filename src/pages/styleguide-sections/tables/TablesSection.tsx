// src/pages/styleguide-sections/tables/TablesSection.tsx
import React, { useState, useMemo, useCallback } from 'react';
import Card from '../../../components/ui/Card'; // Re-use Card for container
import Input from '../../../components/ui/Input'; // <--- ADD THIS IMPORT
import Button from '../../../components/ui/Button'; // Re-use Button for pagination actions
import Table from '../../../components/data/Table'; // Import Simple HTML Table
import Pagination from '../../../components/ui/Pagination'; // Import Pagination
import DataTable from '../../../components/data/DataTable'; // Import AG Grid DataTable
import useDataFetch from '../../../hooks/useDataFetch'; // For DataTable data
import { mockTableData } from '../../../data/mockData'; // For DataTable data and Simple Table data
import { type ColDef, type ICellRendererParams, type IRowNode, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community'; // <--- ADD 'type' keyword for IRowNode

// Register the required AG Grid modules here, as this section uses DataTable
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Custom Cell Renderer Example for AG Grid (copied from DataGridPage.tsx)
const ElectricCarRenderer: React.FC<ICellRendererParams> = (props) => {
  return (
    <span>{props.value ? '⚡ Electric' : '⛽ Gasoline'}</span>
  );
};

const TablesSection: React.FC = () => {
  // Simple Table Data (copied from Styleguide.tsx)
  const simpleTableHeaders = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' },
  ];
  const simpleTableData = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 24, city: 'London' },
    { name: 'Charlie', age: 35, city: 'Paris' },
    { name: 'Diana', age: 28, city: 'Berlin' },
  ];
  const emptyTableData: Record<string, any>[] = [];

  // Pagination states (copied from Styleguide.tsx)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Example total pages
  const totalPagesSmall = 3; // Example small total pages

  // AG Grid DataTable states and logic (copied from DataGridPage.tsx)
  const { data: fetchedTableData, loading: tableLoading, error: tableError, fetchData } = useDataFetch(null, mockTableData);
  const [filterText, setFilterText] = useState<string>(''); // For quick filter
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
      checkboxSelection: true,
      headerCheckboxSelection: true,
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
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      valueFormatter: p => '$' + p.value.toLocaleString(),
      minWidth: 120,
    },
    {
      field: 'electric',
      headerName: 'Type',
      sortable: true,
      filter: 'agSetColumnFilter',
      floatingFilter: true,
      cellRenderer: ElectricCarRenderer,
      minWidth: 120,
    },
  ], []);

  const gridOptions = useMemo(() => ({
    rowSelection: 'multiple' as 'multiple',
    animateRows: true,
    pagination: true,
    paginationPageSize: 5,
    suppressCellFocus: true,
    onFirstDataRendered: (params: any) => params.api.sizeColumnsToFit(),
    onGridReady: onGridReady,
  }), [onGridReady]);

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

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Simple HTML Table</h3>
      <div className="space-y-4">
        <Table
          caption="Sample User Data"
          headers={simpleTableHeaders}
          data={simpleTableData}
        />
        <h4 className="text-lg font-semibold mt-8 mb-4 text-text">Empty Table Example</h4> {/* Adjusted heading level */}
        <Table
          caption="No Data Table"
          headers={simpleTableHeaders}
          data={emptyTableData}
        />
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Pagination</h3>
      <div className="flex flex-col items-center space-y-4">
        <h4 className="text-lg font-semibold text-text">Standard Pagination (10 pages, showing 5 buttons)</h4> {/* Adjusted heading level */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          maxPageButtons={5}
        />
        <p className="text-text">Current Page: {currentPage}</p>

        <h4 className="text-lg font-semibold mt-8 text-text">Pagination with fewer pages (3 pages)</h4> {/* Adjusted heading level */}
        <Pagination
          currentPage={1}
          totalPages={totalPagesSmall}
          onPageChange={(page) => alert(`Small table page: ${page}`)}
          maxPageButtons={5}
        />
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4 text-text">AG Grid Data Table (Advanced)</h3>
      <div className="space-y-4">
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
            height="500px"
            gridOptions={gridOptions}
          />
        )}
      </div>
    </div>
  );
};

export default TablesSection;