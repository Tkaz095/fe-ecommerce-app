// ─── Primitive Palette ─────────────────────────────────────────────────────────
// Internal palette — not exported. Access tokens via the named exports below.
const palette = {
  // Indigo (Primary brand)
  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo500: '#6366F1',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',

  // Coral Rose (Secondary / CTA accent)
  coral50: '#FFF1F2',
  coral100: '#FFE4E6',
  coral400: '#FB7185',
  coral500: '#F43F5E',
  coral600: '#E11D48',

  // Teal (Success)
  teal50: '#F0FDFA',
  teal400: '#2DD4BF',
  teal500: '#14B8A6',
  teal600: '#0D9488',

  // Red (Danger)
  red50: '#FFF5F5',
  red400: '#FC8181',
  red500: '#F56565',
  red600: '#E53E3E',

  // Amber (Warning)
  amber50: '#FFFBEB',
  amber300: '#FCD34D',
  amber400: '#FBBF24',
  amber500: '#F59E0B',

  // Neutral gray scale
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray700: '#374151',
  gray900: '#111827',

  white: '#FFFFFF',
  black: '#000000',
};

// ─── Color Tokens ──────────────────────────────────────────────────────────────
export const Colors = {
  // Primary — Indigo: trustworthy, modern, tech-forward
  primary: palette.indigo600,
  primaryLight: palette.indigo100,
  primaryDark: palette.indigo700,

  // Secondary — Coral Rose: warm, energetic, encourages action
  secondary: palette.coral500,
  secondaryLight: palette.coral100,
  secondaryDark: palette.coral600,

  // Semantic — Success (teal): positive feedback, in-stock, confirmed
  success: palette.teal500,
  successLight: palette.teal50,
  successDark: palette.teal600,

  // Semantic — Danger (red): errors, out-of-stock, destructive actions
  danger: palette.red500,
  dangerLight: palette.red50,
  dangerDark: palette.red600,

  // Semantic — Warning (amber): low-stock, caution notices
  warning: palette.amber500,
  warningLight: palette.amber50,

  // Background & Surface
  background: palette.gray50,
  surface: palette.white,
  surfaceAlt: palette.gray100,

  // Borders & Dividers
  border: palette.gray200,
  divider: palette.gray100,

  // Text hierarchy
  textPrimary: palette.gray900,
  textSecondary: palette.gray500,
  textDisabled: palette.gray400,
  textInverse: palette.white,

  // Utility
  overlay: 'rgba(0, 0, 0, 0.50)',
  overlayLight: 'rgba(0, 0, 0, 0.25)',
  transparent: 'transparent',
};

// ─── Typography ────────────────────────────────────────────────────────────────
export const Typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    // Replace with custom fonts after installing expo-font:
    // regular: 'Inter_400Regular',
    // medium:  'Inter_500Medium',
    // bold:    'Inter_700Bold',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// ─── Spacing Scale (4-pt grid) ─────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// ─── Border Radius ─────────────────────────────────────────────────────────────
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// ─── Elevation / Shadow ────────────────────────────────────────────────────────
export const Shadows = {
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
};

// ─── Default export (convenience) ─────────────────────────────────────────────
const theme = { Colors, Typography, Spacing, BorderRadius, Shadows };
export default theme;
