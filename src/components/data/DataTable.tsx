// src/components/data/DataTable.tsx
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, type GridOptions, ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
// Removed: import { type ThemeName } from '../contexts'; // No longer needed here

// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface DataTableProps {
  rowData: any[];
  columnDefs: ColDef[];
  height?: string;
  defaultColDef?: ColDef;
  gridOptions?: GridOptions;
  // Removed: currentTheme: ThemeName; // No longer needed as prop
}

const DataTable: React.FC<DataTableProps> = ({
  rowData,
  columnDefs,
  height = '500px',
  defaultColDef,
  gridOptions,
  // Removed: currentTheme, // No longer destructured
}) => {
  const defaultColDefMemo = useMemo<ColDef>(() => {
    return defaultColDef || {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    };
  }, [defaultColDef]);

  return (
    <div
      className="ag-theme-quartz" // Consistent use of base Quartz theme
      style={{ height, width: '100%' }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDefMemo}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default DataTable;