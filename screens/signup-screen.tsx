import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputField from '@/components/common/InputField';
import PrimaryButton from '@/components/common/PrimaryButton';
import LanguageToggle from '@/components/common/LanguageToggle';
import { useSignup } from '@/hooks/use-signup';
import { styles } from './signup-screen.styles';

export default function SignupScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const {
    role,
    setRole,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
    loading,
    strengthOpacity,
    strengthColor,
    strengthMessage,
    handleSignup,
  } = useSignup();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.languageToggleWrapper, { top: insets.top + 12 }]}>
        <LanguageToggle />
      </View>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
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

      <InputField
        variant="pill"
        placeholder={t('auth.fullName')}
        value={name}
        onChangeText={setName}
      />
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
        onTogglePassword={toggleShowPassword}
      />
      <Animated.View style={{ opacity: strengthOpacity, width: '100%' }}>
        <Text style={[styles.strengthText, { color: strengthColor }]}>{strengthMessage}</Text>
      </Animated.View>

      <InputField
        variant="pill"
        placeholder={t('auth.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword
        showPassword={showConfirmPassword}
        onTogglePassword={toggleShowConfirmPassword}
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
