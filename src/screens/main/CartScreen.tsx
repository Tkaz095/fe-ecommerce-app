import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../types/navigation.types';
import { CartItem } from '../../components/features/cart/CartItem';
import { CartSummary } from '../../components/features/cart/CartSummary';
import { useCartStore } from '../../store/useCartStore';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../constants/theme';

type Props = NativeStackScreenProps<CartStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color={Colors.textSecondary} />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add some products to get started!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
          />
        )}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <CartSummary onCheckout={() => navigation.navigate('Checkout')} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: Colors.background },
  list:           { paddingTop: Spacing.sm, paddingBottom: Spacing['3xl'] },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background, padding: Spacing['2xl'] },
  emptyTitle:     { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginTop: Spacing.base },
  emptySubtitle:  { fontSize: Typography.fontSize.base, color: Colors.textSecondary, marginTop: Spacing.xs },
});
