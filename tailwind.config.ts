import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'electric-blue': '#2F54EB',
        'neon-purple': '#722ED1',
        coral: '#F5222D',
        slate: {
          850: '#151e2e',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontSize: {
        // Fluid Typography: clamp(min, preferred, max)
        xs: ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1rem' }],
        sm: ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.25rem' }],
        base: ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.5rem' }],
        lg: ['clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)', { lineHeight: '1.75rem' }],
        xl: ['clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)', { lineHeight: '1.75rem' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '2rem' }],
        '3xl': ['clamp(1.875rem, 1.7rem + 1.25vw, 2.5rem)', { lineHeight: '2.25rem' }],
        '4xl': ['clamp(2.25rem, 2rem + 1.5vw, 3rem)', { lineHeight: '2.5rem' }],
        '5xl': ['clamp(3rem, 2.5rem + 2vw, 4rem)', { lineHeight: '1' }],
        '6xl': ['clamp(3.75rem, 3rem + 3vw, 5rem)', { lineHeight: '1' }],
        '7xl': ['clamp(4.5rem, 4rem + 4vw, 6rem)', { lineHeight: '1' }],
      },
      fontFamily: {
        sans: ['Inter', 'Kanit', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Kanit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
        },
        'border-beam': {
          '100%': { offsetDistance: '100%' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
