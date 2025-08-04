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

/**
 * @wizard
 * @name DataTable
 * @description A powerful data grid component that wraps AG Grid, providing advanced features like sorting, filtering, and resizing, fully themed to match the application.
 * @tags data-display, grid, table, ag-grid, advanced
 * @props
 * - name: rowData
 * type: any[]
 * description: The data to display in the grid, an array of row objects.
 * - name: columnDefs
 * type: ColDef[]
 * description: An array defining the columns of the grid, using AG Grid's `ColDef` structure.
 * - name: height
 * type: string
 * description: The height of the data table container (e.g., '500px', '100%').
 * default: '500px'
 * - name: defaultColDef
 * type: ColDef
 * description: Default column definitions applied to all columns unless overridden.
 * - name: gridOptions
 * type: GridOptions
 * description: Additional AG Grid options to configure the grid's behavior.
 * @category data-display
 */

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