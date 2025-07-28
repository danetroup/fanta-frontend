// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Layout & Context
import DefaultLayout from './layouts/DefaultLayout';

// Pages
import Dashboard from './pages/Dashboard';
import DataGridPage from './pages/DataGridPage';
import ChartsPage from './pages/ChartsPage';
import Styleguide from './pages/Styleguide';
import LibraryOverviewPage from './pages/LibraryOverviewPage'; // <--- ADD THIS IMPORT

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data-grid" element={<DataGridPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="/libraries" element={<LibraryOverviewPage />} /> {/* <--- ADD THIS ROUTE */}
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;