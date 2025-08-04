// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// Layout & Context
import DefaultLayout from './layouts/DefaultLayout';
import { ToastProvider } from './components/ui/ToastContainer';
import { ThemeProvider } from './contexts/ThemeContext';

// Pages
import Dashboard from './pages/Dashboard';
import DataGridPage from './pages/DataGridPage';
import ChartsPage from './pages/ChartsPage';
import Styleguide from './pages/Styleguide';
import LibraryOverviewPage from './pages/LibraryOverviewPage';
import ScreenBuilder from './pages/ScreenBuilder';
import LibraryReferencePage from './pages/LibraryReferencePage'; 

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data-grid" element={<DataGridPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/styleguide" element={<Styleguide />} />
              <Route path="/libraries" element={<LibraryOverviewPage />} />
              <Route path="/screen-builder" element={<ScreenBuilder />} />
              <Route path="/library-reference" element={<LibraryReferencePage />} /> {/* <--- ADD THIS ROUTE */}
            </Routes>
          </DefaultLayout>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;