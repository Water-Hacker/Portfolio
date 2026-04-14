/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        cyan: {
          DEFAULT: '#00E5FF',
          glow: 'rgba(0,229,255,0.15)',
          dim: 'rgba(0,229,255,0.06)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          glow: 'rgba(212,175,55,0.2)',
          dim: 'rgba(212,175,55,0.07)',
        },
        // Sovereign design tokens
        sovereign: {
          bg:     '#0A0C10',
          blue:   '#3b82f6',
          indigo: '#4f46e5',
          violet: '#7c3aed',
        },
      },
      borderRadius: {
        bento: '16px',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        sovereign: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'spin-slow':    'spin 20s linear infinite',
        'pulse-cyan':   'pulseCyan 3s ease-in-out infinite',
        'scanline':     'scanline 6s linear infinite',
        'flicker':      'flicker 0.15s infinite',
        'blink':        'blink 1s step-end infinite',
        'float':        'float 6s ease-in-out infinite',
        'grid-move':    'gridMove 8s linear infinite',
        'mesh-shift':   'meshShift 18s ease-in-out infinite alternate',
        'fade-in-up':   'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,229,255,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,229,255,0.7), 0 0 80px rgba(0,229,255,0.3)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.8' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        gridMove: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
        meshShift: {
          '0%': {
            backgroundPosition: '0% 0%, 100% 100%, 50% 50%',
          },
          '33%': {
            backgroundPosition: '100% 0%, 0% 100%, 80% 20%',
          },
          '66%': {
            backgroundPosition: '50% 100%, 50% 0%, 20% 80%',
          },
          '100%': {
            backgroundPosition: '0% 50%, 100% 50%, 50% 50%',
          },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 1px rgba(59,130,246,0.15)' },
          '50%':      { boxShadow: '0 0 0 1px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.15)' },
        },
      },
    },
  },
  plugins: [],
}
