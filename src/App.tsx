// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Layout & Context
import DefaultLayout from './layouts/DefaultLayout';
import { ToastProvider } from './components/ui/ToastContainer'; // <--- ADD THIS IMPORT

// Pages
import Dashboard from './pages/Dashboard';
import DataGridPage from './pages/DataGridPage';
import ChartsPage from './pages/ChartsPage';
import Styleguide from './pages/Styleguide';
import LibraryOverviewPage from './pages/LibraryOverviewPage';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider> {/* <--- WRAP DefaultLayout WITH ToastProvider */}
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data-grid" element={<DataGridPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/libraries" element={<LibraryOverviewPage />} />
          </Routes>
        </DefaultLayout>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;