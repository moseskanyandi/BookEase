import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { logIn, resetPassword } from '@/services/authService';
import { showAlert } from '@/utils/alert';

export interface UseLoginReturn {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  handleLogin: () => Promise<void>;
  handleForgotPassword: () => Promise<void>;
}

/**
 * Encapsulates Login screen state, validation, and auth handlers.
 */
export function useLogin(): UseLoginReturn {
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
    handleForgotPassword,
  };
}
