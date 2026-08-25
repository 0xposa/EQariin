import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './LandingPage';
import EditorPage from './EditorPage';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<EditorPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
