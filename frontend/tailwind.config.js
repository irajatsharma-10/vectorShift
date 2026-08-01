/**
 * @file tailwind.config.js
 * @description Tailwind CSS Configuration for design system tokens and theme variables.
 * @module tailwind.config
 */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        canvas: {
          DEFAULT: '#F9FAFB',
          dark: '#000000',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#111111',
        },
        edge: {
          DEFAULT: '#E5E7EB',
          dark: '#222222',
        },
        primary: {
          DEFAULT: '#7C3AED', 
          hover: '#6D28D9',
        },
      },
      boxShadow: {
        'panel': '0 10px 30px -10px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0,0,0,0.2)',
        'panel-dark': '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0,0,0,0.3)',
        'node': '0 8px 24px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0,0,0,0.1)',
        'node-dark': '0 8px 24px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0,0,0,0.2)',
        'widget': '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.2)',
        'widget-dark': '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
