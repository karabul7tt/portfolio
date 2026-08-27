/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        display: ['Syne', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Geist', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        void: '#000000',
        surface: '#0a0a0c',
        borderMuted: 'rgba(255, 255, 255, 0.12)',
        borderHover: 'rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marqueeReverse 28s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-delayed': 'floatSlow 7s ease-in-out infinite 2.5s',
        'float-alt': 'floatAlt 8s ease-in-out infinite 1s',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
