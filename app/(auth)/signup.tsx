import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/theme';
import { signUp } from '@/services/authService';
import { UserRole } from '@/types';
import { showAlert } from '@/utils/alert';
import InputField from '@/components/common/InputField';
import PrimaryButton from '@/components/common/PrimaryButton';

export default function SignupScreen() {
  const { t } = useTranslation();
  const [role, setRole] = useState<UserRole>('passenger');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      showAlert(t('auth.missingInfoTitle'), t('auth.missingSignupInfo'));
      return;
    }
    if (password !== confirmPassword) {
      showAlert(t('auth.passwordMismatchTitle'), t('auth.passwordMismatchMessage'));
      return;
    }

    setLoading(true);
    const { user, error } = await signUp(email, password, role, name, phone);
    setLoading(false);

    if (error) {
      showAlert(t('auth.signupFailedTitle'), error);
      return;
    }
    if (user) {
      router.replace(role === 'driver' ? '/(driver)/home' : '/(passenger)/home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>{t('auth.createAccount')}</Text>

      <View style={styles.roleToggle}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'passenger' && styles.roleButtonActive]}
          onPress={() => setRole('passenger')}
        >
          <Text style={[styles.roleText, role === 'passenger' && styles.roleTextActive]}>
            {t('auth.passenger')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'driver' && styles.roleButtonActive]}
          onPress={() => setRole('driver')}
        >
          <Text style={[styles.roleText, role === 'driver' && styles.roleTextActive]}>
            {t('auth.driver')}
          </Text>
        </TouchableOpacity>
      </View>

      <InputField variant="pill" placeholder={t('auth.fullName')} value={name} onChangeText={setName} />
      <InputField
        variant="pill"
        placeholder={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <InputField
        variant="pill"
        placeholder={t('auth.phoneNumber')}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <InputField
        variant="pill"
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        isPassword
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
      <InputField
        variant="pill"
        placeholder={t('auth.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <PrimaryButton
        label={loading ? t('auth.creatingAccount') : t('auth.signUp')}
        onPress={handleSignup}
        loading={loading}
      />

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>{t('auth.alreadyHaveAccount')}</Text>
        <Link href="/(auth)/login">
          <Text style={styles.loginLink}>{t('auth.login')}</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
    width: '100%',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: Colors.primary,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  roleTextActive: {
    color: '#fff',
  },
  loginRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  loginText: {
    color: '#374151',
    fontSize: 14,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});