import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../types/navigation.types';
import { ProductList } from '../../components/features/product/ProductList';
import { useProducts } from '../../hooks/useProducts';
import { Colors } from '../../constants/theme';

type Props = NativeStackScreenProps<ShopStackParamList, 'Category'>;

export default function CategoryScreen({ navigation, route }: Props) {
  const { categoryId } = route.params;
  const { products, isLoading } = useProducts({ category: categoryId });

  return (
    <View style={styles.container}>
      <ProductList
        products={products}
        isLoading={isLoading}
        onProductPress={(p) => navigation.navigate('ProductDetail', { product: p })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});
