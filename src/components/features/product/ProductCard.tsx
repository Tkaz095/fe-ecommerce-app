import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../../types/product.types';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../../constants/theme';
import { formatCurrency, formatDiscount } from '../../../utils/formatCurrency';
import { useCartStore } from '../../../store/useCartStore';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)} activeOpacity={0.85}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

      {hasDiscount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {formatDiscount(product.originalPrice!, product.price)}
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice!)}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => addItem(product)}>
          <Text style={styles.addButtonText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.md,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.surfaceAlt,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  discountText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  content: {
    padding: Spacing.sm,
  },
  name: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  price: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  originalPrice: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
});
