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
        // Primary palette — new direction
        ink: '#2B2B2B',
        'ink-soft': '#3D3D3D',
        charcoal: '#2B2B2B',
        graphite: '#1F1F1F',
        'soft-white': '#F7F7F5',
        'warm-gray': '#D6D3CE',
        'stone-gray': '#B8B4AE',

        // Background tones
        ash: {
          50:  '#F7F7F5',
          100: '#EFEFEB',
          200: '#E5E2DC',
          300: '#D6D3CE',
          400: '#B8B4AE',
        },

        // Warm background
        warm: {
          50:  '#F7F7F5',
          100: '#EFEFEB',
          200: '#E5E2DC',
        },

        // Text
        muted: '#7A7672',
        border: '#D6D3CE',

        // Accent — kept for CTAs, reduced elsewhere
        gold: '#B8924A',

        // Legacy — kept for backward compat
        cream: '#E6D8BC',
        stone: {
          DEFAULT: '#9A9690',
          light:   '#B8B4AE',
        },
        terracotta: '#8B5332',
        silk:   '#F0EDE8',
        linen:  '#EFEFEB',
      },

      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-2xl': ['clamp(3rem, 6vw, 6.5rem)',   { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-xl':  ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'display-lg':  ['clamp(2rem, 4vw, 4rem)',      { lineHeight: '1.08', letterSpacing: '0em'     }],
        'display-md':  ['clamp(1.75rem, 3vw, 3rem)',   { lineHeight: '1.12', letterSpacing: '0em'     }],
        'display-sm':  ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.18' }],
      },

      spacing: {
        section:    '7rem',
        'section-sm': '4rem',
      },

      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      animation: {
        'ken-burns': 'kenBurns 24s ease-in-out infinite alternate',
        marquee:     'marquee 55s linear infinite',
      },

      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04) translate(-0.5%, -0.5%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      boxShadow: {
        card:       '0 2px 20px rgba(0,0,0,0.05)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.10)',
        nav:        '0 1px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
