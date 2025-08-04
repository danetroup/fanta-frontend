// scripts/generate-manifest.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');
const LAYOUTS_DIR = path.resolve(__dirname, '../src/layouts');
const DATA_DIR = path.resolve(__dirname, '../src/data');
const HOOKS_DIR = path.resolve(__dirname, '../src/hooks');

const MANIFEST_OUTPUT_PATH = path.resolve(__dirname, '../src/wizardManifest.ts');

const wizardManifest = {
  components: [],
  layouts: [],
  utils: [],
  hooks: [],
  data: [],
};

// --- Helper Functions (same as before) ---

function processDirectory(dirPath, categoryArray) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Warning: Directory not found: ${dirPath}. Skipping.`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, categoryArray);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const metadata = extractMetadataFromJSDoc(content);

      if (metadata) {
        metadata.filePath = path.relative(path.resolve(__dirname, '../src'), fullPath).replace(/\\/g, '/');
        categoryArray.push(metadata);
      }
    }
  }
}

function extractMetadataFromJSDoc(fileContent) {
  const wizardBlockRegex = /\/\*\*\s*\n\s*\*\s*@wizard([\s\S]*?)\*\/[\s\S]*?(?:const|function|export const)\s*([A-Za-z0-9_]+?)(?::\s*React\.FC|<|\(|\s*=\s*|\s*:\s*(\w+)\s*=\s*\([^{]*?\)\s*=>)/m;
  const match = fileContent.match(wizardBlockRegex);

  if (!match) {
    return null;
  }

  const jsdocContent = match[1];
  const componentOrHookNameFromCode = match[2] ? match[2].trim() : (match[3] ? match[3].trim() : 'Unnamed');

  const nameMatch = /@name\s*([^\n\r]+)/.exec(jsdocContent);
  const descriptionMatch = /@description\s*([^\n\r]+)/.exec(jsdocContent);
  const tagsMatch = /@tags\s*([^\n\r]+)/.exec(jsdocContent);
  const categoryMatch = /@category\s*([^\n\r]+)/.exec(jsdocContent);

  const propsRegex = /-\s*name:\s*([^\n\r]+)\s*\n\s*\*?\s*type:\s*([^\n\r]+)\s*\n\s*\*?\s*description:\s*([^\n\r]+)(?:\s*\n\s*\*?\s*default:\s*([^\n\r]+))?/g;
  let propMatch;
  const props = [];
  while ((propMatch = propsRegex.exec(jsdocContent)) !== null) {
    props.push({
      name: propMatch[1].trim(),
      type: propMatch[2].trim(),
      description: propMatch[3].trim(),
      default: propMatch[4] ? propMatch[4].trim() : undefined,
    });
  }

  const returnsRegex = /@returns\s*\n(?:\s*\*?\s*-\s*name:\s*([^\n\r]+)\s*\n\s*\*?\s*type:\s*([^\n\r]+)\s*\n\s*\*?\s*description:\s*([^\n\r]+))+/g;
  let returnsMatch = returnsRegex.exec(jsdocContent);
  const returns = [];
  if (returnsMatch) {
      const singleReturnRegex = /-\s*name:\s*([^\n\r]+)\s*\n\s*\*?\s*type:\s*([^\n\r]+)\s*\n\s*\*?\s*description:\s*([^\n\r]+)/g;
      let singleReturnMatch;
      while((singleReturnMatch = singleReturnRegex.exec(returnsMatch[0])) !== null) {
          returns.push({
              name: singleReturnMatch[1].trim(),
              type: singleReturnMatch[2].trim(),
              description: singleReturnMatch[3].trim(),
          });
      }
  }

  return {
    name: (nameMatch && nameMatch[1].trim()) || componentOrHookNameFromCode,
    description: (descriptionMatch && descriptionMatch[1].trim()) || '',
    tags: tagsMatch ? tagsMatch[1].split(',').map(tag => tag.trim()) : [],
    category: (categoryMatch && categoryMatch[1].trim()) || 'uncategorized',
    props: props,
    returns: returns.length > 0 ? returns : undefined,
  };
}

// --- Main Execution ---
console.log('Generating wizard manifest...');

wizardManifest.components = [];
wizardManifest.layouts = [];
wizardManifest.utils = [];
wizardManifest.hooks = [];
wizardManifest.data = [];

processDirectory(COMPONENTS_DIR, wizardManifest.components);

try {
  const defaultLayoutPath = path.join(LAYOUTS_DIR, 'DefaultLayout.tsx');
  if (fs.existsSync(defaultLayoutPath)) {
    const defaultLayoutContent = fs.readFileSync(defaultLayoutPath, 'utf8');
    const defaultLayoutMetadata = extractMetadataFromJSDoc(defaultLayoutContent);
    if (defaultLayoutMetadata) {
      defaultLayoutMetadata.filePath = path.relative(path.resolve(__dirname, '../src'), defaultLayoutPath).replace(/\\/g, '/');
      wizardManifest.layouts.push(defaultLayoutMetadata);
    }
  } else {
    console.warn(`Could not find DefaultLayout.tsx at ${defaultLayoutPath}. Skipping.`);
  }
} catch (error) {
  console.warn(`Error processing DefaultLayout.tsx: ${error.message}`);
}

try {
  const themeContextFilePath = path.join(path.resolve(__dirname, '../src/contexts'), 'ThemeContext.tsx');
  if (fs.existsSync(themeContextFilePath)) {
    const themeContextContent = fs.readFileSync(themeContextFilePath, 'utf8');
    const themeProviderMetadata = extractMetadataFromJSDoc(themeContextContent);
    if (themeProviderMetadata && themeProviderMetadata.name === 'ThemeProvider') {
      themeProviderMetadata.filePath = path.relative(path.resolve(__dirname, '../src'), themeContextFilePath).replace(/\\/g, '/');
      wizardManifest.utils.push(themeProviderMetadata);
    }
    const useThemeJSDocRegex = /\/\*\*\s*\n\s*\*\s*@wizard[\s\S]*?(?=\n\s*\*\s*export const useTheme)/m;
    const useThemeJSDocMatch = themeContextContent.match(useThemeJSDocRegex);
    if (useThemeJSDocMatch) {
      const useThemeContent = useThemeJSDocMatch[0] + 'export const useTheme = () => {';
      const useThemeMetadata = extractMetadataFromJSDoc(useThemeContent);
      if (useThemeMetadata && useThemeMetadata.name === 'useTheme') {
        useThemeMetadata.filePath = path.relative(path.resolve(__dirname, '../src'), themeContextFilePath).replace(/\\/g, '/');
        wizardManifest.hooks.push(useThemeMetadata);
      }
    }
  } else {
    console.warn(`Could not find ThemeContext.tsx at ${themeContextFilePath}. Skipping.`);
  }
} catch (error) {
  console.warn(`Error processing ThemeContext.tsx: ${error.message}`);
}

try {
  const useDataFetchFilePath = path.join(HOOKS_DIR, 'useDataFetch.ts');
  if (fs.existsSync(useDataFetchFilePath)) {
    const useDataFetchContent = fs.readFileSync(useDataFetchFilePath, 'utf8');
    const useDataFetchMetadata = extractMetadataFromJSDoc(useDataFetchContent);
    if (useDataFetchMetadata) {
      useDataFetchMetadata.filePath = path.relative(path.resolve(__dirname, '../src'), useDataFetchFilePath).replace(/\\/g, '/');
      wizardManifest.hooks.push(useDataFetchMetadata);
    }
  } else {
    console.warn(`Could not find useDataFetch.ts at ${useDataFetchFilePath}. Skipping.`);
  }
} catch (error) {
  console.warn(`Error processing useDataFetch.ts: ${error.message}`);
}

try {
  const mockDataFilePath = path.join(DATA_DIR, 'mockData.ts');
  if (fs.existsSync(mockDataFilePath)) {
    wizardManifest.data.push({
      name: 'Mock Data Sets',
      description: 'Pre-defined datasets for prototyping tables, charts, and other data-driven components.',
      tags: ['data', 'mock', 'example'],
      category: 'data',
      availableData: [
        'mockTableData',
        'mockChartData',
        'mockPieChartData',
        'mockLargeTableData',
      ],
      filePath: path.relative(path.resolve(__dirname, '../src'), mockDataFilePath).replace(/\\/g, '/')
    });
  } else {
      console.warn(`Warning: mockData.ts not found at ${mockDataFilePath}. Skipping mock data entry.`);
  }
} catch (error) {
    console.warn(`Error processing mockData.ts: ${error.message}`);
}


// Convert to TypeScript export string
const manifestContent = `// This file is auto-generated by scripts/generate-manifest.js
// Do not modify this file directly.

// Import the types from your dedicated types file
import type { WizardManifest } from './types/wizard'; // <--- UPDATED PATH

export const wizardManifest: WizardManifest = ${JSON.stringify(wizardManifest, null, 2)} as const;
`;

fs.writeFileSync(MANIFEST_OUTPUT_PATH, manifestContent, 'utf8');
console.log(`Wizard manifest generated at ${MANIFEST_OUTPUT_PATH}`);