import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../store/useCartStore';

const DUMMY_PRODUCTS: Product[] = [
    { id: '1', name: 'Premium Wireless Headphones', price: 299, image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Mechanical Keyboard', price: 150, image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Ergonomic Mouse', price: 80, image: 'https://via.placeholder.com/150' },
    { id: '4', name: '27-inch 4K Monitor', price: 450, image: 'https://via.placeholder.com/150' },
];

export default function HomeScreen() {
    const navigation = useNavigation<any>();

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
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Featured Products</Text>
            <FlatList
                data={DUMMY_PRODUCTS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        padding: 16,
    },
    list: {
        paddingHorizontal: 8,
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 4,
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
