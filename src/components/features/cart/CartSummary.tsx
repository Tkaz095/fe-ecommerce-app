import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../../constants/theme';
import { Button } from '../../common/Button';
import { useCartStore } from '../../../store/useCartStore';
import { formatCurrency } from '../../../utils/formatCurrency';

interface CartSummaryProps {
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 9.99;

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const { totalPrice, items } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal ({items.length} items)</Text>
        <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Shipping</Text>
        <Text style={[styles.value, shipping === 0 && styles.freeTag]}>
          {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
        </Text>
      </View>

      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <Text style={styles.hint}>
          Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
        </Text>
      )}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>

      <Button title="Proceed to Checkout" onPress={onCheckout} size="lg" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    margin: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  freeTag: {
    color: Colors.success,
    fontWeight: Typography.fontWeight.semibold,
  },
  hint: {
    fontSize: Typography.fontSize.xs,
    color: Colors.warning,
    marginBottom: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.extrabold,
    color: Colors.primary,
  },
  button: {
    marginTop: Spacing.md,
    width: '100%',
  },
});
