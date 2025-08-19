import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { Theme } from '../../interfaces/context/Theme';


const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa con preferencia del sistema o 'light'
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  // Y en useEffect donde cambias el tema:
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme); // Guardar elección
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
export { ThemeProvider, useTheme }