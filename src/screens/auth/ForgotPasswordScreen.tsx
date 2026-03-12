import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { validators } from '../../utils/validators';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    const err = validators.email(email);
    if (err) { setEmailError(err); return; }
    setEmailError(null);
    // TODO: call userService.forgotPassword(email)
    setSent(true);
  };

  if (sent) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check your inbox</Text>
        <Text style={styles.body}>
          We've sent a password reset link to{'\n'}
          <Text style={styles.emailHighlight}>{email}</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.body}>Enter your email and we'll send you a reset link.</Text>

      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={emailError} />

      <Button title="Send Reset Link" onPress={handleSend} style={styles.btn} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>← Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, padding: Spacing['2xl'], justifyContent: 'center', backgroundColor: Colors.background },
  title:          { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  body:           { fontSize: Typography.fontSize.base, color: Colors.textSecondary, marginBottom: Spacing['2xl'], lineHeight: 22 },
  emailHighlight: { color: Colors.primary, fontWeight: Typography.fontWeight.semibold },
  btn:            { width: '100%', marginTop: Spacing.sm },
  backLink:       { textAlign: 'center', marginTop: Spacing.lg, color: Colors.primary, fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.medium },
});
