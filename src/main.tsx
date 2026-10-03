import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import WifiLanding from './components/WifiLanding';
import InternetRegistration from './components/InternetRegistration';
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
import './lead-form.css';

const path = window.location.pathname.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>{path.endsWith('/wifi/dang-ky') ? <InternetRegistration/> : path.endsWith('/wifi') ? <WifiLanding /> : <App />}</ThemeProvider>
  </StrictMode>,
);

