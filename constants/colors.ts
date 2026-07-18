/**
 * Supplementary UI color tokens used across auth and onboarding screens.
 * Brand colors (primary / secondary) remain in constants/theme.ts.
 */
export const UIColors = {
  /** Pure white — used for backgrounds and text on dark surfaces */
  white: '#fff',

  /** Light gray — taglines and secondary text on dark/image backgrounds */
  lightGray: '#E5E7EB',

  /** Semi-transparent white — descriptive text overlaid on images */
  whiteTranslucent: 'rgba(255, 255, 255, 0.8)',

  /** Semi-transparent dark navy — feature icon circle backgrounds */
  navyTranslucent: 'rgba(11, 32, 76, 0.85)',

  /** Password strength indicator: weak */
  passwordWeak: '#DC2626',

  /** Password strength indicator: medium */
  passwordMedium: '#D97706',

  /** Password strength indicator: strong */
  passwordStrong: '#16A34A',

  /** Very light gray — segmented control / role toggle background */
  roleToggleBg: '#F3F4F6',

  /** Medium gray — inactive/placeholder text in toggles */
  textMuted: '#6B7280',

  /** Dark gray — secondary body text (e.g. "Don't have an account?") */
  textSecondary: '#374151',
} as const;
