import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';
import { UIColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: UIColors.white,
  },
  tagline: {
    fontSize: 16,
    color: UIColors.lightGray,
    marginTop: 8,
  },
});
