import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type Props = NativeStackScreenProps<CartStackParamList, 'Checkout'>;

export default function CheckoutScreen({ navigation }: Props) {
  // TODO: implement delivery address selection, shipping method, etc.
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Delivery Address</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Address selection — coming soon</Text>
      </View>

      <Text style={styles.sectionTitle}>Shipping Method</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Standard / Express — coming soon</Text>
      </View>

      <Button
        title="Continue to Payment"
        size="lg"
        style={styles.btn}
        onPress={() => navigation.navigate('Payment', { amount: 0 })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: Colors.background },
  content:         { padding: Spacing.base, paddingBottom: Spacing['4xl'] },
  sectionTitle:    { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginTop: Spacing.base, marginBottom: Spacing.sm },
  placeholder:     { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed' },
  placeholderText: { color: Colors.textSecondary, fontSize: Typography.fontSize.sm, textAlign: 'center' },
  btn:             { width: '100%', marginTop: Spacing['2xl'] },
});
