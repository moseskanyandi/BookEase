import { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/theme';
import { logIn, resetPassword } from '@/services/authService';
import { showAlert } from '@/utils/alert';
import InputField from '@/components/common/InputField';
import PrimaryButton from '@/components/common/PrimaryButton';

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert(t('auth.missingInfoTitle'), t('auth.missingLoginInfo'));
      return;
    }
    setLoading(true);
    const { user, error } = await logIn(email, password);
    setLoading(false);

    if (error) {
      showAlert(t('auth.loginFailedTitle'), error);
      return;
    }
    if (user) {
      router.replace('/(passenger)/home');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showAlert(t('auth.enterEmailTitle'), t('auth.enterEmailMessage'));
      return;
    }
    const { error } = await resetPassword(email);
    if (error) {
      showAlert(t('auth.loginFailedTitle'), error);
      return;
    }
    showAlert(t('auth.resetSentTitle'), t('auth.resetSentMessage'));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 28,
  },
  forgotText: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 18,
  },
  signupRow: {
    flexDirection: 'row',
    marginTop: 28,
  },
  signupText: {
    color: '#374151',
    fontSize: 14,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});