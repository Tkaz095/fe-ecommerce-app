import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type Props = NativeStackScreenProps<CartStackParamList, 'Payment'>;

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal',               icon: '🅿️' },
  { id: 'cod',    label: 'Cash on Delivery',     icon: '💵' },
];

export default function PaymentScreen({ route, navigation }: Props) {
  const { amount } = route.params;
  const [selected, setSelected] = useState<string>('card');
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    // TODO: integrate real payment gateway
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    navigation.replace('OrderSummary', { orderId: `ORD-${Date.now()}` });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amountLabel}>Amount due</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>

      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      {PAYMENT_METHODS.map((m) => (
        <TouchableOpacity
          key={m.id}
          style={[styles.option, selected === m.id && styles.optionSelected]}
          onPress={() => setSelected(m.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.optionIcon}>{m.icon}</Text>
          <Text style={[styles.optionLabel, selected === m.id && styles.optionLabelSelected]}>{m.label}</Text>
        </TouchableOpacity>
      ))}

      <Button title="Pay Now" onPress={handlePay} isLoading={isLoading} size="lg" style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: Colors.background, padding: Spacing.base },
  amountLabel:         { fontSize: Typography.fontSize.sm, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.base },
  amount:              { fontSize: Typography.fontSize['4xl'], fontWeight: Typography.fontWeight.extrabold, color: Colors.primary, textAlign: 'center', marginBottom: Spacing['2xl'] },
  sectionTitle:        { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  option:              { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border, marginBottom: Spacing.sm },
  optionSelected:      { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  optionIcon:          { fontSize: 20, marginRight: Spacing.md },
  optionLabel:         { fontSize: Typography.fontSize.base, color: Colors.textPrimary },
  optionLabelSelected: { color: Colors.primary, fontWeight: Typography.fontWeight.semibold },
  btn:                 { width: '100%', marginTop: Spacing.xl },
});
