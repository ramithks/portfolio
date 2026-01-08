import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { HelmetProvider } from 'react-helmet-async';
import { initAnalytics } from './lib/analytics';

// Initialize PostHog Analytics
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
