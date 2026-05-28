import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0C0A08',
        'ink-soft': '#1A1714',
        ash: {
          50: '#FDFAF5',
          100: '#F4EFE6',
          200: '#EAE4DB',
          300: '#DDD5C6',
          400: '#C4BAB0',
        },
        clay: '#8B5332',
        bronze: '#5C3D28',
        warm: {
          50: '#FDFAF5',
          100: '#F4EFE6',
          200: '#EAE4DB',
        },
        muted: '#7A6E66',
        border: '#DDD5C6',
        charcoal: {
          DEFAULT: '#1A1714',
          light: '#242018',
          mid: '#2D2820',
        },
        cream: '#E6D8BC',
        stone: {
          DEFAULT: '#9A8E82',
          light: '#C4BAB0',
        },
        gold: '#B8924A',
        terracotta: '#8B5332',
        umber: '#5C3D28',
        silk: '#F0E8D8',
        linen: '#F4EFE6',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 6vw, 6.5rem)', { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-xl': ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1.08', letterSpacing: '0em' }],
        'display-md': ['clamp(1.75rem, 3vw, 3rem)', { lineHeight: '1.12', letterSpacing: '0em' }],
        'display-sm': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.18' }],
      },
      spacing: {
        section: '6rem',
        'section-sm': '3.5rem',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'marquee': 'marquee 22s linear infinite',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06) translate(-1%, -1%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
        nav: '0 1px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
