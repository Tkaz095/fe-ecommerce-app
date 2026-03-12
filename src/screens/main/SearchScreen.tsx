import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../types/navigation.types';
import { Input } from '../../components/common/Input';
import { ProductCard } from '../../components/features/product/ProductCard';
import { Loader } from '../../components/common/Loader';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Product } from '../../types/product.types';

type Props = NativeStackScreenProps<ShopStackParamList, 'Search'>;

export default function SearchScreen({ navigation, route }: Props) {
  const [query, setQuery] = useState(route.params?.query ?? '');
  const debouncedQuery = useDebounce(query, 400);
  const { products, isLoading } = useProducts({ search: debouncedQuery || undefined });

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Search products..."
          autoFocus
          containerStyle={styles.inputContainer}
        />
      </View>

      {isLoading ? (
        <Loader message="Searching..." />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Product }) => (
            <ProductCard
              product={item}
              onPress={(p) => navigation.navigate('ProductDetail', { product: p })}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            debouncedQuery ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No results for "{debouncedQuery}"</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: Colors.background },
  searchBar:      { padding: Spacing.base, paddingBottom: 0 },
  inputContainer: { marginBottom: 0 },
  list:           { padding: Spacing.sm, paddingBottom: Spacing['3xl'] },
  empty:          { flex: 1, alignItems: 'center', padding: Spacing['2xl'] },
  emptyText:      { fontSize: Typography.fontSize.base, color: Colors.textSecondary },
});
