import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';
const key = 'hai-theme';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);
const systemTheme = (): Theme => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(key);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* Storage may be unavailable in a private browser. */ }
  return systemTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101011' : '#fffaf3');
  }, [theme]);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setTheme(readTheme());
    const systemChange = () => {
      try { if (localStorage.getItem(key)) return; } catch { /* Follow the system without storage. */ }
      setTheme(systemTheme());
    };
    const storage = (event: StorageEvent) => { if (event.key === key || event.key === null) sync(); };
    media.addEventListener('change', systemChange);
    window.addEventListener('storage', storage);
    return () => { media.removeEventListener('change', systemChange); window.removeEventListener('storage', storage); };
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(key, next); } catch { /* The current page can still switch. */ }
    setTheme(next);
  };
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) return null;
  const { theme, toggle } = context;
  const label = theme === 'dark' ? 'Bật giao diện sáng' : 'Bật giao diện tối';
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={label} title={label} aria-pressed={theme === 'dark'}>
    <span className="theme-toggle-icons" aria-hidden="true"><Sun size={19} className="theme-sun"/><Moon size={18} className="theme-moon"/></span>
  </button>;
}
