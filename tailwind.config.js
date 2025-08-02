/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--app-font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--app-font-serif)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // Simple mapping using the full color variables
        primary: 'var(--app-primary-color)',
        secondary: 'var(--app-secondary-color)',
        accent: 'var(--app-accent-color)',
        text: 'var(--app-text-color)',
        background: 'var(--app-bg-color)',
        card: 'var(--app-card-bg-color)',
        border: 'var(--app-border-color)',
        'bg-hover': 'var(--app-bg-color-hover)',
        danger: 'rgb(var(--app-danger-color-raw) / <alpha-value>)',
        'danger-foreground': 'var(--app-danger-foreground-color)',
        
        // Foreground colors can still be mapped directly
        'primary-foreground': 'var(--app-primary-foreground-color)',
        'secondary-foreground': 'var(--app-secondary-foreground-color)',
        'accent-foreground': 'var(--app-accent-foreground-color)',
      }
    },
  },
  plugins: [],
}