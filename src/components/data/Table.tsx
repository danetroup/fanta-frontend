import React from 'react';
import EmptyState from '../ui/EmptyState';

// Define the shape of the header objects
interface TableHeader {
  key: string;
  label: string;
  // Add an optional render function for custom cell content
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface TableProps {
  headers: TableHeader[];
  data: Record<string, any>[];
  caption?: string;
  className?: string;
}

/**
 * A simple, theme-aware HTML table component.
 * It supports custom cell rendering for advanced use cases.
 */
const Table: React.FC<TableProps> = ({ headers, data, caption, className }) => {
  return (
    <div className={`overflow-x-auto rounded-lg border border-border ${className || ''}`}>
      <table className="w-full text-left">
        {caption && <caption className="p-4 text-lg font-semibold text-text bg-card-alt">{caption}</caption>}
        <thead className="bg-card-alt">
          <tr>
            {headers.map((header) => (
              <th key={header.key} scope="col" className="p-4 text-sm font-semibold text-text">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-primary/5">
                {headers.map((header) => {
                  const value = row[header.key];
                  return (
                    <td key={header.key} className="p-4 text-sm text-text-light">
                      {/* Use the custom render function if it exists, otherwise display the raw value */}
                      {header.render ? header.render(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>
                <div className="p-8">
                  <EmptyState
                    title="No Data Available"
                    description="There is no data to display in this table."
                    icon="📊"
                  />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
