// src/main.tsx
import './polyfills.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { CDPHooksProvider } from '@coinbase/cdp-hooks';
import App from './app.tsx';
import './index.css';

const cdpProjectId = import.meta.env.VITE_COINBASE_PUBLIC_CDP_PROJECT_ID;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.shake-defi.com';

const cdpConfig = {
  projectId: cdpProjectId,
  basePath: `${API_ENDPOINT}/cdp-proxy`,
  ethereum: {
    createOnLogin: 'eoa' as const,
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CDPHooksProvider config={cdpConfig}>
      <Router>
        <App />
      </Router>
    </CDPHooksProvider>
  </StrictMode>
);