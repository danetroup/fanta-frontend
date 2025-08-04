// src/contexts/ThemeContext.tsx

/**
 * @wizard
 * @name ThemeProvider
 * @description Provides the global theme context to the application, enabling dynamic theme switching and persistence.
 * @tags context, theme, provider, global, utility
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The application's UI components that will consume the theme context.
 * @category utility
 */
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
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [availableThemes]);

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, availableThemes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * @wizard
 * @name useTheme
 * @description A React hook to access the current theme, available themes, and theme setter from the `ThemeProvider`.
 * @tags hook, theme, context, utility
 * @returns
 * - name: theme
 * type: ThemeName
 * description: The current active theme.
 * - name: availableThemes
 * type: ThemeName[]
 * description: An array of all theme names supported by the application.
 * - name: setTheme
 * type: (themeName: ThemeName) => void
 * description: A function to change the application's theme.
 * @category utility
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};