import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import WifiLanding from './components/WifiLanding';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.pathname.replace(/\/$/, '') .endsWith('/wifi') ? <WifiLanding /> : <App />}
  </StrictMode>,
);

