import { Colors } from '@/constants/theme';
import { changeAppLanguage } from '@/localization/i18n';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, currentLang === 'en' && styles.optionActive]}
        onPress={() => changeAppLanguage('en')}
      >
        <Text style={[styles.text, currentLang === 'en' && styles.textActive]}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, currentLang === 'fr' && styles.optionActive]}
        onPress={() => changeAppLanguage('fr')}
      >
        <Text style={[styles.text, currentLang === 'fr' && styles.textActive]}>FR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 3,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  optionActive: {
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  textActive: {
    color: '#fff',
  },
});