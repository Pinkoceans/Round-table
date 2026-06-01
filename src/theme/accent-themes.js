// 暗黑风格点缀色主题方案
// 基础都是暗黑背景，通过不同的点缀色来区分风格

export const accentThemes = {
  // 方案1: 翡翠绿 (Emerald) - 清新、科技感、自然
  emerald: {
    name: '翡翠绿',
    nameEn: 'Emerald',
    // 点缀色
    accent: '#10b981',
    accentLight: '#34d399',
    accentDark: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.3)',
    accentBorder: 'rgba(16, 185, 129, 0.3)',
    accentText: '#6ee7b7',
    // 状态色
    statusActive: '#10b981',
    statusActiveBg: 'rgba(16, 185, 129, 0.1)',
    // 开关
    toggleChecked: '#10b981',
    toggleCheckedBg: 'rgba(16, 185, 129, 0.3)',
    // 悬停效果
    hoverGlow: '0 0 20px rgba(16, 185, 129, 0.15)',
    hoverBorder: 'rgba(16, 185, 129, 0.4)',
    // 渐变
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
    // 图标/指示器
    indicator: '#10b981',
    iconAccent: 'text-emerald-400',
    // 3D粒子颜色
    particleColors: [0x10b981, 0x059669, 0x34d399, 0x6ee7b7],
  },

  // 方案2: 电光蓝 (Electric Blue) - 冷静、专业、未来感
  electricBlue: {
    name: '电光蓝',
    nameEn: 'Electric Blue',
    // 点缀色
    accent: '#00d4ff',
    accentLight: '#5eeaff',
    accentDark: '#0099cc',
    accentGlow: 'rgba(0, 212, 255, 0.3)',
    accentBorder: 'rgba(0, 212, 255, 0.3)',
    accentText: '#7ee7ff',
    // 状态色
    statusActive: '#00a8ff',
    statusActiveBg: 'rgba(0, 168, 255, 0.1)',
    // 开关
    toggleChecked: '#00a8ff',
    toggleCheckedBg: 'rgba(0, 168, 255, 0.3)',
    // 悬停效果
    hoverGlow: '0 0 20px rgba(0, 212, 255, 0.15)',
    hoverBorder: 'rgba(0, 212, 255, 0.4)',
    // 渐变
    gradient: 'linear-gradient(135deg, #0066cc 0%, #00a8ff 50%, #00d4ff 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(0, 102, 204, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
    // 图标/指示器
    indicator: '#00a8ff',
    iconAccent: 'text-cyan-400',
    // 3D粒子颜色
    particleColors: [0x00d4ff, 0x00a8ff, 0x5eeaff, 0x0099cc],
  },

  // 方案3: 霓虹紫 (Neon Purple) - 神秘、创意、高端
  neonPurple: {
    name: '霓虹紫',
    nameEn: 'Neon Purple',
    // 点缀色
    accent: '#a855f7',
    accentLight: '#c084fc',
    accentDark: '#7c3aed',
    accentGlow: 'rgba(168, 85, 247, 0.3)',
    accentBorder: 'rgba(168, 85, 247, 0.3)',
    accentText: '#d8b4fe',
    // 状态色
    statusActive: '#a855f7',
    statusActiveBg: 'rgba(168, 85, 247, 0.1)',
    // 开关
    toggleChecked: '#a855f7',
    toggleCheckedBg: 'rgba(168, 85, 247, 0.3)',
    // 悬停效果
    hoverGlow: '0 0 20px rgba(168, 85, 247, 0.15)',
    hoverBorder: 'rgba(168, 85, 247, 0.4)',
    // 渐变
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)',
    // 图标/指示器
    indicator: '#a855f7',
    iconAccent: 'text-purple-400',
    // 3D粒子颜色
    particleColors: [0xa855f7, 0x7c3aed, 0xc084fc, 0xd8b4fe],
  },

  // 方案4: 琥珀橙 (Amber) - 温暖、活力、醒目
  amber: {
    name: '琥珀橙',
    nameEn: 'Amber',
    // 点缀色
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    accentDark: '#d97706',
    accentGlow: 'rgba(245, 158, 11, 0.3)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
    accentText: '#fcd34d',
    // 状态色
    statusActive: '#f59e0b',
    statusActiveBg: 'rgba(245, 158, 11, 0.1)',
    // 开关
    toggleChecked: '#f59e0b',
    toggleCheckedBg: 'rgba(245, 158, 11, 0.3)',
    // 悬停效果
    hoverGlow: '0 0 20px rgba(245, 158, 11, 0.15)',
    hoverBorder: 'rgba(245, 158, 11, 0.4)',
    // 渐变
    gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
    // 图标/指示器
    indicator: '#f59e0b',
    iconAccent: 'text-amber-400',
    // 3D粒子颜色
    particleColors: [0xf59e0b, 0xd97706, 0xfbbf24, 0xfcd34d],
  },
};

// 基础暗黑风格（所有方案共享）
export const darkBase = {
  // 背景
  bgPrimary: '#000000',
  bgSecondary: '#0a0a0a',
  bgCard: 'rgba(255, 255, 255, 0.03)',
  bgHover: 'rgba(255, 255, 255, 0.05)',
  bgInput: 'rgba(255, 255, 255, 0.05)',

  // 文字
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  textDisabled: 'rgba(255, 255, 255, 0.3)',

  // 边框
  borderPrimary: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  borderFocus: 'rgba(255, 255, 255, 0.3)',

  // 按钮
  btnPrimary: 'rgba(255, 255, 255, 0.1)',
  btnPrimaryHover: 'rgba(255, 255, 255, 0.2)',
  btnSecondary: 'rgba(255, 255, 255, 0.05)',
  btnSecondaryHover: 'rgba(255, 255, 255, 0.1)',

  // 阴影
  shadowCard: '0 4px 24px rgba(0, 0, 0, 0.4)',
  shadowModal: '0 8px 32px rgba(0, 0, 0, 0.6)',

  // 字体
  fontHeading: "'Gotham', -apple-system, BlinkMacSystemFont, sans-serif",
  fontBody: "'Gotham', -apple-system, BlinkMacSystemFont, sans-serif",

  // 间距/圆角
  radiusSm: '0.5rem',
  radiusMd: '0.75rem',
  radiusLg: '1rem',
  radiusXl: '1.5rem',
};

// 当前选中的主题（默认翡翠绿）
export const currentTheme = accentThemes.emerald;

export default accentThemes;
