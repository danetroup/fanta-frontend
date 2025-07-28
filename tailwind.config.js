/** @type {import('tailwindcss').Config} */
export default {
  content: [ // Essential for v3 content scanning
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Keep this for theming
  theme: {
    extend: {
      colors: { // Standard v3 color mapping with var()
        primary: 'var(--app-primary-color)',
        secondary: 'var(--app-secondary-color)',
        accent: 'var(--app-accent-color)',
        text: 'var(--app-text-color)',
        background: 'var(--app-bg-color)',
        card: {
          DEFAULT: 'var(--app-card-bg-color)',
        },
        border: 'var(--app-border-color)',
      }
    },
  },
  plugins: [],
}