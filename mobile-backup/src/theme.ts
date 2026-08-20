export const Colors = {
  primary: '#8B5CF6',
  primaryHover: '#7C3AED',
  primaryPressed: '#6D28D9',
  primaryDisabled: '#C4B5FD',
  
  background: '#09090B',
  surface: '#18181B',
  surfaceElevated: '#27272A',
  surfaceStrong: '#3F3F46',
  
  textPrimary: '#FAFAFA',
  textSecondary: '#A1A1AA',
  textTertiary: '#71717A',
  textDisabled: '#52525B',
  textInverse: '#09090B',
  
  border: '#27272A',
  borderStrong: '#3F3F46',
  
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Added aliases for compatibility with some screens
  onBackground: '#FAFAFA',
  onSurface: '#FAFAFA',
  onSurfaceVariant: '#A1A1AA',
  outlineVariant: '#27272A',
  surfaceVariant: '#27272A',
  primaryContainer: '#6D28D9',
  glassBackground: 'rgba(24, 24, 27, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export const Typography = {
  display: { fontFamily: 'Manrope', fontSize: 32, fontWeight: '700' as const },
  h1: { fontFamily: 'Manrope', fontSize: 28, fontWeight: '700' as const },
  h2: { fontFamily: 'Manrope', fontSize: 24, fontWeight: '700' as const },
  h3: { fontFamily: 'Manrope', fontSize: 20, fontWeight: '600' as const },
  title: { fontFamily: 'Inter', fontSize: 18, fontWeight: '600' as const },
  bodyLarge: { fontFamily: 'Inter', fontSize: 17, fontWeight: '400' as const },
  body: { fontFamily: 'Inter', fontSize: 16, fontWeight: '400' as const },
  bodySmall: { fontFamily: 'Inter', fontSize: 14, fontWeight: '400' as const },
  caption: { fontFamily: 'Inter', fontSize: 13, fontWeight: '400' as const },
  label: { fontFamily: 'Inter', fontSize: 12, fontWeight: '500' as const },
  button: { fontFamily: 'Inter', fontSize: 16, fontWeight: '600' as const },

  // Added properties for compatibility with some screens
  fonts: {
    display: 'Manrope',
    body: 'Inter',
  },
  sizes: {
    displayLg: 32,
    headlineMd: 28,
    headlineSm: 24,
    titleLg: 22,
    titleMd: 20,
    titleSm: 18,
    bodyLg: 18,
    bodyMd: 16,
    labelLg: 14,
    labelMd: 13,
    labelSm: 12,
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screenPadding: 16,
};

export const Radius = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  full: 999,
};

export const Radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};
