import { colors } from './src/utils/colorUtils';
import type { Config } from 'tailwindcss';
const BASE = 16;
export const rem = (px: number, key = px) => ({ [key / 4]: `${px / BASE}rem` });

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
      'top-home':
        'conic-gradient(from 346deg at 55.38% 52.84%, #5BAAF3 20.13%, #F029C4 11.87%, #FF8181 25.27%)',
      'slider-home':
        'linear-gradient(134deg, #E1EFF5 2.25%, rgba(250, 237, 249, 0.61) 52.75%, #FADCDC 100%)',
      'linear-profile':
        'linear-gradient(133deg, #E6F4FA -2.1%, rgba(250, 245, 237, 0.61) 51.84%, #FFEDED 102.3%)',
    },
    container: {
      center: true,
      padding: '2.5rem',
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
        text: {
          DEFAULT: 'var(--text)',
          inverse: 'var(--text-inverse)',
          subtle: 'var(--text-subtle)',
          sublest: 'var(--text-sublest)',
          disable: 'var(--text-disable)',
          support: {
            green: 'var(--text-support-green)',
            red: 'var(--text-support-red)',
            yellow: 'var(--text-support-yellow)',
            blue: 'var(--text-support-blue)',
            match: 'var(--text-support-match)',
          },
        },
        icon: {
          DEFAULT: 'var(--icon)',
          subtle: 'var(--icon-subtle)',
          sublest: 'var(--icon-sublest)',
          disable: 'var(--icon-disable)',
          inverse: 'var(--icon-inverse)',
          support: {
            green: 'var(--icon-support-green)',
            red: 'var(--icon-support-red)',
            yellow: 'var(--icon-support-yellow)',
            blue: 'var(--icon-support-blue)',
          },
        },
        bg: {
          primary: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          sublest: 'var(--bg-sublest)',
          hovered: 'var(--bg-hovered)',
          container: 'var(--bg-container)',
          inverse: 'var(--bg-inverse)',
          inverseSubtle: 'var(--bg-inverse-subtle)',
          inverseSublest: 'var(--bg-inverse-sublest)',
        },
        borderMain: 'var(--border-main)',
        borderSubtle: 'var(--border-subtle)',
        borderSublest: 'var(--border-sublest)',
        borderPlain: 'var(--border-plain)',
        btn: {
          primary: {
            DEFAULT: 'var(--btn-primary-default)',
            hover: 'var(--btn-primary-hover)',
            press: 'var(--btn-primary-press)',
            disable: 'var(--btn-primary-disable)',
          },
          secondary: {
            DEFAULT: 'var(--btn-secondary-default)',
            hover: 'var(--btn-secondary-hover)',
            press: 'var(--btn-secondary-press)',
            disable: 'var(--btn-secondary-disable)',
          },
          terriary: {
            DEFAULT: 'var(--btn-terriary-default)',
            hover: 'var(--btn-terriary-hover)',
            press: 'var(--btn-terriary-press)',
            disable: 'var(--btn-terriary-disable)',
          },
          ghost: {
            hover: 'var(--btn-ghost-hover)',
            press: 'var(--btn-ghost-press)',
          },
          betYes: {
            DEFAULT: 'var(--btn-bet-yes-default)',
            hover: 'var(--btn-bet-yes-hover)',
            press: 'var(--btn-bet-yes-press)',
            shadow: 'var(--btn-bet-yes-shadow)',
          },
          betNo: {
            DEFAULT: 'var(--btn-bet-no-default)',
            hover: 'var(--btn-bet-no-hover)',
            press: 'var(--btn-bet-no-press)',
            shadow: 'var(--btn-bet-no-shadow)',
          },
          text: {
            DEFAULT: 'var(--btn-text-default)',
            hover: 'var(--btn-text-hover)',
            press: 'var(--btn-text-press)',
          },
        },
        tab: {
          btnYes: {
            DEFAULT: 'var(--tab-btn-yes-default)',
            bgSelected: 'var(--tab-btn-yes-bg-selected)',
            bgHover: 'var(--tab-btn-yes-bg-hover)',
            bgPress: 'var(--tab-btn-yes-bg-press)',
          },
          btnNo: {
            DEFAULT: 'var(--tab-btn-no-default)',
            selected: 'var(--tab-btn-no-selected)',
            hover: 'var(--tab-btn-no-hover)',
            textPress: 'var(--tab-btn-no-text-press)',
          },
        },
        searchFilter: {
          background: {
            DEFAULT: 'var(--search-filter-bg-default)',
            hover: 'var(--search-filter-bg-hover)',
            focus: 'var(--search-filter-bg-focus)',
            disable: 'var(--search-filter-bg-disable)',
          },
          border: {
            DEFAULT: 'var(--search-filter-border-default)',
            hover: 'var(--search-filter-border-hover)',
            focus: 'var(--search-filter-border-focus)',
            disable: 'var(--search-filter-border-disable)',
          },
        },
        field: {
          background: {
            DEFAULT: 'var(--field-bg-default)',
            fill: 'var(--field-bg-fill)',
            hover: 'var(--field-bg-hover)',
            focus: 'var(--field-bg-focus)',
            disable: 'var(--field-bg-disable)',
          },
          border: {
            DEFAULT: 'var(--field-border-default)',
            fill: 'var(--field-border-fill)',
            hover: 'var(--field-border-hover)',
            focus: 'var(--field-border-focus)',
            disable: 'var(--field-border-disable)',
          },
        },
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
      width: {
        ...rem(52),
        ...rem(54),
        ...rem(40),
        ...rem(80),
        ...rem(120),
        ...rem(140),
      },
      spacing: {
        ...rem(52),
        ...rem(54),
        ...rem(40),
        ...rem(80),
        ...rem(120),
        ...rem(140),
      },
      boxShadow: {
        'button-yes-shadow': '0px 1px 0px 1px var(--btn-bet-yes-shadow)',
        'button-no-shadow': '0px 1px 0px 1px var(--btn-bet-no-shadow)',
        'card-bet-home': '0px 4px 12px 0px rgba(0, 0, 0, 0.06)',
        'leaderboard-shadow': '0px 6px 17px 0px rgba(44, 41, 211, 0.05)',
        'create-bet-shadow': '0px -3px 9px 0px #00000014',
      },
    },
  },
  // plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
