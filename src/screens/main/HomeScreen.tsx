import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../types/navigation.types';
import { Product } from '../../types/product.types';
import { useCartStore } from '../../store/useCartStore';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

type HomeNavProp = NativeStackNavigationProp<ShopStackParamList, 'Home'>;

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, image: 'https://via.placeholder.com/300', category: 'Electronics' },
  { id: '2', name: 'Mechanical Keyboard',         price: 150,                      image: 'https://via.placeholder.com/300', category: 'Electronics' },
  { id: '3', name: 'Ergonomic Mouse',             price: 80,  originalPrice: 100,  image: 'https://via.placeholder.com/300', category: 'Electronics' },
  { id: '4', name: '27-inch 4K Monitor',          price: 450,                      image: 'https://via.placeholder.com/300', category: 'Electronics' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const addItem = useCartStore((s) => s.addItem);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => addItem(item)}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured Products</Text>
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header:    { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, padding: Spacing.base },
  list:      { paddingHorizontal: Spacing.sm, paddingBottom: Spacing['2xl'] },
  card: {
    flex: 1,
    margin: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.md,
  },
  image:       { width: '100%', aspectRatio: 1, backgroundColor: Colors.surfaceAlt },
  cardContent: { padding: Spacing.sm },
  name:        { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.medium, color: Colors.textPrimary, marginBottom: Spacing.xs },
  price:       { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.primary, marginBottom: Spacing.sm },
  addBtn:      { backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.md, paddingVertical: Spacing.xs, alignItems: 'center' },
  addBtnText:  { color: Colors.primary, fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.semibold },
});
