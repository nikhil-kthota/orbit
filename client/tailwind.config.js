/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#F97316',
          hover: '#EA6C0A',
          light: 'rgba(249,115,22,0.15)',
          glow: 'rgba(249,115,22,0.25)',
        },
        surface: {
          950: '#0A0A0B',
          900: '#111113',
          800: '#1C1C1F',
          700: '#26262A',
          600: '#323237',
        },
        silver: {
          DEFAULT: '#9CA3AF',
          light: '#D1D5DB',
          dark: '#6B7280',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%)',
        'surface-gradient': 'linear-gradient(135deg, #1C1C1F 0%, #26262A 100%)',
      },
      boxShadow: {
        brand: '0 4px 24px rgba(249,115,22,0.25)',
        'brand-sm': '0 2px 12px rgba(249,115,22,0.20)',
        card: '0 4px 24px rgba(0,0,0,0.40)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.50)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-16px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
