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

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavProp>();
  const { register, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const handleRegister = async () => {
    const nameErr  = validators.required(name, 'Full name');
    const emailErr = validators.email(email);
    const passErr  = validators.password(password);
    if (nameErr || emailErr || passErr) {
      setErrors({ name: nameErr ?? undefined, email: emailErr ?? undefined, password: passErr ?? undefined });
      return;
    }
    setErrors({});
    await register(name, email, password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Join us and start shopping</Text>

      <Input label="Full Name"    value={name}     onChangeText={setName}     autoCapitalize="words"   error={errors.name} />
      <Input label="Email"        value={email}    onChangeText={setEmail}    keyboardType="email-address" autoCapitalize="none" error={errors.email} />
      <Input label="Password"     value={password} onChangeText={setPassword} secureTextEntry          error={errors.password} />

      <Button title="Create Account" onPress={handleRegister} isLoading={isLoading} style={styles.btn} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink}>Sign in</Text>
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
  title:     { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.extrabold, color: Colors.textPrimary, marginBottom: Spacing.xs },
  subtitle:  { fontSize: Typography.fontSize.base, color: Colors.textSecondary, marginBottom: Spacing['2xl'] },
  btn:       { width: '100%', marginTop: Spacing.sm },
  loginText: { textAlign: 'center', marginTop: Spacing.lg, fontSize: Typography.fontSize.sm, color: Colors.textSecondary },
  loginLink: { color: Colors.primary, fontWeight: Typography.fontWeight.semibold },
});
