import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import WifiLanding from './components/WifiLanding';
import { ThemeProvider } from './components/ui/ThemeToggle';
import './index.css';
import './responsive.css';
import './gun-design.css';
import './interaction-polish.css';
import './wifi-compact.css';
import './wifi-showroom.css';
import './wifi-cinematic.css';
import './theme.css';
import './portfolio-motion.css';
import './cv.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>{window.location.pathname.replace(/\/$/, '') .endsWith('/wifi') ? <WifiLanding /> : <App />}</ThemeProvider>
  </StrictMode>,
);

