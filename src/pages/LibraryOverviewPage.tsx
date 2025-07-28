// src/pages/LibraryOverviewPage.tsx
import React from 'react';
import Card from '../components/ui/Card';
import { List, ListItem } from '../components/ui/List'; // Re-using List component

const LibraryOverviewPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold text-text mb-6">Library Overview</h1>

      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Core Technologies</h2>
        <List type="ul" className="list-disc list-inside space-y-2">
          <ListItem>
            **React**: A JavaScript library for building user interfaces.
            <a href="https://react.dev/docs" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **TypeScript**: A strongly typed superset of JavaScript that compiles to plain JavaScript.
            <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **Vite**: A fast frontend build tool that provides a lightning-fast development experience.
            <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **Tailwind CSS v3**: A utility-first CSS framework for rapidly building custom designs.
            <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **Sass (Dart Sass)**: A CSS preprocessor for advanced styling capabilities (used for AG Grid theming).
            <a href="https://sass-lang.com/documentation/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **React Router DOM**: Declarative routing for React applications.
            <a href="https://reactrouter.com/en/main/start/overview" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
        </List>
      </Card>

      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Integrated Libraries</h2>
        <List type="ul" className="list-disc list-inside space-y-2">
          <ListItem>
            **AG Grid**: A feature-rich data table/grid component for displaying large datasets.
            <a href="https://www.ag-grid.com/react-data-grid/getting-started/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **Recharts**: A composable charting library built with React and D3.
            <a href="https://recharts.org/en-US/api" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **React Select**: A flexible and extensible React select/dropdown component with multiselect and autocomplete features.
            <a href="https://react-select.com/home" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            **React Datepicker**: A simple and reusable datepicker component for React.
            <a href="https://reactdatepicker.com/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
        </List>
      </Card>

      {/* You can add more sections here, e.g., "Development Tools," "Testing Frameworks" */}
    </div>
  );
};

export default LibraryOverviewPage;