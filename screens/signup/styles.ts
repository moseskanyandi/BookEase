import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';
import { UIColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: UIColors.white,
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  languageToggleWrapper: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 26,
    letterSpacing: 0.2,
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: UIColors.roleToggleBg,
    borderRadius: 30,
    padding: 4,
    marginBottom: 24,
    width: '100%',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.surface,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: UIColors.textMuted,
  },
  roleTextActive: {
    color: UIColors.white,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: -8,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  loginRow: {
    flexDirection: 'row',
    marginTop: 26,
  },
  loginText: {
    color: UIColors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
