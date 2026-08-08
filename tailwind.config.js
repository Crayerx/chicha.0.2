/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0b0e14',
          800: '#11151f',
          700: '#161b29',
          600: '#1d2536',
          500: '#26304a',
          400: '#3a4666',
        },
        gold: {
          50: '#fff9e6',
          100: '#fff0bf',
          200: '#ffe07f',
          300: '#ffcc33',
          400: '#f5b324',
          500: '#e09a13',
          600: '#b87a0c',
          700: '#8a5a08',
        },
        ember: {
          300: '#ff9a52',
          400: '#ff7a2f',
          500: '#e85a14',
          600: '#b8430e',
        },
        jade: {
          300: '#5be0b0',
          400: '#2bc98a',
          500: '#16a06b',
        },
        ruby: {
          300: '#ff7a8a',
          400: '#f04a5e',
          500: '#c92d44',
        },
        slate2: {
          300: '#a9b4c7',
          400: '#7b88a3',
          500: '#5a6781',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        terminal: ['"VT323"', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0,0,0,0.6)',
        'pixel-sm': '2px 2px 0 0 rgba(0,0,0,0.6)',
        'pixel-gold': '4px 4px 0 0 #b87a0c',
        'pixel-lg': '6px 6px 0 0 rgba(0,0,0,0.65)',
        'pixel-xl': '8px 8px 0 0 rgba(0,0,0,0.7)',
        'pixel-inset': 'inset 2px 2px 0 0 rgba(255,255,255,0.08)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'blink': 'blink 1s steps(2) infinite',
        'scan': 'scan 6s linear infinite',
        'flicker': 'flicker 3s linear infinite',
        'dragon-sleep': 'dragonSleep 3.5s ease-in-out infinite',
        'dragon-wake': 'dragonWake 0.5s ease-in-out',
        'dragon-alert': 'dragonAlert 0.6s ease-in-out infinite',
        'zzz-float': 'zzzFloat 2.2s ease-in-out infinite',
        'sparkle-pop': 'sparklePop 0.6s ease-out forwards',
        'ring-pulse': 'ringPulse 1.2s ease-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '3%': { opacity: '0.7' },
          '6%': { opacity: '1' },
          '72%': { opacity: '0.85' },
          '74%': { opacity: '1' },
        },
        dragonSleep: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        dragonWake: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '20%': { transform: 'scale(1.08) rotate(-4deg)' },
          '40%': { transform: 'scale(0.97) rotate(3deg)' },
          '60%': { transform: 'scale(1.05) rotate(-2deg)' },
          '80%': { transform: 'scale(0.99) rotate(1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        dragonAlert: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        zzzFloat: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(-22px) scale(1.15)', opacity: '0' },
        },
        sparklePop: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1.6) rotate(90deg)', opacity: '0' },
        },
        ringPulse: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
