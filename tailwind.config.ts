import { colors } from './src/utils/colorUtils';
import type { Config } from 'tailwindcss';
const config = {
  darkMode: ['selector'],
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
        'conic-gradient(from 12.01deg at 89.19% 40.8%, rgba(233, 44, 146, 0.37) 0deg, rgba(109, 0, 0, 0.44) 50.4deg, rgba(0, 0, 0, 0.44) 138.38deg, #171717 261deg, rgba(18, 118, 174, 0.41) 304.2deg, rgba(233, 44, 146, 0.37) 360deg)',
      card: 'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)',
      'banner-home':
        'radial-gradient(97.24% 183.5% at 134.15% 75.4%, #580808 16%, #121212 100%)',
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1630px',
      },
    },
    extend: {
      fontSize: {
        '10': ['0.625rem', '0.75rem'], // 10px
        '12': ['0.75rem', '1rem'], // 12px
        '13': ['0.8125rem', '1rem'], // 13px
        '14': ['0.875rem', '1rem'], // 14px
        '15': ['0.9375rem', '1rem'], // 15px
        '16': ['1rem', '1.125rem'], // 16px
        '18': ['1.125rem', '1.25rem'], // 18px
        '20': ['1.25rem', '1.5rem'], // 20px
        '24': ['1.5rem', '1.75rem'], // 24px
        '28': ['1.75rem', '2rem'], // 28px
        '32': ['2rem', '2.4rem'], // 32px
        '48': ['3rem', '3.6rem'], // 48px
        '64': ['4rem', '4.8rem'], // 64px
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
        qwerty: 'var(--qwerty)',
        ...colors,
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
      gridTemplateColumns: {
        autoFill: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  // plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
