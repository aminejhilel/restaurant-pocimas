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
        accent: ['Inter', 'sans-serif'],
      },
      colors: {
        bronze: {
          50: '#fcfaf8',
          100: '#f5efe6',
          200: '#eadbc7',
          300: '#dbbfa1',
          400: '#c79d77',
          500: '#b8860b', // Base bronze/gold
          600: '#a37108',
          700: '#835709',
          800: '#6b450f',
          900: '#563810',
        },
        cream: {
          50: '#ffffff',
          100: '#fcfcfc',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
        },
        dark: {
          900: '#000000', // Pure black for background
          800: '#0a0a0a', // Slightly lighter for cards
          700: '#171717', // Borders
          600: '#262626',
          500: '#404040',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #a37108, #d4af37, #a37108)', // Luxury bronze/gold gradient
        'dark-gradient': 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
}
