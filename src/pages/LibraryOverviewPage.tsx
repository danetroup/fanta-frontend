import React from 'react';
import Card from '../components/ui/Card';
import { List, ListItem } from '../components/ui/List'; // Re-using List component
import PageHeader from '../components/templates/PageHeader'; // <-- Import PageHeader

const LibraryOverviewPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <PageHeader
        title="Library Overview & Project Context"
        description="The core technologies and libraries that power this prototyping tool."
      />

      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Core Technologies</h2>
        <List type="ul" className="list-disc list-inside space-y-2">
          <ListItem>
            <strong>React</strong>: A JavaScript library for building user interfaces.
            <a href="https://react.dev/docs" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>TypeScript</strong>: A strongly typed superset of JavaScript that compiles to plain JavaScript.
            <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>Vite</strong>: A fast frontend build tool that provides a lightning-fast development experience.
            <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>Tailwind CSS v3</strong>: A utility-first CSS framework for rapidly building custom designs.
            <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>Sass (Dart Sass)</strong>: A CSS preprocessor for advanced styling capabilities (used for AG Grid theming).
            <a href="https://sass-lang.com/documentation/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>React Router DOM</strong>: Declarative routing for React applications.
            <a href="https://reactrouter.com/en/main/start/overview" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
        </List>
      </Card>

      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Integrated Libraries</h2>
        <List type="ul" className="list-disc list-inside space-y-2">
          <ListItem>
            <strong>Lucide React</strong>: A beautiful and consistent open-source icon set.
            <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>AG Grid</strong>: A feature-rich data table/grid component for displaying large datasets.
            <a href="https://www.ag-grid.com/react-data-grid/getting-started/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>Recharts</strong>: A composable charting library built with React and D3.
            <a href="https://recharts.org/en-US/api" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>React Select</strong>: A flexible and extensible React select/dropdown component with multiselect and autocomplete features.
            <a href="https://react-select.com/home" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>React Datepicker</strong>: A simple and reusable datepicker component for React.
            <a href="https://reactdatepicker.com/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
          <ListItem>
            <strong>Tippy.js</strong>: A highly customizable tooltip, popover, dropdown, and menu library.
            <a href="https://atomiks.github.io/tippyjs/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
          </ListItem>
        </List>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Development Tools</h2>
        <List type="ul" className="list-disc list-inside space-y-2">
            <ListItem>
                <strong>ESLint</strong>: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
                <a href="https://eslint.org/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
            </ListItem>
            <ListItem>
                <strong>Prettier</strong>: An opinionated code formatter that enforces a consistent style.
                <a href="https://prettier.io/" target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Official Docs</a>
            </ListItem>
        </List>
      </Card>

      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Project Context & Summary</h2>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <div>
            <h3>Project Goal</h3>
            <p>
              To establish a robust, scalable, and highly customizable frontend boilerplate for rapid prototyping and application development. The project aims to provide a comprehensive, theme-aware UI component library and a solid architectural foundation, enabling quick iteration and deployment of user interfaces for various projects.
            </p>
          </div>

          <div>
            <h3>Current State & Architecture</h3>
            <p>
              The project exists as a public GitHub repository, serving as a <strong>boilerplate starter kit</strong>. This current iteration is a fully functional <strong>frontend-only application</strong> designed to be cloned/forked by developers to kickstart new projects.
            </p>
          </div>

          <div>
            <h3>Core Features</h3>
            <ul>
              <li><strong>Comprehensive Theming System:</strong> Class-based theme toggling (e.g., `light`, `dark`) with CSS variables. Theme preference persists in `localStorage`.</li>
              <li><strong>Core UI Components (`src/components/ui`):</strong> A rich set of atomic components like Buttons, Cards, Modals, Icons, and more, all written in TypeScript and theme-aware.</li>
              <li><strong>Layout Components (`src/components/templates`):</strong> High-level components for page structure like `PageHeader`, `SectionHeader`, and `ActionBar`.</li>
              <li><strong>Form & Data Components:</strong> Includes a dynamic `FormTemplate`, `FileUpload`, `DataTable` (AG Grid), and `Charts` (Recharts).</li>
              <li><strong>Style Guide:</strong> A comprehensive visual showcase with dedicated tabs for all components and patterns.</li>
            </ul>
          </div>

          <div>
            <h3>Development Journey Notes</h3>
            <p>Key technical challenges and solutions discovered during development include:</p>
            <ul>
                <li>Ensuring custom CSS variables correctly cascade and override third-party library styles.</li>
                <li>Configuring Vite and Sass for correct `node_modules` path resolution.</li>
                <li>Managing component animation states with `requestAnimationFrame` for smooth transitions.</li>
            </ul>
          </div>

          <div>
            <h3>Future Context</h3>
            <p>
              The project is open source (MIT License) and intended to be used as a starter template. The long-term plan involves potentially extracting the reusable components into a separately published private NPM package for easier versioning and distribution in consuming projects.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LibraryOverviewPage;
