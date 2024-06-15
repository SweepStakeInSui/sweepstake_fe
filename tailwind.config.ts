import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        elevation_a50: '#fafafa',
        elevation_a100: '#f4f4f5',
        elevation_a200: '#e4e4e7',
        elevation_a300: '#d4d4d8',
        elevation_a400: '#a1a1aa',
        elevation_a500: '#71717a',
        elevation_a600: '#52525b',
        elevation_a700: '#3f3f46',
        elevation_a800: '#27272a',
        elevation_a900: '#18181b',

        primary_a1000: '#ff3131',
        primary_a900: '#ff4646',
        primary_a800: '#ff5a5a',
        primary_a700: '#ff6f6f',
        primary_a600: '#ff8383',
        primary_a500: '#ff9898',
        primary_a400: '#ffadad',
        primary_a300: '#ffc1c1',
        primary_a200: '#ffd6d6',
        primary_a100: '#ffeaea',

        secondary_green_a50: '#32fca8',
        secondary_green_a100: '#12eb90',
        secondary_green_a200: '#07d580',
        secondary_green_a300: '#05be70',
        secondary_green_a400: '#049a5b',

        secondary_red_a50: '#ff8b8e',
        secondary_red_a100: '#e03a3d',
        secondary_red_a200: '#fe0000',
        secondary_red_a300: '#dc0004',
        secondary_red_a400: '#c80003',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
