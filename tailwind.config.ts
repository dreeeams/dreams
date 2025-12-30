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
        'background-light': '#E8E4DC',
        'background-dark': '#0a0a0a',
        'foreground-light': '#000000',
        'foreground-dark': '#ededed',
        // Centralized brand color system
        'brand': {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
        },
        // Dark mode surfaces for better contrast
        'surface': {
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
