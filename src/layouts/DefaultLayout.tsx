import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme, type ThemeName } from '../contexts';
import { Menu, MenuItem } from '../components/ui/Menu'; // <-- Import Menu components
import Button from '../components/ui/Button';           // <-- Import Button
import Icon from '../components/ui/Icon';             // <-- Import Icon

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { theme, availableThemes, setTheme } = useTheme();

  // Helper to format theme names for display
  const formatThemeName = (t: ThemeName) => t.charAt(0).toUpperCase() + t.slice(1);

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
            {/* Replaced Select with a Menu for a cleaner UI */}
            <Menu
              trigger={
                <Button variant="secondary" size="sm" iconAfter={<Icon name="chevron-down" size={16} />}>
                  {formatThemeName(theme)}
                </Button>
              }
              position="bottom-right"
            >
              {availableThemes.map((t) => (
                <MenuItem key={t} onClick={() => setTheme(t)}>
                  <Icon name={theme === t ? 'check-circle' : 'circle'} size={16} className="mr-2" />
                  {formatThemeName(t)}
                </MenuItem>
              ))}
            </Menu>
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
