import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../types/navigation.types';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useCartStore } from '../../store/useCartStore';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { formatCurrency, formatDiscount } from '../../utils/formatCurrency';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route }: Props) {
  const { product } = route.params;
  const addItem = useCartStore((s) => s.addItem);
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        {product.category && <Badge label={product.category} variant="primary" style={styles.badge} />}

        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {hasDiscount && (
            <>
              <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice!)}</Text>
              <Text style={styles.discount}>{formatDiscount(product.originalPrice!, product.price)}</Text>
            </>
          )}
        </View>

        {product.description ? (
          <>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Button title="Add to Cart" onPress={() => addItem(product)} size="lg" style={styles.btn} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: Colors.background },
  image:         { width: '100%', aspectRatio: 1, backgroundColor: Colors.surfaceAlt },
  content:       { padding: Spacing.base },
  badge:         { marginBottom: Spacing.sm },
  name:          { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.base },
  price:         { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.extrabold, color: Colors.primary },
  originalPrice: { fontSize: Typography.fontSize.base, color: Colors.textSecondary, textDecorationLine: 'line-through' },
  discount:      { fontSize: Typography.fontSize.sm, color: Colors.danger, fontWeight: Typography.fontWeight.bold },
  sectionTitle:  { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary, marginBottom: Spacing.xs },
  description:   { fontSize: Typography.fontSize.base, color: Colors.textSecondary, lineHeight: 24 },
  footer:        { padding: Spacing.base, paddingBottom: Spacing['3xl'] },
  btn:           { width: '100%' },
});
