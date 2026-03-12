import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Product } from '../../../types/product.types';
import { ProductCard } from './ProductCard';
import { Loader } from '../../common/Loader';
import { Spacing } from '../../../constants/theme';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onProductPress: (product: Product) => void;
}

export function ProductList({ products, isLoading = false, onProductPress }: ProductListProps) {
  if (isLoading) return <Loader message="Loading products..." />;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard product={item} onPress={onProductPress} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  row:     { paddingHorizontal: Spacing.sm },
  content: { paddingBottom: Spacing['3xl'] },
});
