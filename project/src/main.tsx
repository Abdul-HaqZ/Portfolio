import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

useEffect(() => {
  const closeMenuOnHashChange = () => setIsOpen(false);
  window.addEventListener('hashchange', closeMenuOnHashChange);
  return () => window.removeEventListener('hashchange', closeMenuOnHashChange);
}, []);
