// src/components/data/Table.tsx
import React from 'react';

interface TableHeaderColumn {
  key: string;
  label: string;
  className?: string; // Tailwind classes for the header cell
}

interface TableProps {
  headers: TableHeaderColumn[];
  data: Record<string, any>[]; // Array of objects for table rows
  caption?: string; // Optional caption for accessibility
  className?: string; // Classes for the outer <table> element
  rowClassName?: string | ((rowData: Record<string, any>, rowIndex: number) => string); // Classes for <tr>
  cellClassName?: string | ((rowData: Record<string, any>, columnKey: string, rowIndex: number, colIndex: number) => string); // Classes for <td>
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  caption,
  className,
  rowClassName,
  cellClassName,
}) => {
  const baseTableStyles = 'w-full table-auto text-left border-collapse';
  const headerBaseStyles = 'px-4 py-2 text-sm font-semibold uppercase tracking-wider border-b';
  const rowBaseStyles = 'border-b last:border-b-0'; // Apply border to all but last row
  const cellBaseStyles = 'px-4 py-2 text-sm';

  // Theme-aware styles
  const tableThemeStyles = 'bg-card border-border text-text';
  const headerThemeStyles = 'bg-background border-border text-text';
  const rowThemeStyles = 'border-border'; // Only border color here
  const cellThemeStyles = 'text-text';

  const getRowClass = (rowData: Record<string, any>, rowIndex: number) => {
    const customClass = typeof rowClassName === 'function' ? rowClassName(rowData, rowIndex) : rowClassName;
    return `${rowBaseStyles} ${rowThemeStyles} ${customClass || ''}`;
  };

  const getCellClass = (rowData: Record<string, any>, columnKey: string, rowIndex: number, colIndex: number) => {
    const customClass = typeof cellClassName === 'function' ? cellClassName(rowData, columnKey, rowIndex, colIndex) : cellClassName;
    return `${cellBaseStyles} ${cellThemeStyles} ${customClass || ''}`;
  };

  return (
    <table className={`${baseTableStyles} ${tableThemeStyles} ${className || ''}`}>
      {caption && <caption className="p-2 text-lg font-medium text-text-light caption-top">{caption}</caption>}
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              className={`${headerBaseStyles} ${headerThemeStyles} ${header.className || ''}`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="px-4 py-8 text-center text-text-light">
              No data available.
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className={getRowClass(row, rowIndex)}>
              {headers.map((header, colIndex) => (
                <td
                  key={header.key}
                  className={getCellClass(row, header.key, rowIndex, colIndex)}
                >
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;