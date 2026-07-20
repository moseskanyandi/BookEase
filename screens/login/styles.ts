import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';
import { UIColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
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
    fontSize: 27,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  forgotText: {
    color: colors.surface,
    fontSize: 14,
    marginTop: 20,
    fontWeight: '500',
  },
  signupRow: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signupText: {
    color: UIColors.textSecondary,
    fontSize: 14,
  },
  signupLink: {
    color: colors.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
