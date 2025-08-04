// src/types/wizard.d.ts

// Import necessary types from external libraries if any of your props use them
import type { ColDef, GridOptions } from 'ag-grid-community';
import type { ThemeName } from '../contexts/ThemeContext'; // Assuming this path is correct

// Define the shape of a wizard entry for components/layouts/utils/data
export interface WizardEntry {
  name: string;
  description: string;
  tags: string[];
  category: string;
  filePath: string;
  props?: {
    name: string;
    type: string;
    description: string;
    default?: string;
  }[];
  availableData?: string[]; // Specific for mock data
  returns?: { // Now supports parsing @returns for hooks
    name: string;
    type: string;
    description: string;
  }[];
}

// Define the overall shape of the wizard manifest
export interface WizardManifest {
  components: WizardEntry[];
  layouts: WizardEntry[];
  utils: WizardEntry[]; // For providers, etc.
  hooks: WizardEntry[]; // For custom hooks like useDataFetch, useTheme
  data: WizardEntry[];
}