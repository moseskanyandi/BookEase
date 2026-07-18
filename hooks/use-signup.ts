import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { signUp } from '@/services/authService';
import { UserRole } from '@/types';
import { showAlert } from '@/utils/alert';
import { getPasswordStrength } from '@/utils/passwordStrength';
import { UIColors } from '@/constants/colors';

export interface UseSignupReturn {
  role: UserRole;
  setRole: (role: UserRole) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  showConfirmPassword: boolean;
  toggleShowConfirmPassword: () => void;
  loading: boolean;
  strengthOpacity: Animated.Value;
  strengthColor: string;
  strengthMessage: string;
  handleSignup: () => Promise<void>;
}

/**
 * Encapsulates Signup screen state, password-strength derivation,
 * visibility toggles, validation, and auth handler.
 */
export function useSignup(): UseSignupReturn {
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

  const passwordStrength = getPasswordStrength(password);
  const strengthOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(strengthOpacity, {
      toValue: password.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [password]);

  const strengthColor =
    passwordStrength === 'weak'
      ? UIColors.passwordWeak
      : passwordStrength === 'medium'
      ? UIColors.passwordMedium
      : passwordStrength === 'strong'
      ? UIColors.passwordStrong
      : 'transparent';

  const strengthMessage =
    passwordStrength === 'weak'
      ? t('auth.passwordWeak')
      : passwordStrength === 'medium'
      ? t('auth.passwordMedium')
      : passwordStrength === 'strong'
      ? t('auth.passwordStrong')
      : '';

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

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

  return {
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
  };
}
