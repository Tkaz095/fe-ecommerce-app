import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { useCartStore } from '../../store/useCartStore';

type Props = NativeStackScreenProps<CartStackParamList, 'OrderSummary'>;

export default function OrderSummaryScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const clearCart = useCartStore((s) => s.clearCart);

  const handleDone = () => {
    clearCart();
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={80} color={Colors.success} />
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.subtitle}>Your order #{orderId} has been placed successfully.</Text>
      <Text style={styles.hint}>You'll receive a confirmation email shortly.</Text>
      <Button title="Continue Shopping" onPress={handleDone} size="lg" style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background, padding: Spacing['2xl'] },
  title:     { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.extrabold, color: Colors.textPrimary, marginTop: Spacing.base, marginBottom: Spacing.sm },
  subtitle:  { fontSize: Typography.fontSize.base, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xs },
  hint:      { fontSize: Typography.fontSize.sm, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing['2xl'] },
  btn:       { width: '100%' },
});
