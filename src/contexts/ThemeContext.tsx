// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export type ThemeName = 'light' | 'dark' | 'corporate' | 'midnight';

interface ThemeContextType {
  theme: ThemeName;
  availableThemes: ThemeName[];
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const availableThemes: ThemeName[] = ['light', 'dark', 'corporate', 'midnight'];

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
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = '';
    document.documentElement.classList.add(newTheme);
  }, [availableThemes]);

  useEffect(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add(theme);
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