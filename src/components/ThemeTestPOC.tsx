import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Use your existing context

const ThemeTestPOC: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();

  // Helper to format theme names for display
  const formatThemeName = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

  return (
    // The root element uses the theme's background and text color
    <div className="bg-background text-text font-sans p-8 min-h-screen">
      
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-primary">Theme Strategy POC</h1>

        <p>
          This is a minimal test to validate that the core theming system is working. 
          The colors and fonts on this page should change when you select a new theme from the dropdown below.
        </p>

        {/* --- The Theme Switcher --- */}
        <div>
          <label htmlFor="theme-switcher" className="block mb-2 font-bold">Select Theme:</label>
          <select
            id="theme-switcher"
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="p-2 rounded bg-card border border-border"
          >
            {availableThemes.map((t) => (
              <option key={t} value={t}>
                {formatThemeName(t)}
              </option>
            ))}
          </select>
        </div>

        {/* --- Color and Font Test Swatches --- */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary text-white">
            This is the <span className="font-bold">Primary</span> color. (bg-primary)
          </div>
          <div className="p-4 rounded-lg bg-secondary text-white">
            This is the <span className="font-bold">Secondary</span> color. (bg-secondary)
          </div>
          <div className="p-4 rounded-lg bg-accent text-white">
            This is the <span className="font-bold">Accent</span> color. (bg-accent)
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            This is a <span className="font-bold">Card</span> on the <span className="font-bold">Background</span> color. (bg-card, border-border)
          </div>
          <p className="font-serif text-lg">
            This paragraph uses the theme's serif font. (font-serif)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeTestPOC;