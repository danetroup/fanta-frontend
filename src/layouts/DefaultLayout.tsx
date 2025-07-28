// src/layouts/DefaultLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme, type ThemeName } from '../contexts';
import Select from '../components/ui/Select'; // <--- IMPORT OUR CUSTOM SELECT

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { theme, availableThemes, setTheme } = useTheme();

  // Options for the theme switcher Select component
  const themeSelectOptions = availableThemes.map(t => ({
    value: t,
    label: t.charAt(0).toUpperCase() + t.slice(1) + ' Mode',
  }));

  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-text">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rapid Prototype App</h1>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-secondary transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/data-grid" className="text-white hover:text-secondary transition-colors duration-200">
            Data Grid
          </Link>
          <Link to="/charts" className="text-white hover:text-secondary transition-colors duration-200">
            Charts
          </Link>
          <Link to="/styleguide" className="text-white hover:text-secondary transition-colors duration-200">
            Style Guide
          </Link>
          <Link to="/libraries" className="text-white hover:text-secondary transition-colors duration-200">
            Libraries
          </Link>
          <div className="flex items-center space-x-2 ml-4">
            {/* Replaced native select with our custom Select component */}
            
            <Select
              id="theme-select"
              options={themeSelectOptions}
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              className="w-36" // Give it a fixed width so it doesn't jump
              // The Select component itself applies the px-3 py-1 rounded-md bg-secondary text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent
            />
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white p-4 text-center text-sm shadow-inner">
        &copy; {new Date().getFullYear()} Rapid Prototyping Boilerplate
      </footer>
    </div>
  );
};

export default DefaultLayout;