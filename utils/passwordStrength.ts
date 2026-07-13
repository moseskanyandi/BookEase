export type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return null;

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length < 6) return 'weak';
  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
};