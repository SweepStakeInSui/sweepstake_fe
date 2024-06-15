import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
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
      padding: '1.5rem',
      screens: {
        '2xl': '1630px',
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
        white: '#FFFFFF',
        elevation: {
          a50: '#fafafa',
          a100: '#f4f4f5',
          a200: '#e4e4e7',
          a300: '#d4d4d8',
          a400: '#a1a1aa',
          a500: '#71717a',
          a600: '#52525b',
          a700: '#3f3f46',
          a800: '#27272a',
          a900: '#18181b',
        },
        primary: {
          a1000: '#ff3131',
          a900: '#ff4646',
          a800: '#ff5a5a',
          a700: '#ff6f6f',
          a600: '#ff8383',
          a500: '#ff9898',
          a400: '#ffadad',
          a300: '#ffc1c1',
          a200: '#ffd6d6',
          a100: '#ffeaea',
        },
        secondary: {
          green: {
            a50: '#32fca8',
            a100: '#12eb90',
            a200: '#07d580',
            a300: '#05be70',
            a400: '#049a5b',
          },

          red: {
            a50: '#ff8b8e',
            a100: '#e03a3d',
            a200: '#fe0000',
            a300: '#dc0004',
            a400: '#c80003',
          },
        },
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
