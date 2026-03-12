import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { useCartStore } from '../store/useCartStore';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
    const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemDetails}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyButton}>
                        <Ionicons name="remove" size={20} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyButton}>
                        <Ionicons name="add" size={20} color={Colors.text} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <Ionicons name="trash-outline" size={24} color={Colors.error} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color={Colors.textSecondary} />
                    <Text style={styles.emptyText}>Your cart is empty.</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                    />
                    <View style={styles.footer}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalValue}>${totalPrice().toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: Colors.textSecondary, marginTop: 16 },
    list: { padding: 16 },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
        alignItems: 'center'
    },
    image: { width: 80, height: 80, borderRadius: 8, marginRight: 16 },
    itemDetails: { flex: 1 },
    name: { fontSize: 16, color: Colors.text, marginBottom: 8 },
    price: { fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginBottom: 8 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    qtyButton: { backgroundColor: Colors.border, borderRadius: 20, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 16, fontWeight: '600', marginHorizontal: 16 },
    removeButton: { padding: 8 },
    footer: { padding: 24, backgroundColor: Colors.surface, borderTopWidth: 1, borderColor: '#eee' },
    totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    totalLabel: { fontSize: 18, color: Colors.text, fontWeight: '600' },
    totalValue: { fontSize: 24, color: Colors.primary, fontWeight: 'bold' },
    checkoutButton: { backgroundColor: Colors.primary, padding: 16, borderRadius: 12, alignItems: 'center' },
    checkoutText: { color: Colors.surface, fontSize: 18, fontWeight: 'bold' }
});
