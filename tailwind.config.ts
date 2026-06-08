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
        // ── Brand darks ───────────────────────────────────────────────────
        charcoal: '#333333',
        ink:      '#333333',
        graphite: '#1F1F1F',

        // ── Gray scale (ash) ──────────────────────────────────────────────
        ash: {
          50:  '#F4F4F4',
          100: '#EFEFEB',
          200: '#E5E2DC',
          300: '#D6D3CE',
          400: '#B8B4AE',
        },

        // ── Semantic aliases ──────────────────────────────────────────────
        'warm-gray':  '#D6D3CE',
        'stone-gray': '#B8B4AE',
        muted:        '#7A7672',
        border:       '#D6D3CE',


      },

      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-2xl': ['clamp(3rem, 6vw, 6.5rem)',      { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-xl':  ['clamp(2.5rem, 5vw, 5.5rem)',    { lineHeight: '1.06', letterSpacing: '-0.01em' }],
        'display-lg':  ['clamp(2rem, 4vw, 4rem)',         { lineHeight: '1.08', letterSpacing: '0em'     }],
        'display-md':  ['clamp(1.75rem, 3vw, 3rem)',      { lineHeight: '1.12', letterSpacing: '0em'     }],
        'display-sm':  ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.18'                           }],
      },

      spacing: {
        section:      '7rem',
        'section-sm': '4rem',
      },

      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      animation: {
        'ken-burns': 'kenBurns 24s ease-in-out infinite alternate',
      },

      keyframes: {
        kenBurns: {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04) translate(-0.5%, -0.5%)' },
        },
      },

      boxShadow: {
        card:         '0 2px 20px rgba(0,0,0,0.05)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.10)',
        nav:          '0 1px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
