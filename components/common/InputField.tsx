import { TextInput, View, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputFieldProps extends TextInputProps {
  variant?: 'rectangle' | 'pill';
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export default function InputField({
  variant = 'rectangle',
  isPassword = false,
  showPassword = false,
  onTogglePassword,
  style,
  ...rest
}: InputFieldProps) {
  const containerStyle = variant === 'pill' ? styles.pillContainer : styles.rectContainer;
  const inputStyle = variant === 'pill' ? styles.pillInput : styles.rectInput;

  if (isPassword) {
    return (
      <View style={containerStyle}>
        <TextInput
          style={[styles.passwordInput, style]}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          {...rest}
        />
        <TouchableOpacity onPress={onTogglePassword} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TextInput
      style={[inputStyle, style]}
      placeholderTextColor="#9CA3AF"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  rectInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    marginBottom: 14,
  },
  pillInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    marginBottom: 14,
  },
  rectContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  pillContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  eyeIcon: {
    padding: 4,
  },
});