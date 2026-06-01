/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#06b6d4',
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
          },
        },
        secondary: {
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
        },
        status: {
          success: '#10b981',
          'success-light': '#d1fae5',
          error: '#ef4444',
          'error-light': '#fee2e2',
          warning: '#f59e0b',
          'warning-light': '#fef3c7',
          info: '#3b82f6',
          'info-light': '#dbeafe',
          waiting: '#6366f1',
          active: '#06b6d4',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #67e8f9 0%, #c4b5fd 50%, #f9a8d4 100%)',
        'gradient-background': 'linear-gradient(135deg, #cffafe 0%, #f3e8ff 35%, #fce7f3 70%, #fdf2f8 100%)',
        'gradient-header': 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
        'gradient-button': 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
      },
      animation: {
        'gradient-shift': 'gradientShift 15s ease infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'border-flow': 'border-flow 4s ease-in-out infinite',
        'gradient-text': 'gradient-text 3s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 90px rgba(236, 72, 153, 0.3)'
          },
        },
        'border-flow': {
          '0%': { borderColor: 'rgba(6, 182, 212, 0.5)' },
          '33%': { borderColor: 'rgba(139, 92, 246, 0.5)' },
          '66%': { borderColor: 'rgba(236, 72, 153, 0.5)' },
          '100%': { borderColor: 'rgba(6, 182, 212, 0.5)' },
        },
        'gradient-text': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
        'glow-gradient': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)',
      },
    },
  },
  plugins: [],
}
