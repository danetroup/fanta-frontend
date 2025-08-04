// src/data/mockUsers.ts
import type { ColDef } from 'ag-grid-community';

export interface MockUser {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
  role: 'Admin' | 'User' | 'Guest'; // Added new field
  lastLogin: string; // Date string
}

export const mockUsers: MockUser[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active', role: 'Admin', lastLogin: '2025-07-30' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive', role: 'User', lastLogin: '2025-07-25' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', status: 'Active', role: 'User', lastLogin: '2025-07-29' },
  { id: 4, name: 'Mary Williams', email: 'mary.w@example.com', status: 'Pending', role: 'Guest', lastLogin: '2025-07-28' },
  { id: 5, name: 'David Brown', email: 'david.brown@example.com', status: 'Active', role: 'Admin', lastLogin: '2025-07-31' },
  // ... expand to 20-30 entries for robust table testing
];

// Optional: Example column definitions for AG Grid
export const mockUserColumnDefs: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Name', filter: true, sortable: true },
  { field: 'email', headerName: 'Email', filter: true },
  { field: 'status', headerName: 'Status', cellRenderer: (params: any) => {
    const statusMap = {
      'Active': 'bg-green-500/20 text-green-700',
      'Inactive': 'bg-red-500/20 text-red-700',
      'Pending': 'bg-yellow-500/20 text-yellow-700',
    };
    const className = statusMap[params.value] || 'bg-gray-200 text-gray-800';
    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}">${params.value}</span>`;
  }}, // Example of custom renderer for status
  { field: 'role', headerName: 'Role', sortable: true },
  { field: 'lastLogin', headerName: 'Last Login', sortable: true },
];