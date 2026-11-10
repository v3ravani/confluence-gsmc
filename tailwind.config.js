/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Core Dusty Blue + Sage + Vintage Pink palette ──────────────────
        dusty: {
          900: '#1e2d3d',
          800: '#2b3f52',
          700: '#3a5068',
          600: '#4a6a8a',   // PRIMARY Dusty Blue
          500: '#6a8ba8',
          400: '#8aaac4',
          200: '#c4d8e8',
          100: '#e4eff6',
        },
        sage: {
          800: '#5a6652',
          700: '#6b7a62',
          600: '#7d8f72',   // Sage Green accent
          400: '#a8b89e',
          200: '#cdd8c5',
          100: '#e8ede4',
        },
        blush: {
          700: '#a06070',
          600: '#b87888',   // Vintage Pink
          500: '#c4909a',   // Soft Mauve
          300: '#ddb4be',
          200: '#eecdd4',
          100: '#f8eced',
        },
        cream: {
          DEFAULT: '#f5ede0',  // Warm Cream background tint
          50:  '#faf5ef',
          100: '#f5ede0',
          200: '#ecdece',
        },
        // ── Keep navy for backgrounds (tweaked to warmer dark) ───────────────
        navy: {
          950: '#0f1824',
          900: '#162030',
          800: '#1e2d3d',
          700: '#253647',
        },
        // ── Confluence identity colours ────────────────────────────────────
        confluence: {
          blue:      '#4a6a8a',
          darkblue:  '#3a5068',
          lightblue: '#8aaac4',
          sky:       '#c4d8e8',
          ice:       '#eaf2f8',
          teal:      '#7d8f72',    // repurposed to sage teal
          gold:      '#c4909a',    // repurposed to vintage pink accent
        },
        ink: {
          DEFAULT: '#f0ebe2',
          2:       '#d8cfc0',
          dark:    '#1e2d3d',
        },
        muted: '#a09080',
        glass: {
          DEFAULT: 'rgba(74, 106, 138, 0.10)',
          border:  'rgba(196, 216, 232, 0.20)',
          light:   'rgba(74, 106, 138, 0.16)',
        }
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '18px',
      },
      boxShadow: {
        glow:     '0 0 25px rgba(74, 106, 138, 0.45)',
        'glow-lg':'0 0 50px rgba(74, 106, 138, 0.70)',
        btn:      '0 10px 24px -10px rgba(58, 80, 104, 0.80)',
        glass:    '0 12px 32px -14px rgba(15, 24, 36, 0.65)',
        blush:    '0 8px 20px -8px rgba(180, 120, 136, 0.50)',
      },
      animation: {
        'spin-slow':    'spin 32s linear infinite',
        'pulse-glow':   'pulseGlow 4s ease-in-out infinite',
        'float':        'float 8s ease-in-out infinite',
        'marquee':      'marquee 28s linear infinite',
        'marquee-rev':  'marqueeReverse 28s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 16px rgba(74, 106, 138, 0.5))' },
          '50%':      { filter: 'drop-shadow(0 0 35px rgba(196, 144, 154, 0.85))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}
