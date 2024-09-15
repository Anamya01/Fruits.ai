import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import FAQPage from './Components/FAQPage';
import AboutPage from './Components/AboutPage';
import ErrorBoundary from './Components/ErrorBoundary';
import './Styles/base.css';
import TranslatorPage from './Components/TranslatorPage';
import ChatbotPage from './Components/ChatbotPage';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/translator" element={<TranslatorPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="*" element={<div>404: Not Found</div>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}