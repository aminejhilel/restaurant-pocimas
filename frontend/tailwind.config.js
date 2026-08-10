/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cormorant Garamond', 'serif'],
        heading: ['Cormorant Garamond', 'serif'],
        accent: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        bronze: {
          50: '#fdf9f0',
          100: '#f8eecc',
          200: '#f0d980',
          300: '#e8c445',
          400: '#D4AF37', // Refined gold
          500: '#b8860b', // Base bronze
          600: '#a37108',
          700: '#835709',
          800: '#6b450f',
          900: '#3d2600',
        },
        cream: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e8e8e8',
          400: '#c8c8c8',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        },
        dark: {
          900: '#000000', // Pure black for background
          800: '#080808', // Cards
          700: '#111111', // Subtle borders
          600: '#1a1a1a',
          500: '#333333',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #835709 0%, #D4AF37 40%, #f0d980 60%, #D4AF37 80%, #835709 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #080808 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delayed': 'slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards',
        'slide-up-delayed-2': 'slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'line-grow': 'lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1.02)' },
          '50%': { transform: 'translateY(-12px) scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        lineGrow: {
          from: { width: '0', opacity: '0' },
          to: { width: '6rem', opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 60px rgba(212, 175, 55, 0.2)',
        'card': '0 25px 50px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [],
}
