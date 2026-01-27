import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			'background-light': 'rgb(var(--background-light) / <alpha-value>)',
  			'background-dark': 'rgb(var(--background-dark) / <alpha-value>)',
  			'foreground-light': 'rgb(var(--foreground-light) / <alpha-value>)',
  			'foreground-dark': 'rgb(var(--foreground-dark) / <alpha-value>)',
  			brand: {
  				DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
  				hover: 'rgb(var(--color-accent-hover) / <alpha-value>)'
  			},
  			surface: {
  				'1': 'rgb(var(--surface-dark-1) / <alpha-value>)',
  				'2': 'rgb(var(--surface-dark-2) / <alpha-value>)',
  				'3': 'rgb(var(--surface-dark-3) / <alpha-value>)',
  				'light-1': 'rgb(var(--surface-light-1) / <alpha-value>)',
  				'light-2': 'rgb(var(--surface-light-2) / <alpha-value>)',
  				'light-3': 'rgb(var(--surface-light-3) / <alpha-value>)'
  			},
  			overlay: {
  				'border-light': 'rgba(255, 255, 255, 0.1)',
  				'border-medium': 'rgba(255, 255, 255, 0.2)',
  				'bg-subtle': 'rgba(255, 255, 255, 0.05)',
  				'bg-light': 'rgba(255, 255, 255, 0.1)'
  			},
  			text: {
  				muted: 'rgba(255, 255, 255, 0.7)',
  				secondary: 'rgba(255, 255, 255, 0.8)',
  				tertiary: 'rgba(255, 255, 255, 0.9)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'Helvetica Neue',
  				'Helvetica',
  				'Arial',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			],
  			nostalgic: [
  				'var(--font-nostalgic)',
  				'sans-serif'
  			]
  		},
  		letterSpacing: {
  			nostalgic: '-0.04em'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    function({ addComponents, addUtilities }: PluginAPI) {
      addComponents({
        '.heading-display': {
          '@apply text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-nostalgic tracking-nostalgic': {},
        },
        '.heading-xl': {
          '@apply text-3xl md:text-4xl font-nostalgic tracking-nostalgic': {},
        },
        '.heading-lg': {
          '@apply text-2xl font-nostalgic tracking-nostalgic': {},
        },
      })

      addUtilities({
        '.transition-smooth': {
          '@apply transition-all duration-300 ease-out': {},
        },
        '.transition-fast': {
          '@apply transition-all duration-150 ease-out': {},
        },
      })
    },
      require("tailwindcss-animate")
],
};

export default config;
