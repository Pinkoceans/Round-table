export const colors = {
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
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
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

  gradient: {
    primary: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
    primaryLight: 'linear-gradient(135deg, #67e8f9 0%, #c4b5fd 50%, #f9a8d4 100%)',
    primaryDark: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 50%, #db2777 100%)',
    background: 'linear-gradient(135deg, #cffafe 0%, #f3e8ff 35%, #fce7f3 70%, #fdf2f8 100%)',
    backgroundDark: 'linear-gradient(135deg, #164e63 0%, #581c87 35%, #831843 70%, #9d174d 100%)',
    header: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
    button: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)',
    buttonHover: 'linear-gradient(135deg, #06b6d4 0%, #9333ea 50%, #ec4899 100%)',
    card: 'linear-gradient(145deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
    glow: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.4) 50%, rgba(236, 72, 153, 0.4) 100%)',
  },

  status: {
    success: {
      light: '#d1fae5',
      DEFAULT: '#10b981',
      dark: '#059669',
      text: '#065f46',
      gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    },
    error: {
      light: '#fee2e2',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
      text: '#991b1b',
      gradient: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
    },
    warning: {
      light: '#fef3c7',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
      text: '#92400e',
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    },
    info: {
      light: '#dbeafe',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
      text: '#1e40af',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    },
    waiting: {
      light: '#e0e7ff',
      DEFAULT: '#6366f1',
      dark: '#4f46e5',
      text: '#3730a3',
      gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
    },
    active: {
      light: '#cffafe',
      DEFAULT: '#06b6d4',
      dark: '#0891b2',
      text: '#155e75',
      gradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
    },
  },

  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(6, 182, 212, 0.2)',
      shadow: 'rgba(6, 182, 212, 0.1)',
    },
    dark: {
      background: 'rgba(17, 24, 39, 0.7)',
      border: 'rgba(139, 92, 246, 0.3)',
      shadow: 'rgba(139, 92, 246, 0.2)',
    },
  },
};

export const gradients = {
  background: {
    light: `
      linear-gradient(135deg, 
        #cffafe 0%, 
        #e0f2fe 15%,
        #f3e8ff 35%, 
        #fce7f3 55%,
        #fdf2f8 75%,
        #f0f9ff 100%
      )
    `,
    animated: `
      linear-gradient(-45deg, 
        #cffafe, 
        #e9d5ff, 
        #fce7f3, 
        #cffafe
      )
    `,
  },
  
  text: {
    primary: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
    secondary: 'linear-gradient(90deg, #0891b2 0%, #7c3aed 50%, #db2777 100%)',
  },

  border: {
    primary: 'linear-gradient(90deg, #22d3ee 0%, #a855f7 50%, #f472b6 100%)',
    glow: 'linear-gradient(90deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(236, 72, 153, 0.5) 100%)',
  },
};

export const semanticColors = {
  text: {
    primary: '#1f2937',
    secondary: '#4b5563',
    muted: '#9ca3af',
    inverse: '#ffffff',
  },
  
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },

  border: {
    light: '#e5e7eb',
    DEFAULT: '#d1d5db',
    dark: '#9ca3af',
  },
};

export const theme = {
  colors,
  gradients,
  semanticColors,
};

export default theme;
