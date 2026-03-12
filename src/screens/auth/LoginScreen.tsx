import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import { validators } from '../../utils/validators';
import { Colors, Typography, Spacing } from '../../constants/theme';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleLogin = async () => {
    // Clear previous errors
    setErrors({});

    // Client-side validation first
    const emailErr = validators.email(email);
    const passErr  = validators.password(password);
    if (emailErr || passErr) {
      setErrors({ email: emailErr ?? undefined, password: passErr ?? undefined });
      return;
    }

    // Delegate to hook (returns null on success, error string on failure)
    const err = await login(email, password);
    if (err) setErrors({ general: err });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Welcome back 👋</Text>
      <Text style={styles.subtitle}>Sign in to continue shopping</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        error={errors.email}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        error={errors.password}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotLink}>Forgot password?</Text>
      </TouchableOpacity>

      {errors.general ? (
        <Text style={styles.generalError}>{errors.general}</Text>
      ) : null}

      <Button title="Sign In" onPress={handleLogin} isLoading={isLoading} style={styles.btn} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Spacing['2xl'],
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    marginBottom: Spacing['2xl'],
  },
  forgotLink: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    textAlign: 'right',
    marginBottom: Spacing.base,
  },
  btn: {
    width: '100%',
    marginTop: Spacing.sm,
  },
  signupText: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  generalError: {
    color: Colors.danger,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
});
