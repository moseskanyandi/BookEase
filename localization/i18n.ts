import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import fr from './fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const LANGUAGE_STORAGE_KEY = 'bookease_language';

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en';
const defaultLanguage = deviceLanguage in resources ? deviceLanguage : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Load any previously saved language preference and apply it once ready
AsyncStorage.getItem(LANGUAGE_STORAGE_KEY).then((savedLanguage) => {
  if (savedLanguage && savedLanguage in resources) {
    i18n.changeLanguage(savedLanguage);
  }
});

export const changeAppLanguage = async (language: 'en' | 'fr') => {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export default i18n;