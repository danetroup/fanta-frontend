import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export type ThemeName = 'light' | 'dark' | 'corporate' | 'midnight' | 'blueprint';

interface ThemeContextType {
  theme: ThemeName;
  availableThemes: ThemeName[];
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const availableThemes: ThemeName[] = ['light', 'dark', 'corporate', 'midnight', 'blueprint'];

  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as ThemeName;
      if (storedTheme && availableThemes.includes(storedTheme)) {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches && availableThemes.includes('dark')) {
        return 'dark';
      }
    }
    return 'light';
  });

  const setTheme = useCallback((newTheme: ThemeName) => {
    if (!availableThemes.includes(newTheme)) {
      console.warn(`Attempted to set an unsupported theme: ${newTheme}`);
      return;
    }
    // Logic now only updates state and localStorage
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [availableThemes]);

  // This useEffect is now the single source of truth for the DOM side-effect.
  useEffect(() => {
    const root = document.documentElement;
    root.className = ''; // Clear all existing classes
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, availableThemes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};