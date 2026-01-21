import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors
        'background-light': 'rgb(var(--background-light) / <alpha-value>)',
        'background-dark': 'rgb(var(--background-dark) / <alpha-value>)',

        // Text colors
        'foreground-light': 'rgb(var(--foreground-light) / <alpha-value>)',
        'foreground-dark': 'rgb(var(--foreground-dark) / <alpha-value>)',

        // Brand colors - Urban Asphalt
        'brand': {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
        },

        // Surface colors for layering
        'surface': {
          // Light mode surfaces
          'light-1': 'rgb(var(--surface-light-1) / <alpha-value>)',
          'light-2': 'rgb(var(--surface-light-2) / <alpha-value>)',
          'light-3': 'rgb(var(--surface-light-3) / <alpha-value>)',
          // Dark mode surfaces
          1: 'rgb(var(--surface-dark-1) / <alpha-value>)',
          2: 'rgb(var(--surface-dark-2) / <alpha-value>)',
          3: 'rgb(var(--surface-dark-3) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        nostalgic: ['var(--font-nostalgic)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
