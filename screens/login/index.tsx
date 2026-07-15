import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputField from '@/components/common/InputField';
import PrimaryButton from '@/components/common/PrimaryButton';
import LanguageToggle from '@/components/common/LanguageToggle';
import { useLogin } from '@/hooks/use-login';
import { styles } from './styles';

export default function LoginScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
    handleForgotPassword,
  } = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.languageToggleWrapper, { top: insets.top + 12 }]}>
        <LanguageToggle />
      </View>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{t('auth.welcomeBack')}</Text>

      <InputField
        placeholder={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <InputField
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton
        label={loading ? t('auth.loggingIn') : t('auth.login')}
        onPress={handleLogin}
        loading={loading}
      />

      <Text style={styles.forgotText} onPress={handleForgotPassword}>
        {t('auth.forgotPassword')}
      </Text>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>{t('auth.dontHaveAccount')}</Text>
        <Link href="/(auth)/signup">
          <Text style={styles.signupLink}>{t('auth.signUp')}</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
