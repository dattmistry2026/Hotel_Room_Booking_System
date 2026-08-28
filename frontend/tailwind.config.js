module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF1F6',
          100: '#D6DDE9',
          400: '#3C5478',
          600: '#1B3357',
          700: '#152A47',
          800: '#12233F',
          900: '#0C1930',
        },
        gold: {
          400: '#D8B978',
          500: '#C89A4B',
          600: '#AD8038',
        },
        cream: '#F7F3EC',
        ink: '#22262E',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(12, 25, 48, 0.06), 0 8px 24px -12px rgba(12, 25, 48, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};