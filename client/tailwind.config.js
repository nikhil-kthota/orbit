/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#F97316',
          hover: '#EA6C0A',
          light: 'rgba(249,115,22,0.12)',
          glow: 'rgba(249,115,22,0.25)',
        },
        space: {
          950: '#08080F',
          900: '#0E0E18',
          800: '#14141F',
          700: '#1C1C2E',
          600: '#252538',
        },
        silver: {
          DEFAULT: '#8B90A0',
          light: '#C4C8D6',
          dim: '#3A3D4A',
        },
        mono: '#A8FF78',
      },
      backgroundImage: {
        'dot-grid': "radial-gradient(circle, rgba(139,144,160,0.18) 1px, transparent 1px)",
        'brand-glow': 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(249,115,22,0.12) 0%, transparent 70%)',
        'panel-gradient': 'linear-gradient(135deg, #0E0E18 0%, #14141F 100%)',
      },
      backgroundSize: {
        'dot-grid': '28px 28px',
      },
      boxShadow: {
        brand: '0 0 24px rgba(249,115,22,0.3)',
        'brand-sm': '0 0 12px rgba(249,115,22,0.2)',
        card: '0 4px 32px rgba(0,0,0,0.6)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.7)',
        hex: '0 0 20px rgba(249,115,22,0.15)',
      },
      animation: {
        'signal-ping': 'signalPing 2s cubic-bezier(0,0,0.2,1) infinite',
        'signal-ping-slow': 'signalPing 3s cubic-bezier(0,0,0.2,1) infinite',
        'orbit-dot': 'orbitDot 4s linear infinite',
        'orbit-ring-1': 'rotateOrbit 20s linear infinite',
        'orbit-ring-2': 'rotateOrbit 35s linear infinite reverse',
        'orbit-ring-3': 'rotateOrbit 55s linear infinite',
        'drift': 'drift 120s linear infinite',
        'launch': 'launch 0.5s ease-out forwards',
        'sweep': 'sweep 1.8s ease-in forwards',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.25s ease-out',
        'alert-pulse': 'alertPulse 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'typewriter-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        signalPing: {
          '0%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.7)' },
          '70%': { boxShadow: '0 0 0 16px rgba(249,115,22,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0)' },
        },
        orbitDot: {
          '0%': { transform: 'rotate(0deg) translateX(14px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(14px) rotate(-360deg)' },
        },
        rotateOrbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        drift: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        launch: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '40%': { transform: 'translateY(-14px) scale(0.97)', opacity: '0.6' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        sweep: {
          '0%': { top: '-4px', opacity: '1' },
          '85%': { opacity: '0.7' },
          '100%': { top: '100%', opacity: '0' },
        },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.94)' }, to: { opacity: '1', transform: 'scale(1)' } },
        alertPulse: {
          '0%, 100%': { borderColor: 'rgba(239,68,68,0.4)' },
          '50%': { borderColor: 'rgba(239,68,68,1)', boxShadow: '0 0 12px rgba(239,68,68,0.35)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(249,115,22,0.2)' },
          '50%': { boxShadow: '0 0 28px rgba(249,115,22,0.5)' },
        },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};
